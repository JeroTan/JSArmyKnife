/**
 * @description Check if the object or class object is instance of a certain class
 */
export declare function isInstance<T>(object: T, classCopy: new (...args: unknown[]) => T): boolean;
/**
 * @description Check if the string is a valid JSON
 * @param data
 * @returns
 */
export declare function isJSON<T>(data: T): false;
