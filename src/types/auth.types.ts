import { IUser } from "@/types/user.types";

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

export interface IProfileResponse extends IAuthResponse {
    user: IUser
}

export interface IRegisterResponse extends IAuthResponse {
    userId: string;
}

export interface ILoginResponse extends IAuthResponse {
    accessToken: string;
}
