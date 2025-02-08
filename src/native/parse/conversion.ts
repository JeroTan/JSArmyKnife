/**
 * @description Convert any type to array
 * @param input 
 * @param splitter - splitter will be used when input is string to split string with delimiter
 * @returns 
 */
export function anyToArr<T>(input: T[]): T[];
export function anyToArr(input: string, splitter?: string): string[];
export function anyToArr(input: string[]): string[];
export function anyToArr(input: (string[]|string)): string[];
export function anyToArr(input: number): [number];
export function anyToArr(input: boolean): [boolean];
export function anyToArr(input: typeof RegExp | RegExpConstructor | RegExp): [RegExp];
export function anyToArr(input: string|(typeof RegExp | RegExpConstructor | RegExp)): [RegExp|string];
export function anyToArr(input: (string | number | boolean |typeof RegExp | RegExpConstructor | RegExp)|(string | number | boolean |typeof RegExp | RegExpConstructor | RegExp)[], splitter:string = ",")
{
	let arrayResult: (string | number | boolean |typeof RegExp | RegExpConstructor | RegExp)[] = [];
	if(Array.isArray(input)){
		arrayResult = input;
	}else if(typeof input === "string"){
		arrayResult = input.split(splitter);
	}else if(input instanceof RegExp || typeof input === "boolean" || typeof input === "number"){
		arrayResult = [input];
	}

	return arrayResult;
}

/**
 * @description Convert any type of variable to string
 * @param input 
 * @returns 
 */
export function anyToStr<T>( input: T|T[]|string|object|number|typeof RegExp|null|undefined ): string{
	if(typeof input === "undefined" || input === null){
		return "";
	}else if(typeof input === "object" && input instanceof RegExp){
		return RegExp.toString();
	}else if(typeof input === "object"){
		return JSON.stringify(input);
	}else{
		return String(input);
	}
}

/**
 * @description Convert Object and Array into string
 * @param object 
 * @param splitter 
 * @returns 
 */
export function objToString<T extends object>(object: T[] | T, splitter: string = " "){
	if( Array.isArray(object) ){
		return object.join(splitter);
	}else{
		return Object.values(object).join(splitter);
	}
}


/**
 * @description shorten new RegExp
 * @param input 
 * @returns 
 */
export function toRegex(input: string|RegExp): RegExp{
	return new RegExp(input);
}

/**
 * @description sanitize string to allow easy conversion to regex
 * @param string 
 * @returns 
 */
export function escapeToRegex(string:string) {
	return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}


/**
 * @description This is for parsing object to string format that you can use for url query string. It also sanitize the string to avoid any error.
 */
export function parseQueryToString(object:{[key:string|number]:Array<string|number>|string|number}){
	return Object.keys(object).length > 0 ? Object.keys(object).map((key)=>{
		if(!Array.isArray(object[key])){
			return `${key}=${String(object[key]).replaceAll("&","%26").replaceAll("?","%3F").replaceAll("=","%3D").replaceAll("+","%2B")}`
		}
		if( (object[key] as Array<string|number>).length < 1 )
			return `${key}=null`

		return `${key}=${(object[key] as Array<string|number>).map((e:string|number)=>{
			return String(e).replaceAll("&","%26").replaceAll("?","%3F").replaceAll("=","%3D").replace(",","%2C").replaceAll("+","%2B")
		}).join(",")}`
	}).join("&"):"";

}

//To Update the object to be compatible with JSON
export function objectReplacer(censor:any) {
	var i = 0;
	
	return function(_:any, value:any) {
	  if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
		return '[Circular]'; 
	  
	  if(i >= 29) // seems to be a hard maximum of 30 serialized objects?
		return '[Unknown]';
	  
	  ++i; // so we know we aren't using the original object anymore
	  
	  return value;
	}
  }