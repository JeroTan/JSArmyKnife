/**
 * List of Utilities
 * Convert to Other Types:
 * - anyToArr()
 * - anyToStr()
 * - objToStr()
 * - toRegex()
 * 
 * Variable/Value Checking
 * - isInstance()
 * 
 * String Manipulation
 * - onlyAlpha()
 * - removeSpace()
 * - capitalFirst()
 * 
 * Object Manipulation
 * - Interface: AnyObject
 * - propsExclude()
 * - propsFill()
 * 
 * Other Utility
 * - openLink()
 * - openLinkHigh()
 * - class: Debouncer
 * 
 * For React Utilities | But can stand alone as vanilla JS
 * - class: DataDispatch
 * - class: ErrorDispatch
 * 
 * For Laravel Utilities | But can stand alone as vanilla JS
 * - parseLarevelError()
 */

import { ceil } from "./Math";


//====================================================================================================================================//
//>>> Convert to Other Types
export function anyToArr(input: any[] | string | number | boolean |typeof RegExp | RegExpConstructor | RegExp, splitter:string = ",") :any[]
{//splitter will be used when input is string to split string with delimiter
    let arrayResult: any[] = [];

    if(Array.isArray(input)){
        arrayResult = input;
    }else if(typeof input === "string"){
        arrayResult = input.split(splitter);
    }else if(input instanceof RegExp || typeof input === "boolean" || typeof input === "number"){
        arrayResult = [input];
    }

    //Check if the string is a number and convert it to actual number
    for(let i: number = 0; i < arrayResult.length; i++){
        if(typeof arrayResult[i] === "string" && !isNaN(Number(arrayResult))){
            arrayResult[i] = Number(arrayResult[i]);
        }

    }

    return arrayResult;
}

