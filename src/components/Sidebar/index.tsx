import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiHome, FiShoppingBag, FiUser, FiLogOut, 
  FiShoppingCart, FiShield, FiUsers, FiActivity 
} from 'react-icons/fi';
import * as S from './styles';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const savedUser = localStorage.getItem('@CodeWear:user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem('@CodeWear:token');
    localStorage.removeItem('@CodeWear:user');
    navigate('/login');
  };

  return (
    <S.Container>
      <S.Nav>
        <span className="group-title">ÁREA DO CLIENTE</span>
        <S.NavItem onClick={() => navigate('/')} className={location.pathname === '/' ? 'active' : ''}>
          <FiHome size={20} /> <span>Início</span>
        </S.NavItem>
        <S.NavItem onClick={() => navigate('/cart')} className={location.pathname === '/cart' ? 'active' : ''}>
          <FiShoppingCart size={20} /> <span>Carrinho</span>
        </S.NavItem>
        <S.NavItem onClick={() => navigate('/orders')} className={location.pathname === '/orders' ? 'active' : ''}>
          <FiShoppingBag size={20} /> <span>Meus Pedidos</span>
        </S.NavItem>

        {user?.role === 'admin' && (
          <>
            <span className="group-title" style={{ marginTop: '12px' }}>GERENCIAMENTO</span>
            <S.NavItem onClick={() => navigate('/admin')} className={location.pathname === '/admin' ? 'active' : ''}>
              <FiShield size={20} color="#00ff88" /> <span>Painel Geral</span>
            </S.NavItem>
            <S.NavItem onClick={() => navigate('/admin/vendas')} className={location.pathname === '/admin/vendas' ? 'active' : ''}>
              <FiShoppingBag size={20} /> <span>Vendas</span>
            </S.NavItem>
            <S.NavItem onClick={() => navigate('/admin/clientes')} className={location.pathname === '/admin/clientes' ? 'active' : ''}>
              <FiUsers size={20} /> <span>Clientes</span>
            </S.NavItem>
            {/* ITEM REINSERIDO AQUI */}
            <S.NavItem onClick={() => navigate('/admin/auditoria')} className={location.pathname === '/admin/auditoria' ? 'active' : ''}>
              <FiActivity size={20} /> <span>Auditoria</span>
            </S.NavItem>
          </>
        )}
      </S.Nav>

      <S.FooterNav>
        <S.NavItem onClick={() => navigate('/profile')} className={location.pathname === '/profile' ? 'active' : ''}>
          <FiUser size={20} /> <span>Meu Perfil</span>
        </S.NavItem>
        <S.NavItem onClick={handleLogout} className="logout">
          <FiLogOut size={20} /> <span>Sair</span>
        </S.NavItem>
      </S.FooterNav>
    </S.Container>
  );
}