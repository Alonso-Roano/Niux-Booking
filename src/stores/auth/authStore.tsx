// src/store/authStore.ts

import { AuthStatus } from '../../interfaces/auth-status.interface';
import { AuthService } from '../../services/authServices';
import { User } from '../../interfaces/user.interface';
import { create } from 'zustand';

interface AuthState {
    status: AuthStatus;
    data?: string;
    user?: User;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    status: 'unauthorized',
    data: undefined,
    user: undefined,

    loginUser: async (email: string, password: string) => {
        set({ status: 'pending' });
        try {
            const loginResponse = await AuthService.login(email, password);
            set({
                status: 'authorized',
                data: loginResponse.data,
                user: loginResponse
            });
           
            // Guardar el token en localStorage
            localStorage.setItem('authToken', loginResponse.data);
        } catch (error) {
            set({ status: 'unauthorized', data: undefined, user: undefined });
            console.error(error);
        }
    },

    logoutUser: () => {
        set({ status: 'unauthorized', data: undefined, user: undefined });
        localStorage.removeItem('authToken'); // Eliminar el token del localStorage
    }
}));
