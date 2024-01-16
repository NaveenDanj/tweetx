export interface ISignIn {
    email: string;
    password: string;
}

export interface ISignUp {
    name : string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IPost {
    content: string;
    timestamp: Date;
    author: string
}