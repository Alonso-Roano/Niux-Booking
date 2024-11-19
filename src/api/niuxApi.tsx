import axios from 'axios';
import { useAuthStore } from '../stores/auth/authStore';

const niuxApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API+'api',
});

niuxApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  config.headers['Content-Type'] = 'application/json';
  return config;
});

export { niuxApi };