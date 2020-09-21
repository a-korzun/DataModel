export declare type Raw<T, K = keyof T, V = T[keyof T]> = Array<{
    type: K;
    payload: V;
}>;
export declare class ModelProxy<T> {
    private __data;
    private __dataIndex;
    constructor(data: Raw<T>);
    updateIndex(): void;
    raw(): Raw<T, keyof T, T[keyof T]>;
}
