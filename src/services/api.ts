import axios from 'axios';

const api = axios.create({
  // Conforme o seu terminal, o servidor Node está aqui:
  baseURL: 'http://localhost:3000',
});

const savedToken = localStorage.getItem('@CodeWear:token');
if (savedToken && api.defaults.headers) {
  api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
}

api.interceptors.request.use(config => {
  const token = localStorage.getItem('@CodeWear:token');
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================== PRODUCTS CRUD ====================
export const productsApi = {
  // READ - Listar produtos
  async getAll(params?: { page?: number; limit?: number; search?: string }) {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // CREATE - Criar produto (Admin)
  async create(productData: {
    name: string;
    price: number;
    description: string;
    image_url: string;
    stock: number;
  }) {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // UPDATE - Atualizar produto (Admin)
  async update(id: number, productData: Partial<{
    name: string;
    price: number;
    description: string;
    image_url: string;
    stock: number;
  }>) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // DELETE - Deletar produto (Admin)
  async delete(id: number) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};

// ==================== USERS CRUD ====================
export const usersApi = {
  // CREATE - Cadastrar usuário
  async create(userData: {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    address: string;
  }) {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // READ - Buscar perfil do usuário logado
  async getProfile() {
    const response = await api.get('/me');
    return response.data;
  },

  // UPDATE - Atualizar perfil
  async updateProfile(userData: Partial<{
    name: string;
    phone: string;
    address: string;
    cpf: string;
    password: string;
  }>) {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // DELETE - Cancelar a própria conta
  async cancelMyAccount() {
    const response = await api.delete('/users/me');
    return response.data;
  },

  // READ - Listar usuários (Admin)
  async getAll(params?: { page?: number; limit?: number; search?: string }) {
    const response = await api.get('/admin/users', { params });
    return response.data;
  }
};

// ==================== CART CRUD ====================
export const cartApi = {
  // READ - Listar itens do carrinho
  async getAll() {
    const response = await api.get('/cart');
    return response.data;
  },

  // CREATE - Adicionar item ao carrinho
  async addItem(cartData: {
    productId: number;
    quantity: number;
  }) {
    const response = await api.post('/cart', cartData);
    return response.data;
  },

  // UPDATE - Atualizar quantidade (usando add com quantidade negativa)
  async updateQuantity(cartData: {
    productId: number;
    quantity: number; // pode ser positivo ou negativo
  }) {
    const response = await api.post('/cart', cartData);
    return response.data;
  },

  // DELETE - Remover item do carrinho
  async removeItem(cartId: number) {
    const response = await api.delete(`/cart/${cartId}`);
    return response.data;
  },

  // DELETE - Limpar carrinho completo
  async clear() {
    const cartItems = await this.getAll();
    const deletePromises = cartItems.map((item: any) =>
      api.delete(`/cart/${item.id}`)
    );
    await Promise.all(deletePromises);
    return { message: 'Carrinho limpo com sucesso' };
  }
};

// ==================== ORDERS CRUD ====================
export const ordersApi = {
  // READ - Listar pedidos do usuário
  async getMyOrders() {
    const response = await api.get('/orders');
    return response.data;
  },

  // CREATE - Finalizar pedido (checkout)
  async create(orderData: {
    paymentMethod: string;
    address: string;
  }) {
    const response = await api.post('/checkout', orderData);
    return response.data;
  },

  // READ - Listar todos os pedidos (Admin)
  async getAll(params?: { page?: number; limit?: number }) {
    const response = await api.get('/admin/all-orders', { params });
    return response.data;
  }
};

// ==================== AUDIT LOGS CRUD ====================
export const auditApi = {
  // READ - Listar logs de auditoria (Admin)
  async getLogs(params?: { page?: number; limit?: number; search?: string }) {
    const response = await api.get('/admin/logs', { params });
    return response.data;
  }
};

// ==================== AUTH CRUD ====================
export const authApi = {
  // CREATE - Login
  async login(credentials: { email: string; password: string }) {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  // DELETE - Logout (remover token localmente)
  logout() {
    localStorage.removeItem('@CodeWear:token');
    delete api.defaults.headers.common['Authorization'];
    return { message: 'Logout realizado com sucesso' };
  }
};

export default api;