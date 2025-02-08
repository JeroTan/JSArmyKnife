/**
 * @description Remove any non-alphabet character
 */
export declare function onlyAlpha(text: string): string;
/**
 * @description Remove Space from string
 */
export declare function removeSpace(text: string): string;
/**
 * @description Capital The First Letter of the string
 */
export declare function capitalFirst(text: string): string;
/**
 * @description Capital The First Letter of the string but the rest will be lowercase
 */
export declare function capitalFirstOnly(text: string): string;
/**
 * @description remove the underscore from the string or replace it with space
 * @param text
 * @param swapToSpace If you want to replace the underscore with space
 */
export declare function noUnderscore(text: string, swapToSpace?: boolean): string;
/**
 * @description convert a string into a fixed number randomly to shorten the string. Good for hashing or mapping something.
 * @param string
 * @returns
 */
export declare function stron(string: string): number;
/**
 * @description add ellipsis to the string if it's too long or based on your preferred limit
 * @param string
 * @param limit If you want to have a specific limit
 */
export declare function stringTrail(string: string, limit?: number): string;
