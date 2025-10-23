import { logout } from '@/api/auth/auth.api';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const mainAxios = axios.create({
	withCredentials: true,
});

mainAxios.interceptors.response.use(
	(response): AxiosResponse<unknown, unknown> => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		console.log('Error status:', error.status);
		if (error.status === 401 && !originalRequest._retry) {
			window.location.href = '/login';
		}
		if (error.response) {
			const status = error.response.status;
			const message =
				error.response.data?.message ||
				`Request failed with status ${status}`;
			toast.error(message);
		} else {
			toast.error('Network Error: Please check your connection');
		}

		return Promise.reject(error);
	},
);
