import { ECourse, EModel, EPeriods, EStatus, ESubscription } from "../constants";
import { IModel } from "./model";
import { IUser } from "./user";

export interface ISubscription extends IModel {
    [ESubscription.COURSES]: Array<number>;
    [ESubscription.STATUS]: EStatus;
    [ESubscription.TOTAL]: number;
    [ESubscription.USER_ID]: number;
    [ESubscription.USER]: IUser;
    [ESubscription.PERIOD]: EPeriods;
}
