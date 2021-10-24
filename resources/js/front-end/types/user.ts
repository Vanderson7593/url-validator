import { EUser } from "../constants";
import { IModel } from "./model";

export interface IUser extends IModel {
    [EUser.Name]: string;
    [EUser.EMAIL]: string;
    [EUser.PASSWORD]: string;
}
