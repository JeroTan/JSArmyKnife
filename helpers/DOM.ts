import type { ChangeEvent } from "react";

interface Swapper{
    id: string|HTMLElement;
    mk?: string|string[];
    rm?: string|string[];
}

export function swapClass(query:Swapper|Swapper[], recalculate:boolean = false){
    /* //This is the nostalgic JQuery
        $(keys).removeClass(query[keys][0]);
        $(keys).addClass(query[keys][1]);
        $(keys)[0].offsetHeight;
    */

    //This function contains logic to swap class
    function swap(id:string|HTMLElement, mk?:string|string[], rm?:string|string[]){
        const element = id instanceof HTMLElement ? id :  document.querySelector<HTMLElement>(id);
        if(rm){
            if(typeof rm === "string"){
                rm = rm.trim().split(" ");
            }
            element?.classList.remove(...rm);
        }
        if(mk){
            if(typeof mk === "string"){
                mk = mk.trim().split(" ");
            }
            element?.classList.add(...mk);
        }

        //dom re-calculate
        if(recalculate)
            element?.offsetHeight;
    }
    
    //Either list of swapping or normal swap
    if(!Array.isArray(query)){
        swap(query.id, query.mk, query.rm);
        return;
    }
    query.forEach(q=>{
        swap(q.id, q.mk, q.rm);
    })
    return;
}

//Use this to create new element
class Element{
    newElement: HTMLElement|undefined|null|Node;
    headElement: HTMLElement|undefined|null|Node;
    tailElement: HTMLElement|undefined|null|Node;

    constructor(newElement:HTMLElement|undefined){
        if(newElement)
            this.element(newElement);
    }
    element(newElement:HTMLElement|string){
        if(typeof newElement === "string"){
            this.newElement = document.createElement(newElement);
        }else{
            this.newElement = newElement;
        }
        return this;
    }
    head(element:HTMLElement|string){
        if(typeof element === "string"){
            this.headElement = document.querySelector<HTMLElement>(element);
        }
        else{
            this.headElement = element;
        }
        return this;
    }
    tail(element:HTMLElement|string){
        if(typeof element === "string"){
            this.tailElement = document.querySelector<HTMLElement>(element);
        }
        else{
            this.tailElement = element;
        }
        return this;
    }
    merge(){
        if(this.headElement && this.newElement)
            this.headElement?.appendChild(this.newElement);
        if(this.tailElement && this.newElement)
            this.newElement.appendChild(this.tailElement);
        return this.newElement;
    }
}

//Use this to control load order of event listener onload
export class LoadOrder{
    private orderStack:Function[] = [];
    
    push(callback:Function){
        this.orderStack.push(callback);
    }

    cutIn(index:number, callback:Function){
        this.orderStack.splice(index, 0, callback)
        return this;
    }
    
    insert(index:number, callback:Function){
        this.orderStack[index] = callback;
        return this;
    }

    run(){
        const THIS = this;
        window.addEventListener("load", ()=>{
            THIS.orderStack.forEach(x=>x());
        })
    }
}


//Clone and destroy the copy after it's usage on callback. It will have a hidden copy in the document body.
export function shadowClone<T extends HTMLElement>(element:T, callback:(e:T)=>void){ 
    const clonedElement = element.cloneNode(true) as HTMLElement;
    document.body.appendChild(clonedElement);
    clonedElement.style.opacity = "0";
    clonedElement.style.position = "absolute";
    clonedElement.style.pointerEvents = "none";
    clonedElement.style.visibility = "hidden";
    callback(clonedElement as T);
    clonedElement.remove();
}

//Trigger event manually
export function elementTrigger(eventName:string, element:HTMLElement){
    element.dispatchEvent(new Event(eventName));
}


/*|------------------------------------------------------------------------------------------|*/
/*|               FIELD BINDING                                                              |*/
/*|------------------------------------------------------------------------------------------|*/
type INPUT_FIELD = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement;

export class FieldBinding{
    private inputDOM:{[key:string|number]:INPUT_FIELD} = {};
    private errorDOM:{[key:string|number]:INPUT_FIELD} = {};
    private oldInputValue:{[key:string|number]:string} = {};
    private oldErrorValue:{[key:string|number]:string} = {};

