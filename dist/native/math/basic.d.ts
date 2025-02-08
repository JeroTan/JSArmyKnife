/**
* @info Use this to generate random number base on selected range
* @param min Number should be the lowest range it can select on random
* @param max Maximum allowable range of number
* @param allowDecimal In case you want to include decimals instead of just whole number. It accepts false and number which is the length of decimal digits
* @returns Random number between min and max params
*/
export declare function randomizer(min?: number, max?: number, allowDecimal?: boolean | number): number;
/**
* @info Function that will remove a decimal to a number. If you pass a whole number it will just return that number;
* @param number Value that will be use to remove decimal
* @returns Whole number without decimal Value
*/
export declare function removeDecimal(number: number): number;
/**
* @info This will transform a number like 1.68 to 2 basically any number that has decimal
* @param number Value that you want to transform
* @returns Transform value that is already CEIL
*/
export declare function ceil(number: number): number;
/**
* @info This will transform a number like 1.68 to 1 basically any number that has decimal
* @param number Value that you want to transform
* @returns Transform value that is already FLOOR
*/
export declare function floor(number: number): number;
/**
* @Info Transform a negative value or any value into a positive value
* @param number Value that you want to transform
* @returns Absolute number with no negative
*/
export declare function abs(number: number): number;
export declare function adjustDecimal(number: number, addPlaceValue?: boolean | number): number;
export declare function decimalCount(number: number): number;
export interface SPLIT_NUMBER {
    sign: boolean;
    whole: number;
    decimal: number;
}
export declare function separateNumber(raw: number): SPLIT_NUMBER;
export declare function combineNumber(data: SPLIT_NUMBER, maintainString?: boolean): string | number;
export declare function padNumber(number: number, length: number): string;
/**
* @info Cut Only Whole Number, the decimal will be remove
* @param number
* @param cutWhere
*/
export declare function fixedNumber(number: number, limit?: number, cutWhere?: "left" | "right"): number;
export declare function numberAddComma(number: number): string;
