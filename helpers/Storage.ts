/**
 * @info
 * - Storage - wrapper of local storage for easier storing and retrieving
 *      - DataConvoy - uses to to tell if the storing of Storage is success or not
 *      - TimeCacher - uses Date to cache data in local storage
 * - UseDB - wrapper for indexedDB. 
 *      - RecordDB - use to retrieved from keys(known as object store in indexedDB)
 * 
 * 
 */

/*|------------------------------------------------------------------------------------------|*/
/*|               Imports                                                                    |*/
/*|------------------------------------------------------------------------------------------|*/
import { anyToStr } from "./ParseData.ts";



/*|------------------------------------------------------------------------------------------|*/
/*|               Local Storage                                                              |*/
/*|------------------------------------------------------------------------------------------|*/
//This one will do the trick to store multiple keys or array or object using json and conversely convert it back to back. It uses local storage
export class Storage{
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
    get<T>(parseJSON:boolean = true){ 
        let value:string | null | T = localStorage.getItem(this.key);
        if(value === null)
            return "";
        if(parseJSON ){
            value = JSON.parse(value) as T;
        }
        return value;
    }
}

//Data that will help to retrieve/run specific function when data from storage is conditional
class DataConvoy{
    private isSuccess:boolean = true;
    private value:string | object | number | typeof RegExp | null = "";
    constructor(isSuccess = true, value:string|null|undefined = null){
        this.isSuccess = isSuccess;
        if(value)
            this.value = value;
    }
    setSuccess(isSuccess:boolean){
        this.isSuccess = isSuccess;
        return this;
    }
    setValue(value: string | object | number | typeof RegExp | null){
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
    setKey(key:string|number){
        this.storage = new Storage(key);
    }
    receive(value:  string | object | number | typeof RegExp){//Key Value pair
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
    renew(value:  string | object | number | typeof RegExp){
        const result = new DataConvoy();
        this.storage.store(value);

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

/*|------------------------------------------------------------------------------------------|*/
/*|               IndexedDB                                                                  |*/
/*|------------------------------------------------------------------------------------------|*/
//window?.indexedDB||window?.mozIndexedDB || window?.webkitIndexedDB || window?.msIndexedDB || window?.shimIndexedDB;
interface AnyObj{
    [key: string|number]:any
}
export class UseDB{
    private DB: IDBOpenDBRequest|undefined;
    private dbName:string = "";
    private keyStack: Function[] = [];
    
    constructor(dbName?:string|undefined, version=1){
        if(!window?.indexedDB){
            console.error("IndexedDB is not loaded in this system!");
            return;
        }
        if(dbName){
            this.open(dbName, version);
        }
    }
    
    public setDBName(dbName:string){
        this.dbName = dbName;
        return this;
    }
    public open(dbName:string|undefined, version=1){ //Create or Open
        this.DB = window?.indexedDB.open(dbName===undefined?this.dbName:dbName, version);
        if(dbName)
            this.dbName = dbName;
        return this;
    }
    public delete(dbName:string|undefined = undefined){
        window?.indexedDB.deleteDatabase(dbName===undefined?this.dbName:dbName);
        return this;
    }

    public setKey(tableName:string, options:IDBObjectStoreParameters = {autoIncrement:true}){ //The first one of keys array is unique
        this.keyStack[this.keyStack.length] = (DB:IDBOpenDBRequest)=>{
            if(DB.result.objectStoreNames.contains(tableName))
                return false;
            return DB.result.createObjectStore(tableName, options);
        }
        return this;
    }

    public migrate(){
        const THIS = this;

        return new Promise<IDBOpenDBRequest>((resolve)=>{
            let upgrading = false;
            THIS.DB!.onsuccess = (e)=>{
                if(!upgrading){
                    resolve(THIS.DB as IDBOpenDBRequest);
                }
            }
            THIS.DB!.onupgradeneeded = (e)=>{
                upgrading = true;
                let pendingQueue = 0;
                for(const i in THIS.keyStack){
                    
                    const keys = THIS.keyStack[i](e.target);
                    if(keys === false){
                        ++pendingQueue;
                        if(pendingQueue === THIS.keyStack.length){
                            resolve(THIS.DB as IDBOpenDBRequest);
                        }
                        continue;
                    }

                    keys.transaction.oncomplete = ()=>{
                        ++pendingQueue;
                        if(pendingQueue === THIS.keyStack.length){
                            resolve(THIS.DB as IDBOpenDBRequest);
                        }
                    }
                }
            }
        });
    }
}

export class RecordDB{
    private DB:IDBOpenDBRequest|Promise<IDBOpenDBRequest>|undefined;
    private key: string ="";

    constructor(dbName?: string|UseDB|IDBOpenDBRequest|Promise<IDBOpenDBRequest>|undefined, key?: string|undefined){
        if(dbName)
            this.setDB(dbName);
        if(key)
            this.setKey(key);
    }   

    //--Setter--//
    public setDB(dbName: string|UseDB|IDBOpenDBRequest|Promise<IDBOpenDBRequest>){
        if(typeof dbName === "string"){
            this.DB = window?.indexedDB.open(dbName);
        }
        else if(dbName instanceof UseDB){
            this.DB = dbName.migrate();
        }
        else{
            this.DB = dbName;
        }
        return this;
    }
    public setKey(key:string){
        this.key = key;
        return this;
    }
    //--Setter--//

    //--In House--//
    protected onlyWhenReady(DB:IDBRequest|Promise<IDBOpenDBRequest>, callback:Function){
        if(DB instanceof Promise){
            DB.then(finishedDB=>{
                if(finishedDB.readyState ==="done")
                    callback(finishedDB);
                else{
                    finishedDB.addEventListener("success", (e)=>{
                        callback(finishedDB);
                    })
                } 
            });
            return;
        } 

        if(DB.readyState ==="done")
            callback(DB);
        else{
            DB.addEventListener("success", (e)=>{
                callback(DB);
            })
        } 
    }

    async get<T>(id?:string|number|undefined):Promise<undefined|T>{
        const THIS = this;
        const {DB, key, onlyWhenReady} = THIS;
        if(DB === undefined)
            return undefined;
        
        return new Promise((resolve)=>{
            onlyWhenReady(DB, (DB:IDBOpenDBRequest)=>{
                const transact = DB!.result.transaction(key, "readonly");
                let result;
                if(id===undefined)
                    result = transact.objectStore(key).getAll();
                else
                    result = transact.objectStore(key).get(id);
                
                result.addEventListener("success", ()=>{
                    resolve(result.result);
                });
            })
        })
    }

    async add<T>(data:T):Promise<T|null>{
        const THIS = this;
        const {DB, key, onlyWhenReady} = THIS;
        if(DB === undefined)
            return null;

        return new Promise((resolve)=>{
            onlyWhenReady(DB, (DB:IDBOpenDBRequest)=>{
                const transact = DB.result.transaction(key, "readwrite");
                const store = transact.objectStore(key);
                store.add(data).onsuccess = ()=>{
                    transact.oncomplete = ()=>{
                        resolve(data);
                    }
                }
                
            })
        })
    }

    async update<T>(data:T):Promise<T|undefined>{
        const THIS = this;
        const {DB, key, onlyWhenReady} = THIS;
        if(DB === undefined)
            return undefined;

        return new Promise((resolve)=>{
            onlyWhenReady(DB, (DB:IDBOpenDBRequest)=>{
                const transact = DB.result.transaction(key, "readwrite");
                const store = transact.objectStore(key);
            
                store.put(data).addEventListener('success', ()=>{
                    transact.addEventListener("complete", ()=>{
                        resolve(data);
                    })
                })
           
            })
        })
    }

    async delete(id:string|number|undefined):Promise<string|number|undefined>{
        const THIS = this;
        const {DB, key, onlyWhenReady} = THIS;
        if(DB === undefined)
            return undefined;

        return new Promise((resolve)=>{
            onlyWhenReady(DB, (DB:IDBOpenDBRequest)=>{
                const transact = DB.result.transaction(key, "readwrite");
                const stored = transact.objectStore(key);
                
                if(id === undefined){
                    stored.clear();
                    transact.oncomplete = ()=>resolve(id);
                }else{
                    stored.delete(id).onsuccess = ()=>{
                        transact.oncomplete = ()=>resolve(id);
                    }
                }                

            })
        }) 
    }
}
