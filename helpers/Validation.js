import { anyToArr } from "./ParseArgument.js";

/*****************TEMPLATE //Do not touch *********************/
export class Validation{
    constructor(input = "", fieldName = ""){
        this.input = input;
        this.fieldName = fieldName;
        this.action = [];
    }

    //--Setter--//
    addInput(d){
        this.input = d;
        return this;
    }
    addField(d){
        this.fieldName = d;
        return this;
    }
    addNameAttribute(d){
        this.nameAttribute = d;
        return this;
    }
    //--Setter--//

    //--Internal--//
    addValidateAction(process){
        this.action[this.action.length] = async ()=>{
            return await new Promise((resolve, reject)=>{
                process(resolve, reject);
            });
        }
        return this;
    }
    parseCustomMessage(d){
        if(typeof(d) === "function"){
            return d(this.nameAttribute ?? this.fieldName);//Allow them to have a callback to get the field name;
        }
        return d;
    }
    createErrorMessage(reject, custom, original){
        if(custom)
            return reject(this.parseCustomMessage(custom));
        
        reject(original);
    }
    getFieldName(){
        return this.nameAttribute ?? capitalFirst(this.fieldName);
    }
    //--Internal--//

    //--Public Object Method--//
    required(argument=[], customMessage=false){
        
        return this.addValidateAction((resolve, reject)=>{
            if(this.input !== null && this.input !== undefined && this.input !== "" && this.input !== 0 && (Array.isArray(this.input) ? this.input.length > 0 :true ) ){
                return resolve(true);
            }

            const errorMessage = `${this.getFieldName()} is required.`;
            return this.createErrorMessage(reject,customMessage,errorMessage);
        });
    }
    string(argument=[], customMessage=false){//Check if string
        return this.addValidateAction((resolve, reject)=>{
            if(typeof this.input === "string"){
                return resolve(true);
            }

            const errorMessage = `${this.getFieldName()} is not a string.`;
            return this.createErrorMessage(reject,customMessage,errorMessage);
        });
    }
    number(argument=[false], customMessage=false){
        return this.addValidateAction((resolve, reject)=>{
            argument = anyToArr(argument, ",");
            if(typeof this.input === "number"){
                return resolve(true);
            }

            if(typeof this.input === "string" && !isNaN(this.input)){
                if(argument[0])
                    this.input =  Number(this.input);
                return resolve(true);
            }

            const errorMessage = `${this.getFieldName()} is an invalid number.`;
            return this.createErrorMessage(reject,customMessage,errorMessage);
        });
    }
    date(argument=[], customMessage = false){
        return this.addValidateAction((resolve, reject)=>{
            argument = anyToArr(argument, ",");
            if(this.input instanceof Date){
                return resolve(true);
            }

            if(typeof this.input === "string" || typeof this.input === "number"){
                if(new Date(this.input) != "Invalid Date"){
                    return resolve(true);
                }
            }

            const errorMessage = `${this.getFieldName()} contains invalid date.`;
            return this.createErrorMessage(reject,customMessage, errorMessage );
        });
    }
    
    regex(argument=[], customMessage=false){
        return this.addValidateAction((resolve, reject)=>{
            const ThisInput = this.input;
            argument = anyToArr(argument, ",");
            if(
                argument.every(x=>{
                    return getRegex(x).test(ThisInput);
                })
            ){
                return resolve(true);
            }

            const errorMessage = `${this.getFieldName()} is invalid.`;
            return this.createErrorMessage(reject,customMessage,errorMessage);
            
        });
    }
    notRegex(argument=[], customMessage=false){
        return this.addValidateAction((resolve, reject)=>{
            const ThisInput = this.input;
            argument = anyToArr(argument, ",");
            if(
                argument.every(x=>{
                    return !getRegex(x).test(ThisInput);
                })
            ){
                return resolve(true);
            }

            const errorMessage = `${this.getFieldName()} is invalid.`;
            return this.createErrorMessage(reject,customMessage, errorMessage);
        });
    }
    max(argument=[], customMessage=false){
        return this.addValidateAction((resolve, reject)=>{
            argument = anyToArr(argument, ",");
            if(typeof this.input === "string" && this.input.length <= argument[0]){
                return resolve(true);
            }
            else if(typeof this.input === "number" && this.input <= argument[0]){
                return resolve(true);
            }

            

            let errorMessage = `${this.getFieldName()} exceeded the limit of ${argument[0]}.`;
            if(typeof this.input === "string"){
                errorMessage = `${this.getFieldName()} exceeded the character limit of ${argument[0]}.`;
            }else if(typeof this.input === "number"){
                errorMessage = `${this.getFieldName()} must be no more than ${argument[0]}.`;
            }

            return this.createErrorMessage(reject,customMessage, errorMessage);
        });
    }
    min(argument=[], customMessage=false){
        return this.addValidateAction((resolve, reject)=>{
            argument = anyToArr(argument, ",");
            if(typeof this.input === "string" && this.input.length >= argument[0])
                return resolve(true);
            else if(typeof this.input === "number" && this.input >= argument[0]){
                return resolve(true);
            }

            let errorMessage = `${this.getFieldName()} must be minium of; ${argument[0]}.`;
            if(typeof this.input === "string"){
                errorMessage = `${this.getFieldName()} must be at least ${argument[0]} character length.`;
            }else if(typeof this.input === "number"){
                errorMessage = `${this.getFieldName()} must be less than ${argument[0]}.`;
            }

            return this.createErrorMessage(reject,customMessage, errorMessage);
        });
    }
    same(argument=[], customMessage=false){//accept argument as instance of this class;
        return this.addValidateAction((resolve, reject)=>{
            argument = anyToArr(argument, ",");
            if( argument[0].input === this.input )
                return resolve(true);
 
            const errorMessage = `${this.getFieldName()} is not the same with ${argument[0].fieldName}`;
            return this.createErrorMessage(reject,customMessage, errorMessage);
        });
    }
    match(argument=[], customMessage=false){//Match the given Array
        return this.addValidateAction((resolve, reject)=>{
            argument = anyToArr(argument, ",");
            if( argument.some(x=>(x).toString()===(this.input).toString() ))
                return resolve(true);

            const errorMessage = `${this.getFieldName()} only accepts the following: ${argument.join(", ").substring(-2)}`;
            return this.createErrorMessage(reject,customMessage, errorMessage);
           
        });
    }

    //--Public Object Method--//


    async validate(response = false){
        const ThisAction = this.action;
        async function doValidation(action = ThisAction, current = 0){
            if(action.length <= current){
                return true;
            }

            try{
                const result =  await action[current](); //check the current validation
                if(result === true){
                    return await doValidation(action, current+1);//call this again to do the next one
                }
                
            }catch(e){
                return e;
            }
        }
        const result = await doValidation();
        if(response === false){
            return result;
        }else{
            if(result!== true){
                response.status(422).json( {[this.fieldName]: result} );
                return true;
            }else{
                response.sendStatus(200);
                return false;
            }
        }
        
    }
}



//InstanceGenerator
export function generateValidateInstance(total){
    return [...Array(total)].map(x=>new Validation);
}
//Validate Multiple Instance
export async function multiValidate(valInst){
    const errorData = {};

    for(const v of valInst){
        const result = await v.validate();

        if(result !== true){
            errorData[v.fieldName] = result;
        }   
    }

    return errorData;
}
