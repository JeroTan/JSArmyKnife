interface DOM_REQUEST_DATA {
    key: string;
    value: string;
}
export declare class DOMRequest {
    private config;
    private dataContainer;
    constructor(method?: undefined | "POST" | "GET", action?: undefined | string, target?: undefined | string);
    method(method: "POST" | "GET"): this;
    get(): this;
    post(): this;
    action(action: string): this;
    url(action: string): this;
    target(target: string): this;
    protected pushDataToStack(data: DOM_REQUEST_DATA): void;
    data(data: DOM_REQUEST_DATA | DOM_REQUEST_DATA[]): this;
    request(): void;
}
export declare function getParams(key: string): string | null;
export {};
