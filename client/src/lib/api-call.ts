import axios from 'axios';

import config from '@/config';

const api = axios.create({
	baseURL: config.apiUrl + '/api',
});

api.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem('accessToken');
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
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const { data } = await api.post('/token', {
				refreshToken: localStorage.getItem('refreshToken'),
			});
			localStorage.setItem('accessToken', data.accessToken);
			originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
			return api(originalRequest);
		}
		return Promise.reject(error);
	},
);

export default api;
