import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit, FiPackage, FiImage, FiTag, FiDollarSign } from 'react-icons/fi';
import api from '../../services/api';
import * as S from './styles';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
  sizes: string;
}

export function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para o formulário de novo produto
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Unissex');
  const [stock, setStock] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [sizes, setSizes] = useState('P,M,G,GG');

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products);
    } catch (err) {
      console.error("Erro ao carregar produtos", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    try {
      const newProduct = {
        name,
        price: Number(price),
        category,
        stock: Number(stock),
        image_url,
        sizes
      };

      await api.post('/products', newProduct);
      alert('Produto cadastrado!');
      
      // Limpa campos
      setName(''); setPrice(''); setStock(''); setImageUrl('');
      
      loadProducts(); // Recarrega a lista
    } catch (err) {
      alert('Erro ao cadastrar produto');
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Tem certeza que deseja excluir?')) return;
    
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Erro ao deletar');
    }
  }

  return (
    <S.Container>
      <S.Header>
        <FiPackage size={24} />
        <h2>Painel Administrativo</h2>
      </S.Header>

      <S.Grid>
        {/* Formulário de Cadastro */}
        <S.Card>
          <h3><FiPlus /> Novo Produto</h3>
          <S.Form onSubmit={handleAddProduct}>
            <div className="input-group">
              <label>Nome do Produto</label>
              <input value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div className="row">
              <div className="input-group">
                <label>Preço (R$)</label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Estoque</label>
                <input type="number" value={stock} onChange={e => setStock(e.target.value)} required />
              </div>
            </div>

            <div className="input-group">
              <label>Grade de Tamanhos</label>
              <input value={sizes} onChange={e => setSizes(e.target.value)} placeholder="Ex: P,M,G" />
            </div>

            <div className="input-group">
              <label>URL da Imagem</label>
              <input value={image_url} onChange={e => setImageUrl(e.target.value)} placeholder="http://..." />
            </div>

            <button type="submit">Cadastrar Produto</button>
          </S.Form>
        </S.Card>

        {/* Listagem de Produtos */}
        <S.Card>
          <h3>Estoque Atual</h3>
          <S.ProductList>
            {loading ? <p>Carregando...</p> : products.map(product => (
              <div className="product-item" key={product.id}>
                <img src={product.image_url} alt={product.name} />
                <div className="info">
                  <strong>{product.name}</strong>
                  <span>R$ {product.price} - Estoque: {product.stock}</span>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </S.ProductList>
        </S.Card>
      </S.Grid>
    </S.Container>
  );
}