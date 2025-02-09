import { AnimeTroupe } from "native--animation";
import { popDispatch } from "native--pop";
/*|------------------------------------------------------------------------------------------|*/
/*|               Swapclass                                                                  |*/
/*|------------------------------------------------------------------------------------------|*/
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

/*|------------------------------------------------------------------------------------------|*/
/*|               Elements                                                                   |*/
/*|------------------------------------------------------------------------------------------|*/
//Use this to create new element
export function E<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  props: Partial<HTMLElementTagNameMap[T]> & { 
    style?: Partial<CSSStyleDeclaration>; 
    [key: string]: any; 
  } = {},
  ...children: (string | Node)[]
): HTMLElementTagNameMap[T] {
  const el = document.createElement(tag);
  // Set attributes and properties
  for (const key in props) {
    if (key === "style" && typeof props.style === "object") {
      // Apply inline styles
      Object.assign(el.style, props.style);
    } else if (key.startsWith("on") && typeof props[key] === "function") {
      // Add event listeners (e.g., onClick => click)
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, props[key]);
    } else if (key in el) {
      // Set DOM properties (e.g., id, className)

      try{
        (el as any)[key] = props[key];
      }catch{
        // el.setAttribute(key, String(props[key]));
      }
      
    } else {
      // Set attributes for everything else
      el.setAttribute(key, String(props[key]));
    }
  }

  // Append children
  children.forEach(child => {
    if (typeof child === "string") {
      el.innerHTML = el.innerHTML + child;
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });

  return el;
}

/*|------------------------------------------------------------------------------------------|*/
/*|               Load LIstener Control                                                      |*/
/*|------------------------------------------------------------------------------------------|*/
//Use this to control load order of event listener onload
type LOAD_CALLBACK = ((()=>void)|(()=>Promise<any>));
type LOAD_FALLBACK = ()=>void;
export class LoadOrder{
  private orderStack:LOAD_CALLBACK[] = [];
  private fallbackStack: LOAD_FALLBACK[] = [];
  private useOnLoad:boolean = false;
  private hammerTrigger = document.createElement("button");

  constructor(useOnLoad = false){
    if(useOnLoad){
      this.setOnLoad(useOnLoad);
    }
  }

  setOnLoad(useOnLoad:boolean){
    this.useOnLoad = useOnLoad;
    return this;
  }
  
  push(callback:LOAD_CALLBACK, fallback?:LOAD_FALLBACK){
    this.orderStack.push(callback);
    if(fallback)
      this.fallbackStack[this.orderStack.length] = fallback;
    this.hammerTrigger.click();
  }

  cutIn(index:number, callback:LOAD_CALLBACK, fallback?:LOAD_FALLBACK){
    this.orderStack.splice(index, 0, callback);
    if(fallback)
      this.fallbackStack.splice(index, 0, fallback);
    this.hammerTrigger.click();
    return this;
  }
  
  insert(index:number, callback:LOAD_CALLBACK, fallback?:LOAD_FALLBACK){
    this.orderStack[index] = callback;
    if(fallback)
      this.fallbackStack[index] = fallback;
    this.hammerTrigger.click();
    return this;
  }

