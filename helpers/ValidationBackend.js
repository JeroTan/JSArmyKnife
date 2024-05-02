import { Validation } from "./Validation.js";
import { db } from "./DatabaseBackend.js";


export class ValidationBackend extends Validation{
    unique(argument=[], customMessage=false){
        return this.addValidateAction((resolve, reject)=>{
            argument = anyToArr(argument, ",");
            const ThisInput = this.input;
            const This = this; //To get a global scope of this;
            (async()=>{
                const result = await db(argument[0]).where( {[argument[1]]: ThisInput} ).first();
                if(!result)
                    resolve(true);
            
                const errorMessage = `"${ThisInput}" is already exist.`;
                This.createErrorMessage(reject, customMessage, errorMessage);
                
            })();
        });
    }
}