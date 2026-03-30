import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
  size: string;
  cartId: number;
}

interface CartContextData {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number, size: string) => Promise<void>;
  updateCartQuantity: (productId: number, size: string, type: 'increase' | 'decrease') => Promise<void>;
  updateCartSize: (productId: number, oldSize: string, newSize: string) => Promise<void>;
  cartTotal: number;
  clearCart: () => void;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // [LOGICA CRUCIAL] Soma todas as quantidades de um produto (independente do tamanho) no carrinho
  const getProductTotalInCart = (productId: number) => {
    return cart
      .filter(item => item.id === productId)
      .reduce((acc, item) => acc + item.quantity, 0);
  };

  async function loadCart() {
    try {
      const token = localStorage.getItem('@CodeWear:token');
      if (!token) {
        setCart([]);
        return;
      }
      const response = await api.get('/cart');
      const formatted = response.data.map((item: any) => ({
        id: item.Product.id,
        cartId: item.id,
        name: item.Product.name,
        price: item.Product.price,
        image_url: item.Product.image_url,
        stock: item.Product.stock,
        quantity: item.quantity,
        size: item.size
      }));

      const sortedCart = formatted.sort((a: CartItem, b: CartItem) => a.cartId - b.cartId);
      setCart(sortedCart);
    } catch (error) {
      console.error("Erro ao carregar carrinho");
    }
  }

  useEffect(() => { loadCart(); }, []);

  function clearCart() { setCart([]); }

  async function addToCart(product: Product, size: string, quantity: number = 1) {
    if (isProcessing) return;
    
    // VERIFICAÇÃO GLOBAL: Soma o que já tem no carrinho + o que quer adicionar
    const currentTotalInCart = getProductTotalInCart(product.id);
    
    if (currentTotalInCart + quantity > product.stock) {
      toast.error(`Limite atingido! Você já tem ${currentTotalInCart} un. no carrinho e o estoque total é ${product.stock}.`, {
        theme: 'dark'
      });
      return;
    }

    setIsProcessing(true);
    try {
      await api.post('/cart', { productId: product.id, quantity, size });
      await loadCart();
      toast.success(`${quantity}x ${product.name} adicionado!`);
    } catch {
      toast.error("Erro ao adicionar");
    } finally {
      setIsProcessing(false);
    }
  }

  async function updateCartQuantity(productId: number, size: string, type: 'increase' | 'decrease') {
    const item = cart.find(i => i.id === productId && i.size === size);
    if (!item) return;

    if (type === 'increase') {
      // VERIFICAÇÃO GLOBAL NO AUMENTO:
      const currentTotalInCart = getProductTotalInCart(productId);
      if (currentTotalInCart >= item.stock) {
        toast.warn(`Estoque total do modelo atingido (${item.stock} un)!`);
        return;
      }
    }

    try {
      const diff = type === 'increase' ? 1 : -1;
      if (type === 'decrease' && item.quantity <= 1) return;

      await api.post('/cart', { productId, quantity: diff, size });
      await loadCart();
    } catch {
      toast.error("Erro ao atualizar quantidade");
    }
  }

  async function updateCartSize(productId: number, oldSize: string, newSize: string) {
    // Verifica se já existe o novo tamanho no carrinho para evitar duplicar linhas do mesmo tamanho
    const alreadyHasSize = cart.find(i => i.id === productId && i.size === newSize);
    if (alreadyHasSize) {
      toast.info("Você já tem este tamanho no carrinho. Ajuste a quantidade por lá.");
      return;
    }

    try {
      const item = cart.find(i => i.id === productId && i.size === oldSize);
      if (!item) return;
      await api.delete(`/cart/${item.cartId}`);
      await api.post('/cart', { productId, quantity: item.quantity, size: newSize });
      await loadCart();
    } catch {
      toast.error("Erro ao mudar tamanho");
    }
  }

  async function removeFromCart(productId: number, size: string) {
    try {
      const item = cart.find(i => i.id === productId && i.size === size);
      if (item) {
        await api.delete(`/cart/${item.cartId}`);
        await loadCart();
      }
    } catch {
      toast.error("Erro ao remover");
    }
  }

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, updateCartSize, cartTotal, clearCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);