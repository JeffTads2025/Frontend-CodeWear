import { FiTrash2, FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import api from '../../services/api';
import * as S from './styles';

export function Cart() {
  const { cart, removeFromCart, updateCartQuantity, updateCartSize, cartTotal } = useCart();

  async function handleCheckout() {
    try {
      // DICA: No futuro, o back vai precisar do token de login aqui!
      await api.post('/orders', { items: cart });
      alert('Pedido realizado com sucesso!');
    } catch (err) {
      alert('Erro ao finalizar pedido no backend.');
    }
  }

  return (
    <S.Container>
      <S.Header>
        <div className="icon-bg"><FiShoppingCart /></div>
        <h2>Meu Carrinho</h2>
      </S.Header>

      <S.Content>
        <S.ItemsList>
          {cart.length === 0 ? (
            <p style={{ color: '#94a3b8', padding: '20px' }}>Seu carrinho está vazio.</p>
          ) : (
            cart.map(item => (
              <S.ItemCard key={`${item.id}-${item.size}`}>
                <img src={item.image_url} alt={item.name} />
                <div className="info">
                  <h3>{item.name}</h3>
                  
                  <div style={{ display: 'flex', gap: '8px', margin: '10px 0' }}>
                    {['P', 'M', 'G'].map(size => (
                      <S.SizeBadge 
                        key={size}
                        active={item.size === size} 
                        onClick={() => updateCartSize(item.id, item.size, size)}
                      >
                        {size}
                      </S.SizeBadge>
                    ))}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <button onClick={() => updateCartQuantity(item.id, item.size, 'decrease')} className="qty-btn">
                      <FiMinus size={14} />
                    </button>
                    
                    <span className="qty-value">{item.quantity}</span>
                    
                    <button onClick={() => updateCartQuantity(item.id, item.size, 'increase')} className="qty-btn">
                      <FiPlus size={14} />
                    </button>
                  </div>

                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</span>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id, item.size)} 
                  className="remove-btn"
                >
                  <FiTrash2 size={22} />
                </button>
              </S.ItemCard>
            ))
          )}
        </S.ItemsList>

        <S.Summary>
          <h3>Resumo</h3>
          <div className="total">
            <span>Total:</span>
            <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}</strong>
          </div>
          <button onClick={handleCheckout} disabled={cart.length === 0}>
            Finalizar Compra
          </button>
        </S.Summary>
      </S.Content>
    </S.Container>
  );
}