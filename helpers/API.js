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


//Data and Error will be resolve here using a class;
export class Resolve{
    constructor(promiseResponse){ //It must accept a promise;
        this.promiseResponse = promiseResponse;
    }
    async checkStatus(status){
        try{
            return (await this.promiseResponse).status == status;
        }catch(e){
            return false;
        }

    }
    parseData(callback, raw = false){
        (async(THIS, callback, raw)=>{
            try{
                if(raw)
                    return callback(await THIS.promiseResponse);

                const {status,data} = await THIS.promiseResponse;
                callback(data);
            }catch(e){
                console.error(e);
            }
        })(this, callback, raw);

        return this;
    }
    checkAndParse(status, callback){
        const THIS = this;//To prevent from invalid Self Referencing
        THIS.checkStatus(status).then(match=>{
            if(match){
                THIS.parseData(callback);
            }
        })
        return THIS;
    }

    //HTTP Code
    default(callback){
        return this.parseData(callback, true);
    }
    //Success
    //200
    s200(callback){ //OK
        return this.checkAndParse(200, callback);
    }
    s201(callback){ //Created
        return this.checkAndParse(201, callback);
    }
    s202(callback){ //Accepted
        return this.checkAndParse(202, callback);
    }
    s203(callback){ //Non-Authoritative Information
        return this.checkAndParse(203, callback);
    }
    s204(callback){ //No Content
        return this.checkAndParse(204, callback);
    }
    s205(callback){ //Reset Content
        return this.checkAndParse(205, callback);
    }
    //300
    s300(callback){ //Multiple Choices
        return this.checkAndParse(300, callback);
    }
    s301(callback){ //Moved Permanently
        return this.checkAndParse(301, callback);
    }
    //Error
    //400
    s400(callback){ //Bad Request
        return this.checkAndParse(400, callback);
    }
    s401(callback){ //Unauthorized
        return this.checkAndParse(401, callback);
    }
    s402(callback){ //Payment Required
        return this.checkAndParse(402, callback);
    }
    s403(callback){ //Forbidden
        return this.checkAndParse(403, callback);
    }
    s404(callback){ //Not Found
        return this.checkAndParse(404, callback);
    }
    s408(callback){ //Request Timeout
        return this.checkAndParse(405, callback);
    }
    s410(callback){ //Gone
        return this.checkAndParse(410, callback);
    }
    s413(callback){ //Payload Too Large
        return this.checkAndParse(413, callback);
    }
    s414(callback){ //URI Too Long
        return this.checkAndParse(414, callback);
    }
    s415(callback){ //Unsupported Media Type
        return this.checkAndParse(415, callback);
    }
    s416(callback){ //Range Not Satisfiable
        return this.checkAndParse(416, callback);
    }
    s417(callback){ //Expectation Failed
        return this.checkAndParse(417, callback);
    }
    s418(callback){ //I'm a teapot
        return this.checkAndParse(418, callback);
    }
    s421(callback){ //Misdirected Request
        return this.checkAndParse(421, callback);
    }
    s422(callback){ //Unprocessable Content
        return this.checkAndParse(422, callback);
    }
    s431(callback){ //Request Header Fields Too Large
        return this.checkAndParse(431, callback);
    }
    s451(callback){ //Unavailable For Legal Reasons
        return this.checkAndParse(451, callback);
    }
    //Server Error
    //500
    s500(callback){ //Internal Server Error
        return this.checkAndParse(500, callback);
    }
    s501(callback){ //Not Implemented
        return this.checkAndParse(501, callback);
    }
    s502(callback){ //Bad Gateway
        return this.checkAndParse(502, callback);
    }
    s503(callback){ //Service Unavailable
        return this.checkAndParse(503, callback);
    }
    s504(callback){ //Gateway Timeout
        return this.checkAndParse(504, callback);
    }
    s505(callback){ //HTTP Version Not Supported
        return this.checkAndParse(505, callback);
    }
    s506(callback){ //Variant Also Negotiates
        return this.checkAndParse(506, callback);
    }
    s507(callback){ //Insufficient Storage
        return this.checkAndParse(507, callback);
    }
}


//The actual API abstraction. It uses axios under the hood.
export class ApiRequestPlate{
    baseURLCache = "http://localhost:8000/api/v1";
    constructor(baseURL = false){
        this.reset(baseURL);
    }
    baseURL(baseURL){
        this.baseURLCache = baseURL;
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
            baseURL: baseURL || ( this.baseURLCache ? this.baseURLCache : ""  ),
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
