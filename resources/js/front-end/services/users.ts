import { API_ROUTES } from "../constants/routes";
import { ModelData } from "../types/services";
import { IUser } from "../types/user";
import { postRequest } from "./utils";

interface ILoginResponse {
    user: IUser,
    access_token: string,
    expires_in: number
}

export const createUser = (data: any) =>
    postRequest<ModelData<IUser>>(`${API_ROUTES.CREATE_USER}`, data);

export const login = (data: any) =>
    postRequest<ILoginResponse>(`${API_ROUTES.LOGIN}`, data);

export const logout = () =>
    postRequest<ModelData<null>>(`${API_ROUTES.LOGOUT}`);

export const recoverUserData = () =>
    postRequest<ModelData<IUser>>(`${API_ROUTES.ME}`);
