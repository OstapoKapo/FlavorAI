import { useMutation } from '@tanstack/react-query';
import { login, logout, register } from './auth.api';
import { IAuthResponse, IRegisterResponse } from './auth.types';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export const useRegisterMutation = () => {
    const router = useRouter();
	return useMutation({
		mutationFn: register,
		onSuccess: (data: IRegisterResponse) => {
			toast.success(data.message);
            router.push('/login');
		},
	});
};

export const useLoginMutation = () => {
    const router = useRouter();
	return useMutation({
		mutationFn: login,
		onSuccess: (data: IAuthResponse) => {
			toast.success(data.message);
            router.push('/');
		},
	});
};

export const useLogoutMutation = () => {
    const router = useRouter();
	return useMutation({
		mutationFn: logout,
		onSuccess: (data: IAuthResponse) => {
			toast.success(data.message);
            router.push('/login');
		},
	});
};