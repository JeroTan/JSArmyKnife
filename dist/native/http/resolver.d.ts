export type STRING_ONLY_RESPONSE = (data: string, headers: Headers, ok: boolean, status: number, url: string) => void;
export type PURE_RESPONSE = (data: Response) => void;
export type OBJECT_READY_RESPONSE<T> = (data: T, headers: Headers, ok: boolean, status: number, url: string) => void;
export declare class Resolve {
    promiseResponse: Promise<Response>;
    excludeStatus: number[];
    acceptJSON: boolean;
    constructor(promiseResponse: Promise<Response> | undefined, json?: boolean);
    addResponse(promiseResponse: Promise<Response>): this;
    setDataJSON(isJSON: boolean): this;
    protected checkStatus(status: number): Promise<boolean>;
    protected parseData<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>, raw?: boolean): this;
    protected checkParseExclude<OTHER>(status: number, callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    default<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s0<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s200<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s201<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    /**
     * @info Accepted
     */
    s202<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s203<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s204<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s205<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s300<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s301<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s303<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s400<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s401<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s402<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s403<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s404<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s409<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    /**
     * @info Not Acceptable
     */
    s406<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s408<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s410<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s413<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s414<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s415<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s416<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s417<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s418<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s421<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s422<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    /**
     * @info Too Early
     */
    s425<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s429<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s431<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s451<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s500<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s501<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s502<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s503<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s504<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s505<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s506<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    s507<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    sOthers<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    sAfter<OTHER>(callback: STRING_ONLY_RESPONSE | PURE_RESPONSE | OBJECT_READY_RESPONSE<OTHER>): this;
    stream(callback: (eventTrigger: (callback2: (data: Uint8Array) => void) => void) => void): Promise<Response>;
}
