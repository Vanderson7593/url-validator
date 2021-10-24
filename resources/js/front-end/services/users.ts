import { ModelData } from "../types/services";
import { IUser } from "../types/user";
import { getRequest, postRequest } from "./utils";

export const getAllUsers = () => getRequest<ReadonlyArray<IUser>>(`/users`);

export const getUser = (id: number) =>
    getRequest<IUser>(`/users/${id}`);

export const createUser = (data: any) =>
    postRequest<ModelData<IUser>>(`/users`, data);

