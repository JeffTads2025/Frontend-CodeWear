import { useEffect, useState, useCallback } from 'react';
import {
  FiPackage, FiPlus, FiTrash2, FiDollarSign,
  FiUsers, FiShoppingBag, FiActivity, FiLink
} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';
import * as S from './styles';

export function Admin() {
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, totalUsers: 0 });
  const [products, setProducts] = useState<any[]>([]);

  // States para criação
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');

  const loadAdminData = useCallback(async () => {
    try {
      const [statsRes, productsRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/products')
      ]);
      setStats(statsRes.data);
      const pData = productsRes.data.products || productsRes.data;
      setProducts(Array.isArray(pData) ? pData : []);
    } catch (err) {
      toast.error("Erro ao carregar dados do servidor.");
    }
  }, []);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  // FUNÇÃO DE EDIÇÃO (ENTER)
  async function handleUpdateProduct(id: number, updatedData: Record<string, string | number | null>) {
    try {
      await api.put(`/products/${id}`, updatedData);
      toast.success('Alteração salva! ✅', { autoClose: 1000 });
      loadAdminData();
    } catch (err) {
      toast.error('Erro ao atualizar dados do produto.');
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number, field: string) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value;
      const formattedValue = (field === 'price' || field === 'stock') ? Number(value) : value;
      handleUpdateProduct(id, { [field]: formattedValue });
      e.currentTarget.blur(); // Tira o foco após salvar
    }
  };

  // FUNÇÃO DE EXCLUSÃO COM MENSAGEM DETALHADA
  async function handleDeleteProduct(id: number) {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Produto removido! 🗑️');
        loadAdminData();
      } catch (err: any) {
        // Puxa o motivo real do backend (ex: "Produto vinculado a pedidos")
        const errorMessage = err.response?.data?.error || "Erro ao excluir produto.";
        toast.error(`Não foi possível excluir: ${errorMessage}`, {
          autoClose: 5000
        });
      }
    }
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post('/products', {
        name,
        price: Number(price),
        stock: Number(stock),
        image_url: image,
        sizes: "P,M,G",
        category: "Geral"
      });
      setName(''); setPrice(''); setStock(''); setImage('');
      loadAdminData();
      toast.success('Produto cadastrado com sucesso!');
    } catch (err) {
      toast.error('Erro ao cadastrar produto.');
    }
  }

  return (
    <S.Container>
      <S.Header>
        <FiActivity size={24} color="#ffcc00" />
        <h2>Painel de Gestão</h2>
      </S.Header>

      <S.StatsGrid>
        <S.StatCard>
          <div className="icon-box" style={{ background: '#252101', color: '#ffcc00' }}><FiDollarSign /></div>
          <div><span>Faturamento</span><h3>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.totalRevenue || 0)}</h3></div>
        </S.StatCard>
        <S.StatCard>
          <div className="icon-box" style={{ background: '#1a1a00', color: '#d4af37' }}><FiUsers /></div>
          <div><span>Clientes</span><h3>{stats.totalUsers || 0}</h3></div>
        </S.StatCard>
        <S.StatCard>
          <div className="icon-box" style={{ background: '#0a1a1a', color: '#00ccff' }}><FiShoppingBag /></div>
          <div><span>Pedidos</span><h3>{stats.totalOrders || 0}</h3></div>
        </S.StatCard>
      </S.StatsGrid>

      <S.Grid>
        <S.Card>
          <h3><FiPlus /> Novo Produto</h3>
          <S.Form onSubmit={handleAddProduct}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: '#ccc', fontSize: '0.9rem' }}>Nome do Produto</label>
              <input value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: '#ccc', fontSize: '0.9rem' }}>Preço (R$)</label>
                <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: '#ccc', fontSize: '0.9rem' }}>Qtd em Estoque</label>
                <input type="number" value={stock} onChange={e => setStock(e.target.value)} required />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: '#ccc', fontSize: '0.9rem' }}>URL da Imagem</label>
              <input value={image} onChange={e => setImage(e.target.value)} required />
            </div>

            <button type="submit" style={{ marginTop: '10px' }}>Cadastrar no Estoque</button>
          </S.Form>
        </S.Card>

        <S.Card>
          <h3><FiPackage /> Itens em Estoque</h3>
          <S.ProductList>
            {products.map(product => (
              <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#141414', borderRadius: '10px', marginBottom: '12px', border: '1px solid #222' }}>
                <img src={product.image_url} alt="" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid #333', outline: 'none' }}
                    defaultValue={product.name}
                    onKeyDown={(e) => handleKeyDown(e, product.id, 'name')}
                  />

                  {/* EDIÇÃO DE IMAGEM VIA LINK */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FiLink size={12} color="#666" />
                    <input
                      style={{ background: '#000', border: '1px solid #222', color: '#888', fontSize: '0.7rem', width: '100%', padding: '3px 8px', borderRadius: '4px', outline: 'none' }}
                      defaultValue={product.image_url}
                      onKeyDown={(e) => handleKeyDown(e, product.id, 'image_url')}
                    />
                  </div>

                  {/* EDIÇÃO DE PREÇO E QTD VIA ENTER */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: '#000', padding: '2px 8px', borderRadius: '4px', border: '1px solid #333' }}>
                      <span style={{ fontSize: '0.7rem', color: '#ffcc00', marginRight: '4px' }}>R$</span>
                      <input
                        type="number" step="0.01"
                        style={{ background: 'transparent', border: 'none', color: '#ffcc00', width: '60px', fontSize: '0.8rem', outline: 'none' }}
                        defaultValue={product.price}
                        onKeyDown={(e) => handleKeyDown(e, product.id, 'price')}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', background: '#000', padding: '2px 8px', borderRadius: '4px', border: '1px solid #333' }}>
                      <span style={{ fontSize: '0.7rem', color: '#00ff88', marginRight: '4px' }}>QTD</span>
                      <input
                        type="number"
                        style={{ background: 'transparent', border: 'none', color: '#00ff88', width: '40px', fontSize: '0.8rem', outline: 'none' }}
                        defaultValue={product.stock}
                        onKeyDown={(e) => handleKeyDown(e, product.id, 'stock')}
                      />
                    </div>
                  </div>
                </div>

                <button onClick={() => handleDeleteProduct(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}>
                  <FiTrash2 size={18} color="#ff4444" />
                </button>
              </div>
            ))}
          </S.ProductList>
        </S.Card>
      </S.Grid>
      <ToastContainer position="top-center" theme="dark" />
    </S.Container>
  );
}