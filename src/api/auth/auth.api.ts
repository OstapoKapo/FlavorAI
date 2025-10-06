import { HttpFactoryService } from "@/services/http-factory.service";
import { IAuthResponse, ILoginPayload, IRegisterPayload, IRegisterResponse } from "./auth.types";

const httpFactory = new HttpFactoryService();
const http = httpFactory.createHttpService();
const authHttp = httpFactory.createAuthHttpService(); 

export const register = async (payload: IRegisterPayload) => {
    return http.post<IRegisterResponse, IRegisterPayload>("auth/register", payload);
}

export const login = async (payload: ILoginPayload) => {
    return http.post<IAuthResponse, ILoginPayload>("auth/login", payload);
}

export const logout = async () => {
    return authHttp.post<IAuthResponse, void>("auth/logout", undefined);
}

export const getProfile = async () => {
    return authHttp.get<IAuthResponse>("auth/profile");
}