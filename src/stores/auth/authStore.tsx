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
                const avatarURL = updatedUser.avatarURL
                    ? `${import.meta.env.VITE_BACKEND_API}${updatedUser.avatarURL}`
                    : currentState.user.avatarURL;

                const filteredUserData = {
                    ...currentState.user,
                    ...updatedUser,
                    avatarURL,
                };

                // Solo mantener campos permitidos
                set({
                    user: {
                        id: filteredUserData.id,
                        nombre: filteredUserData.nombre,
                        email: filteredUserData.email,
                        rol: filteredUserData.rol,
                        avatarURL: filteredUserData.avatarURL,
                        idEmpresa: filteredUserData.idEmpresa,
                    },
                });
            }
        },

        // Método para refrescar los datos del perfil
        refreshUserData: async () => {
            const currentState = get();
            if (!currentState.user?.id) {
                console.error("No hay usuario autenticado.");
                return;
            }

            try {
                const response = await niuxApi.get(`/Persona/ObtenerDatosPerfil/${currentState.user.id}`);
                if (response.data.success) {
                    const updatedUser = response.data.data;

                    const avatarURL = updatedUser.avatarURL
                        ? `${import.meta.env.VITE_BACKEND_API}${updatedUser.avatarURL}`
                        : currentState.user.avatarURL;

                    const filteredUserData = {
                        id: currentState.user.id,
                        nombre: `${updatedUser.nombres} ${updatedUser.apellido1} ${updatedUser.apellido2}`.trim(),
                        email: currentState.user.email,
                        rol: currentState.user.rol,
                        avatarURL,
                        idEmpresa: currentState.user.idEmpresa,
                    };

                    set({
                        user: filteredUserData,
                    });

                } else {
                    console.error("Error al refrescar datos del usuario:", response.data.message);
                }
            } catch (error) {
                console.error("Error en la solicitud de refresco de usuario:", error);
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

