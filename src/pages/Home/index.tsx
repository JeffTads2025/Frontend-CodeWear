import { useEffect, useState, useCallback } from 'react';
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useCart } from '../../hooks/useCart';
import * as S from './styles';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  stock: number;
}

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sizeSelected, setSizeSelected] = useState<Record<number, string>>({});
  const [qtySelected, setQtySelected] = useState<Record<number, number>>({});

  const { addToCart, cart } = useCart();

  const loadProducts = useCallback(async () => {
    try {
      const response = await api.get('/products');
      const data = response.data.products || response.data;
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    window.addEventListener('focus', loadProducts);
    return () => window.removeEventListener('focus', loadProducts);
  }, [loadProducts]);

  const getQtyInCart = (productId: number) => {
    return cart
      .filter(item => item.id === productId)
      .reduce((acc, item) => acc + item.quantity, 0);
  };

  const handleSelectSize = (productId: number, size: string) => {
    setSizeSelected(prev => ({ ...prev, [productId]: size }));
  };

  const handleQtyChange = (productId: number, type: 'plus' | 'minus', stock: number) => {
    const currentQty = qtySelected[productId] || 1;
    const alreadyInCart = getQtyInCart(productId);

    if (type === 'plus') {
      if (currentQty + alreadyInCart >= stock) {
        toast.warn(`Limite de estoque atingido! Você já tem ${alreadyInCart} un. no carrinho.`, { theme: 'dark' });
        return;
      }
      setQtySelected(prev => ({ ...prev, [productId]: currentQty + 1 }));
    } else if (type === 'minus' && currentQty > 1) {
      setQtySelected(prev => ({ ...prev, [productId]: currentQty - 1 }));
    }
  };

  const handleBuy = (product: Product) => {
    const size = sizeSelected[product.id] || 'P';
    const qtyToAdd = qtySelected[product.id] || 1;
    const alreadyInCart = getQtyInCart(product.id);

    if (alreadyInCart + qtyToAdd > product.stock) {
      toast.error(`Impossível adicionar! Estoque total: ${product.stock}. Você já possui ${alreadyInCart} un. no carrinho.`, { theme: 'dark' });
      return;
    }

    addToCart(product, size, qtyToAdd);
    setQtySelected(prev => ({ ...prev, [product.id]: 1 }));
  };

  return (
    <>
      <S.ImageModalOverlay $active={!!selectedImage} onClick={() => setSelectedImage(null)}>
        {selectedImage && <img src={selectedImage} alt="Zoom" />}
      </S.ImageModalOverlay>
      
      <S.Container>
        <S.ProductGrid>
          {products.map(product => {
            const qty = qtySelected[product.id] || 1;
            const alreadyInCart = getQtyInCart(product.id);
            const isOutOfStock = product.stock <= 0 || alreadyInCart >= product.stock;

            return (
              <S.ProductCard key={product.id}>
                <div className="image-container">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    onClick={() => setSelectedImage(product.image_url)} 
                    style={{ cursor: 'zoom-in' }}
                  />
                </div>
                
                <div className="content">
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>
                  
                  {/* Disponibilidade: Usando a classe CSS '.availability' para melhor organização */}
                  <p className="availability" style={{ 
                    color: isOutOfStock ? '#ef4444' : '#ffffff', 
                  }}>
                    {isOutOfStock 
                      ? (product.stock <= 0 ? '❌ Esgotado' : '⚠️ No limite') 
                      : `✅ Disp: ${product.stock} un (No cart: ${alreadyInCart})`}
                  </p>

                  <div className="size-selector">
                    {['P', 'M', 'G'].map(s => (
                      <S.SizeBadge 
                        key={s} 
                        $active={sizeSelected[product.id] === s || (!sizeSelected[product.id] && s === 'P')} 
                        onClick={() => handleSelectSize(product.id, s)} 
                        disabled={isOutOfStock}
                      >
                        {s}
                      </S.SizeBadge>
                    ))}
                  </div>

                  <div className="footer-card">
                    <div className="qty-controls" style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        background: '#0d0d0d', 
                        padding: '4px 8px', 
                        borderRadius: '6px',
                        border: '1px solid #333'
                      }}>
                      <button 
                        onClick={() => handleQtyChange(product.id, 'minus', product.stock)} 
                        disabled={isOutOfStock || qty <= 1} 
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', outline: 'none' }}
                      >
                        <FiMinus size={14}/>
                      </button>
                      
                      <span style={{ color: '#ffcc00', fontWeight: 'bold', minWidth: '15px', textAlign: 'center', fontSize: '14px' }}>
                        {isOutOfStock && alreadyInCart >= product.stock ? 0 : qty}
                      </span>
                      
                      <button 
                        onClick={() => handleQtyChange(product.id, 'plus', product.stock)} 
                        disabled={isOutOfStock || qty + alreadyInCart >= product.stock} 
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', outline: 'none' }}
                      >
                        <FiPlus size={14}/>
                      </button>
                    </div>

                    <S.AddButton 
                      onClick={() => handleBuy(product)} 
                      disabled={isOutOfStock}
                    >
                      <FiShoppingCart size={18} /> 
                      {isOutOfStock ? 'Limite' : 'Comprar'}
                    </S.AddButton>
                  </div>

                  {/* Preço movido para fora do footer-card e alinhado ao rodapé pelo flexbox */}
                  <div className="price" style={{ marginTop: '15px', color: '#fff', fontWeight: '800', fontSize: '1.3rem', borderTop: '1px solid #222', paddingTop: '12px' }}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </div>
                </div>
              </S.ProductCard>
            )
          })}
        </S.ProductGrid>
      </S.Container>
    </>
  );
}