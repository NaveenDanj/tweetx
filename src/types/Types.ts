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
    id?:string;
    content: string;
    timestamp: Date;
    author: string;
    authorName: string;
}

export interface IUser {
    id: string;
    displayName: string;
    email:string,
    followers: UserIDs;
    following: UserIDs;
    posts: number;
    timestamp: Date;
}

type UserIDs = {
    [key: string]: boolean;
};