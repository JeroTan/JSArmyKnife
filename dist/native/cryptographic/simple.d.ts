export declare class Vigenere {
    private data;
    private key;
    constructor(key?: string | undefined, data?: string | undefined);
    setData(data: string): this;
    setkey(key: string): this;
    encrypt(): string;
    decrypt(): string;
}
export declare function pureHash(message: string): string | undefined;
export declare function btoaEx(anyStringPoint: string): string;
export declare function atobEx(encrypted: string): string;
