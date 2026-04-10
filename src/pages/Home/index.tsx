import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useCart } from '../../hooks/useCart';
import { ProductCard } from '../../components/ProductCard';
import type { Product } from '../../components/ProductCard';
import * as S from './styles';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [qtySelected, setQtySelected] = useState<Record<number, number>>({});

  const { addToCart, cart } = useCart();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      const data = response.data.products || response.data;
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setProducts([]);
    } finally {
      setLoading(false);
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

  const handleQtyChange = (productId: number, type: 'plus' | 'minus') => {
    const currentQty = qtySelected[productId] || 1;
    const alreadyInCart = getQtyInCart(productId);
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (type === 'plus') {
      if (currentQty + alreadyInCart >= product.stock) {
        toast.error(`Limite atingido! Você já tem ${alreadyInCart} un. no carrinho e o estoque é ${product.stock}.`, { theme: 'dark' });
        return;
      }
      setQtySelected(prev => ({ ...prev, [productId]: currentQty + 1 }));
    } else if (type === 'minus' && currentQty > 1) {
      setQtySelected(prev => ({ ...prev, [productId]: currentQty - 1 }));
    }
  };

  const handleBuy = (product: Product) => {
    const qtyToAdd = qtySelected[product.id] || 1;
    const alreadyInCart = getQtyInCart(product.id);

    if (alreadyInCart + qtyToAdd > product.stock) {
      toast.error(`Impossível adicionar! Estoque: ${product.stock}. Você já possui ${alreadyInCart} un. no carrinho.`, { theme: 'dark' });
      return;
    }

    addToCart(product, qtyToAdd);
    setQtySelected(prev => ({ ...prev, [product.id]: 1 }));
  };

  return (
    <>
      <S.ImageModalOverlay $active={!!selectedImage} onClick={() => setSelectedImage(null)}>
        {selectedImage && <img src={selectedImage} alt="Zoom" />}
      </S.ImageModalOverlay>

      <S.Container>
        {loading ? (
          <S.EmptyState>Carregando produtos...</S.EmptyState>
        ) : products.length === 0 ? (
          <S.EmptyState>Nenhum produto encontrado.</S.EmptyState>
        ) : (
          <S.ProductGrid>
            {products.map(product => {
              const qty = qtySelected[product.id] || 1;
              const alreadyInCart = getQtyInCart(product.id);

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  qty={qty}
                  alreadyInCart={alreadyInCart}
                  onQtyChange={(type: 'plus' | 'minus') => handleQtyChange(product.id, type)}
                  onAddToCart={() => handleBuy(product)}
                  onImageClick={() => setSelectedImage(product.image_url)}
                />
              );
            })}
          </S.ProductGrid>
        )}
      </S.Container>
    </>
  );
}
