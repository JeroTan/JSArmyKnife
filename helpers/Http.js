/**
 * You may use the following helpers
 * Class:
 * - HttpPlate
 * - Resolve
 * - Fetcher
 * Function:
 * - abortRequest
 */

//Required Dependencies: Axios
import axios, { AxiosError } from "axios";


//>> --------------  InHouse Helper ---------------------
//To read Request Cancellationfau
const abortion = new AbortController();
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





//The actual HTTP Request abstraction. It uses axios under the hood.
export class HttpPlate{
    //You may overload the properties of this class;
    Config = {
        headers:{}
    }
    defaultBaseURL = "http://localhost:8000/api/v1";
    defaultHeaders = {
        "Accept": "application/json",
        "Access-Control-Allow-Credentials": 'true',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Content-Type": "application/json",
    }
    constructor(baseURL = false, headers = false){
        this.reset(baseURL, headers);
        this.defaultBaseURL = baseURL !== false ? baseURL : this.defaultBaseURL;
        this.defaultHeaders = headers !== false ? headers : this.defaultHeaders;
    }


    addBaseURL(baseURL){
        this.defaultBaseURL = baseURL;
        this.Config["baseURL"] = baseURL;
        return this;
    }
    addDefaultHeaders(defaultHeaders){
        this.defaultHeaders = defaultHeaders;
        this.Config["headers"] = defaultHeaders;
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
    withCredentials(){
        this.Config["withCredentials"] = true;
        return this;
    }
    withXSRFToken(){
        this.Config["withXSRFToken"] = true;
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

    //The Final Requester
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

    reset(baseURL = false, headers = false){
        this.Config = {
            baseURL: baseURL || ( this.defaultBaseURL ? this.defaultBaseURL : "" ),
            headers: headers || ( this.defaultHeaders ? this.defaultHeaders : {} ),
            signal: abortion.signal,
        };
        this.Inst = axios.create(this.Config);
        return this;
    }

}

//This function, when call, will abort the current on going request.
export function abortRequest (){
    abortion.abort();
}

//This class, in conjunction with HttpPlate objects, Data and Error from its response will be resolve here using this class;
export class Resolve{
    constructor(promiseResponse){ //It must accept a promise;
        this.promiseResponse = promiseResponse;
        this.excludeStatus = []; //If use already use the s200, then when you use sOthers it will not trigger the s200. In simple terms none will trigger if you already trigger it.
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
    checkParseExclude(status, callback){//Normally you should just use parseData to get the resolve but we need to exclude some status code once the callback is already use
        const THIS = this;//To prevent from invalid Self Referencing
        this.excludeStatus.push(status);
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
        return this.checkParseExclude(200, callback);
    }
    s201(callback){ //Created
        return this.checkParseExclude(201, callback);
    }
    s202(callback){ //Accepted
        return this.checkParseExclude(202, callback);
    }
    s203(callback){ //Non-Authoritative Information
        return this.checkParseExclude(203, callback);
    }
    s204(callback){ //No Content
        return this.checkParseExclude(204, callback);
    }
    s205(callback){ //Reset Content
        return this.checkParseExclude(205, callback);
    }
    //300
    s300(callback){ //Multiple Choices
        return this.checkParseExclude(300, callback);
    }
    s301(callback){ //Moved Permanently
        return this.checkParseExclude(301, callback);
    }
    //Error
    //400
    s400(callback){ //Bad Request
        return this.checkParseExclude(400, callback);
    }
    s401(callback){ //Unauthorized
        return this.checkParseExclude(401, callback);
    }
    s402(callback){ //Payment Required
        return this.checkParseExclude(402, callback);
    }
    s403(callback){ //Forbidden
        return this.checkParseExclude(403, callback);
    }
    s404(callback){ //Not Found
        return this.checkParseExclude(404, callback);
    }
    s408(callback){ //Request Timeout
        return this.checkParseExclude(405, callback);
    }
    s410(callback){ //Gone
        return this.checkParseExclude(410, callback);
    }
    s413(callback){ //Payload Too Large
        return this.checkParseExclude(413, callback);
    }
    s414(callback){ //URI Too Long
        return this.checkParseExclude(414, callback);
    }
    s415(callback){ //Unsupported Media Type
        return this.checkParseExclude(415, callback);
    }
    s416(callback){ //Range Not Satisfiable
        return this.checkParseExclude(416, callback);
    }
    s417(callback){ //Expectation Failed
        return this.checkParseExclude(417, callback);
    }
    s418(callback){ //I'm a teapot
        return this.checkParseExclude(418, callback);
    }
    s421(callback){ //Misdirected Request
        return this.checkParseExclude(421, callback);
    }
    s422(callback){ //Unprocessable Content
        return this.checkParseExclude(422, callback);
    }
    s431(callback){ //Request Header Fields Too Large
        return this.checkParseExclude(431, callback);
    }
    s451(callback){ //Unavailable For Legal Reasons
        return this.checkParseExclude(451, callback);
    }
    //Server Error
    //500
    s500(callback){ //Internal Server Error
        return this.checkParseExclude(500, callback);
    }
    s501(callback){ //Not Implemented
        return this.checkParseExclude(501, callback);
    }
    s502(callback){ //Bad Gateway
        return this.checkParseExclude(502, callback);
    }
    s503(callback){ //Service Unavailable
        return this.checkParseExclude(503, callback);
    }
    s504(callback){ //Gateway Timeout
        return this.checkParseExclude(504, callback);
    }
    s505(callback){ //HTTP Version Not Supported
        return this.checkParseExclude(505, callback);
    }
    s506(callback){ //Variant Also Negotiates
        return this.checkParseExclude(506, callback);
    }
    s507(callback){ //Insufficient Storage
        return this.checkParseExclude(507, callback);
    }
    //If somehow you already specify all the status code and you need to get the unpredictable one then use this.
    sOthers(callback){
        (async(THIS)=>{
            try{
                const {status, data} = await THIS.promiseResponse;
                if( THIS.excludeStatus.some(x=>x==status) )
                    return THIS;
                THIS.excludeStatus.push(status);
                callback(data);
            }catch(e){
                console.error(e);
            }
        })(this);
        return this;
    }
    //This is same with default but it doesn't return raw response but instead works like status codes method. However this one works regardless of status code, and it may trigger both twice like you call the method 200 and chain this one then those two will run together. Maybe use this as an after-effect once everything is finish.
    sElse(callback){
        return this.parseData(callback);
    }
}


/** Sometimes you want to add a debounce(or delay the user or have the user a small window of time before submitting a request on the server) on the request plate.
 * This class offers a time-based or turn-based.
 * Time-based - uses time to tell when to submit the request to server.
 * Turn-based - will wait for the current request finish before sending another request to the server.
 * by default, it uses Turn-based, so better add with Debounce to add a timer
 */
export class Fetcher{
    request = async ()=>true;
    requestParam = []; //Param is use when your request needs to accept a parameter
    fetching = false; //checking whether the current () is still fetching;
    fetchCount = 0; //This counter will be use to tell if there is a new fetch again or the fetch() is called again. It will add it up. 0 means nothing to fetch again.
    debounce = false;
    timer = undefined; //it is a number when defined;
    constructor(request=undefined, debounce = undefined){
        this.newRequest(request);
        this.withDebounce(debounce);
    }
    withDebounce(debounce = undefined){//how ms. Please do not use this on framework that has rerender because it will shut down the timer.
        if(debounce !== undefined && !isNaN(debounce))
            this.debounce = debounce;
        return this;
    }
    addParam(param){ //Param is the param that will be inserted to your given request if you that param on it
        this.requestParam = arguments; //arguments is the thing use for function to get all of its parameter;
        return this;
    }
    newRequest(request=undefined){ //In case you want to chain the addition of request instead of using a constructor;
        if(request && typeof request == "function")
            this.request = request;
        return this;
    }
    fetch(){
        const THIS = this;
        function internalFetching(THIS, resolve, reject){
            if(THIS.fetching){
                THIS.fetchCount += 1; //Add Count since someone wants to fetch but the current one is still fetching;
                return reject("Request is Still Processing!");
            }
            function callTheRequest(){ //Let's define the logic here to be called later on.
                THIS.fetching = true;
                THIS.request(...THIS.requestParam).then(x=>{
                    THIS.fetching = false;
                    if( THIS.fetchCount > 0 ){
                        THIS.fetchCount = 0; //Reset it to zero since we found out that there is are some who still fetch while this one is currently fetching
                        //Meaning this will not repeat again unless something fetch again while this thing is still fetching.
                        internalFetching(THIS, resolve, reject);
                        return; //It will stop here since resolve will done on the next fetching
                    }

                    resolve(x); //In order to stay in promise, we use a Promise and sent it here to resolve it outside.
                });
            }

            if(!THIS.debounce)
                return callTheRequest();
            clearInterval(THIS.timer);//Just in case this timer is still running in other universe
            THIS.timer = setTimeout(x=>{
                callTheRequest();
                clearInterval(THIS.timer);
            }, THIS.debounce);
        }

        // Return a Promise
        return new Promise((resolve, reject)=>{
            internalFetching(THIS, resolve, reject);
        });
    }
}
