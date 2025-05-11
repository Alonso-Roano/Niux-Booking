import axios from 'axios';
import { useAuthStore } from '@auth/stores/authStore';

const niuxApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API + 'api',
});

// Interceptor para incluir el token y manejar diferentes Content-Type
niuxApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // Solo agrega 'Content-Type' si no es multipart/form-data
  if (
    config.data &&
    !(config.data instanceof FormData) // Verifica si los datos son FormData
  ) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

export { niuxApi };
