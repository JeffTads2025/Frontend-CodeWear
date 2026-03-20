import { createContext, useContext, useState, type ReactNode } from 'react';

interface Product {
  id: number; // Alterado para number
  name: string;
  price: number;
  image_url: string;
}

interface CartItem extends Product {
  quantity: number;
  size: string;
}

interface CartContextData {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: number, size: string) => void; // number
  updateCartQuantity: (productId: number, size: string, type: 'increase' | 'decrease') => void; // number
  updateCartSize: (productId: number, oldSize: string, newSize: string) => void; // number
  cartTotal: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Product, size: string) {
    setCart(state => {
      const itemIndex = state.findIndex(item => item.id === product.id && item.size === size);

      if (itemIndex >= 0) {
        const newState = [...state];
        newState[itemIndex].quantity += 1;
        return newState;
      }

      return [...state, { ...product, quantity: 1, size }];
    });
  }

  function updateCartQuantity(productId: number, size: string, type: 'increase' | 'decrease') {
    setCart(state => state.map(item => {
      if (item.id === productId && item.size === size) {
        const newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    }));
  }

  function updateCartSize(productId: number, oldSize: string, newSize: string) {
    if (oldSize === newSize) return;

    setCart(state => {
      const itemToChange = state.find(item => item.id === productId && item.size === oldSize);
      if (!itemToChange) return state;

      const targetItemIndex = state.findIndex(item => item.id === productId && item.size === newSize);

      if (targetItemIndex >= 0) {
        const newState = state.filter(item => !(item.id === productId && item.size === oldSize));
        // Criamos uma cópia do item de destino para não mutar o estado diretamente
        const updatedTarget = { ...newState[targetItemIndex] };
        updatedTarget.quantity += itemToChange.quantity;
        newState[targetItemIndex] = updatedTarget;
        return newState;
      }

      return state.map(item => 
        (item.id === productId && item.size === oldSize) 
        ? { ...item, size: newSize } 
        : item
      );
    });
  }

  function removeFromCart(productId: number, size: string) {
    setCart(state => state.filter(item => !(item.id === productId && item.size === size)));
  }

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, updateCartSize, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);