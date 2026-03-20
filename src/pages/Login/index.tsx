import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn, FiShoppingCart } from 'react-icons/fi';
import api from '../../services/api';
import * as S from './styles';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Envia os dados para o seu loginUser no Backend
      const response = await api.post('/login', { email, password });

      const { token, user } = response.data;

      // 2. Salva o Token e os Dados do Usuário no navegador
      // Isso é o que a Sidebar e o Perfil vão ler depois
      localStorage.setItem('@CodeWear:token', token);
      localStorage.setItem('@CodeWear:user', JSON.stringify(user));

      // 3. Configura o token em todas as futuras chamadas de API automaticamente
      api.defaults.headers.authorization = `Bearer ${token}`;

      alert(`Bem-vindo, ${user.name}!`);
      
      // 4. Manda o usuário para a Home após o login
      navigate('/');
      
      // Força um recarregamento simples para a Sidebar atualizar o role
      window.location.reload(); 

    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao realizar login.';
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
          <p>Sua loja de roupas tech</p>
        </S.LogoSection>

        <S.FormCard onSubmit={handleLogin}>
          <h2>Login</h2>

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
            {loading ? 'Entrando...' : <><FiLogIn /> Entrar</>}
          </button>

          <p className="signup-text">
            Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
          </p>
        </S.FormCard>
      </S.Content>
    </S.Container>
  );
}