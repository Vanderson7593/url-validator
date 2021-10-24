import { ApiRequestMethod, HttpResponse } from "./services.types";

const BASE_API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const makeRequest =
    (method: ApiRequestMethod) =>
        async <T>(endpoint: string, data?: Object): Promise<HttpResponse<T>> => {
            const response = await fetch(`${BASE_API_URL}${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
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