    private inputOffsetName:string = "";
    private errorOffsetName:string = "";

    private listenerElement:HTMLButtonElement = document.createElement("button");

    constructor(inputOffsetName?:string, errorOffsetName?:string){//IF YOU HAVE TIME MAYBE ADD A CLICK EVENT LISTENER HERE ALREADY THEN JUST ADD ARRAY LIST THAT WILL RUN ONCE METHOD LISTEN IS CALLED
        if(inputOffsetName){
            this.setInputOffsetName(inputOffsetName);
        }
        if(errorOffsetName){
            this.setErrorOffsetName(errorOffsetName);
        }
    }

    //--Setter--//
    public setInputOffsetName(offset:string){
        this.inputOffsetName = offset;
        return this;
    }
    public setErrorOffsetName(offset:string){
        this.errorOffsetName = offset;
        return this;
    }
    //--Setter--//

    //--In House--//
    private addField(name:string|number, offsetName:string, fieldList:{[key:string|number]:INPUT_FIELD},  field?:INPUT_FIELD|string|undefined){
        fieldList[name] = (field !== undefined && typeof field !== "string") ? field : (document.getElementById(typeof field === "string" && field !== undefined ? field : offsetName+name) as INPUT_FIELD);
        return this;
    }
    private listenTrigger(field: INPUT_FIELD|string|number, offsetName:string, triggerUpdate = false, callback?:Function){
        field = typeof field === "string" || typeof field === "number" ? (document.getElementById(offsetName+String(field)) as INPUT_FIELD) : field;
        if(field === null)
            return;
        //const whatEvent = field instanceof HTMLSelectElement ? "change" : "input";
        let inputIsTriggered = false; //Check if input is triggered already so that change event will not follow up
        const THIS = this;
        field.addEventListener("input", (e)=>{//Trigger this when input change.
            inputIsTriggered = true;
            
            if(callback)
                callback(e);
            if(triggerUpdate)
                THIS.listenerElement.click();
        })
        field.addEventListener("change", (e)=>{//Trigger this when input change.
            if(inputIsTriggered){
                inputIsTriggered = false;
                return;
            }
            
            if(callback)
                callback(e);
            if(triggerUpdate)
                THIS.listenerElement.click();
        })
    }
    private removeField( name:string|number|Array<string|number>, oldField:{[key:string|number]:INPUT_FIELD} ){
        const THIS = this;
        const newField:{[key:string|number]:INPUT_FIELD} = {}
        Object.keys(oldField).forEach((i)=>{
            if(Array.isArray(name) ){
                let removeIndex = 0;
                if(name.length > 0 && name.some((x, thisI)=>{
                    if(x === i){
                        removeIndex = thisI;
                        return true;
                    }
                })){
                    name.splice(removeIndex, 1);
                    return;
                }
            }else{
                if(name === i)
                    return;
            }
            newField[i] = THIS.inputDOM[i];
        })
        return newField;
    }
    private getValue(list:{[key:string|number]:INPUT_FIELD}, name:string|number|undefined|Array<string|number> = undefined):{[key:string|number]:string}|string{
        if(name === undefined){//Return all if undefined
            const newData:{[key:string|number]:string} = {};
            Object.keys(list).forEach(i => {
                if(!list[i] || list[i].value === null){
                    newData[i] = "";
                    return;
                }
                newData[i] = list[i].value;
            });
            return newData;
        }
        if(typeof name === "string" || typeof name === "number"){//Return only the string value if not
            if(!list[name] || list[name].value === null)
                return "";
            return list[name].value;
        }
        const newData:{[key:string|number]:string} = {};
        name.forEach((thisName)=>{
            if(!list[thisName] || list[thisName].value === null){
                newData[thisName] = "";
                return;
            }
            newData[thisName] = list[thisName].value;
        });
        return newData;
    }
    private setValue(field:{[key:string|number]:INPUT_FIELD}, name:string|number|Array<string|number>|{[name:string|number]:string}, value?:string, silent:boolean = false){
        if(typeof name === "string" || typeof name === "number"){
            field[name].value = String(value);
            if(!silent){
                // elementTrigger('change', field[name]);
                elementTrigger('input', field[name]);
            }
            return this;
        }
        if(Array.isArray(name)){
            name.forEach(ei=>{
                field[String(ei)].value = value === undefined ? "" : value;
                if(!silent){
                    // elementTrigger('change', field[String(ei)]);
                    elementTrigger('input', field[String(ei)]);
                }
                
            })
        }
        name = name as {[name:string|number]:string};
        Object.keys(name).forEach((ei:string) => {
            if(field[ ei ] === undefined)
                return;
            field[ ei ].value = name[ei];
            if(!silent){
                // elementTrigger('change', field[String(ei)]);
                elementTrigger('input', field[String(ei)]);
            }
        });
    }
    //--In House--//

