export declare class UseDB {
    private DB;
    private dbName;
    private keyStack;
    constructor(dbName?: string | undefined, version?: number);
    setDBName(dbName: string): this;
    open(dbName: string | undefined, version?: number): this;
    delete(dbName?: string | undefined): this;
    setKey(tableName: string, options?: IDBObjectStoreParameters): this;
    migrate(): Promise<IDBOpenDBRequest>;
}
export declare class RecordDB {
    private DB;
    private key;
    constructor(dbName?: string | UseDB | IDBOpenDBRequest | Promise<IDBOpenDBRequest> | undefined, key?: string | undefined);
    setDB(dbName: string | UseDB | IDBOpenDBRequest | Promise<IDBOpenDBRequest>): this;
    setKey(key: string): this;
    protected onlyWhenReady(DB: IDBRequest | Promise<IDBOpenDBRequest>, callback: Function): Promise<void>;
    get<T>(id?: string | number | undefined): Promise<undefined | T>;
    add<T>(data: T): Promise<T | null>;
    update<T>(data: T): Promise<T | undefined>;
    delete(id?: string | number | undefined): Promise<string | number | undefined>;
}
