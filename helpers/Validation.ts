import { anyToArr, capitalFirst, toRegex, type AnyObject } from "./ParseData.ts";

/*****************TEMPLATE //Do not touch *********************/
interface ValidationProps{
    input:any;
    field:string;
    display?:string|undefined;
}
interface RejectArgument{
    validator: string,
    arg?:(string|any)[],
}

type ValidatorResponse = (thisClass: any)=>Promise<true|RejectArgument>|true|RejectArgument;

export class ValidationErrorMessage{
    required= '%field% is required.';
    string= '%field% is an invalid string.';
    number= '%field% is an invalid number.';
    date= '%field% contains invalid date.';
    regex= '%field% is invalid.';
    notRegex= '%field% is invalid.';
    max= '%field% a maximum limit of %arg1% is reached.';
    min= '%field% a minimum limit of %arg1% is reached.';
    same= '%field% didn\'t match with %arg1%.';
    match= '%field% only accepts the following: %arg1%.';
}


export class Validation{
    props:ValidationProps = { input: "", field: "" }
    action:ValidatorResponse[] = [];
    errorMessages:AnyObject = new ValidationErrorMessage;

    constructor(input:any = undefined, field:string|undefined = undefined, display:string|undefined = undefined ){
        if(input)
            this.input(input);
        if(field)
            this.field(field);
        if(display)
            this.display(display);
    }

    //--Setter--//
    public input(d:any){
        this.props.input = d;
        return this;
    }
    public field(d:string){
        this.props.field = d;
        return this;
    }
    public display(d:string|undefined){
        this.props.display = d;
        return this;
    }
    //--Setter--//

    //--Getter--//
    public getInput(){
        return this.props.input;
    }
    public getField(){
        return this.props.field;
    }
    public getDisplay(){
        return this.props.display;
    }
    //--Getter--//

    //--Internal--//
    private validationStackPush(process: ValidatorResponse){
        this.action[this.action.length] = process;
        return this;
    }
    //--Internal--//

    //--Public Object Method--//
    public required(){
        this.validationStackPush((THIS)=>{
            const {input} = THIS.props;
            if( input || ( Array.isArray(input) && input.length>0 ) ){
                return true;
            }
            return {validator:"required"};
        })
        return this;
    }
    string(){//Check if string
        this.validationStackPush((THIS)=>{
            const {input} = THIS.props;
            if(typeof input === "string"){
                return true
            }
            return {validator:"string"}
        })
        return this;
    }
    number(argument:boolean = false){ //True means convert the string into number if it is a string with a number
        this.validationStackPush((THIS)=>{
            const {input} = THIS.props;
            if(typeof input === "number"){
                return true
            }
            if(typeof input === "string" && !isNaN(Number(input))){
                THIS.props.input = argument? Number(input) : input;
                return true
            }

            return{validator:"number"};
        })
        return this;
    }
    date(argument: boolean = false){
        this.validationStackPush((THIS)=>{
            const { input } = THIS.props;
            if(input instanceof Date){
                return true;
            }
            if(typeof input === "string" || typeof input === "number"){
                const date = new Date(input);
                if( isNaN(Number(date)) ){
                    if(argument)
                        THIS.props.input = date;
                    return true;
                }
            }

            return {validator:"date"}
        })
        return this;
    }

    regex( argument: string|typeof RegExp|any[] ){
        this.validationStackPush((THIS)=>{
            const { input } = THIS.props;
            argument = anyToArr(argument);
            if(
                argument.every(x=>{
                    return toRegex(x).test(input);
                })
            ){
                return true
            }

            return {validator:"regex"};
        })
        return this;
    }
    notRegex( argument: string|typeof RegExp|any[] ){
        this.validationStackPush((THIS)=>{
            const { input } = THIS.props;
            argument = anyToArr(argument);
            if(
                argument.every(x=>{
                    return !toRegex(x).test(input);
                })
            ){
                return true
            }

            return {validator:"notRegex"};
        })
        return this;
    }

