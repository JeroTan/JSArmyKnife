//Dependencies: ParseData.js must be available
import { anyToStr } from "./ParseData";


//This one will do the trick store multiple keys or array or object using json and conversely convert it back to back. It uses local storage
class Storage{
    //structure
    key;

    constructor(key = "1"){
        this.setKey(key);
    }
    setKey(key = "1"){
        this.key = typeof(key) === "string" || typeof(key) === "number" ? key : "1";
        return this;
    }
    isExist(){
        return localStorage.getItem(this.key) !== null
    }
    store(value){
        localStorage.storeItem(this.key, anyToStr(value));
    }
    get(transformToJSON = true){
        let value = localStorage.getItem(this.key);
        if(transformToJSON){
            try{ value = JSON.parse(value); }catch{};
        }
        return value;
    }
}


//Data that will help to retrieve/run specific function when data from storage with condition
class DataConvoy{
    constructor(isSuccess = true, value = null){
        this.isSuccess = isSuccess;
        this.value = value;
    }
    setSuccess(isSuccess){
        this.isSuccess = isSuccess;
    }
    setValue(value){
        this.value = value;
    }
    success(callback){
        if(!this.isSuccess)
            return this;
        callback(this.value);
    }
    fail(callback){
        if(this.isSuccess)
            return this;
        callback(this.value);
    }
    getValue(){
        return this.value;
    }
}

//Cache that compare Storage and given data and then store if not the same and move on with still new one
class Cacher{
    storage;

    constructor(key="1"){
        this.storage = new Storage(key);
    }
    changeKey(){
        this.storage = new Storage(key);
    }
    receive(value){
        const result = new DataConvoy();
        
        const stillTheSame = this.storage.isExist() && anyToStr(this.storage.get(false)) === anyToStr(value);

        result.setSuccess( stillTheSame );
        if(!stillTheSame){
            this.storage.store(value);
            result.setValue( value );
        }else{
            result.setValue( this.storage.store(value) );
        }
        return result;
    }
    retrieve(){
        const result = new DataConvoy();
        result.setSuccess( this.storage.isExist() );
        result.setValue( this.storage.get() )
        return result;
    }
}


//This uses Date and local.storage api
class TimeCacher{
    //Strucuture
    expireDate;
    baseInterval = 0;//if 0, then every time you retrieved something it will update the current storage. This is in milliseconds
    storage;

    constructor(baseInterval = 0, key="1"){
        this.setInterval(baseInterval);
        this.storage = new Storage(key);
    }
    setInterval(baseInterval = 0){
        this.baseInterval = !isNaN(Number(baseInterval)) ? baseInterval : 0;
        return this;
    }
    setExpire(){
        this.expireDate = Date.now()+this.baseInterval;
        return this;
    }
    changeKey(key){
        this.storage = new Storage(key);
    }
    receive(value){//Key Value pair
        const result = new DataConvoy();
        if(!this.storage.isExist() || this.isExpired()){
            result.setSuccess( false );
            result.setValue( value );

            this.storage.store(value);
            this.setExpire();
            return result;
        }
        result.setValue( this.storage.get() );
        return result;
    }
    retrieve(){
        const result = new DataConvoy();
        result.setSuccess( this.storage.isExist() && !this.isExpired() )
        result.setValue( this.storage.get() )
        return result;
    }
    isExpired(){
        return this.expireDate <= Date.now()
    }
    extend(baseInterval = this.baseInterval){//If no argument then extend the time with the same as setinterval
        this.expireDate = Date.now()+baseInterval;
        return this;
    }
}



class DataLedger{
    
}




// //CACHEr - use this to store a data in localstorage;
// export class Cacher{
//     constructor(baseKey = ""){
//         if(baseKey)
//             this.baseKey = baseKey;
//         else{
//             this.baseKey = undefined;
//         }

//         this.cDataExist = undefined; //boolean when used
//         this.cDataToStore = {key:"", value:""};
//         this.cDataCurrent = "";
//     }
//     //** InHouse */
//     valueTransform(value){
//         switch(typeof value){
//             case "object":
//                 return JSON.stringify(value);
//             case "string":
//                 return String(value);
//             default:
//                 return value;
//         }
//     }
//     //** InHouse */

//     store(key = "", value = ""){
//         const THIS = this;
//         if(typeof key === "string" ){
//             value = THIS.valueTransform(value);

//             if(this.baseKey)
//                 key = this.baseKey+"."+key;

//             localStorage.setItem(key, value);
//             return this;
//         }

//         if( !(typeof key === "object" && !Array.isArray(key)) )
//             return this;

//         Object.keys(key).map((i=>{
//             let value = key[i];
//             let key = i;
//             value = THIS.valueTransform(value);

//             if(this.baseKey)
//                 key = this.baseKey+"."+key;

//             localStorage.setItem(key, value);
//         }))
//         return this;
//     }
//     exist(key, value = undefined){
//         if(this.baseKey)
//             key = this.baseKey+"."+key;
//         if(value === undefined){
//             return localStorage.getItem(key) !== null
//         }
//         value = this.valueTransform(value);
//         return localStorage.getItem(key) !== null && localStorage.getItem(key) === value;
//     }
//     get(key){
//         if(this.baseKey)
//             key = this.baseKey+"."+key;
//         return localStorage.getItem(key);
//     }

//     //This is for chaining |If the data already exist and it's the same data then do not store and do not do or not do the callback
//     cExist(key, value = undefined){
//         this.cDataExist = this.exist(key, value);
//         this.cDataToStore = {key:key, value:value};
//         if(this.cDataExist)
//             this.cDataCurrent = this.get(key);
//         return this;
//     }
//     cStore(key=false, value=false){
//         if(this.cDataExist)
//             return this;
//         if(key)
//             this.cDataToStore.key = key;
//         if(value)
//             this.cDataToStore.value = value;

//         this.store(this.cDataToStore.key, this.cDataToStore.value);
//         return this;
//     }
//     cDoWhenNotExist(callback = ()=>true){
//         if(this.cDataExist)
//             return this;

//         callback(this.cDataCurrent);
//         return this;
//     }
//     cDoWhenExist(callback = ()=>true){
//         if(!this.cDataExist)
//             return this;

//         callback(this.cDataCurrent);
//         return this;
//     }
//     cReset(){//reset the cDataExist and cDataToStore Here
//         this.cDataExist = undefined;
//         this.cDataToStore = {key:"",value:""}
//         this.cDataCurrent = ""
//         return this;
//     }
// }