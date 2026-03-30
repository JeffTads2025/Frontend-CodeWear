import axios from 'axios';

const api = axios.create({
  // Conforme o seu terminal, o servidor Node está aqui:
  baseURL: 'http://localhost:3000', 
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('@CodeWear:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;