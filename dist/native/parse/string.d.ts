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
 *
 * @param text - The string you want to capitalize the first letter of each word
 * @description Capitalize each word in the string but the prepositions will be lowercase. This can be used for title case.
 * @example capitalEachWord("the quick brown fox jumps over the lazy dog") => "The Quick Brown Fox Jumps Over the Lazy Dog"
 *
 * @returns
 */
export declare function capitalEachWord(text: string): string;
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
/**
 * @description convert a string into list of asterisk
 * @param string - the string you want to convert
 */
export declare function toAsterisk(string: string): string;
