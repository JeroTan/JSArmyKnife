export declare class WebSocketNative {
    private socket;
    private url;
    private param;
    constructor(url?: string, param?: {
        [key: string | number]: string;
    });
    setUrl(url: string, param?: {
        [key: string | number]: string;
    }): this;
    setParam(param: {
        [key: string | number]: string;
    }): this;
    urlCheck(callbackSuccess?: Function, callbackFail?: Function): Promise<this>;
    open(callback?: (e: Event) => void): this;
    getSocket(): WebSocket | undefined;
    receiver(callback: (e: MessageEvent) => void): this;
    close(callback?: (e: Event) => void): this;
    toClose(callback: (e: Event) => void): this | undefined;
}
