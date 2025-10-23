/**
 * @description This will omit the given property(key) to the inputted object. This will create new object.
 */
export function propsExclude<T extends object>(keys: (keyof T)[], objects: T): Omit<T, keyof T> {
	//Exclude the given property(key) to the inputted object.
	const newObject: Partial<T> = {};
	for (const objectKey in objects) {
		if (keys.some((k) => k == objectKey)) continue;
		newObject[objectKey] = objects[objectKey];
	}
	return newObject as Omit<T, keyof T>;
}

/**
 * @description This will include the given property(key) to the inputted object with given placeholder. This will NOT create new object.
 */
export function propsFill<T extends object, PLACEHOLDER_TYPE>(
	keys: (keyof T)[],
	object: T,
	placeholder?: PLACEHOLDER_TYPE,
): T | { [key in keyof T]: PLACEHOLDER_TYPE };
export function propsFill<T extends object, PLACEHOLDER_TYPE>(
	keys: (keyof T | string | number)[],
	object: T,
	placeholder?: PLACEHOLDER_TYPE,
): T | { [key: string | number]: PLACEHOLDER_TYPE };
export function propsFill<T extends object, PLACEHOLDER_TYPE>(
	keys: (string | number)[],
	object: T,
	placeholder?: PLACEHOLDER_TYPE,
): T & { [key: string | number]: PLACEHOLDER_TYPE };
export function propsFill<T extends object, PLACEHOLDER_TYPE>(
	keys: (keyof T | string | number)[],
	object: T,
	placeholder: PLACEHOLDER_TYPE = "" as unknown as PLACEHOLDER_TYPE,
): (T | { [key: string | number]: PLACEHOLDER_TYPE }) | (T & { [key: string | number]: PLACEHOLDER_TYPE }) {
	for (const key of keys) {
		(object as any)[key] = (object as any)[key] ?? placeholder;
	}
	return object;
}

/**
 * @description Thw will simplify the object by removing the undefined value. This will create new object.
 */
export function propsSimplify<T extends object>(object: T | Partial<T>) {
	const x: T | Partial<T> = {};
	const keys = Object.keys(object);
	for (const key of keys) {
		if (object[key as keyof T] !== undefined) (x as any)[key] = object[key as keyof T] as T;
	}
	return x;
}
