export interface ResponseHelper {
    success: boolean;
    message: string;
    data: string; 
}

export interface ResponseAuth {
    success: boolean;
    message: string;
    token: string;
    user: User;
}

export interface User {
    id: string;
    rol: string;
    avatarURL: string;
    nombre: string;
    correo: string;
}