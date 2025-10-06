export interface IRegisterPayload  {
    email: string;
    username: string;
    password: string;
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IAuthResponse {
    message: string;
}

export interface IRegisterResponse extends IAuthResponse {
    userId: string;
}

