export interface AuthData {
    status: string;
    message: string;
    role: number;
    name: string;
    userId: string;
}

export interface LoginData {
    status: string;
    message: string;
    token: string;
    auth: boolean;
    role: number;
}

export interface RegisterData {
    status: string;
    message: string;
}
