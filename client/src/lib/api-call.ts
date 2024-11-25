import axios from 'axios';

import storage from '@/utils/storage.ts';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.message.toLowerCase().includes('expired')
    ) {
      originalRequest._retry = true;
      const { data } = await api.get('/auth/refresh-token');
      storage.setToken(data.accessToken);
      const token = storage.getToken();
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
