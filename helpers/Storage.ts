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
type TypeOfObject = { key: string; value: number };



// Actual function implementation
function get(parseJSON: boolean): TypeOfObject | string {
  if (parseJSON) {
    return JSON.stringify({ key: "example", value: 42 });
  } else {
    return { key: "example", value: 42 };
  }
}

export class Storage<Type>{
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
    store(value: Type){
        localStorage.setItem(this.key, anyToStr(value as any));
        return this;
    }
    remove(){
        localStorage.removeItem(this.key);
        return this;
    }

    get( ): Type;
    get( parseJSON: true ): Type;
    get( parseJSON: false ): string;
    get(parseJSON = true):Type|string{ 
        let value:string | null = localStorage.getItem(this.key);
        if(value === null)
            return "";
        if(parseJSON ){
            return JSON.parse(value) as Type;
        }
        return value as string;
    }
}

/*|------------------------------------------------------------------------------------------|*/
/*|               IndexedDB                                                                  |*/
/*|------------------------------------------------------------------------------------------|*/
//window?.indexedDB||window?.mozIndexedDB || window?.webkitIndexedDB || window?.msIndexedDB || window?.shimIndexedDB;
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
            THIS.DB!.onsuccess = ()=>{
                console.log(`${THIS.dbName} was open successfully`);
                if(!upgrading){
                    resolve(THIS.DB as IDBOpenDBRequest);
                }
            }
            THIS.DB!.onupgradeneeded = (e)=>{
                console.log(`${THIS.dbName} was updated and open successfully`);
                upgrading = true;
                let current = 0; 
                for(const i in THIS.keyStack){
                    
                    const keys = THIS.keyStack[i](e.target);
                    if(keys == false || keys == null){
                        if(current >= THIS.keyStack.length){
                            resolve(THIS.DB as IDBOpenDBRequest);
                        }
                    }else{
                        keys.transaction.oncomplete = ()=>{
                            if(current >= THIS.keyStack.length){
                                resolve(THIS.DB as IDBOpenDBRequest);
                            }
                        }
                    }
                    ++current;
                }
            };
            THIS.DB!.onblocked = (e)=>{
                console.log(e, `${THIS.dbName} was blocked.`);
            }
            THIS.DB!.onerror = (e)=>{
                console.log(e, `${THIS.dbName} is having an error.`);
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
    protected async onlyWhenReady(DB:IDBRequest|Promise<IDBOpenDBRequest>, callback:Function){
     
        if(DB instanceof Promise){
            DB.then(finishedDB=>{
                if(finishedDB.readyState ==="done"){
                    callback(finishedDB);
                }
                else{
                    finishedDB.addEventListener("success", ()=>{
                        callback(finishedDB);
                    })
                } 
            });
            return;
        } 

        if(DB.readyState ==="done")
            callback(DB);
        else{
            DB.addEventListener("success", ()=>{
                callback(DB);
            })
        } 
    }

    async get<T>(id?:string|number|undefined):Promise<undefined|T>{
        const THIS = this;
        const {DB, key, onlyWhenReady} = THIS;
        if(DB === undefined)
            return undefined;
        return await new Promise((resolve)=>{
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

    async delete(id?:string|number|undefined):Promise<string|number|undefined>{
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


/*|------------------------------------------------------------------------------------------|*/
/*|               State                                                                      |*/
/*|------------------------------------------------------------------------------------------|*/
export interface STATE_STACK_DATA<T>{
    [key:string|number]:T
}
export class State{
    private stateList:STATE_STACK_DATA<Subscription<any>> = {};

    public addState<DATA_TYPE>(stateKey:string|number, value?:DATA_TYPE, silent = false){
        if(this.stateList[stateKey] == undefined)
            return this.stateList[stateKey] = new Subscription<DATA_TYPE>(value, silent);
        else{
            return this.stateList[stateKey] as Subscription<DATA_TYPE>;
        }
    }

    public select<ACTUAL_TYPE>(stateKey:string|number, value?:ACTUAL_TYPE){
        const subs = this.stateList[stateKey] as Subscription<ACTUAL_TYPE>;
        if(subs == undefined){
            this.stateList[stateKey] = new Subscription<ACTUAL_TYPE>(value, true);
        }
        if(value){
            this.stateList[stateKey].update(value);
        }
        return this.stateList[stateKey] as Subscription<ACTUAL_TYPE>;
    }
}

export class Subscription<DATA_TYPE>{
    private value:DATA_TYPE = undefined as any;
    private stateTrigger = document.createElement("button");

    constructor(value?:DATA_TYPE, silent = false){
        if(value)
            this.set(value, silent);
    }

    //--Setter--//
    set(value:DATA_TYPE, silent = false){
        this.value = value;
        if(!silent){
            this.stateTrigger.dispatchEvent(new Event("click"));
        }
        return this;
    }
    //--Setter--//

    get(){
        return this.value;
    }

    trigger(){
        this.stateTrigger.dispatchEvent(new Event("click"));
        return this;
    }

    update(value:DATA_TYPE|((value:DATA_TYPE)=>DATA_TYPE), silent = false){
        if(typeof value == "function"){
           value = (value as ((value:DATA_TYPE)=>DATA_TYPE))(this.value);
           this.value = value as DATA_TYPE;
            if(!silent){
                this.stateTrigger.dispatchEvent(new Event("click"));
            }
           return;
        }
        this.value = value;
        if(!silent){
            this.stateTrigger.dispatchEvent(new Event("click"));
        }
    }

    subscribe(callback:(value:DATA_TYPE)=>void){
        const THIS = this;
        this.stateTrigger.addEventListener("click", ()=>{
            try{
                callback(THIS.value);
            }catch(e){
                console.log("Something happened in the subscription:");
                console.log("FROM: ", callback);
                console.log("VALUE:", THIS.value);
                console.log("ERROR: ", e);
                console.log("If this is intended (i.e accessing values from parallel subscription), ignore this message");
            }
        })
    }
}