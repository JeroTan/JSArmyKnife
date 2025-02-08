/**
 * Welcome to Validation Helper. The purpose of this helper is to streamline validation of forms coming from client-side or server-side (Which you may extends this on another directory to add server-side validation.).
 *  
 * Helper that you may use
 * For Extending
 * - ValidationErrorMessage
 * - Validation - The use case of extending this one is to separate general validation from server-side validation
 * 
 * General Use
 * - Validation
 *      - ValidationResult
 * - validationFactory() - use for creating multiple instance of validation
 * - validationRunner() - use for multiple processing of validation
 */

import { anyToArr, toRegex } from "../parse/conversion";
import { capitalFirst } from "../parse/string";

/*|------------------------------------------------------------------------------------------|*/
/*|               Interface or Variable Definition                                           |*/
/*|------------------------------------------------------------------------------------------|*/
interface VALIDATION_PROPS{
	input:any;
	field:string;
	display?:string|undefined;
}
interface REJECT_ARGUMENT{
	validator: string,
	args?:(string|any)[],
}

type VALIDATION_RESPONSE = (thisClass: any)=>Promise<true|REJECT_ARGUMENT>|true|REJECT_ARGUMENT;
export interface VALIDATION_ERROR_MESSAGE{
	required:string,
	string:string,
	number:string,
	date:string,
	regex:string,
	notRegex:string,
	max:string,
	min:string,
	same:string,
	match:string,
	modInput:string,
	custom:string,
	[key: string|number]: string,
}
export const validationErrorMessage:VALIDATION_ERROR_MESSAGE = { //feel free to extend this one too and change the content of errorMessages in Validation Class;
	required:'%field% is required.',
	string:'%field% is an invalid string.',
	number:'%field% is an invalid number.',
	date:'%field% contains invalid date.',
	regex:'%field% is invalid.',
	notRegex:'%field% is invalid.',
	max:'A maximum limit of %arg1% is reached.',
	min:'A minimum limit of %arg1% is reached.',
	same:'%field% didn\'t match with %arg1%.',
	match:'%field% only accepts the following: %arg1%.',
	modInput:'%field% data conversion contains error in processing',
	custom: '%field% is invalid.',
}

/*|------------------------------------------------------------------------------------------|*/
/*|               Validation Abstraction                                                     |*/
/*|------------------------------------------------------------------------------------------|*/
// interface Validation_Interface{
//     props:VALIDATION_PROPS,
//     action:VALIDATION_RESPONSE[],
//     errorMessages:VALIDATION_ERROR_MESSAGE,
// }

export class Validation{
	props:VALIDATION_PROPS = { input: "", field: "" }
	action:VALIDATION_RESPONSE[] = [];
	errorMessages:VALIDATION_ERROR_MESSAGE = {...validationErrorMessage};

	constructor(input:any = undefined, field:string|undefined = undefined, display:string|undefined = undefined ){
		if(input)
			this.input(input);
		if(field)
			this.field(field);
		if(display)
			this.display(display);
	}

