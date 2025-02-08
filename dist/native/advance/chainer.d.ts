/**
 * @info Kizuna Means Bind
 */
export declare class Kizuna<RETURN_TYPE, SHARED_DATA extends object> {
    private returnValue;
    private sharedValues;
    private chainStack;
    constructor(shared?: SHARED_DATA);
    defaultReturn(returnValue: RETURN_TYPE | undefined): void;
    link(callback: ((sharedValues: SHARED_DATA) => Promise<void | RETURN_TYPE>) | ((sharedValues: SHARED_DATA) => void | RETURN_TYPE)): this;
    run(): Promise<RETURN_TYPE | undefined>;
}
