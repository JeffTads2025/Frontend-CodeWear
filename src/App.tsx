import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
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
import { ApiDemo } from './pages/ApiDemo';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
                  <Route path="/api-demo" element={<ProtectedRoute isAdminOnly><ApiDemo /></ProtectedRoute>} />

                  <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                  {/* GRUPO DE ROTAS ADMINISTRATIVAS SEPARADAS */}
                  <Route path="/admin" element={<ProtectedRoute isAdminOnly><Admin /></ProtectedRoute>} />
                  <Route path="/admin/vendas" element={<ProtectedRoute isAdminOnly><AdminVendas /></ProtectedRoute>} />
                  <Route path="/admin/clientes" element={<ProtectedRoute isAdminOnly><AdminClientes /></ProtectedRoute>} />
                  <Route path="/admin/auditoria" element={<ProtectedRoute isAdminOnly><AdminAuditoria /></ProtectedRoute>} />

                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;