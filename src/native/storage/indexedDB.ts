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