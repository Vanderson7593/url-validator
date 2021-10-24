import { EUser, ERoles, ECategories, EPeriods } from "../constants";
import { IModel } from "./model";

export interface IUser extends IModel {
    [EUser.Name]: string;
    [EUser.EMAIL]: string;
    [EUser.CPF]: string;
    [EUser.CATEGORY]: ECategories;
    [EUser.UF]: string;
    [EUser.ADDRESS]: string;
    [EUser.COMPANY]: string;
    [EUser.PHONE]: string;
    [EUser.TELEPHONE]: string;
    [EUser.ROLE]: ERoles;
    [EUser.PASSWORD]: string;
}
