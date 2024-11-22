import { AuthStatus } from '../../interfaces/authStatus.interface';
import { AuthService } from '../../services/authServices';
import { User } from '../../Helpers/ResponseHelper.interface';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { niuxApi } from '../../api/niuxApi';


interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
    updateUser: (updatedUser: Partial<User>) => void;
    updateProfilePhoto: (file: File) => Promise<void>;
    refreshUserData: () => Promise<void>;
    registerClient: (
        email: string,
        nombres: string,
        apellido1: string,
        apellido2: string,
        password: string,
        confirmPassword: string
    ) => Promise<void>;
    registerPartner: (
        email: string,
        nombres: string,
        apellido1: string,
        apellido2: string,
        password: string,
        confirmPassword: string,
        nombreEmpresa: string
    ) => Promise<void>;
}

// Store con persistencia y devtools
export const useAuthStore = create(
    persist(
        devtools<AuthState>((set, get) => ({
            status: 'unauthorized',
            token: undefined,
            user: undefined,

            // Método para iniciar sesión
            loginUser: async (email: string, password: string) => {
                set({ status: 'pending' });
                try {
                    const loginResponse = await AuthService.login(email, password);

                    if (loginResponse.token && loginResponse.user) {
                        let avatarURL = loginResponse.user.avatarURL;
                        if (!avatarURL || avatarURL.includes('null')) {
                            avatarURL = '/images/Avatar.webp';
                        } else {
                            avatarURL = `${import.meta.env.VITE_BACKEND_API}${avatarURL}`;
                        }

                        if (loginResponse.user.rol === "Socio") {
                            const apiUrl = `Empresa/Usuario/${loginResponse.user.id}`;
                            const responseCompany = await niuxApi.get(apiUrl);
                            const dataCompany = responseCompany.data[0];
                            set({
                                status: 'authorized',
                                token: loginResponse.token,
                                user: { ...loginResponse.user, avatarURL, ["idEmpresa"]: dataCompany.id },
                            });
                        } else {
                            set({
                                status: 'authorized',
                                token: loginResponse.token,
                                user: { ...loginResponse.user, avatarURL },
                            });
                        }
                    } else {
                        throw new Error(loginResponse.message || 'Credenciales incorrectas');
                    }
                } catch (error) {
                    set({ status: 'unauthorized', token: undefined, user: undefined });
                    if (error instanceof Error) {
                        console.error(error.message || 'Hubo un error en el inicio de sesión');
                        throw error;
                    } else {
                        console.error('Hubo un error desconocido en el inicio de sesión');
                        throw new Error('Hubo un error desconocido en el inicio de sesión');
                    }
                }
            },

            // Método para cerrar sesión
            logoutUser: () => {
                set({ status: 'unauthorized', token: undefined, user: undefined });
            },

            // Método para actualizar partes del usuario
            updateUser: (updatedUser: Partial<User>) => {
                const currentState = get();
                if (currentState.user) {
                    const updatedState = { ...currentState.user, ...updatedUser };
                    set({
                        user: updatedState,
                    });
                }
            },

            // Método para actualizar la foto de perfil
            updateProfilePhoto: async (file: File) => {
                const currentState = get();
                if (!currentState.user?.id) {
                    throw new Error("Usuario no autenticado.");
                }

                const formData = new FormData();
                formData.append("IdApplicationUser", currentState.user.id);
                formData.append("Archivo", file);

                try {
                    const response = await niuxApi.post("/Persona/SubirFotoPerfil", formData);

                    if (response.data.success) {
                        // Llama al método para refrescar los datos del usuario autenticado
                        await get().refreshUserData();
                        console.log("Foto de perfil actualizada con éxito.");
                    } else {
                        throw new Error(response.data.message || "Error al subir la foto de perfil.");
                    }
                } catch (error) {
                    console.error("Error al subir la foto de perfil:", error);
                    throw error;
                }
            },

            // Método para actualizar los datos completos del usuario autenticado
            refreshUserData: async () => {
                const currentState = get();
                if (!currentState.token || !currentState.user?.id) {
                    console.error("No hay usuario autenticado o token válido.");
                    return;
                }

                try {
                    const response = await niuxApi.get(`/Persona/ObtenerDatosPerfil/${currentState.user.id}`);
                    if (response.data.success) {
                        const updatedUser = response.data.data;
                        // Actualizar el avatarURL si es necesario
                        const avatarURL = updatedUser.avatarURL
                            ? `${import.meta.env.VITE_BACKEND_API}${updatedUser.avatarURL}`
                            : '/images/Avatar.webp';

                        set({
                            user: { ...currentState.user, ...updatedUser, avatarURL },
                        });

                        console.log("Datos del usuario actualizados correctamente.");
                    } else {
                        console.error("Error al obtener los datos del usuario:", response.data.message);
                    }
                } catch (error) {
                    console.error("Error al obtener los datos del usuario:", error);
                }
            },

            // Método para registrar un cliente
            registerClient: async (
                email: string,
                nombres: string,
                apellido1: string,
                apellido2: string,
                password: string,
                confirmPassword: string
            ) => {
                set({ status: 'pending' });
                try {
                    const registerResponse = await AuthService.registerClient(
                        email,
                        nombres,
                        apellido1,
                        apellido2,
                        password,
                        confirmPassword
                    );
                    set({
                        status: 'authorized',
                        token: registerResponse.token,
                        user: registerResponse.user,
                    });
                } catch (error) {
                    set({ status: 'unauthorized', token: undefined, user: undefined });
                    if (error instanceof Error) {
                        console.error(error.message || 'Hubo un error en el registro del cliente');
                    } else {
                        console.error('Hubo un error desconocido en el registro del cliente');
                    }
                }
            },

            // Método para registrar un socio
            registerPartner: async (
                email: string,
                nombres: string,
                apellido1: string,
                apellido2: string,
                password: string,
                confirmPassword: string,
                nombreEmpresa: string
            ) => {
                set({ status: 'pending' });
                try {
                    const registerResponse = await AuthService.registerPartner(
                        email,
                        nombres,
                        apellido1,
                        apellido2,
                        password,
                        confirmPassword,
                        nombreEmpresa
                    );
                    set({
                        status: 'authorized',
                        token: registerResponse.token,
                        user: registerResponse.user,
                    });
                } catch (error) {
                    set({ status: 'unauthorized', token: undefined, user: undefined });
                    if (error instanceof Error) {
                        console.error(error.message || 'Hubo un error en el registro del socio');
                    } else {
                        console.error('Hubo un error desconocido en el registro del socio');
                    }
                }
            },
        })),
        { name: 'auth-storage' }
    )
);

