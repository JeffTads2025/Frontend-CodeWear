import { useState, useEffect } from 'react';
import {
  FiTrash2, FiShoppingCart, FiPlus, FiMinus,
  FiCheckCircle, FiCreditCard, FiHash, FiMapPin
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/useCart';
import { usersApi, ordersApi } from '../../services/api';
import { Button } from '../../components/Button';
import * as S from './styles';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, cartTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'Cartão' | 'Pix'>('Cartão');

  // Estados para o endereço
  const [address, setAddress] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  // Busca o endereço do usuário do backend ao montar o componente
  useEffect(() => {
    async function loadUserData() {
      const token = localStorage.getItem('@CodeWear:token');
      if (!token) return;

      try {
        // Faz a chamada para a rota de perfil/dados do usuário
        const user = await usersApi.getProfile();
        // Ajuste para garantir que o endereço seja carregado mesmo se vazio
        setAddress(user.address || '');
      } catch {
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

    setLoadingCheckout(true);
    try {
      await ordersApi.create({
        paymentMethod,
        address
      });

      toast.success(`Pedido finalizado! Entrega em: ${address}`);
      clearCart();
      navigate('/orders');
    } catch {
      toast.error('Erro ao processar pedido.');
    } finally {
      setLoadingCheckout(false);
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
              <Button type="button" onClick={() => navigate('/')} style={{ background: '#374151', color: '#d1d5db', border: '1px solid #4b5563' }}>
                Voltar à loja
              </Button>
            </div>
          ) : (
            cart.map(item => {
              const isAtLimit = getTotalQuantityById(item.id) >= item.stock;
              return (
                <S.ItemCard key={item.cartId}>
                  <img src={item.image_url} alt={item.name} />
                  <div className="info">
                    <h3>{item.name}</h3>
                    <p style={{ fontSize: '12px', color: isAtLimit ? '#f59e0b' : '#10b981' }}>
                      {isAtLimit ? 'Limite atingido' : `Estoque: ${item.stock}`}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button onClick={() => updateCartQuantity(item.id, 'decrease')} className="qty-btn"><FiMinus /></button>
                      <span className="qty-value">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, 'increase')} className="qty-btn" disabled={isAtLimit}><FiPlus /></button>
                    </div>
                  </div>
                  <div className="actions" style={{ textAlign: 'right' }}>
                    <span className="price">{formatMoney(item.price * item.quantity)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn" style={{ display: 'block', marginTop: '10px', marginLeft: 'auto' }}><FiTrash2 size={18} /></button>
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

          <Button onClick={handleCheckout} disabled={cart.length === 0 || hasGlobalStockError} loading={loadingCheckout}>
            <FiCheckCircle size={20} /> Finalizar Pedido
          </Button>
        </S.Summary>
      </S.Content>
    </S.Container>
  );
};