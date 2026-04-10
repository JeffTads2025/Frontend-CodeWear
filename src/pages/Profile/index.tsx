import { useState, useEffect } from 'react';
import { FiUser, FiEdit2, FiSave, FiMapPin, FiPhone, FiHash, FiLock, FiX } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../../services/api';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { maskCPF, sanitizeCPF, validateCPF } from '../../utils/cpf';
import type { ApiErrorResponse, UserUpdateInput } from '../../types/api';
import * as S from './styles';

export function Profile() {
  const navigate = useNavigate();
  const { signOut, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCancellingAccount, setIsCancellingAccount] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // FUNÇÃO DE MÁSCARA: Transforma números puros em 000.000.000-00
  // FUNÇÃO DE MÁSCARA PARA TELEFONE: (00) 00000-0000
  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await usersApi.getProfile();

        setName(user.name);
        setEmail(user.email);
        setPhone(maskPhone(user.phone || ''));
        setAddress(user.address || '');
        // APLICA A MÁSCARA AO CARREGAR
        setCpf(maskCPF(user.cpf || ''));
      } catch {
        toast.error('Erro ao carregar dados do perfil.');
      }
    }
    loadProfile();
  }, []);

  async function handleSave() {
    if (password.length > 0) {
      const cleanPassword = password.trim();
      const cleanConfirmPassword = confirmPassword.trim();

      if (cleanPassword.length < 8) return toast.error('Senha mínima: 8 caracteres.');
      if (cleanPassword !== cleanConfirmPassword) return toast.error('As senhas não coincidem!');
    }

    setLoading(true);
    try {
      // TRATAMENTO: Envia apenas números para o Back-end (evita erro 400/404)
      const cleanCPF = sanitizeCPF(cpf);
      const cleanPhone = phone.replace(/\D/g, '');

      if (cleanCPF && !validateCPF(cleanCPF)) {
        toast.error('CPF inválido.');
        setLoading(false);
        return;
      }

      const updateData: UserUpdateInput = {
        name,
        phone: cleanPhone,
        address,
        cpf: cleanCPF
      };

      if (password.trim() !== '') updateData.password = password.trim();

      // Rota baseada no seu controller (updateUser)
      await usersApi.updateProfile(updateData);
      const refreshedUser = await usersApi.getProfile();
      updateUser(refreshedUser);

      toast.success('Perfil atualizado!', { theme: 'dark' });
      setIsEditing(false);
      setPassword('');
      setConfirmPassword('');
      // Mantém formatado na tela após o sucesso
      setCpf(maskCPF(cleanCPF));
      setPhone(maskPhone(cleanPhone));
    } catch (error) {
      const errorMessage = axios.isAxiosError<ApiErrorResponse>(error)
        ? error.response?.data?.message || 'Erro ao salvar alterações.'
        : 'Erro ao salvar alterações.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelAccount() {
    const confirmed = window.confirm(
      'Tem certeza que deseja cancelar sua conta? Seus pedidos continuarão registrados, mas seu acesso será encerrado.'
    );

    if (!confirmed) {
      return;
    }

    setIsCancellingAccount(true);
    try {
      await usersApi.cancelMyAccount();
      signOut();
      toast.success('Conta cancelada com sucesso.', { theme: 'dark' });
      navigate('/login');
    } catch (error) {
      const errorMessage = axios.isAxiosError<ApiErrorResponse>(error)
        ? error.response?.data?.message || 'Erro ao cancelar conta.'
        : 'Erro ao cancelar conta.';
      toast.error(errorMessage, { theme: 'dark' });
    } finally {
      setIsCancellingAccount(false);
    }
  }

  return (
    <S.Container>
      <S.Header>
        <div className="icon-bg"><FiUser /></div>
        <div>
          <h2>Meu Perfil</h2>
          <p>Gerencie suas informações e segurança</p>
        </div>
      </S.Header>

      <S.Content>
        <S.ProfileCard>
          <div className="card-header">
            <h3>Informações Pessoais</h3>
            <div className="actions">
              {isEditing ? (
                <>
                  <Button type="button" onClick={() => setIsEditing(false)} style={{ background: '#374151', color: '#d1d5db', border: '1px solid #4b5563' }}>
                    <FiX /> Cancelar
                  </Button>
                  <Button type="button" loading={loading} onClick={handleSave}>
                    <FiSave /> Salvar
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)} style={{ background: '#1f2937', color: '#60a5fa', border: '1px solid #3b82f6' }}>
                  <FiEdit2 /> Editar
                </Button>
              )}
            </div>
          </div>

          <S.InfoGroup>
            <div className="field">
              <label><FiUser /> NOME</label>
              {isEditing ? <input value={name} onChange={e => setName(e.target.value)} /> : <p>{name}</p>}
            </div>

            <div className="field">
              <label>E-MAIL</label>
              <p className="disabled-field">{email}</p>
            </div>

            <div className="field">
              <label><FiHash /> CPF</label>
              {/* EXIBIÇÃO SEMPRE FORMATADA */}
              <p className="disabled-field">{cpf}</p>
            </div>

            <div className="field">
              <label><FiPhone /> TELEFONE</label>
              {isEditing ? <input value={phone} onChange={e => setPhone(maskPhone(e.target.value))} /> : <p>{phone || 'Não informado'}</p>}
            </div>

            <div className="field full-width">
              <label><FiMapPin /> ENDEREÇO DE ENTREGA</label>
              {isEditing ? <textarea value={address} onChange={e => setAddress(e.target.value)} rows={2} /> : <p>{address || 'Não cadastrado'}</p>}
            </div>

            {isEditing && (
              <>
                <div className="field">
                  <label><FiLock /> NOVA SENHA (OPCIONAL)</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" />
                </div>
                <div className="field">
                  <label><FiLock /> CONFIRMAR NOVA SENHA</label>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
              </>
            )}
          </S.InfoGroup>
        </S.ProfileCard>

        <S.ProfileCard>
          <div className="card-header">
            <h3>Conta</h3>
          </div>

          <p style={{ color: '#94a3b8', marginBottom: '16px' }}>
            Ao cancelar a conta, seu acesso será encerrado, mas o histórico de compras permanecerá no sistema.
          </p>

          <Button
            type="button"
            loading={isCancellingAccount}
            onClick={handleCancelAccount}
            style={{ background: '#7f1d1d', color: '#fecaca', border: '1px solid #ef4444' }}
          >
            Cancelar conta
          </Button>
        </S.ProfileCard>
      </S.Content>
    </S.Container>
  );
}