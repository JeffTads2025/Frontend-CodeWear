import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import api from '../../services/api';
import { useCart } from '../../hooks/useCart';
import * as S from './styles';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const { cart } = useCart();

  const cartSize = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Função que busca o nome atualizado no Storage
  const syncUserInfo = () => {
    const userStorage = localStorage.getItem('@CodeWear:user');
    if (userStorage) {
      try {
        const user = JSON.parse(userStorage);
        // Pega o primeiro nome para exibir
        setUserName(user.name ? user.name.split(' ')[0] : '');
      } catch (e) {
        setUserName('');
      }
    } else {
      setUserName('');
    }
  };

  useEffect(() => {
    syncUserInfo();
    
    // Escuta o evento 'storage' disparado pelo Perfil
    window.addEventListener('storage', syncUserInfo);
    return () => window.removeEventListener('storage', syncUserInfo);
  }, [location]);

  function handleLogout() {
    localStorage.clear();
    delete api.defaults.headers.common.authorization;
    setUserName('');
    navigate('/login');
  }

  return (
    <S.Container>
      <S.Content>
        <S.LogoArea onClick={() => navigate('/')}>
          <h2>CodeWear</h2>
        </S.LogoArea>

        <S.IconsArea>
          <button onClick={() => userName ? navigate('/profile') : navigate('/login')}>
            <FiUser size={22} />
            <span>{userName ? `Olá, ${userName}` : 'Entrar'}</span>
          </button>

          <button onClick={() => navigate('/cart')} className="cart">
            <FiShoppingCart size={22} />
            {cartSize > 0 && <span className="badge">{cartSize}</span>}
          </button>

          {userName && (
            <button onClick={handleLogout} className="logout-btn" title="Sair">
              <FiLogOut size={22} />
            </button>
          )}
        </S.IconsArea>
      </S.Content>
    </S.Container>
  );
}