import { elementTrigger } from "./utility";
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

  private listenersStack:Function[] = [];

  constructor(inputOffsetName?:string, errorOffsetName?:string){
    if(inputOffsetName){
      this.setInputOffsetName(inputOffsetName);
    }
    if(errorOffsetName){
      this.setErrorOffsetName(errorOffsetName);
    }

    const THIS = this;
    this.listenerElement.addEventListener("click", ()=>{
      const input = THIS.getInput() as {[key:string|number]:string};
      const error = THIS.getError() as {[key:string|number]:string};
      for(const listenFunction of THIS.listenersStack){
        listenFunction(input, error);
      }
    });
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
    let changeIsTriggered = false;
    const THIS = this;
    field.addEventListener("input", (e)=>{//Trigger this when input change.
      inputIsTriggered = true;
      changeIsTriggered = false;
      if(callback)
        callback(e);
      if(triggerUpdate)
        THIS.listenerElement.click();
    })

    field.addEventListener("change", (e)=>{//Trigger this when input change.
      if(inputIsTriggered && !changeIsTriggered){
        inputIsTriggered = false;
        return;
      }

      if(callback)
        callback(e);
      if(triggerUpdate)
        THIS.listenerElement.click();
      changeIsTriggered = true;
      inputIsTriggered = false;
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
  private setValue(field:{[key:string|number]:INPUT_FIELD}, name:string|number|Array<string|number>|{[name:string|number]:string}, value?:string, silent:boolean = false, useChange = false){
    if(typeof name === "string" || typeof name === "number"){
      field[name].value = value === undefined ? "" : value;
      if(!silent){
        // elementTrigger('change', field[name]);
        elementTrigger(!useChange?'input':"change", field[name]);
      }
      return this;
    }
    if(Array.isArray(name)){
      name.forEach(ei=>{
        field[String(ei)].value = value === undefined ? "" : value;
        if(!silent){
          // elementTrigger('change', field[String(ei)]);
          elementTrigger(!useChange?'input':"change", field[String(ei)]);
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

  public setInput(name:string|number|Array<string|number>|{[name:string|number]:string}, value?:string|undefined, silent:boolean = false, useChange = false){
    this.setValue(this.inputDOM, name, value, silent, useChange);
    return this;
  }

  public setError(name:string|number|Array<string|number>|{[name:string|number]:string}, value?:string|undefined, silent:boolean = false, useChange = false){
    this.setValue(this.errorDOM, name, value, silent, useChange);
    return this;
  }

  inputElement(name:string){
    return this.inputDOM[name];
  }
  errorElement(name:string){
    return this.errorDOM[name];
  }

  public validation( listToValidate:{[key:string|number]: (input:string)=>(string|true|Promise<string|true>)} ){
    const THIS = this;
    Object.keys(listToValidate).forEach(name=>{
      //Get the validation result already. For oldErrorValue Reference
      const validationResults = listToValidate[name]("");
      if(validationResults instanceof Promise){
        (validationResults as Promise<string>).then(x=>{
          THIS.oldErrorValue[name] = x as string;
        })
      }else{
        THIS.oldErrorValue[name] = validationResults as string;
      }

      THIS.listenTrigger(THIS.inputDOM[name], THIS.inputOffsetName, false, ()=>{
        const validationResults = listToValidate[name](THIS.inputDOM[name].value);
        if(validationResults instanceof Promise){
          (validationResults as Promise<string>).then(x=>{
            THIS.errorDOM[name].value = typeof x === "boolean" ? "" : x as string;
            elementTrigger("input",THIS.errorDOM[name]);
            elementTrigger("change",THIS.errorDOM[name]);
          })
        }else{
          THIS.errorDOM[name].value = validationResults as string;
          elementTrigger("input",THIS.errorDOM[name]);
          elementTrigger("change",THIS.errorDOM[name]);
        }
        
      })
    })
  }

  public listen(callback:(input:{[key:string|number]:string}, error:{[key:string|number]:string})=>void){
    this.listenersStack.push(callback);
  }

  public listenToInput(whatField:Array<string|number>, callback:(input:{[key:string|number]:string}, error:{[key:string|number]:string})=>void, returnAll = false){
    const THIS = this;
    const old:{[key:string|number]:string} = {};
    whatField.forEach(x=>old[x]="");

    this.listen((input, error)=>{
      let isChange = false;
      whatField.forEach((x)=>{
        if(input[x] !== old[x] ){
          isChange = true;
          old[x] = input[x];
          THIS.oldInputValue[x] = input[x];
        }
      });
      if(isChange)
        callback(returnAll ? input : (THIS.getInput(whatField) as {[key:string|number]:string}), returnAll ? error : (THIS.getError(whatField) as {[key:string|number]:string}) );
    });

  }
  public listenToError(whatField:Array<string|number>, callback:(input:{[key:string|number]:string}, error:{[key:string|number]:string})=>void, returnAll = false){
    const THIS = this;
    const old:{[key:string|number]:string} = {};
    whatField.forEach(x=>old[x]="");

    this.listen((input, error)=>{
      let isChange = false;
      whatField.forEach((x)=>{
        if((old[x] === undefined && error[x]!=="") ||  error[x] !== old[x] ){
          isChange = true;
          old[x] = error[x];
          THIS.oldErrorValue[x] = error[x];
        }
      });
      if(isChange)
        callback(returnAll ? input : (THIS.getInput(whatField) as {[key:string|number]:string}), returnAll ? error : (THIS.getError(whatField) as {[key:string|number]:string}) );
    });
  }

  public listenTo(inputField:Array<string|number>, errorField:Array<string|number>|true, callback:(input:{[key:string|number]:string}, error:{[key:string|number]:string})=>void, returnAll = false){
    const THIS = this;
    const old1:{[key:string|number]:string} = {};
    const old2:{[key:string|number]:string} = {};
    inputField.forEach(x=>old1[x]="");
    (errorField === true ? inputField: errorField).forEach(x=>old2[x]="");

    this.listen((input, error)=>{
      let isChange = false;
      inputField.forEach((x)=>{
        if( (old1[x] === undefined && input[x] !== "") ||  input[x] !== old1[x] ){
          isChange = true;
          old1[x] = input[x];
          THIS.oldInputValue[x] = input[x];
        }
      });

      (errorField === true ? inputField: errorField).forEach((x)=>{
        if( (old2[x] === undefined && error[x] !== "") || error[x] !== old2[x] ){
          isChange = true;
          old2[x] = error[x];
          THIS.oldErrorValue[x] = error[x];
        }
      })
      if(isChange)
        callback(returnAll ? input : (THIS.getInput(inputField) as {[key:string|number]:string}), returnAll ? error : (THIS.getError((errorField === true ? inputField: errorField)) as {[key:string|number]:string}) );
    });
  }

  public onBlur(inputField:Array<string|number>, errorField:Array<string|number>, callback:(input:{[key:string|number]:string}, error:{[key:string|number]:string})=>void){
    const THIS = this;
    const piston = document.createElement("button");
    for(const x of inputField){
      if(!THIS.inputDOM[x]){
        console.warn(`Input Field with: ${x} does not exist. Method use in onBlur of FieldBinding Class`);
        continue;
      };
      THIS.inputDOM[x].addEventListener("blur", ()=>{
        piston.click(); 
      });
    };
    piston.addEventListener("click", ()=>{
      callback(THIS.getInput(inputField) as {[key:string|number]:string}, THIS.getError(errorField) as {[key:string|number]:string});
    })
  }

  public fieldNoError(excluded:Array<string|number> = [],  reverse = false){
    const THIS = this;
    return Object.keys(this.errorDOM).every(index=>{
      if( reverse ? !excluded.includes(index) : excluded.includes(index) ){
        return true;
      }
      if(THIS.errorDOM[index].value === ""){
        return true;
      }
      return false;
    })
  }

  public checkEmptyField(name:string|number|undefined|Array<string|number> = undefined, combine = false):boolean|{[key:string|number]:boolean}{
    if(typeof name == "string" || typeof name == "number"){
      return this.getInput(String(name)) !== "" ? true : false;
    }
    const inputData = this.getInput() as {[key:string|number]:string};
    const resultObject = {} as {[key:string|number]:boolean};
    if(name == undefined){
      if(combine){
        return (Object.keys(inputData) as Array<string>).every(x=>inputData[x] !== "");
      }
      (Object.keys(inputData) as Array<string>).forEach(x=>{resultObject[x] = inputData[x] !== ""});
      return resultObject;
    }
    if(combine){
      return name.every(x=>inputData[x] !== "");
    }
    name.forEach(x=>{resultObject[x]= inputData[x] !== ""});
    return resultObject;
  }
  //--Functionalities--//
}