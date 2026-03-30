import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Orders } from './pages/Orders';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';
import { AdminVendas } from './pages/Admin/Vendas'; // Certifique-se de criar o arquivo
import { AdminClientes } from './pages/Admin/Clientes/index'; // Certifique-se de criar o arquivo
import { AdminAuditoria } from './pages/Admin/Auditoria/index'; // Certifique-se de criar o arquivo
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp/index';
import { CartProvider } from './hooks/useCart';
import type { ReactNode } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function PrivateRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('@CodeWear:token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <GlobalStyle />
        <ToastContainer
          position="top-right"
          autoClose={8000}
          theme="dark"
        />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />

                <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

                {/* GRUPO DE ROTAS ADMINISTRATIVAS SEPARADAS */}
                <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
                <Route path="/admin/vendas" element={<AdminRoute><AdminVendas /></AdminRoute>} />
                <Route path="/admin/clientes" element={<AdminRoute><AdminClientes /></AdminRoute>} />
                <Route path="/admin/auditoria" element={<AdminRoute><AdminAuditoria /></AdminRoute>} />

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