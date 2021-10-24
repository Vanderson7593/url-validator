import { EModel, ETimestamps } from "../constants";

export interface IModel extends ITimestamps {
    [EModel.ID]: number;
    [EModel.IS_DELETED]: boolean;
}

export interface ITimestamps {
    [ETimestamps.CREATED_AT]: Date;
    [ETimestamps.UPDATED_AT]: Date;
}
