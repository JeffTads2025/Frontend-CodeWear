import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import * as S from './styles';

export function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { cart } = useCart();

  const cartSize = cart.reduce((acc, item) => acc + item.quantity, 0);
  const userName = user?.name ? user.name.split(' ')[0] : '';

  function handleLogout() {
    signOut();
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