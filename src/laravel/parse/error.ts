import { objToString } from "../../native/parse/conversion";

export function parseLarevelError<T extends object>(errors: T): T {
	(Object.keys(errors) as Array<keyof T>).forEach((name) => {
		errors[name] = objToString<T>(errors[name] as unknown as any) as T[keyof T];
	});
	return errors;
}
