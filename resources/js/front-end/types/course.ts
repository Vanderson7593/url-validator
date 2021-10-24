import { ECourse } from "../constants";
import { IModel } from "./model";

export interface ICourse extends IModel {
    [ECourse.NAME]: string;
    [ECourse.DESCRIPTION]: string;
    [ECourse.VALUE]: number;
    [ECourse.SUB_START_DATE]: Date;
    [ECourse.SUB_END_DATE]: Date;
    [ECourse.MAX_SUB]: number;
    [ECourse.FILE]: any;
}
