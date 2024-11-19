import axios from 'axios';
import { useAuthStore } from '../stores/auth/authStore';

const niuxApi = axios.create({
  baseURL: 'https://localhost:7044/api',
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