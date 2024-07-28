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
//<<< Convert to Other Types
//====================================================================================================================================//
//>>> Variable/Value Checking
export function isInstance(object: any, classCopy: Function): boolean{
    return object instanceof classCopy;
}
export function isJSON(data:any) {
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
    private dispatch: Function = (param:any)=>{};
    constructor( dispatch: boolean|Function=false){
        //Dispatch callback must have a parameter that also accepts a callback. That callback must have a parameter about the old data;
        if(dispatch && typeof dispatch === "function")
            this.dispatch = dispatch;
    }
    addDispatch(dispatch: Function){
        this.dispatch = dispatch;
        return this;
    }
    store(key:string|number, val: any){
        this.dispatch( (old:object)=>{
            const newData:AnyObject = {...old};
            newData[String(key)] = val;
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
        if(!refresh){
            this.dispatch(objects);
            return this;
        }

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
export function binarySearchIndex(list:any[], callback:Function, indexPoint = 0): (number|-1){//For the callback you must use x <= y where x is the thing you need to search and y is reference
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