    //--Functionalities--//
    public addInputField(name:string|number|string[], field?:INPUT_FIELD|string|undefined|Array<INPUT_FIELD|string|undefined>, includeError = false){//Error will only get the names not the field so be careful
        if( !Array.isArray(name) && !Array.isArray(field) ){
            field = (field === undefined ? name : field) as string;
            this.addField(name, this.inputOffsetName, this.inputDOM, field);
            this.listenTrigger(name, this.inputOffsetName, true);
            this.oldInputValue[name] = "";
            if(includeError){
                this.addField(name, this.errorOffsetName, this.errorDOM)
                this.listenTrigger(name, this.errorOffsetName, true);
                this.oldErrorValue[name] = "";
            }
            return this;
        }
        if( Array.isArray(name) ){
            for(let i = 0; i < name.length; i++){
                const thisField = Array.isArray(field) ? field[i] : ( field === undefined ? name[i] : field );
                this.addField(name[i], this.inputOffsetName, this.inputDOM,  thisField);
                this.listenTrigger(name[i], this.inputOffsetName, true);
                this.oldInputValue[name[i]] = "";
                if(includeError){
                    this.addField(name[i], this.errorOffsetName, this.errorDOM );
                    this.listenTrigger(name[i], this.errorOffsetName, true);
                    this.oldErrorValue[name[i]] = "";
                }
                    
            }
        }
        return this;
    }

    public addErrorField(name:string|number|string[], field?:INPUT_FIELD|string|undefined|Array<INPUT_FIELD|string|undefined>){
        if( !Array.isArray(name) && !Array.isArray(field) ){
            field = (field === undefined ? name : field) as string;
            this.addField(name, this.errorOffsetName,  this.errorDOM, field);
            this.listenTrigger(name, this.errorOffsetName, true);
            this.oldErrorValue[name] = "";
            return this;
        }
        if( Array.isArray(name) && Array.isArray(field) ){
            for(let i = 0; i < name.length; i++){
                const thisField = Array.isArray(field) ? field[i] : ( field === undefined ? name[i] : field );
                this.addField( name[i], this.errorOffsetName, this.errorDOM, thisField);
                this.listenTrigger(name[i], this.errorOffsetName, true);
                this.oldErrorValue[name[i]] = "";
            }
        }
        return this;
    }

    public removeInputField(name:string|string[]){
        this.inputDOM = this.removeField(name, this.inputDOM );
        return this;
    }

    public removeErrorField(name:string|string[]){
        this.errorDOM = this.removeField(name, this.errorDOM );
        return this;
    }

    public getInput(name:string|number|undefined|Array<string|number> = undefined){ //If not defined then return all, if define by string return one, if define by array return that array
        return this.getValue(this.inputDOM, name);
    }

    public getError(name?:string|number|undefined|Array<string|number>){//same with value but error
        return this.getValue(this.errorDOM, name);
    }

    public setInput(name:string|number|Array<string|number>|{[name:string|number]:string}, value?:string|undefined, silent:boolean = false){
        this.setValue(this.inputDOM, name, value, silent);
        return this;
    }

    public setError(name:string|number|Array<string|number>|{[name:string|number]:string}, value?:string|undefined, silent:boolean = false){
        this.setValue(this.inputDOM, name, value, silent);
        return this;
    }

    inputElement(name:string){
        return this.inputDOM[name];
    }
    errorElement(name:string){
        return this.errorDOM[name];
    }

