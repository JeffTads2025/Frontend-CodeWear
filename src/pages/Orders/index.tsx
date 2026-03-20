import { useEffect, useState } from 'react';
import { FiPackage, FiCheckCircle, FiClock, FiShoppingBag } from 'react-icons/fi';
import api from '../../services/api';
import * as S from './styles';

interface OrderItem {
  id: number;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
  size: string;
}

interface Order {
  id: number;
  createdAt: string;
  status: string;
  total: number;
  items: OrderItem[]; // Mudamos para uma lista de itens
}

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await api.get('/orders');
        // Se o seu back retornar o array direto:
        setOrders(response.data);
      } catch (err) {
        console.error("Erro ao carregar pedidos");
        // Fallback para teste visual
        setOrders([
          {
            id: 1024,
            createdAt: new Date().toISOString(),
            status: 'completed',
            total: 179.80,
            items: [
              { id: 1, name: 'Camiseta Code Master', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500', price: 89.90, quantity: 2, size: 'M' }
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <div className="icon-bg"><FiPackage /></div>
        <div>
          <h2>Meus Pedidos</h2>
          <p>Histórico de compras sincronizado</p>
        </div>
      </S.Header>

      <S.OrderList>
        {orders.length === 0 && !loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            <FiShoppingBag size={40} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p>Você ainda não realizou nenhum pedido.</p>
          </div>
        ) : (
          orders.map(order => (
            <S.OrderCard key={order.id}>
              {/* Mostra a imagem do primeiro item do pedido como capa */}
              <img src={order.items[0]?.image_url} alt="Pedido" />
              
              <div className="info">
                <span>Pedido #{order.id}</span>
                <h3>{order.items.length > 1 
                  ? `${order.items[0].name} e mais ${order.items.length - 1} itens` 
                  : order.items[0]?.name}
                </h3>
                
                <div className="status">
                  {order.status === 'completed' ? (
                    <><FiCheckCircle color="#10b981"/> <span>Entregue</span></>
                  ) : (
                    <><FiClock color="#f59e0b"/> <span>Em processamento</span></>
                  )}
                  <span className="date"> • {new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="price">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total)}
              </div>
            </S.OrderCard>
          ))
        )}
      </S.OrderList>
    </S.Container>
  );
}