	//--Setter--//
	public input<INPUT_TYPE>(d:INPUT_TYPE){
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
	protected validationStackPush(process: VALIDATION_RESPONSE){
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
	/**
	 * 
	 * @param argument Turn the input value if string into a number for the next validation purposes.
	 */
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

	regex( argument: string|RegExp|RegExpConstructor|(string|RegExp|RegExpConstructor)[] ){
		this.validationStackPush((THIS)=>{
			const { input } = THIS.props;
			const arrayArgument = anyToArr(argument as string);
			if(
				arrayArgument.every(x=>{
					return toRegex(x).test(input);
				})
			){
				return true
			}

			return {validator:"regex"};
		})
		return this;
	}
	notRegex( argument: string|RegExp|RegExpConstructor|(string|RegExp|RegExpConstructor)[] ){
		this.validationStackPush((THIS)=>{
			const { input } = THIS.props;
			const arrayArgument = anyToArr(argument as string);
			if(
				arrayArgument.every(x=>{
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

			return {validator:"max", args:[argument]};
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

			return {validator:"min", args:[argument]};
		})
		return this;
	}
	same(argument: this){//accept argument as instance of this class;
		this.validationStackPush((THIS)=>{
			const { input } = THIS.props;
			if( argument.getInput() === input ){
				return true
			}

			return {validator:"same", args:[argument.getField()]};
		})
		return this;
	}
	match(argument:Array<string|number>|string|number){//Match the given Array
		this.validationStackPush((THIS)=>{
			const { input } = THIS.props;
			argument = anyToArr(argument as string, ",");
			if( argument.some(x=>(x).toString()===input.toString()) ){
				return true
			}
			return {validator:"same", args:argument};
		})
		return this;
	}
	modInput(argument:(input:any|string|number)=>any|string|number){
		this.validationStackPush((THIS)=>{
			try{
				THIS.props.input =  argument(THIS.props.input);
			}catch(e){
				return {validator:"modInput"}
			}
			return true;
		})
		return this;
	}
	custom(argument:(props: VALIDATION_PROPS)=>true|{validator:string, args?:Array<string|number>}|Promise<true|{validator:string, args?:Array<string|number>}> ){
		this.validationStackPush((THIS)=>{
			return argument(THIS.props);
		})
		return this;
	}
	//--Public Object Method--//

	//--Processing Methods--//
	public messages(customMessages: Partial<VALIDATION_ERROR_MESSAGE>){
		const THIS = this;
	
		Object.keys(customMessages).forEach((key:keyof VALIDATION_ERROR_MESSAGE)=>{
      if(THIS.errorMessages[key] !== undefined && customMessages[key] !== undefined)
			  THIS.errorMessages[key] = customMessages[key];
		})
		return this;
	}
	public validate():ValidationResult;
	public validate(raw:false):ValidationResult;
	public validate(raw:true):Promise<string|true>;
	public validate(raw=false):ValidationResult | Promise<string|true>{ //String only works on raw
		const THIS = this;
		const { action } = THIS;
		const { field, display } = THIS.props;

		async function iterateValidation(validator: VALIDATION_RESPONSE[] = action, current = 0){
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
				if(THIS.errorMessages[result.validator] === undefined){
					THIS.errorMessages[result.validator] = "%field% is invalid.";
				}
				let errorMessage:string = THIS.errorMessages[result.validator].replace("%field%", display?display:capitalFirst(field));
				if(result.args){
					result.args.forEach((element:string, index:number) => {
						errorMessage = errorMessage.replace(`%arg${index+1}%`, element);
					});
				}
				return errorMessage;
			}
		}

		//Return a promise for ValidationResult Class
		if(raw){
			return new Promise((resolve)=>{
				iterateValidation().then(x=>{
					if(x===true)
						resolve(true);
					resolve(x);
				});
			});
		}
		return new ValidationResult(iterateValidation());
		
	}
	//--Processing Methods--//

}

/*|------------------------------------------------------------------------------------------|*/
/*|               Validation Result Container                                                |*/
/*|------------------------------------------------------------------------------------------|*/
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
	fail(callback: (errorMessage:string)=>void): this{
		this.validationPromise.then(x=>{
			if(x!==true && typeof x === "string"){
				callback(x);
			}
		})
		return this;
	}
	async promise(callback?: Function|undefined): Promise<string|true|undefined|void>{
		const data = await this.validationPromise;
		if(callback)
			callback(data);
		
		return data;
	}
}

/*|------------------------------------------------------------------------------------------|*/
/*|               Validation Construction or Factory                                         |*/
/*|------------------------------------------------------------------------------------------|*/
export interface ValidationFactoryList<Type>{
	[key: string|number]: Type,
}
export function validationFactory<Type>(total:number|(string|number)[], ValidationClass: new(...args:any[])=>Type, ...args:any ): ValidationFactoryList<Type>{ //total string array is for FieldName
	const result:ValidationFactoryList<Type> = {};

	if(typeof total === "number")
		total = [...Array(total)];
	
	total.forEach((x:string|number)=>{
		const newConstruct = new ValidationClass(...args);
		(newConstruct as {field:Function}).field(String(x));
		
		result[x] = newConstruct ;
	});

	return result;
}
export interface ValidationRunnerList{
	[key: string|number]: ValidationResult|string|true,
}
//Run all validation in the object and return in object as well containing true or error message
export async function validationRunner<Type>(validatorList:ValidationFactoryList<Type>, resultOnly = false):Promise<ValidationRunnerList>{
	const result:ValidationRunnerList = {}
	for(const i in validatorList){
		const ValConstruct = validatorList[i] as {validate:<T extends true|false>(raw?:boolean)=>T extends false ? ValidationResult : Promise<string|true>};
	   
		if(resultOnly){
			const promiseData = await ValConstruct.validate<false>().promise();
			if(promiseData === undefined) continue;
			result[i] = promiseData;
		}else{
			result[i] = ValConstruct.validate<false>();
		}
	}

	return result;
}