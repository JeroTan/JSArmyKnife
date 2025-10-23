/**
 * @description Check if the object or class object is instance of a certain class
 */
export function isInstance<T>(object: T, classCopy: new (...args: unknown[]) => T): boolean {
	return object instanceof classCopy;
}

/**
 * @description Check if the string is a valid JSON
 * @param data
 * @returns
 */
export function isJSON<T>(data: T): false;
export function isJSON<T>(data: T | string) {
	if (typeof data !== "string") return false;
	try {
		const result = JSON.parse(data);
		const type = Object.prototype.toString.call(result);
		return type === "[object Object]" || type === "[object Array]";
	} catch (err) {
		return false;
	}
}