  run(expectedStack = 0){
    async function loader(THIS:LoadOrder){
      let i = 0;
      for(const f of THIS.orderStack){
        try{
          let x = THIS.orderStack[i]();
          if(x instanceof Promise ){
            await x;
          }
        }catch(e){
          try{
            if(THIS.fallbackStack[i]){
              THIS.fallbackStack[i]();
            }
          }catch{}
          console.log("ERROR on Load Order");
          console.log("The order #", i+1, "with content:");
          console.log(f);
          console.log("Has the following error: ", e);
        }
        ++i;
      }
    }
    if(expectedStack == 0){
      if(this.useOnLoad){
        window.addEventListener("load", ()=>{
          loader(this);
        })
      }else{
        loader(this);
      }
      return;
    }

    const THIS = this;
    if(THIS.orderStack.length >= expectedStack){
      loader(this);
      return;
    }
    this.hammerTrigger.addEventListener("click", ()=>{
      if(THIS.orderStack.length >= expectedStack){
        loader(this);
      }
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

/*|------------------------------------------------------------------------------------------|*/
/*|               DOMPopTransformer                                                          |*/
/*|------------------------------------------------------------------------------------------|*/

export function DOMPopTransformer(instruction:{pop:string, [key:string|number]: any}){
  //-- Constants --//
  const structure = popDispatch(instruction);
  const popContainer = document.getElementById("pop-container") as HTMLDivElement;
  const newPop = (((document.getElementById("template-pop-component") as HTMLMetaElement).content as unknown as HTMLElement).cloneNode(true) as HTMLElement).children[0] as HTMLDialogElement;
  const popClose = newPop.querySelector("#pop-close-button") as HTMLDivElement;
  const popIcons = newPop.querySelector("#pop-icon-contents") as HTMLDivElement;
  const popTitle = newPop.querySelector("#pop-title") as HTMLDivElement;
  const popMessage = newPop.querySelector("#pop-message") as HTMLDivElement;
  const popAdditional = newPop.querySelector("#pop-additional") as HTMLDivElement;
  const popButtonContainer = newPop.querySelector("#pop-button-container") as HTMLDivElement;
    const acceptButton = popButtonContainer.children[0];
    const rejectButton = popButtonContainer.children[1];

  //-- States --//
  let isOpen = structure.isOpen;

  //-- Animation --//
  const popAnimation =  new AnimeTroupe(newPop, [
    { opacity:"0"}, {opacity:"1"},
  ], {
    duration: 300, easing: "easeOutBack",
  });

  //-- Do --//
  //Remove the current pop
  while(popContainer.firstChild){
    popContainer.lastChild?.remove();
  }
  //Insert the new one
  popContainer.appendChild(newPop);

  if(structure.isOpen){
    newPop.showModal();
  }else{
    newPop.close();
  }

  if(structure.width){
    newPop.style.width = String(structure.width);
  }

  if(structure.icon){
    let clonedIcon;
    for(const i in popIcons.children){
      if(popIcons.children[i].id == "pop-icon-" + structure.icon){
        clonedIcon = popIcons.children[i].cloneNode(true);
        break;
      }
    }
    popIcons.textContent = "";
    popIcons.appendChild(clonedIcon as Node);
  }

  if(structure.title){
    popTitle.children[0].textContent = String(structure.title);
  }

  if(structure.message){
    popMessage.children[0].innerHTML = String(structure.message);
  }

  if(structure.additionalBody){
    if(typeof(structure.additionalBody) === "string"){
      popAdditional.innerHTML = structure.additionalBody;
    }else{
      popAdditional.append(structure.additionalBody);
    }
  }

  if(structure.acceptButton){
    if(structure.acceptButtonText)
      acceptButton.textContent = structure.acceptButtonText;
    if(structure.acceptButtonCallback && typeof structure.acceptButtonCallback == "function" ){
      (acceptButton as HTMLButtonElement).onclick = ()=>{structure.acceptButtonCallback!(closePop)} ;
    }else{
      (acceptButton as HTMLButtonElement).onclick = ()=>{closePopAnimate()}
    }
      
  }else{
    acceptButton.remove();
  }

  if(structure.rejectButton){
    if(structure.rejectButtonText)
      rejectButton.textContent = structure.rejectButtonText;
    if(structure.rejectButtonCallback && typeof structure.rejectButtonCallback == "function"){
      (rejectButton as HTMLButtonElement).onclick = ()=>{structure.rejectButtonCallback!(closePop)} ;
    }else{
      (rejectButton as HTMLButtonElement).onclick = ()=>{closePopAnimate()}
    }
  }else{
    rejectButton.remove();
  }

  if(structure.closeButton){
    if(structure.closeButtonCallback && typeof structure.closeButtonCallback == "function"){
      (popClose.children[0] as HTMLDivElement).onclick = ()=>structure.closeButtonCallback!(closePop);
    }else{
      (popClose.children[0] as HTMLDivElement).onclick = ()=>{closePopAnimate()}
    }
  }else{
    popClose.remove();
  }

  if(structure.backdropTrigger){
    if(structure.backdropTriggerCallback != undefined && typeof structure.backdropTriggerCallback == "function"){
      newPop.onclick = (e)=>{
        if(e.currentTarget == undefined || !isOpen ){
          return;
        }
        const dialogBound = (e.currentTarget as any).getBoundingClientRect();
        if(
          !(dialogBound.left > e.clientX ||
          dialogBound.right < e.clientX ||
          dialogBound.top > e.clientY ||
          dialogBound.bottom < e.clientY)
        ){ //Check if the click is outside the border;
          return;
        }
        if(structure?.backdropTriggerCallback){
          structure?.backdropTriggerCallback!(closePop);
        }
        
      }
    }else{
      newPop.onclick = (e)=>{
        if(e.currentTarget == undefined){
          return;
        }
        const dialogBound = (e.currentTarget as any).getBoundingClientRect();
        if(
          !(dialogBound.left > e.clientX ||
          dialogBound.right < e.clientX ||
          dialogBound.top > e.clientY ||
          dialogBound.bottom < e.clientY)
        ){ //Check if the click is not outside the border;
          return;
        }
        closePopAnimate();
      }
    }
  }

  if(structure.customDialog){
    popIcons.remove();
    // popTitle.remove();
    popMessage.remove();
    popAdditional.remove();
    //find if there are hr element
    const hrElement = popContainer.querySelector("hr");
    hrElement?.remove();
    
    let toInsertElement:Node|HTMLElement|string = (()=>{
      if(typeof structure.customDialog === "function"){
        return structure.customDialog(structure);
      }
      return structure.customDialog;
    })();
    if(typeof structure.customDialog === "string"){
      toInsertElement = document.createElement("div");
      (toInsertElement as HTMLDivElement).innerHTML = structure.customDialog;
    }
  
    if(popButtonContainer)
      newPop.insertBefore(toInsertElement as HTMLElement|Node, popButtonContainer);
    else
      newPop.appendChild(toInsertElement as HTMLElement|Node);
  }

  if(!structure.acceptButton && !structure.rejectButton && !(false) ){ //In case we can opt to have custom buttons
    popButtonContainer.remove();
  }

  popAnimation.play();
  popAnimation.isStop((THIS)=>{
    THIS.commitStyle();
  });

  //Functionalities
  function closePopAnimate(){
    popAnimation.reverse();
    popAnimation.isStop((THIS)=>{
      THIS.commitStyle();
      newPop.close();
    })
  }
  function closePop(){
    isOpen = false;
    newPop.close();
  }
  function openPop(){
    isOpen = true;
    newPop.showModal();
  }
  function openPopAnimate(){
    openPop();
    popAnimation.play();
    popAnimation.isStop((THIS)=>{
      THIS.commitStyle();
    });
  }
  
  return [ openPopAnimate, closePopAnimate ] as [()=>void, ()=>void]
}



/*|------------------------------------------------------------------------------------------|*/
/*|               REDIRECTION                                                                |*/
/*|------------------------------------------------------------------------------------------|*/
export function openAWindow(url:string, title:string, w:number, h:number){
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  window.open(url, title, 
    `
    scrollbars=yes,
    width=${w / systemZoom}, 
    height=${h / systemZoom}, 
    top=${top}, 
    left=${left}
    `
  )
}

export function changePage(link:string){
  if(window.top){
    try{
      const x = window.top.location.href;
      x;
      window.top.location.href = link;
    }catch{
      location.href = link;	
    }
  }else{
    location.href = link;
  }
}

/*|------------------------------------------------------------------------------------------|*/
/*|               Prefetch                                                                   |*/
/*|------------------------------------------------------------------------------------------|*/
export class Prefetch{
  config:{
    link:string,
    fetching:boolean,
    frameId:string,
  } = {
    link:"#",
    fetching:false,
    frameId:"",
  }

  constructor(link?:string){
    if(link){
      this.setLink(link);
    }
  }

  setLink(link:string){
    this.config.link = link;
    this.config.frameId = `page-prefetch-${Date.now()}`;
    return this;
  }

  fetch(){
    function frameLoad(frameData:{
      link:string,
      fetching:boolean,
      frameId:string,
    }){
      if(frameData == undefined){
        throw new Error("We cannot find the link on Prefetch instance");
      }
      frameData.fetching = true;
      document.getElementById(frameData.frameId)?.remove();
      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "100vh";
      iframe.style.display = "none";
      iframe.src = frameData.link;
      iframe.id = frameData.frameId;
      document.body.appendChild(iframe);
      iframe.addEventListener("load", ()=>{
        frameData.fetching = false;
      })
    };

    frameLoad(this.config);
    return this;
  }

  swapFetched(success?:Function, fail?:Function){
    function swap(frameData:{
      link:string,
      fetching:boolean,
      frameId:string,
    }){
      let index:number = 0;
      for(const e of document.children[0].children){
        if(e.tagName == "BODY"){
          break;
        }
        index++;
      }
      const body = Array.from(document.children[0].children[index].children).map(x=>x) as Array<HTMLElement>;
      for(let i = 0; i < body.length; i++){
        if(body[i].id == frameData.frameId){
          body[i].style.display = "block";
          //Add to tab history
          window.history.replaceState({
            "html":(body[i] as HTMLIFrameElement).contentWindow!.document.documentElement.innerHTML,
            "pageTitle":((body[i] as HTMLIFrameElement).contentWindow! as any).title,
          }, 
            "", 
            (body[i] as HTMLIFrameElement).contentWindow!.location.href
          );
          continue;
        }
        
        body[i].remove();
      }
      
    }

    if(!this.config.fetching){
      swap(this.config);
    }
    if(success && !this.config.fetching){
      success();
    }
    if(fail && this.config.fetching){
      fail();
    }
    return this;
  }
}


export function getFileLink(fileInput:HTMLInputElement, fileIndex = 0){
  if(!fileInput.files){
    return null;
  }
  let blobURL = URL.createObjectURL(fileInput.files[fileIndex]);
  return blobURL;
}


/*|------------------------------------------------------------------------------------------|*/
/*|               Window Breakpoint                                                          |*/
/*|------------------------------------------------------------------------------------------|*/
export class Breakpoint{
  private getWidth(){
    return window.innerWidth;
  }
  private getHeight(){
    return window.innerHeight;
  }
  
  public breakIn({width, height}:{width?:number, height?:number}){
    if(width && height && this.getWidth() < width && this.getHeight() < height){
      return true;
    }
    if(width && this.getWidth() < width){
      return true;
    }
    if(height && this.getHeight() < height){
      return true;
    }
    return false;
  }

  public breakOut({width, height}:{width?:number, height?:number}){
    if(width && height && this.getWidth() < width && this.getHeight() > height){
      return true;
    }
    if(width && this.getWidth() > width){
      return true;
    }
    if(height && this.getHeight() > height){
      return true;
    }
    return false;
  }

}


/*|------------------------------------------------------------------------------------------|*/
/*|               Observe                                                                    |*/
/*|------------------------------------------------------------------------------------------|*/

export class Observer{
  private observer?:MutationObserver;
  private target?:HTMLElement;
  constructor(target?:HTMLElement){
    this.target = target;
  }

  setTarget(target:HTMLElement){
    this.target = target;
    return this;
  }

  public observe(observeCallback:((mutations: MutationRecord[], observer: MutationObserver, thisClass:Observer) => void), config:MutationObserverInit={ attributes: true, childList:true, subtree:true }){
    if(!this.target){
      throw new Error("Target is not set");
    }
    const THIS = this;
    this.observer = new MutationObserver((mutations, observer)=>{
      observeCallback(mutations, observer, THIS);
    });
    this.observer.observe(this.target, config);
  }

  public disconnect(){
    this.observer?.disconnect();
  }
}


/*|------------------------------------------------------------------------------------------|*/
/*|               Check If Scrolled Through                                                  |*/
/*|------------------------------------------------------------------------------------------|*/
export function elementInScreen(element: HTMLElement, callback: (result: boolean) => void, offset = 0) {
  let isIntersecting = false;
  const observer = new IntersectionObserver((entries) => {

    let intersectingComputation = isIntersecting;
    entries.forEach(entry => {
      const documentHeight = document.documentElement.clientHeight;
      if (
        entry.boundingClientRect.top < documentHeight + offset &&
        entry.boundingClientRect.bottom > 0
      ) {
        intersectingComputation = true;
      }else{
        intersectingComputation = false;
      }
    });

    if(isIntersecting === intersectingComputation) 
      return;
    isIntersecting = intersectingComputation;
    callback(isIntersecting);

  }, {rootMargin: offset + "px"});
  observer.observe(element);
}
