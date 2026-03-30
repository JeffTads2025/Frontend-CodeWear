import { useState, useEffect } from 'react';
import { 
  FiTrash2, FiShoppingCart, FiPlus, FiMinus, 
  FiCheckCircle, FiAlertCircle, FiCreditCard, FiHash, FiMapPin 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/useCart';
import api from '../../services/api';
import * as S from './styles';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, updateCartSize, cartTotal, clearCart } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState<'Cartão' | 'Pix'>('Cartão');
  
  // Estados para o endereço
  const [address, setAddress] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Busca o endereço do usuário do backend ao montar o componente
  useEffect(() => {
    async function loadUserData() {
      const token = localStorage.getItem('@CodeWear:token');
      if (!token) return;

      try {
        api.defaults.headers.authorization = `Bearer ${token}`;
        // Faz a chamada para a rota de perfil/dados do usuário
        const response = await api.get('/me'); 
        // Ajuste 'response.data.address' conforme a estrutura do seu Back-end
        if (response.data.address) {
          setAddress(response.data.address);
        }
      } catch (error) {
        console.error("Erro ao carregar endereço do perfil");
      }
    }

    loadUserData();
  }, []);

  const getTotalQuantityById = (id: number) => {
    return cart.filter(item => item.id === id).reduce((acc, item) => acc + item.quantity, 0);
  };

  const hasGlobalStockError = cart.some(item => getTotalQuantityById(item.id) > item.stock);

  async function handleCheckout() {
    if (hasGlobalStockError) {
      toast.error('Ajuste o estoque antes de finalizar!');
      return;
    }

    if (!address.trim()) {
      toast.warn('Por favor, informe um endereço de entrega.');
      return;
    }

    const token = localStorage.getItem('@CodeWear:token');
    if (!token) return navigate('/login');

    try {
      api.defaults.headers.authorization = `Bearer ${token}`;
      // Agora enviamos o 'address' que está no estado (seja o do banco ou o editado)
      await api.post('/checkout', { 
        paymentMethod, 
        address 
      });

      toast.success(`Pedido finalizado! Entrega em: ${address}`);
      clearCart();
      navigate('/orders');
    } catch (err) {
      toast.error('Erro ao processar pedido.');
    }
  }

  const formatMoney = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <S.Container>
      <S.Header>
        <div className="icon-bg"><FiShoppingCart size={24} /></div>
        <h2>Meu Carrinho</h2>
      </S.Header>

      <S.Content>
        <S.ItemsList>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#94a3b8' }}>Carrinho vazio.</p>
              <button onClick={() => navigate('/')} className="empty-cart-btn">Voltar à loja</button>
            </div>
          ) : (
            cart.map(item => {
              const isAtLimit = getTotalQuantityById(item.id) >= item.stock;
              return (
                <S.ItemCard key={`${item.id}-${item.size}`}>
                  <img src={item.image_url} alt={item.name} />
                  <div className="info">
                    <h3>{item.name}</h3>
                    <p style={{ fontSize: '12px', color: isAtLimit ? '#f59e0b' : '#10b981' }}>
                      {isAtLimit ? 'Limite atingido' : `Estoque: ${item.stock}`}
                    </p>
                    <div style={{ display: 'flex', gap: '6px', margin: '10px 0' }}>
                      {['P', 'M', 'G'].map(s => (
                        <S.SizeBadge key={s} $active={item.size === s} onClick={() => updateCartSize(item.id, item.size, s)}>{s}</S.SizeBadge>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button onClick={() => updateCartQuantity(item.id, item.size, 'decrease')} className="qty-btn"><FiMinus /></button>
                      <span className="qty-value">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, item.size, 'increase')} className="qty-btn" disabled={isAtLimit}><FiPlus /></button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="price">{formatMoney(item.price * item.quantity)}</span>
                    <button onClick={() => removeFromCart(item.id, item.size)} className="remove-btn" style={{ display: 'block', marginTop: '10px', marginLeft: 'auto' }}><FiTrash2 size={18}/></button>
                  </div>
                </S.ItemCard>
              );
            })
          )}
        </S.ItemsList>

        <S.Summary>
          <h3>Resumo</h3>

          {/* SEÇÃO DE ENDEREÇO NOVA */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <p style={{ color: '#94a3b8', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiMapPin /> Endereço de Entrega
              </p>
              <button 
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', cursor: 'pointer' }}
              >
                {isEditingAddress ? 'Salvar' : 'Alterar'}
              </button>
            </div>
            
            {isEditingAddress ? (
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ 
                  width: '100%', background: '#1e293b', border: '1px solid #334155', 
                  borderRadius: '8px', color: 'white', padding: '8px', fontSize: '13px', resize: 'none'
                }}
                rows={3}
                placeholder="Digite o endereço completo..."
              />
            ) : (
              <p style={{ color: 'white', fontSize: '13px', background: '#1e293b', padding: '10px', borderRadius: '8px' }}>
                {address || "Nenhum endereço cadastrado."}
              </p>
            )}
          </div>

          <S.PaymentSelector>
            <p>Forma de Pagamento</p>
            <button type="button" className={paymentMethod === 'Cartão' ? 'active' : ''} onClick={() => setPaymentMethod('Cartão')}>
              <FiCreditCard size={18} /> Cartão de Crédito
            </button>
            <button type="button" className={paymentMethod === 'Pix' ? 'active' : ''} onClick={() => setPaymentMethod('Pix')}>
              <FiHash size={18} /> Pix
            </button>
          </S.PaymentSelector>

          <div className="total-section">
            <div className="total">
              <span>Total:</span>
              <strong>{formatMoney(cartTotal)}</strong>
            </div>
          </div>
          
          <button onClick={handleCheckout} disabled={cart.length === 0 || hasGlobalStockError} className="checkout-btn">
            <FiCheckCircle size={20} /> Finalizar Pedido
          </button>
        </S.Summary>
      </S.Content>
    </S.Container>
  );
};