/**
 * @description Convert any type to array
 * @param input
 * @param splitter - splitter will be used when input is string to split string with delimiter
 * @returns
 */
export declare function anyToArr<T>(input: T[]): T[];
export declare function anyToArr(input: string, splitter?: string): string[];
export declare function anyToArr(input: string[]): string[];
export declare function anyToArr(input: (string[] | string)): string[];
export declare function anyToArr(input: number): [number];
export declare function anyToArr(input: boolean): [boolean];
export declare function anyToArr(input: typeof RegExp | RegExpConstructor | RegExp): [RegExp];
export declare function anyToArr(input: string | (typeof RegExp | RegExpConstructor | RegExp)): [RegExp | string];
/**
 * @description Convert any type of variable to string
 * @param input
 * @returns
 */
export declare function anyToStr<T>(input: T | T[] | string | object | number | typeof RegExp | null | undefined): string;
/**
 * @description Convert Object and Array into string
 * @param object
 * @param splitter
 * @returns
 */
export declare function objToString<T extends object>(object: T[] | T, splitter?: string): string;
/**
 * @description shorten new RegExp
 * @param input
 * @returns
 */
export declare function toRegex(input: string | RegExp): RegExp;
/**
 * @description sanitize string to allow easy conversion to regex
 * @param string
 * @returns
 */
export declare function escapeToRegex(string: string): string;
/**
 * @description This is for parsing object to string format that you can use for url query string. It also sanitize the string to avoid any error.
 */
export declare function parseQueryToString(object: {
    [key: string | number]: Array<string | number> | string | number;
}): string;
export declare function objectReplacer(censor: any): (_: any, value: any) => any;
