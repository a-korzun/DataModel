export declare type Raw<T, K = keyof T, V = T[keyof T]> = Array<{
    type: K;
    payload: V;
}>;
export declare function buildProxy<T>(target: any): any;
export declare class ModelProxy<T> {
    private __data;
    private __dataIndex;
    construct(data: Raw<T>): any;
    updateIndex(): void;
    raw(): Raw<T, keyof T, T[keyof T]>;
}
export declare function applyProxy(model: Function): void;
