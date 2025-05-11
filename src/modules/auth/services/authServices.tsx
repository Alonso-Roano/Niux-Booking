
import { AxiosError } from "axios";
import { niuxApi } from "@core/api/niuxApi";
import { ResponseAuth } from "@shared/helpers/ResponseHelper.interface";

export class AuthService {
    // Método para iniciar sesión
    static login = async (email: string, password: string): Promise<ResponseAuth> => {
        try {
            const { data } = await niuxApi.post<ResponseAuth>('/Auth/login', { email, password });
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data);
                throw new Error(error.response?.data.message || 'Error al iniciar sesión');
            }
            console.error(error);
            throw new Error('Unable to Login');
        }
    }

    // Método para registrar un cliente
    static registerClient = async (
        email: string,
        nombres: string,
        apellido1: string,
        apellido2: string,
        password: string,
        confirmPassword: string
    ): Promise<ResponseAuth> => {
        try {
            const { data } = await niuxApi.post<ResponseAuth>('/Auth/registrarCliente', {
                email,
                nombres,
                apellido1,
                apellido2,
                password,
                confirmPassword
            });
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data);
                throw new Error(error.response?.data.message || 'Error en el registro');
            }
            console.error(error);
            throw new Error('Unable to Register');
        }
    }
    
     // Método para registrar un socio
     static registerPartner = async (
        email: string,
        nombres: string,
        apellido1: string,
        apellido2: string,
        password: string,
        confirmPassword: string,
        nombreEmpresa: string
    ): Promise<ResponseAuth> => {
        try {
            const { data } = await niuxApi.post<ResponseAuth>('/Auth/registrarSocio', {
                email,
                nombres,
                apellido1,
                apellido2,
                password,
                confirmPassword,
                nombreEmpresa
            });
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data);
                throw new Error(error.response?.data.message || 'Error en el registro de socio');
            }
            console.error(error);
            throw new Error('Unable to Register Partner');
        }
    }
}
