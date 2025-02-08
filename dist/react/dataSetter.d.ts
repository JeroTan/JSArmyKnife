export declare class DataDispatch<VAR_TYPE extends ({
    [key: string | number]: any;
} | object | {})> {
    private dispatch;
    constructor(dispatch?: boolean | Function);
    addDispatch(dispatch: Function): this;
    store(key: string | number, val: any | ((key: any) => any)): this;
    clear(key: string | number, clearValue?: any): this;
    batch(objects: VAR_TYPE, refresh?: boolean): this;
}
export declare function useMod<STATE, STATE_SET>(get: STATE, set: STATE_SET): {
    get: () => STATE;
    set: STATE_SET;
};
