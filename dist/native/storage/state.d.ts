export interface STATE_STACK_DATA<T> {
    [key: string | number]: T;
}
export declare class State {
    private stateList;
    addState<DATA_TYPE>(stateKey: string | number, value?: DATA_TYPE, silent?: boolean): Subscription<DATA_TYPE>;
    select<ACTUAL_TYPE>(stateKey: string | number, value?: ACTUAL_TYPE): Subscription<ACTUAL_TYPE>;
}
export declare class Subscription<DATA_TYPE> {
    private value;
    private oldValue;
    private stateTrigger;
    constructor(value?: DATA_TYPE, silent?: boolean);
    set(value: DATA_TYPE, silent?: boolean): this;
    get(): DATA_TYPE;
    trigger(): this;
    update(value: DATA_TYPE | ((value: DATA_TYPE, oldValue?: DATA_TYPE) => DATA_TYPE), silent?: boolean): void;
    subscribe(callback: (value: DATA_TYPE, oldValue?: DATA_TYPE) => void): void;
}
