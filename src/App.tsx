import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Orders } from './pages/Orders';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp/index'; // Forçamos o /index aqui
import { CartProvider } from './hooks/useCart';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

function AdminRoute({ children }: ProtectedRouteProps) {
  const savedUser = localStorage.getItem('@CodeWear:user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider> 
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/cart" element={<Cart />} /> 
                <Route path="/profile" element={<Profile />} /> 
                <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} /> 
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;