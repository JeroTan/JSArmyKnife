//Dependencies: ParseData.js must be available
import { anyToStr } from "./ParseData.ts";


//This one will do the trick store multiple keys or array or object using json and conversely convert it back to back. It uses local storage
class Storage{
    //structure
    public key: string = "1";

    constructor(key?:string|number|undefined){
        if(key)
            this.setKey(key);
    }
    setKey(key:string|number){
        this.key = String(key);
        return this;
    }
    isExist():boolean{
        return localStorage.getItem(this.key) !== null
    }
    store(value: string | object | number | typeof RegExp){
        localStorage.setItem(this.key, anyToStr(value));
    }
    get(parseJSON:boolean|any = true){
        let value = localStorage.getItem(this.key);
        if(value === null)
            return "";
        if(parseJSON ){
            value = JSON.parse(value);
        }
        return value;
    }
}


//Data that will help to retrieve/run specific function when data from storage with condition
export class DataConvoy{
    private isSuccess:boolean = true;
    private value:undefined|null|string;
    constructor(isSuccess = true, value:string|null|undefined = null){
        this.isSuccess = isSuccess;
        this.value = value;
    }
    setSuccess(isSuccess:boolean){
        this.isSuccess = isSuccess;
        return this;
    }
    setValue(value:any){
        this.value = value;
        return this;
    }
    success(callback:Function){
        if(!this.isSuccess)
            return this;
        callback(this.value);
        return this;
    }
    fail(callback:Function){
        if(this.isSuccess)
            return this;
        callback(this.value);
        return this;
    }
    getValue(){
        return this.value;
    }
}

//Cache that compare Storage and given data and then store if not the same and move on with still new one
export class Cacher{
    storage: Storage = new Storage(1);

    constructor(key:undefined|string|number){
        if(key!== undefined)
        this.storage = new Storage(key);
    }
    changeKey(key:undefined|string|number){
        this.storage = new Storage(key);
    }
    receive(value: string | object | number | typeof RegExp){
        const result = new DataConvoy();

        const stillTheSame = this.storage.isExist() && anyToStr(this.storage.get(false)) === anyToStr(value);

        result.setSuccess( stillTheSame );
        if(!stillTheSame){
            this.storage.store(value);
        }
        result.setValue( value );
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
export class TimeCacher{
    //Strucuture
    private expireDate: number = 0;
    private baseInterval: number = 0;//if 0, then every time you retrieved something it will update the current storage. This is in milliseconds
    private storage: Storage = new Storage(1);

    constructor(baseInterval = 0, key:string|number="1"){
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
    changeKey(key:string|number){
        this.storage = new Storage(key);
    }
    receive(value: any){//Key Value pair
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