    max(argument:number){        
        this.validationStackPush((THIS)=>{
            const { input } = THIS.props;
            if(typeof input === "string" && input.length <= argument){
                return true;
            }else if(typeof input === "number" && input <= argument){
                return true;
            }else if(typeof input === "object" && Array.isArray(input) && input.length <= argument ){
                return true;
            }else if(typeof input === "object" && Object.keys(input).length <= argument){
                return true;
            }

            return {validator:"max", arg:[argument]};
        })
        return this;
    }
    min(argument:number){        
        this.validationStackPush((THIS)=>{
            const { input } = THIS.props;
            if(typeof input === "string" && input.length >= argument){
                return true;
            }else if(typeof input === "number" && input >= argument){
                return true;
            }else if(typeof input === "object" && Array.isArray(input) && input.length >= argument ){
                return true;
            }else if(typeof input === "object" && Object.keys(input).length >= argument){
                return true;
            }

            return {validator:"min", arg:[argument]};
        })
        return this;
    }
    same(argument: this){//accept argument as instance of this class;
        this.validationStackPush((THIS)=>{
            const { input } = THIS.props;
            if( argument.getInput() === input ){
                return true
            }

            return {validator:"same", arg:[argument.getField()]};
        })
        return this;
    }
    match(argument:any[]|string|number){//Match the given Array
        this.validationStackPush((THIS)=>{
            const { input } = THIS.props;
            argument = anyToArr(argument, ",");
            if( argument.some(x=>(x).toString()===input.toString()) ){
                return true
            }
            return {validator:"same", arg:argument};
        })
        return this;
    }
    //--Public Object Method--//

    //--Processing Methods--//
    public messages(customMessages: AnyObject){
        const THIS = this;
        Object.keys(customMessages).forEach(key=>{
            THIS.errorMessages[key] = customMessages[key];
        })
        return this;
    }
    public validate(){
        const THIS = this;
        const { action } = THIS;
        const { field, display } = THIS.props;

        async function iterateValidation(validator: any[] = action, current = 0){
            if(action.length <= current){//It means that it reaches the validation stack limit and there is no error found.
                return true;
            }
            let result = validator[current](THIS); //Check the validation for each stack
            if(result instanceof Promise){
                result = await result;
            }
            
            if(result === true){ //Validate again when true
                return await iterateValidation(validator, current+1);
            }else{ //else return an error message;
                let errorMessage:string = THIS.errorMessages[result.validator].replace("%field%", display?display:capitalFirst(field));
                if(result.arg){
                    result.arg.forEach((element:string, index:number) => {
                        errorMessage = errorMessage.replace(`%arg${index+1}%`, element);
                    });
                }
                return errorMessage;
            }
        }

        //Return a promise for ValidationResult Class
        return new ValidationResult(iterateValidation());
    }
    //--Processing Methods--//

}


export class ValidationResult{
    validationPromise: Promise<string|true|undefined> = new Promise(()=>{});//String means error message and boolean means true if there is no error

    constructor(validationPromise:Promise<string|true|undefined>|undefined = undefined){
        if(validationPromise!== undefined)
            this.addPromise(validationPromise);
    }
    addPromise(validationPromise:Promise<string|true|undefined>){
        this.validationPromise = validationPromise;
        return this;
    }
    
    success(callback: Function): this{
        this.validationPromise.then(x=>{
            if(x===true){
                callback();
            }
        })
        return this;
    }
    fail(callback: (errorMessage:string)=>{}): this{
        this.validationPromise.then(x=>{
            if(x!==true && typeof x === "string"){
                callback(x);
            }
        })
        return this;
    }
}



// //InstanceGenerator
// export function generateValidateInstance(total){
//     return [...Array(total)].map(x=>new Validation);
// }
// //Validate Multiple Instance
// export async function multiValidate(valInst){
//     const errorData = {};

//     for(const v of valInst){
//         const result = await v.validate();

//         if(result !== true){
//             errorData[v.fieldName] = result;
//         }
//     }

//     return errorData;
// }
// //Check the error payload from 422
// export function isThereError(errorData){
//     //Format would be {key:message} for the object
//     return Object.keys(errorData).every(key=>{
//         return !errorData[key];
//     })
// }