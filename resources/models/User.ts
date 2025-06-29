export interface User {
    id: number;
    nome: string;
    email: string;
    email_verified_at?: string | null;
    criado_em?: string | null;
}

export interface UserResume {
    email: string;
    senha: string;
}

export interface UserRegister {
    nome: string;
    email: string;
    senha: string;
}
