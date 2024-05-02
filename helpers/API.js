//Required Dependencies: Knex
import 'dotenv/config';
import axios from "axios";

//LINKS
const domain =  process?.env?.APIDOMAIN ?? "localhost:8000/";
const protocol = process?.env?.APIPROTOCOL ?? "http://";
const apiVersionIndex = process?.env?.APIVERSIONINDEX ?? "api/v1/";


//>> --------------  InHouse Helper ---------------------
//To read Request Cancellation
const abortion = new AbortController();
//Package the Http URL
export function relink(query="", withApiLink = true){
    return protocol+domain+(withApiLink&&apiVersionIndex)+query;
}
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

class ApiRequestPlate{
    constructor(){
        this.reset();
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

    reset(){
        this.Config = {
            baseURL: ApiLink(),
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
        this.fetching = false;
        this.cache = false;
        this.param = false;
        this.todo = ()=>false;
    }
    addParam(param){ //Param is the param that will be inserted to your given api if you that param on it
        this.param = arguments;
        return this;
    }
    newApi(api){ //New api is to add new api 
        this.api = api;
        return this;
    }
    addTodo(todo){ //Once fetching is finish to the very end, your callback will be called to do your own thing
        this.todo = todo;
        return this;
    }
    fetch(){
        if(this.fetching)
            return this;

        this.cache = this.param; //put the param in cache in case there is a param for it to check
        this.fetching = true;

        const This = this;
        this.api(...this.param).then(x=>{
            
            this.fetching = false;
            if(  JSON.stringify(this.cache) !== JSON.stringify(this.param) )
                This.fetch();
            
            this.todo(x.status, x.data); 
        })
        return this;
    }
}