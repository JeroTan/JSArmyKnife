import { anyToArr, toRegex, type AnyObject } from "./ParseData.ts";

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

type PromiseCallback = (resolve: Function, reject: Function)=>void;

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
    action:PromiseCallback[] = [];
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
    private validationStackPush(process: PromiseCallback){
        this.action[this.action.length] = process;
        return this;
    }
    //--Internal--//

    //--Public Object Method--//
    public required(){
        const { input, field } = this.props;
        this.validationStackPush((resolve, reject)=>{
            if( input || ( Array.isArray(this.input) && this.input.length>0 ) ){
                return resolve(true);
            }
            return reject({validator:"required"});
        })
        return this;
    }
    string(){//Check if string
        const { input, field } = this.props;
        this.validationStackPush((resolve, reject)=>{
            if(typeof input === "string"){
                return resolve(true);
            }
            return reject({validator:"string"});
        })
        return this;
    }
    number(argument:boolean = false){ //True means convert the string into number if it is a string with a number
        const { input } = this.props;
        const THIS = this;
        this.validationStackPush((resolve, reject)=>{
            console.log(input, typeof input === "number" )
            if(typeof input === "number"){
                return resolve(true);
            }
            if(typeof input === "string" && !isNaN(Number(input))){
                THIS.props.input = argument? Number(input) : input;
                return resolve(true);
            }

            return reject({validator:"number"});
        })
        return this;
    }
    date(argument: boolean = false){
        const { input } = this.props;
        const THIS = this;
        this.validationStackPush((resolve, reject)=>{
            if(input instanceof Date){
                return resolve(true);
            }
            if(typeof input === "string" || typeof input === "number"){
                const date = new Date(input);
                if( isNaN(Number(date)) ){
                    if(argument)
                        THIS.props.input = date;
                    return resolve(true);
                }
            }

            return reject({validator:"date"});
        })
        return this;
    }

    regex( argument: string|typeof RegExp|any[] ){
        const THIS = this;
        const { input } = THIS.props;
        this.validationStackPush((resolve, reject)=>{
            argument = anyToArr(argument);
            if(
                argument.every(x=>{
                    return toRegex(x).test(input);
                })
            ){
                return resolve(true);
            }

            return reject({validator:"regex"});
        })
        return this;
    }
    notRegex( argument: string|typeof RegExp|any[] ){
        const THIS = this;
        const { input } = THIS.props;
        this.validationStackPush((resolve, reject)=>{
            argument = anyToArr(argument);
            if(
                argument.every(x=>{
                    return !toRegex(x).test(input);
                })
            ){
                return resolve(true);
            }

            return reject({validator:"notRegex"});
        })
        return this;
    }

    max(argument:number){
        const THIS = this;
        const { input } = THIS.props;
        this.validationStackPush((resolve, reject)=>{
            if(typeof input === "string" && input.length <= argument){
                return resolve(true);
            }else if(typeof input === "number" && input <= argument){
                return resolve(true);
            }else if(typeof input === "object" && Array.isArray(input) && input.length <= argument ){
                return resolve(true);
            }else if(typeof input === "object" && Object.keys(input).length <= argument){
                return resolve(true);
            }

            return reject({validator:"max", arg:[argument]});
        })
        return this;
    }
    min(argument:number){
        const THIS = this;
        const { input } = THIS.props;
        this.validationStackPush((resolve, reject)=>{
            if(typeof input === "string" && input.length >= argument){
                return resolve(true);
            }else if(typeof input === "number" && input >= argument){
                return resolve(true);
            }else if(typeof input === "object" && Array.isArray(input) && input.length >= argument ){
                return resolve(true);
            }else if(typeof input === "object" && Object.keys(input).length >= argument){
                return resolve(true);
            }

            return reject({validator:"min", arg:[argument]});
        })
        return this;
    }
    same(argument: this){//accept argument as instance of this class;
        const THIS = this;
        const { input } = THIS.props;
        this.validationStackPush((resolve, reject)=>{
            if( argument.getInput() === input ){
                return resolve(true);
            }

            return reject({validator:"same", arg:[argument.getField()]});
        })
        return this;
    }
    match(argument:any[]|string|number){//Match the given Array
        const THIS = this;
        const { input } = THIS.props;
        this.validationStackPush((resolve, reject)=>{
            argument = anyToArr(argument, ",");
            if( argument.some(x=>(x).toString()===input.toString()) ){
                return resolve(true);
            }
            return reject({validator:"same", arg:argument});
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
    public async validate(){
        const THIS = this;
        const { action } = THIS;
        const { field, display } = THIS.props;

        const actionPromise = action.map(x=>{
            return ()=>{//I use callback so that error will happen under the try catch field
                return new Promise((resolve, reject)=>{
                    x(resolve, reject);
                })
            };
        })

        async function iterateValidation(validator: any[] = actionPromise, current = 0){
            if(action.length <= current){//It means that it reaches the validation stack limit and there is no error found.
                return true;
            }
            try{
                const result = await actionPromise[current]()//check the current validation by hitting with await
                if(result === true){
                    return iterateValidation(validator, current+1);//call this again to do the next one if there is no error found.
                }
            }catch(e: any){//e returns the ff key in an object: validator-the name of validation, arg-array that returns additional options.
                let errorMessage:string = "";
                errorMessage += THIS.errorMessages[e.validator].replace("%field%", display?field:display)
                if(e.arg){
                    e.arg.forEach((element:string, index:number) => {
                        errorMessage = errorMessage.replace(`%arg${index+1}%`, element);
                    });
                }
                return errorMessage;
            }
        }
        const result =  await iterateValidation();
        if(result){//Remove Stored after using it
            this.action = [];
            this.input("");
        }
        return result;
    }
    //--Processing Methods--//

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