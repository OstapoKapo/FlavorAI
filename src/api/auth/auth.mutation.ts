import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login, logout, register } from './auth.api';
import { IAuthResponse, ILoginPayload, ILoginResponse, IRegisterPayload, IRegisterResponse } from '@/types/auth.types';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export const useRegisterMutation = (): UseMutationResult<IRegisterResponse, unknown, IRegisterPayload> => {
    const router = useRouter();
	return useMutation({
		mutationFn: register,
		onSuccess: (data: IRegisterResponse) => {
			toast.success(data.message);
            router.push('/login');
		},
	});
};

export const useLoginMutation = (): UseMutationResult<ILoginResponse, unknown, ILoginPayload> => {
    const router = useRouter();
	return useMutation({
		mutationFn: login,
		onSuccess: (data: ILoginResponse) => {
			localStorage.setItem('accessToken', data.accessToken);
			toast.success(data.message);
            router.push('/');
		},
	});
};

export const useLogoutMutation = (): UseMutationResult<IAuthResponse, unknown, void> => {
	return useMutation({
		mutationFn: logout,
		onSuccess: (data: IAuthResponse) => {
			toast.success(data.message);
			localStorage.removeItem('accessToken');
            window.location.href = '/login'
		},
	});
};