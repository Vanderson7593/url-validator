export type ApiRequestMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

export interface HttpResponse<T extends Object> {
    status: 'success' | 'error';
    message: any
    data: T;
}

export type AllowedQueryKeys = Record<string, string | number>;
