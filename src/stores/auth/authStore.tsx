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
        devtools<AuthState>((set) => ({
            status: 'unauthorized',
            token: undefined,
            user: undefined,

             // Método para iniciar sesión
             loginUser: async (email: string, password: string) => {
                set({ status: 'pending' });
                try {
                    const loginResponse = await AuthService.login(email, password);

                    // Solo cambia a "authorized" si la respuesta es exitosa y contiene token y usuario
                    if (loginResponse.token && loginResponse.user) {
                        if(loginResponse.user.rol=="Socio"){
                            const apiUrl = `Empresa/Usuario/${loginResponse.user.id}`;
                            const responseCompany = await niuxApi.get(apiUrl);
                            const dataCompany = responseCompany.data[0]
                            const apiUrlHoras = `Horario/Empresa/${dataCompany.id}`;
                            const responseHoras = await niuxApi.get(apiUrlHoras);
                            const dataHoras = responseHoras.data[0]
                            loginResponse.user.avatarURL=import.meta.env.VITE_BACKEND_API+loginResponse.user.avatarURL;
                            set({
                                status: 'authorized',
                                token: loginResponse.token,
                                user: {...loginResponse.user, ["idEmpresa"]:dataCompany.id, ["horaInicio"]:dataHoras.horaInicio, ["horaFin"]:dataHoras.horaFin,}
                            });
                        }else{
                            set({
                                status: 'authorized',
                                token: loginResponse.token,
                                user: loginResponse.user
                            });
                        }
                    } else {
                        throw new Error(loginResponse.message || 'Credenciales incorrectas');
                    }
                } catch (error) {
                    // Vuelve a estado 'unauthorized' y muestra el mensaje de error
                    set({ status: 'unauthorized', token: undefined, user: undefined });

                    if (error instanceof Error) {
                        console.error(error.message || 'Hubo un error en el inicio de sesión');
                        throw error; // Lanzamos el error para que el componente pueda capturarlo
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
                    const registerResponse = await AuthService.registerClient(email, nombres, apellido1, apellido2, password, confirmPassword);
                    set({
                        status: 'authorized',
                        token: registerResponse.token,
                        user: registerResponse.user
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
                    const registerResponse = await AuthService.registerPartner(email, nombres, apellido1, apellido2, password, confirmPassword, nombreEmpresa);
                    set({
                        status: 'authorized',
                        token: registerResponse.token,
                        user: registerResponse.user
                    });
                } catch (error) {
                    set({ status: 'unauthorized', token: undefined, user: undefined });
                    if (error instanceof Error) {
                        console.error(error.message || 'Hubo un error en el registro del socio');
                    } else {
                        console.error('Hubo un error desconocido en el registro del socio');
                    }
                }
            }
        })),
        { name: 'auth-storage' } // Nombre de la clave en localStorage
    )
);
