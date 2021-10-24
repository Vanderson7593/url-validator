import { EModel, ETimestamps } from "../constants";

export interface IModel extends ITimestamps {
    [EModel.ID]: number;
}

export interface ITimestamps {
    [ETimestamps.CREATED_AT]: Date;
    [ETimestamps.UPDATED_AT]: Date;
}
