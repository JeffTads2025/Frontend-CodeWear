import { useState, useEffect } from 'react';
import { FiUser, FiEdit2, FiSave, FiMapPin, FiPhone, FiHash, FiLock, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';
import * as S from './styles';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // FUNÇÃO DE MÁSCARA: Transforma números puros em 000.000.000-00
  const maskCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get('/me');
        const user = response.data;
        
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone || '');
        setAddress(user.address || '');
        // APLICA A MÁSCARA AO CARREGAR
        setCpf(maskCPF(user.cpf || '')); 
      } catch (err) {
        toast.error('Erro ao carregar dados do perfil.');
      }
    }
    loadProfile();
  }, []);

  async function handleSave() {
    if (password.length > 0) {
      if (password.length < 6) return toast.error('Senha mínima: 6 dígitos.');
      if (password !== confirmPassword) return toast.error('As senhas não coincidem!');
    }

    setLoading(true);
    try {
      // TRATAMENTO: Envia apenas números para o Back-end (evita erro 400/404)
      const cleanCPF = cpf.replace(/\D/g, '');

      const updateData: any = { 
        name, 
        phone, 
        address,
        cpf: cleanCPF 
      };

      if (password.trim() !== '') updateData.password = password;

      // Rota baseada no seu controller (updateUser)
      await api.put('/users', updateData);

      toast.success('Perfil atualizado!', { theme: 'dark' });
      setIsEditing(false);
      setPassword('');
      setConfirmPassword('');
      // Mantém formatado na tela após o sucesso
      setCpf(maskCPF(cleanCPF)); 
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro ao salvar alterações.');
    } finally {
      setLoading(false);
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
                  <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                    <FiX /> Cancelar
                  </button>
                  <button className="save-btn" onClick={handleSave} disabled={loading}>
                    <FiSave /> Salvar
                  </button>
                </>
              ) : (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <FiEdit2 /> Editar
                </button>
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
              {isEditing ? <input value={phone} onChange={e => setPhone(e.target.value)} /> : <p>{phone || 'Não informado'}</p>}
            </div>

            <div className="field full-width">
              <label><FiMapPin /> ENDEREÇO DE ENTREGA</label>
              {isEditing ? <textarea value={address} onChange={e => setAddress(e.target.value)} rows={2} /> : <p>{address || 'Não cadastrado'}</p>}
            </div>

            {isEditing && (
              <>
                <div className="field">
                  <label><FiLock /> NOVA SENHA (OPCIONAL)</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
                </div>
                <div className="field">
                  <label><FiLock /> CONFIRMAR NOVA SENHA</label>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
              </>
            )}
          </S.InfoGroup>
        </S.ProfileCard>
      </S.Content>
    </S.Container>
  );
}