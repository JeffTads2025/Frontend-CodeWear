import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiCreditCard, FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import api from '../../services/api';
import * as S from './styles'; 

export function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/users', { name, email, password, cpf });
      alert('Conta criada com sucesso!');
      navigate('/login');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao criar conta.';
      alert(message);
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
          <p>Crie sua conta e comece a comprar</p>
        </S.LogoSection>

        <S.FormCard onSubmit={handleSubmit}>
          <h2>Cadastro</h2>

          <div className="input-group">
            <label><FiUser size={14} /> Nome Completo</label>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Digite seu nome" 
              required 
            />
          </div>

          <div className="input-group">
            <label><FiMail size={14} /> E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="seu@email.com" 
              required 
            />
          </div>

          <div className="input-group">
            <label><FiCreditCard size={14} /> CPF</label>
            <input 
              value={cpf} 
              onChange={e => setCpf(e.target.value)} 
              placeholder="000.000.000-00" 
              required 
            />
          </div>

          <div className="input-group">
            <label><FiLock size={14} /> Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="********" 
              required 
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>

          <Link to="/login" className="back-link">
            <FiArrowLeft size={16} /> Já tenho uma conta
          </Link>
        </S.FormCard>
      </S.Content>
    </S.Container>
  );
}