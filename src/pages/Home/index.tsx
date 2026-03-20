import { useEffect, useState } from 'react';
import { FiShoppingCart, FiLayers } from 'react-icons/fi';
import api from '../../services/api';
import { useCart } from '../../hooks/useCart'; 
import * as S from './styles'; 

interface Product {
  id: number; // Alterado para number para bater com o Sequelize do Back
  name: string;
  price: number;
  description: string;
  image_url: string;
  sizes?: string;
}

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sizeSelected, setSizeSelected] = useState<Record<number, string>>({}); // ID agora é number

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get('/products');
        
        // AJUSTE CRUCIAL: O seu controller retorna { products: [...] }
        // Se houver dados no banco, ele pega de lá. 
        // Se o array vier vazio ou der erro, cai no catch/fallback.
        if (response.data && response.data.products) {
            setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
        
        // Fallback para teste (mantendo IDs como números)
        setProducts([
          { 
            id: 1, 
            name: 'Camiseta Code Master', 
            price: 89.90, 
            description: 'Premium Cotton 100%', 
            image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500' 
          },
          { 
            id: 2, 
            name: 'Camiseta DevOps Pro', 
            price: 79.90, 
            description: 'Grey Edition', 
            image_url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500' 
          }
        ]);
      }
    }
    loadProducts();
  }, []);

  const handleSelectSize = (productId: number, size: string) => {
    setSizeSelected(prev => ({ ...prev, [productId]: size }));
  };

  const handleBuy = (product: Product) => {
    const size = sizeSelected[product.id] || 'P';
    
    // Adiciona ao carrinho usando o Contexto
    addToCart(product, size);
    
    alert(`🛒 ${product.name} (Tam: ${size}) adicionado ao carrinho!`);
  };

  return (
    <>
      <S.ImageModalOverlay active={!!selectedImage} onClick={() => setSelectedImage(null)}>
        {selectedImage && <img src={selectedImage} alt="Zoom" />}
      </S.ImageModalOverlay>

      <S.Container>
        <S.Header>
          <div className="icon-bg"><FiLayers /></div>
          <div>
            <h2>Catálogo de Produtos</h2>
            <p>{products.length} itens disponíveis</p>
          </div>
        </S.Header>

        <S.ProductGrid>
          {products.map(product => (
            <S.ProductCard key={product.id}>
              <img 
                src={product.image_url} 
                alt={product.name} 
                onClick={() => setSelectedImage(product.image_url)}
              />
              <div className="content">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                
                <div style={{ display: 'flex', gap: '6px' }}>
                   {['P', 'M', 'G'].map(s => (
                     <S.SizeBadge 
                        key={s}
                        active={sizeSelected[product.id] === s || (!sizeSelected[product.id] && s === 'P')} 
                        onClick={() => handleSelectSize(product.id, s)}
                     >{s}</S.SizeBadge>
                   ))}
                </div>

                <div className="price">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </div>
                
                <S.AddButton onClick={() => handleBuy(product)}>
                  <FiShoppingCart size={16} /> Comprar
                </S.AddButton>
              </div>
            </S.ProductCard>
          ))}
        </S.ProductGrid>
      </S.Container>
    </>
  );
}