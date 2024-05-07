//Required Dependencies: Knex
import axios, { AxiosError } from "axios";

//>> --------------  InHouse Helper ---------------------
//To read Request Cancellationfau
const abortion = new AbortController();

//To simplify abortion
export function abortLink (){
    abortion.abort();
}
//To Process Errors
function errorProcessing(error){
    const errorData = error?.response?.data ?? undefined;
    const status = error?.response?.status ?? undefined;
    return {
        status: status,
        data: errorData,
    }
}
//To Process Successful Request
function successProcessing(success){
    const successData = success.data;
    const status = success.status;
    return {
        status: status,
        data: successData,
    }
}
//<< --------------  InHouse Helper ---------------------

export class ApiRequestPlate{
    constructor(baseURL = "http://localhost:8000/api/v1"){
        this.reset(baseURL);
    }
    baseURL(baseURL){
        this.Config["baseURL"] = baseURL;
        return this;
    }
    url(url){
        this.Config["url"] = url;
        return this;
    }
    data(data){
        this.Config["data"] = data;
        return this;
    }
    params(params){
        this.Config["params"] = params;
        return this;
    }
    onUploadProgress(callback){
        this.Config["onUploadProgress"] = callback;
        return this;
    }
    onDownloadProgress(callback){
        this.Config["onDownloadProgress"] = callback;
        return this;
    }
    
    
    //DefineModifiers
    file(){
        this.Config.headers["Content-Type"] = "multipart/form-data";
        return this;
    }
    auth(){
        this.Config.headers["Authorization"] = `Bearer ${localStorage.getItem('token') || ""}`;
        return this;
    }

    //RequestType
    method(method){
        this.Config["method"] = method;
        return this;
    }
    get(){
        return this.method("get");
    }
    post(){
        return this.method("post");
    }
    patch(){
        return this.method("patch");
    }
    put(){
        return this.method("put");
    }
    delete(){
        return this.method("delete");
    }

    async request(){
        try{
            return successProcessing(await this.Inst.request(this.Config));
        }catch(e){
            if( !e.response ){
                return {status: 400, data:"Bad Request"};
            }
            return errorProcessing(e);
        }
    }

    isCancel( callback ){
        abortion.signal.addEventListener("abort", callback);
        return this;
    }
    
    uploadProgress( callback ){
        this.Config.onUploadProgress = callback;
        return this;
    }

    downloadProgress( callback ){
        this.Config.onDownloadProgress = callback;
        return this;
    }

    reset(baseURL = false){
        this.Config = {
            baseURL: baseURL || ( this.Config.baseURL ? this.Config.baseURL : ""  ),
            headers: {
                "Accept": "application/json",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            signal: abortion.signal,
        };
        this.Inst = axios.create(this.Config);
        return this;
    }
    
}

//ApiFetch that waits for it to finish and do try again if ever| param is array, api is the api in api caller and todo is the callback
export class Fetcher{
    constructor(api=undefined){
        if(api && typeof api == "function")
            this.api = api;
        this.apiParam = [];
        this.dataWatch = false;
        this.fetching = false;
        this.cache = false;
    }
    addParam(param){ //Param is the param that will be inserted to your given api if you that param on it
        this.apiParam = arguments;
        return this;
    }
    addDataWatch(dataWatch){
        this.dataWatch = dataWatch;
        return this;
    }
    newApi(api){ //New api is to add new api 
        this.api = api;
        return this;
    }
    fetch(){
        const This = this;
        function internalFetching(This, resolve, reject){
            if(This.fetching)
                return reject("Still Processing!");

            This.cache = This.dataWatch; 
            This.fetching = true;
            This.api(...This.apiParam).then(x=>{
                This.fetching = false;
                if( This.cache !== This.dataWatch )
                    internalFetching(This, resolve, reject);

                resolve(x);
            })
        }

        return new Promise((resolve, reject)=>{
            internalFetching(This, resolve, reject);
        });
    }
}