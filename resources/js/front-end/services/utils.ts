import { removeFirstLastChar } from "../utils/strings";
import { ApiRequestMethod, HttpResponse } from "./services.types";

export const makeRequest =
    (method: ApiRequestMethod) =>
        async <T>(endpoint: string, data?: Object): Promise<HttpResponse<T>> => {
            const accessToken = localStorage.getItem('accessToken')?.replaceAll('"', '')
            const response = await fetch(`https://user-url-validator-app.herokuapp.com/api${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${accessToken || ''}`
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            return responseData;
        };

export const postRequest = makeRequest('POST');
export const getRequest = makeRequest("GET");
export const deleteRequest = makeRequest("DELETE");
export const patchRequest = makeRequest("PATCH");