    public validation( listToValidate:{[key:string|number]: (input:string)=>(string|Promise<string>)} ){
        const THIS = this;
        Object.keys(listToValidate).forEach(name=>{
            //Get the validation result already. For oldErrorValue Reference
            const validationResults = listToValidate[name]("");
            if(typeof validationResults === "string"){
                THIS.oldErrorValue[name] = validationResults;
            }else{
                (validationResults as Promise<string>).then(x=>{
                    THIS.oldErrorValue[name] = x as string;
                }) 
            }

            THIS.listenTrigger(THIS.inputDOM[name], THIS.inputOffsetName, false, ()=>{
                const validationResults = listToValidate[name](THIS.inputDOM[name].value);
                if(typeof validationResults === "string"){
                    THIS.errorDOM[name].value = validationResults;
                    elementTrigger("input",THIS.errorDOM[name]);
                    elementTrigger("change",THIS.errorDOM[name]);
                }
                (validationResults as Promise<string>).then(x=>{
                    THIS.errorDOM[name].value = x as string;
                    elementTrigger("input",THIS.errorDOM[name]);
                    elementTrigger("change",THIS.errorDOM[name]);
                })             
            })
            
        })
    }

    public listen(callback:(input:{[key:string|number]:string}, error:{[key:string|number]:string})=>void){
        const THIS = this;
        this.listenerElement.addEventListener("click", (e)=>{
            const input = THIS.getInput() as {[key:string|number]:string};
            const error = THIS.getError() as {[key:string|number]:string};
            callback(input, error);
        });
    }

    public listenToInput(whatField:Array<string|number>, callback:(input:{[key:string|number]:string}, error:{[key:string|number]:string})=>void, returnAll = false){
        const THIS = this;
        this.listen((input, error)=>{
            let isChange = false;
            whatField.forEach((x)=>{
                if(input[x] !== THIS.oldInputValue[x] ){
                    isChange = true;
                    THIS.oldInputValue[x] = input[x];
                }
            })
            if(isChange)
                callback(returnAll ? input : (THIS.getInput(whatField) as {[key:string|number]:string}), returnAll ? error : (THIS.getError(whatField) as {[key:string|number]:string}) );
        });

    }
    public listenToError(whatField:Array<string|number>, callback:(input:{[key:string|number]:string}, error:{[key:string|number]:string})=>void, returnAll = false){
        const THIS = this;
        this.listen((input, error)=>{
            let isChange = false;
            whatField.forEach((x)=>{
                if(error[x] !== THIS.oldErrorValue[x] ){
                    isChange = true;
                    THIS.oldErrorValue[x] = error[x];
                }
            })
            if(isChange)
                callback(returnAll ? input : (THIS.getInput(whatField) as {[key:string|number]:string}), returnAll ? error : (THIS.getError(whatField) as {[key:string|number]:string}) );
        });
    }

    public listenTo(inputField:Array<string|number>, errorField:Array<string|number>|true, callback:(input:{[key:string|number]:string}, error:{[key:string|number]:string})=>void, returnAll = false){
        const THIS = this;
        this.listen((input, error)=>{
            let isChange = false;
            inputField.forEach((x)=>{
                if(input[x] !== THIS.oldInputValue[x] ){
                    isChange = true;
                    THIS.oldInputValue[x] = input[x];
                }
            });
            
            (errorField === true ? inputField: errorField).forEach((x)=>{
                if(error[x] !== this.oldErrorValue[x]){
                    isChange = true;
                    THIS.oldErrorValue[x] = error[x];
                }
            })
            if(isChange)
                callback(returnAll ? input : (THIS.getInput(inputField) as {[key:string|number]:string}), returnAll ? error : (THIS.getError((errorField === true ? inputField: errorField)) as {[key:string|number]:string}) );
        });
    }

    public fieldNoError(excluded:Array<string|number> = [],  reverse = false){
        const THIS = this;
        return Object.keys(this.oldErrorValue).every(index=>{
   
            if( reverse ? !excluded.includes(index) : excluded.includes(index) ){
                return true;
            }
            if(THIS.oldErrorValue[index] === ""){
                return true;
            }
            return false;
        })
    }

    //--Functionalities--//
}
