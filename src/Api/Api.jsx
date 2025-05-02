import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

api.interceptors.request.use(request => {
  console.log('[API ▶️]', request.method.toUpperCase(), request.url, request.data);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('[API ✅]', response.status, response.config.url, response.data);
    return response;
  },
  error => {
    console.error('[API ❌]', error.response?.status, error.config?.url, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
