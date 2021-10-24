import { EUrl } from "../constants";
import { IModel } from "./model";

export interface IUrl extends IModel {
    [EUrl.LABEL]: string;
    [EUrl.HTML]: string;
    [EUrl.IS_PROCESSED]: boolean;
    [EUrl.STATUS]: number;
    [EUrl.PROCESSED_AT]: Date;
    [EUrl.URL]: string;
}