export function anyToStr( input: string|object|number|typeof RegExp|null|undefined ): string{
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

export function objToString(object: any[] | object, splitter: string = " "){
    if( Array.isArray(object) ){
        return object.join(splitter);
    }else{
        return Object.values(object).join(splitter);
    }
}

export function toRegex(input: string|RegExp): RegExp{
    return new RegExp(input);
}
export function escapeToRegex(string:string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
//<<< Convert to Other Types
//====================================================================================================================================//
//>>> Variable/Value Checking
export function isInstance(object: any, classCopy: Function): boolean{
    return object instanceof classCopy;
}
export function isJSON(data:any|string) {
    if (typeof data !== 'string') return false;
    try {
        const result = JSON.parse(data);
        const type = Object.prototype.toString.call(result);
        return type === '[object Object]' || type === '[object Array]';
    } catch (err) {
        return false;
    }
}

//<<< Variable/Value Checking
//====================================================================================================================================//
//>>> String Manipulation
export function onlyAlpha(text: string):string{
    return text.replace(/[^a-zA-Z]+/g, "");
}
export function removeSpace(text: string):string{
    return text.replace(/ */g, "");
}
export function capitalFirst(text: string){
    return  text.length ? (text[0].toUpperCase() + (text.length > 1 ? text.slice(1): "") ) : "";
}
export function stron(string:string) {
    if (string.length == 0) return 0;

    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}
export function stringTrail(string:string, limit=20){
    return string.length > limit ? string.substring(0,limit)+"..." : string
}

//<<< String Manipulation
//====================================================================================================================================//
//>>> Object Manipulation
export interface AnyObject {//Use To Tell the object to accept dynamic ones
    [key: string|number]: any
}
export function propsExclude(keys: (string|number)[], objects: AnyObject ): object{//Exclude the given property(key) to the inputted object.
    const newObject:any = {};
    for(const objectKey in objects){
        //If object keys is equal to the given key, then skip
        if(keys.some(k=>k == objectKey))
            continue;

        //Else copy that objects{} property and add it to the newObject{}
        newObject[objectKey] = objects[objectKey];
    }
    return newObject;
}

export function propsFill(keys: (string|number)[], objects:AnyObject, placeholder: any = ""): object{ //Fill a given property
    keys.forEach((key:any) => {
        objects[key] = objects[key] ?? placeholder;
    });
    return objects;
}
//<<< Object Manipulation
//====================================================================================================================================//
//>>> Other Utility
export function openLink(link:string){
    window.open(link, '_blank');
}
export function openLinkHigh(link:string): Function{ //@info - same with openLink but return a function that sends a link. Usually use in html element.
    return ()=>openLink(link);
}
//DEBOUNCEr - use this to delay a function call or to be precise put an interval on time to allow the final input to be serve.
export class Debouncer {
    private timer:number = 0;
    private debouncer: number|undefined = undefined;
    private callback: Function = ()=>true;
    
    constructor(timer: number = 0){
        this.time(timer);
    }
    time(timer:number = 0){
        if(timer)
            this.timer = timer;
        return this;
    }
    do(callback: Function = ()=>true){
        this.callback = callback;
        return this;
    }
    run(){
        clearTimeout(this.debouncer);
        this.debouncer = setTimeout(this.callback, this.timer);
        return this;
    }
}
//<<< Other Utility
//====================================================================================================================================//
//>>> For React Utilities | But can stand alone as vanilla JS
export class DataDispatch{// Get the value of state changer
    private dispatch: Function = ()=>{};
    constructor( dispatch: boolean|Function=false){
        //Dispatch callback must have a parameter that also accepts a callback. That callback must have a parameter about the old data;
        if(dispatch && typeof dispatch === "function")
            this.dispatch = dispatch;
    }
    addDispatch(dispatch: Function){
        this.dispatch = dispatch;
        return this;
    }
    store(key:string|number, val: any|((key:any)=>any)){
        this.dispatch( (old:object)=>{
            const newData:AnyObject = {...old};
            if(typeof val === "function"){
                newData[String(key)] = val(structuredClone(newData[String(key)]));
            }else{
                newData[String(key)] = val;
            }
            return newData;
        });
        return this;
    }
    clear(key:string|number, clearValue:any = ""){
        this.dispatch( (old:object)=>{
            const newData:AnyObject = {...old};
            newData[String(key)] = clearValue;
            return newData
        });
        return this;
    }
    batch(objects:AnyObject, refresh = false){
        // if(!refresh){
        //     this.dispatch(objects);
        //     return this;
        // }

        this.dispatch((old:object)=>{
            const newData:AnyObject = {...old};
            for(const i in newData){
                if(!objects[i])
                    continue;
                newData[i] = objects[i];
            }
            return newData;
        })
        return this;
    }
}
export class ErrorDispatch extends DataDispatch{} //Just a different name to prevent confusion
//<<< For React Utilities | But can stand alone as vanilla JS
//====================================================================================================================================//
//>>> For Laravel Utilities | But can stand alone as vanilla JS
export function parseLarevelError( errors:AnyObject ): object{
    Object.keys(errors).forEach(name=>{
        errors[name] = objToString(errors[name]);
    });
    return errors;
}
//<<< For Laravel Utilities | But can stand alone as vanilla JS
//====================================================================================================================================//
//>>> Advance Algorithm
export function binarySearchIndex<T>(list:T[], callback:(MiddleElement:T, FirstElement:T, LastElement:T)=>-1|0|1|number, indexPoint = 0): (number|-1){//For the callback you must use x <= y where x is the thing you need to search and y is reference
    const halfPoint = ceil(list.length/2)-1;
    const direction = callback( list[halfPoint], list[0], list[list.length-1] );//Returns -1 means direction; 0 means found; 1 means goRight;
    if(direction === 0)
        return indexPoint+halfPoint;
    else if(direction !==0 && list.length <= 1)
        return -1;

    if(direction < 0)
        return binarySearchIndex( list.slice(0, (halfPoint+1)), callback, indexPoint+0);
    else
        return binarySearchIndex( list.slice((halfPoint+1)), callback, indexPoint+(halfPoint+1));
};
//<<< Advance Algorithm
//====================================================================================================================================//
//>>> JSON MANIPULATION
export function objectReplacer(censor:any) {
    var i = 0;
    
    return function(_:any, value:any) {
      if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
        return '[Circular]'; 
      
      if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
        return '[Unknown]';
      
      ++i; // so we know we aren't using the original object anymore
      
      return value;
    }
  }
//<<< JSON MANIPULATION
//====================================================================================================================================//
//>>> ENVIRONEMENT VARIABLES
export function getENV(envName:string , defaultValue:string = "DEFAULT"){
    try{
        // console.log("ENV Helper use: Current Accessing", envName, "List Of all ENV", import.meta.env);
        if(!import.meta.env[envName] || import.meta.env[envName] == undefined || import.meta.env[envName] === ""){
            if(!process.env[envName] || process.env[envName] == undefined || process.env[envName] === ""){
                return defaultValue;
            }
            return process.env[envName];
        }
        return import.meta.env[envName]
    }catch(e){
        try{
            if(!process.env[envName] || process.env[envName] == undefined || process.env[envName] === ""){
                return defaultValue;
            }
            return process.env[envName];
        }catch(e){
            return defaultValue;
        }
    }
}
//====================================================================================================================================//
//<<< ENVIRONEMENT VARIABLES
//====================================================================================================================================//
//                                                                                                                                    //
//====================================================================================================================================//
//>>> CHAIN LINKER
//====================================================================================================================================//
// export interface SHARED_DATA{
//     [key:string|number]:any
// }
/**
 * @info Kizuna Means Bind
 */
export class Kizuna<RETURN_TYPE, SHARED_DATA extends object>{
    private returnValue:RETURN_TYPE|undefined = undefined;
    private sharedValues:SHARED_DATA = {} as SHARED_DATA;
    private chainStack: Array< ((sharedValues:SHARED_DATA)=>Promise<void|RETURN_TYPE>) | ((sharedValues:SHARED_DATA)=>void|RETURN_TYPE) > = [];

    constructor(shared?:SHARED_DATA){
        if(shared){
            this.sharedValues = shared;
        }
    }

    //-- Setter --//
    public defaultReturn(returnValue:RETURN_TYPE|undefined){
        this.returnValue = returnValue;
    }
    //-- Setter --//

    //-- Functionalities --//
    public link(callback: ((sharedValues:SHARED_DATA)=>Promise<void|RETURN_TYPE>) | ((sharedValues:SHARED_DATA)=>void|RETURN_TYPE) ){
        this.chainStack.push(callback);
        return this;
    }

    public async run(){
        if(this.chainStack.length < 1)
            return this.returnValue;

        const THIS = this;//Create in-house THIS;
        async function runner(current=0, stack = THIS.chainStack){
            if(current >= THIS.chainStack.length){
                return THIS.returnValue;
            }
            let value = THIS.chainStack[current](THIS.sharedValues);
            if(value instanceof Promise){
                value = await value;
            }
            if(value === undefined){
                return await runner(current+1, stack);
            }else{
                THIS.returnValue = value;
                return THIS.returnValue;
            }//They must wait for every await in that function
        }
        return await runner();
    }
}
