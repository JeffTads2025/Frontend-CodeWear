import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Orders } from './pages/Orders';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';
import { AdminSales } from './pages/Admin/Sales';
import { AdminCustomers } from './pages/Admin/Customers';
import { AdminAudit } from './pages/Admin/Audit';
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
            newestOnTop
            style={{ zIndex: 20000, top: '84px' }}
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
                  <Route path="/admin/sales" element={<ProtectedRoute isAdminOnly><AdminSales /></ProtectedRoute>} />
                  <Route path="/admin/customers" element={<ProtectedRoute isAdminOnly><AdminCustomers /></ProtectedRoute>} />
                  <Route path="/admin/audit" element={<ProtectedRoute isAdminOnly><AdminAudit /></ProtectedRoute>} />

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