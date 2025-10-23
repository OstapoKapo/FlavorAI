import { HttpFactoryService } from "@/services/http-factory.service";
import { 
  IAuthResponse, ILoginPayload, ILoginResponse, IProfileResponse, 
  IRegisterPayload, IRegisterResponse 
} from "@/types/auth.types";
import axios from "axios";

const getHttp = () => {
    const httpFactory = new HttpFactoryService();
    return httpFactory.createHttpService();
};

const getAuthHttp = () => {
    const httpFactory = new HttpFactoryService();
    return httpFactory.createAuthHttpService();
};

export const register = async (payload: IRegisterPayload): Promise<IRegisterResponse> => {
    return getHttp().post<IRegisterResponse, IRegisterPayload>("auth/register", payload);
};

export const login = async (payload: ILoginPayload): Promise<ILoginResponse> => {
    return getHttp().post<ILoginResponse, ILoginPayload>("auth/login", payload);
};

export const logout = async (): Promise<IAuthResponse> => {
    return getHttp().post("auth/logout", undefined);
};

export const getProfile = async (): Promise<IProfileResponse> => {
    return getAuthHttp().get<IProfileResponse>("auth/profile");
};
