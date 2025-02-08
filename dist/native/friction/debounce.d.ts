export declare class Debouncer {
    private timer;
    private debouncer;
    private callback;
    constructor(timer?: number);
    time(timer?: number): this;
    do(callback?: Function): this;
    run(): this;
}
