import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// API helper functions
export const api = {
  get: <T = any>(url: string, config?: any) => apiClient.get<T>(url, config).then((res) => res.data),
  post: <T = any>(url: string, data?: any, config?: any) => apiClient.post<T>(url, data, config).then((res) => res.data),
  put: <T = any>(url: string, data?: any, config?: any) => apiClient.put<T>(url, data, config).then((res) => res.data),
  delete: <T = any>(url: string, config?: any) => apiClient.delete<T>(url, config).then((res) => res.data),
  patch: <T = any>(url: string, data?: any, config?: any) => apiClient.patch<T>(url, data, config).then((res) => res.data),
};
