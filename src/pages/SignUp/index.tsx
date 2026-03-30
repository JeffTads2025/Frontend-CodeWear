import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiCreditCard, 
  FiArrowLeft, 
  FiShoppingCart, 
  FiPhone, 
  FiMapPin 
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';
import * as S from './styles';

export function SignUp() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function maskCPF(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  function maskPhone(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('E-mail inválido.', { theme: 'dark' });
      return;
    }

    const cleanCpf = cpf.replace(/\D/g, '');
    const cleanEmail = email.toLowerCase().trim();

    setLoading(true);

    try {
      // 1. Cria o usuário no banco
      await api.post('/users', { 
        name, 
        email: cleanEmail, 
        password, 
        cpf: cleanCpf,
        phone, 
        address 
      });

      // 2. EFETUA O LOGIN AUTOMÁTICO IMEDIATAMENTE
      // Isso evita que o cliente caia na tela de login
      const loginResponse = await api.post('/login', { 
        email: cleanEmail, 
        password 
      });

      const { token, user } = loginResponse.data;

      // 3. SALVA OS DADOS (Padronizado com seu Login.tsx)
      localStorage.setItem('@CodeWear:token', token);
      localStorage.setItem('@CodeWear:user', JSON.stringify(user));
      localStorage.setItem('@CodeWear:userName', user.name);

      if (api.defaults.headers.common) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
      }

      toast.success(`Conta criada! Bem-vindo(a), ${user.name}!`, { theme: 'dark' });

      // 4. MANDA PARA A HOME E FORÇA O REFRESH DO HEADER
      window.location.href = '/'; 

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao criar conta.';
      toast.error(errorMessage, { theme: 'dark' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <S.Container>
      <S.Content>
        <S.LogoSection>
          <div className="icon-box"><FiShoppingCart /></div>
          <h1>CodeWear</h1>
          <p>Crie sua conta</p>
        </S.LogoSection>

        <S.FormCard onSubmit={handleSubmit}>
          <h2>Cadastro</h2>

          <div className="input-group">
            <label><FiUser size={14} /> Nome Completo</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" required />
          </div>

          <div className="input-group">
            <label><FiMail size={14} /> E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="exemplo@email.com" required />
          </div>

          <div className="input-group">
            <label><FiCreditCard size={14} /> CPF</label>
            <input value={cpf} onChange={e => setCpf(maskCPF(e.target.value))} placeholder="000.000.000-00" required />
          </div>

          <div className="input-group">
            <label><FiPhone size={14} /> Telefone</label>
            <input value={phone} onChange={e => setPhone(maskPhone(e.target.value))} placeholder="(00) 00000-0000" required />
          </div>

          <div className="input-group full-width">
            <label><FiMapPin size={14} /> Endereço</label>
            <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Rua, número, bairro e cidade" required />
          </div>

          <div className="input-group full-width">
            <label><FiLock size={14} /> Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Processando...' : 'Criar Conta'}
          </button>

          <Link to="/login" className="back-link">
            <FiArrowLeft /> Já tenho conta
          </Link>
        </S.FormCard>
      </S.Content>
    </S.Container>
  );
}