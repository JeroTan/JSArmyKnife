/**
 * @description This will omit the given property(key) to the inputted object. This will create new object.
 */
export declare function propsExclude<T extends object>(keys: (keyof T)[], objects: T): Omit<T, keyof T>;
/**
 * @description This will include the given property(key) to the inputted object with given placeholder. This will NOT create new object.
 */
export declare function propsFill<T extends object, PLACEHOLDER_TYPE>(keys: (keyof T)[], object: T, placeholder?: PLACEHOLDER_TYPE): T | {
    [key in keyof T]: PLACEHOLDER_TYPE;
};
export declare function propsFill<T extends object, PLACEHOLDER_TYPE>(keys: (keyof T | string | number)[], object: T, placeholder?: PLACEHOLDER_TYPE): T | {
    [key: string | number]: PLACEHOLDER_TYPE;
};
export declare function propsFill<T extends object, PLACEHOLDER_TYPE>(keys: (string | number)[], object: T, placeholder?: PLACEHOLDER_TYPE): T & {
    [key: string | number]: PLACEHOLDER_TYPE;
};
/**
 * @description Thw will simplify the object by removing the undefined value. This will create new object.
 */
export declare function propsSimplify<T extends object>(object: T | Partial<T>): Partial<T>;
