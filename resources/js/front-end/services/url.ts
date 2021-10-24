import { API_ROUTES } from "../constants/routes";
import { ModelData } from "../types/services";
import { IUrl } from "../types/url";
import { getRequest, postRequest } from "./utils";

export const getAllUrls = () => getRequest<Array<IUrl>>(API_ROUTES.URLS);

export const createUrl = (data: any) =>
  postRequest<ModelData<IUrl>>(API_ROUTES.CREATE_URL, data);

