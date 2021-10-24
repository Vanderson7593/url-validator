export interface Response {
    message: Record<string, string[]>;
    status: 'success' | 'error';
}

export interface ModelData<T> extends Response {
    data: T;
}

export interface ListData<T> extends Response {
    payload: ReadonlyArray<T>;
}
