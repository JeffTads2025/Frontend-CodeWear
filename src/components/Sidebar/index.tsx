import { 
  FiHome, 
  FiPackage, 
  FiUser, 
  FiLogOut, 
  FiShoppingCart, 
  FiShield 
} from 'react-icons/fi';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import * as S from './styles';

export function Sidebar() {
  const { pathname } = useLocation();
  const { cart } = useCart();
  const navigate = useNavigate();

  // Soma a quantidade de itens para o badge do carrinho
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Lógica para ler o usuário real do Backend salvo no localStorage
  const savedUser = localStorage.getItem('@CodeWear:user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  // Função para deslogar
  function handleLogout() {
    localStorage.removeItem('@CodeWear:token');
    localStorage.removeItem('@CodeWear:user');
    navigate('/login');
    window.location.reload(); // Recarrega para limpar estados da aplicação
  }

  return (
    <S.Container>
      <S.Logo>
        <div className="icon-box">
          <FiShoppingCart />
        </div>
        <div>
          <h1>CodeWear</h1>
          <p>Store Dashboard</p>
        </div>
      </S.Logo>

      <S.Menu>
        <p className="label">Área do Cliente</p>
        
        <S.MenuItem as={Link} to="/" active={pathname === '/'}>
          <FiHome size={20} />
          Início
        </S.MenuItem>

        <S.MenuItem as={Link} to="/cart" active={pathname === '/cart'}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '12px' }}>
            <FiShoppingCart size={20} />
            <span>Carrinho</span>
            {cartCount > 0 && (
              <span className="badge" style={{
                background: 'var(--primary)',
                color: 'white',
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '10px',
                marginLeft: 'auto'
              }}>{cartCount}</span>
            )}
          </div>
        </S.MenuItem>

        <S.MenuItem as={Link} to="/orders" active={pathname === '/orders'}>
          <FiPackage size={20} />
          Meus Pedidos
        </S.MenuItem>
      </S.Menu>

      {/* SÓ APARECE SE O ROLE NO BANCO FOR 'admin' */}
      {user?.role === 'admin' && (
        <S.Menu>
          <p className="label">Gerenciamento</p>
          
          <S.MenuItem as={Link} to="/admin" active={pathname === '/admin'}>
            <FiShield size={20} />
            Painel Admin
          </S.MenuItem>
        </S.Menu>
      )}

      <S.Menu style={{ marginTop: 'auto' }}>
        <p className="label">Conta</p>
        <S.MenuItem as={Link} to="/profile" active={pathname === '/profile'}>
          <FiUser size={20} />
          Perfil
        </S.MenuItem>
        
        {/* Botão de Sair como um botão real que chama o Logout */}
        <S.MenuItem as="button" onClick={handleLogout} style={{ width: '100%', cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left' }}>
          <FiLogOut size={20} />
          Sair
        </S.MenuItem>
      </S.Menu>
    </S.Container>
  );
}