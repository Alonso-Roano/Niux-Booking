import { AxiosError } from "axios";
import { niuxApi } from "../api/niuxApi";

export interface LoginResponse {
    success: boolean;
    message: string;
    data: string; // Aquí guardaremos el token JWT
}

export class AuthService{

    static login = async(email: string, password: string):Promise<LoginResponse>  => {

        try {
            
            const {data} = await niuxApi.post<LoginResponse>('/Auth/login', {email, password});
            console.log(data);

            return data;

        } catch (error) {
          
            if(error instanceof AxiosError){
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error('Unable to Login')

        }

    }
}