export function anyToArr(input, strSplitter = ","){
    try{
        if( !(typeof input === "string" || Array.isArray(input) || typeof input === "number" || typeof input === "boolean" || input instanceof RegExp) ){
            throw new Error;
        }
    }catch(e){
        console.error("Input is neither Array, String, Number or Regex on strArrToArr helper function.");
        return [];
    }
    let arrayResult = [];
    if(Array.isArray(input)){
        arrayResult = input;
    }else if(typeof input === "string"){
        arrayResult = input.split(strSplitter);
    }else if(input instanceof RegExp || typeof input === "boolean" || typeof input === "number"){
        arrayResult = [input];
    }
    for(let i = 0; i < arrayResult.length; i++){
        if(typeof arrayResult[i] === "number"){
            continue;
        }
        if(typeof arrayResult[i] === "string"){
            if( !isNaN(Number(arrayResult[i])) ){
                arrayResult[i] = Number(arrayResult[i]);
                continue;
            }

            continue;
        }

    }

    return arrayResult;
}

export function objToString(object, splitter = " "){
    if(typeof object == "object" && Array.isArray(object))
        return object.join(splitter);

    if(typeof object == "object"){
        return Object.values(object).join(splitter);
    }
    if(typeof object == "string")
        return object;

    return ""+object;
}

export function capitalFirst(str){
    return  str.length ? (str[0].toUpperCase()  + str.slice(1)) : "";
}

export function getRegex(input){
    if(typeof input === "object")
        return new RegExp(input);
    return input;

}

export function propertyExclusion(key, object){//Exclude the given property(key) to the inputted object.
    const newObject = {};
    Object.keys(object).forEach(e=>{

        //If object keys is equal to the given key, then skip
        if(key.some(k=>k == e))
            return;

        //else Copy that object to the newObject
        newObject[e] = object[e];

    })
    return newObject;
}

export function propertyFiller(key, object){
    key.forEach(e => {
        object[e] = object[e] ?? "";
    });

    return object;
}

export function openLink(link){
    window.open(link, '_blank');
}

export function openLinkCallback(link){
    return ()=>{
        openLink(link);
    }
}

//Check the error payload from 422
export function isThereError(errorData){
    //Format would be {key:message} for the object
    return Object.keys(errorData).every(key=>{
        return !errorData[key];
    })
}


//Data Importer
export class Data{
    constructor( dispatch=false){
        //Dispatch callback must have a parameter that also accepts a callback. That callback must have a parameter about the old data;
        if(dispatch && typeof dispatch == "function")
            this.dispatch = dispatch;
    }
    addDispatch(dispatch){
        this.dispatch = dispatch;
        return this;
    }
    store(key, val){
        this.dispatch(prev=>{
            const refPrev = {...prev};
            refPrev[key] = val;
            return refPrev
        });
        return this;
    }
    clear(key){
        this.dispatch(prev=>{
            const refPrev = {...prev};
            refPrev[key] = "";
            return refPrev
        });
        return this;
    }
    batch(object, refresh = false){
        if(!refresh){
            this.dispatch(object);
            return this;
        }

        this.dispatch(prev=>{
            const refPrev = {...prev};
            Object.keys(refPrev).forEach(x=>{
                refPrev[x] = object[x];
            });
            return refPrev;
        })
    }
}

//Error Importer
export class Error extends Data{}


//Laravel Error Validation Error Parse To String instead of arrays
export function laravelValErrToStr( errors  ){
    Object.keys(errors).forEach(name=>{
        errors[name] = objToString(errors[name]);
    });
    return errors;
}



//DEBOUNCEr - use this to delay a function call or to be precise put an interval on time to allow the final input to be serve.
export class Debouncer {
    constructor(timer = false){
        if(timer)
            this.timer = timer;
        this.debouncer = false;
    }
    time(timer = 0){
        this.timer = timer;
        return this;
    }
    do(callback = ()=>true){
        this.callback = callback;
        return this;
    }
    run(){
        clearTimeout(this.debouncer);
        this.debouncer = setTimeout(this.callback, this.timer);
        return this;
    }
}


//CACHEr - use this to store a data in localstorage;
export class Cacher{
    constructor(baseKey = ""){
        if(!baseKey)
            this.baseKey = baseKey;
        this.baseKey = "";
    }
    //** InHouse */
    valueTransform(value){
        switch(typeof value){
            case "object":
                return JSON.stringify(value);
            case "string":
                return String(value);
            default:
                return value;
        }
    }
    //** InHouse */

    store(key = "", value = ""){
        const THIS = this;
        if(typeof key === "string" ){
            value = THIS.valueTransform(value);
            if( THIS.exist(key, value) )
                return this;

            if(this.baseKey)
                key == this.baseKey+"."+key;

            localStorage.setItem(key, value);
            return this;
        }

        if( !(typeof key === "object" && !Array.isArray(key)) )
            return this;

        Object.keys(key).map((i=>{
            let value = key[i];
            let key = i;
            value = THIS.valueTransform(value);
            if( THIS.exist(key, value) )
                return this;

            if(this.baseKey)
                key == this.baseKey+"."+key;

            localStorage.setItem(key, value);
        }))
        return this;
    }
    exist(key, value = undefined){
        if(this.baseKey)
            key == this.baseKey+"."+key;
        if(value === undefined){
            return localStorage.getItem(key) !== null
        }
        value = this.valueTransform(value);
        return localStorage.getItem(key) !== null && localStorage.getItem(key) === value;
    }
    get(key){
        if(this.baseKey)
            key == this.baseKey+"."+key;
        return localStorage.getItem(key);
    }

}
