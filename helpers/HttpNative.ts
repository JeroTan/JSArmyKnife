/**
 * In house Function(private): 
 * - Abort
 * 
 */

//------------------------ Interface definition
interface AllHeaders{
    "A-IM"?:string,
    "Accept"?:string,
    "Accept-Additions"?:string
    "Accept-CH"?:string
    "Accept-Charset"?:string
    "Accept-Datetime"?:string
    "Accept-Encoding"?:string
    "Accept-Features"?:string
    "Accept-Language"?:string
    "Accept-Patch"?:string
    "Accept-Post"?:string
    "Accept-Ranges"?:string
    "Accept-Signature"?:string
    "Access-Control"?:string
    "Access-Control-Allow-Credentials"?:string
    "Access-Control-Allow-Headers"?:string
    "Access-Control-Allow-Methods"?:string
    "Access-Control-Allow-Origin"?:string
    "Access-Control-Expose-Headers"?:string
    "Access-Control-Max-Age"?:string
    "Access-Control-Request-Headers"?:string
    "Access-Control-Request-Method"?:string
    "Age"?:string
    "Allow"?:string	
    "ALPN"?:string
    "Alt-Svc"?:string
    "Alt-Used"?:string
    "Alternates"?:string
    "AMP-Cache-Transform"?:string
    "Apply-To-Redirect-Ref"?:string
    "Authentication-Control"?:string
    "Authentication-Info"?:string
    "Authorization"?:string
    "Cache-Control"?:string
    "Cache-Status"?:string
    "Cal-Managed-ID"?:string
    "CalDAV-Timezones"?:string
    "Capsule-Protocol"?:string
    "CDN-Cache-Control"?:string
    "CDN-Loop"?:string
    "Cert-Not-After"?:string
    "Cert-Not-Before"?:string
    "Clear-Site-Data"?:string
    "Client-Cert"?:string
    "Client-Cert-Chain"?:string
    "Close"?:string
    "Configuration-Context"?:string
    "Connection"?:string
    "Content-Digest"?:string
    "Content-Disposition"?:string
    "Content-Encoding"?:string
    "Content-Language"?:string
    "Content-Length"?:string
    "Content-Location"?:string
    "Content-Range"?:string
    "Content-Script-Type"?:string
    "Content-Security-Policy"?:string
    "Content-Security-Policy-Report-Only"?:string
    "Content-Type"?:string
    "Cookie"?:string
    "Cross-Origin-Embedder-Policy"?:string
    "Cross-Origin-Embedder-Policy-Report-Only"?:string
    "Cross-Origin-Opener-Policy"?:string
    "Cross-Origin-Opener-Policy-Report-Only"?:string
    "Cross-Origin-Resource-Policy"?:string
    "DASL"?:string
    "Date"?:string
    "DAV"?:string
    "Default-Style"?:string
    "Delta-Base"?:string
    "Depth"?:string
    "Derived-From"?:string
    "Destination"?:string
    "DPoP"?:string
    "DPoP-Nonce"?:string
    "Early-Data"?:string
    "EDIINT-Features"?:string
    "ETag"?:string
    "Expect"?:string
    "Expires"?:string
    "Forwarded"?:string
    "From"?:string
    "Hobareg"?:string
    "Host"?:string
    "If"?:string
    "If-Match"?:string
    "If-Modified-Since"?:string
    "If-None-Match"?:string
    "If-Range"?:string
    "If-Schedule-Tag-Match"?:string
    "If-Unmodified-Since"?:string
    "IM"?:string
    "Include-Referred-Token-Binding-ID"?:string
    "Isolation"?:string
    "Keep-Alive"?:string
    "Label"?:string
    "Last-Event-ID"?:string
    "Last-Modified"?:string
    "Link"?:string
    "Link-Template"?:string
    "Location"?:string
    "Lock-Token"?:string
    "Market"?:string
    "Max-Forwards"?:string
    "Memento-Datetime"?:string
    "Meter"?:string
    "MIME-Version"?:string
    "Negotiate"?:string
    "NEL"?:string
    "OData-EntityId"?:string
    "OData-Isolation"?:string
    "OData-MaxVersion"?:string
    "OData-Version"?:string
    "Optional-WWW-Authenticate"?:string
    "Ordering-Type"?:string
    "Origin"?:string
    "Origin-Agent-Cluster"?:string
    "OSCORE"?:string
    "OSLC-Core-Version"?:string
    "Overwrite"?:string
    "Permissions-Policy"?:string
    "Ping-From"?:string
    "Ping-To"?:string
    "Position"?:string
    "Pragma"?:string
    "Prefer"?:string
    "Preference-Applied"?:string
    "Priority"?:string
    "Proxy-Authenticate"?:string
    "Proxy-Authentication-Info"?:string
    "Proxy-Authorization"?:string
    "Proxy-Features"?:string
    "Proxy-Instruction"?:string
    "Proxy-Status"?:string
    "Public"?:string
    "Public-Key-Pins"?:string
    "Public-Key-Pins-Report-Only"?:string
    "Range"?:string
    "Redirect-Ref"?:string
    "Referer"?:string
    "Refresh"?:string
    "Repeatability-Client-ID"?:string
    "Repeatability-First-Sent"?:string
    "Repeatability-Request-ID"?:string
    "Repeatability-Result"?:string
    "Replay-Nonce"?:string
    "Reporting-Endpoints"?:string
    "Repr-Digest"?:string
    "Retry-After"?:string
    "Schedule-Reply"?:string
    "Schedule-Tag"?:string
    "Sec-GPC"?:string
    "Sec-Purpose"?:string
    "Sec-Token-Binding"?:string
    "Sec-WebSocket-Accept"?:string
    "Sec-WebSocket-Extensions"?:string
    "Sec-WebSocket-Key"?:string
    "Sec-WebSocket-Protocol"?:string
    "Sec-WebSocket-Version"?:string
    "Security-Scheme"?:string
    "Server"?:string
    "Server-Timing"?:string
    "Set-Cookie"?:string
    "Signature"?:string
    "Signature-Input"?:string
    "SLUG"?:string
    "SoapAction"?:string
    "Status-URI"?:string
    "Strict-Transport-Security"?:string
    "Sunset"?:string
    "Surrogate-Capability"?:string
    "Surrogate-Control"?:string
    "TCN"?:string
    "TE"?:string
    "Timeout"?:string
    "Timing-Allow-Origin"?:string
    "Topic"?:string
    "Traceparent"?:string
    "Tracestate"?:string
    "Trailer"?:string
    "Transfer-Encoding"?:string
    "TTL"?:string
    "Upgrade"?:string
    "Urgency"?:string
    "User-Agent"?:string
    "Variant-Vary"?:string
    "Vary"?:string
    "Via"?:string
    "Want-Content-Digest"?:string
    "Want-Repr-Digest"?:string
    "WWW-Authenticate"?:string
    "X-Content-Type-Options"?:string
    "X-Frame-Options"?:string
    "*"?:string
    
    }
    interface HttpConfig{
        headers: AllHeaders,
        method: "get"|"post"|"put"|"patch"|"delete",
        body?: string|null|ReadableStream|ArrayBuffer|DataView|Blob|File|FormData,
    }
    
    
    //------------------------ In public utility
    export class HttpNativePlate{
        private Config: HttpConfig = {
            headers: {
                "Content-Type":"application/json",
            },
            method: "get",
        }
        private baseURL: string = ""
        private signal : AbortController = new AbortController;
    
        private pathURL: string = "/";
    
        private paramObject: {[key: string|number]: string} = {};;
        
        constructor(baseURL?:undefined|string, initialHeaders?:undefined|AllHeaders){
            
            if(baseURL !== undefined)
                this.setBaseURL(baseURL);
            if(initialHeaders !== undefined)
                this.headers(initialHeaders);
        }
        //--Default Setters--//
        public setBaseURL(baseURL:string){
            this.baseURL = baseURL;
            return this;
        }
        //--Default Setters--//
    
        //--Modifiers--//
        public data(data:string|null|ReadableStream|ArrayBuffer|DataView|Blob|File|FormData){
            this.Config["body"] = data;
            return this;
        }
        public headers(headers:AllHeaders, update:boolean = false){
            if(!update){
                this.Config.headers = headers;
                return this;
            }
            this.Config.headers = {...this.Config.headers, ...headers};
            return this;
        }
        public path(path: string){
            this.pathURL = path;
            return this;
        }
        public params(object:{[key: string|number]: string}, update= false){
            if(update){
                this.paramObject = {...this.paramObject, ...object};
            }else{
                this.paramObject = object;
            }
            return this;
        }
        public method(method:"get"|"post"|"put"|"patch"|"delete"){
            this.Config.method = method
            return this;
        }
        public get(){
            return this.method("get");
        }
        public post(){
            return this.method("post");
        }
        public put(){
            return this.method("put");
        }
        public patch(){
            return this.method("patch");
        }
        public delete(){
            return this.method("delete");
        }
        //--Modifiers--//
    
        //--Functionalities--//
        public reset(){
            this.Config = {  ...this.Config, body: undefined };
    
            this.signal = new AbortController;
            return this;
        }
        public getSignal(){
            return this.signal;
        }
        async request(){
            return await fetch(this.baseURL+this.pathURL+(Object.keys(this.paramObject).length > 0? "?"+(new URLSearchParams(this.paramObject).toString()): ""), this.Config as RequestInit);
        }
    }
    
    
    export type RESPONSE_DATA<T> = (data:string|Response|object|T, ...others:any)=>void;
    
    //This class, in conjunction with HttpPlate objects, Data and Error from its response will be resolve here using this class;
    export class Resolve<JSON_BODY_TYPE>{
        promiseResponse:Promise<Response>|undefined;
        excludeStatus:number[] = []; //If use already use the s200, then when you use sOthers it will not trigger the s200. In simple terms none will trigger if you already trigger it.
        acceptJSON:boolean = true; //If the result must be in json
    
        constructor(promiseResponse:Promise<Response>|undefined, json = true){ //It must accept a promise;
            if(promiseResponse !== undefined)
                this.addResponse(promiseResponse);
            if(json || !json)
                this.setDataJSON(json);
        }
        //--Setter--//
        public addResponse(promiseResponse:Promise<Response>){
            this.promiseResponse = promiseResponse;
            return this;
        }
        public setDataJSON(isJSON:boolean){
            this.acceptJSON = isJSON;
            return this;
        }
        //--Setter--//
    
        //--In House helpers--//
        private async checkStatus(status:number){
            return (await this.promiseResponse)?.status == status;
        }
        private parseData<OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|OTHER>, raw = false){
            (async(THIS, callback, raw)=>{
                const response = await THIS.promiseResponse;
                if(!response || response === undefined){
                    return;
                }
                if(raw){
                    return callback(response)
                }
                const {body, headers, ok, status, type, url} = response;
                return callback(await (THIS.acceptJSON ? response.json() : response.text()), headers, ok, status, type, url);
            })(this, callback, raw);
            return this;
        }
        //Normally you should just use parseData to get the resolve but we need to exclude some status code once the callback is already use
        private checkParseExclude<OTHER>(status:number, callback:RESPONSE_DATA<JSON_BODY_TYPE|OTHER>){
            const THIS = this;//To prevent from invalid Self Referencing
            THIS.checkStatus(status).then(match=>{
                if(match){
                    THIS.parseData<OTHER>(callback);
                }
            })
            THIS.excludeStatus.push(status);
            return THIS;
        }
        //--In House helpers--//
    
        //HTTP Code
        default<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){
            return this.parseData<JSON_BODY_TYPE_OTHER>(callback, true);
        }
        //Success
        //200
        s200<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //OK
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(200, callback);
        }
        s201<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Created
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(201, callback);
        }
        s202<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Accepted
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(202, callback);
        }
        s203<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Non-Authoritative Information
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(203, callback);
        }
        s204<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //No Content
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(204, callback);
        }
        s205<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Reset Content
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(205, callback);
        }
        //300
        s300<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Multiple Choices
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(300, callback);
        }
        s301<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Moved Permanently
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(301, callback);
        }
        s303<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Redirect to a GET request
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(303, callback);
        }
        //Error
        //400
        s400<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Bad Request
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(400, callback);
        }
        s401<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Unauthorized
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(401, callback);
        }
        s402<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Payment Required
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(402, callback);
        }
        s403<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Forbidden
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(403, callback);
        }
        s404<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Not Found
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(404, callback);
        }
        s408<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Request Timeout
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(405, callback);
        }
        s410<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Gone
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(410, callback);
        }
        s413<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Payload Too Large
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(413, callback);
        }
        s414<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //URI Too Long
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(414, callback);
        }
        s415<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Unsupported Media Type
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(415, callback);
        }
        s416<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Range Not Satisfiable
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(416, callback);
        }
        s417<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Expectation Failed
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(417, callback);
        }
        s418<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //I'm a teapot
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(418, callback);
        }
        s421<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Misdirected Request
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(421, callback);
        }
        s422<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Unprocessable Content
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(422, callback);
        }
        s425<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Too Early
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(425, callback);
        }
        s431<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Request Header Fields Too Large
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(431, callback);
        }
        s451<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Unavailable For Legal Reasons
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(451, callback);
        }
        //Server Error
        //500
        s500<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Internal Server Error
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(500, callback);
        }
        s501<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Not Implemented
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(501, callback);
        }
        s502<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Bad Gateway
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(502, callback);
        }
        s503<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Service Unavailable
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(503, callback);
        }
        s504<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Gateway Timeout
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(504, callback);
        }
        s505<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //HTTP Version Not Supported
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(505, callback);
        }
        s506<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Variant Also Negotiates
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(506, callback);
        }
        s507<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){ //Insufficient Storage
            return this.checkParseExclude<JSON_BODY_TYPE_OTHER>(507, callback);
        }
        //If somehow you already specify all the status code and you need to get the unpredictable one then use this.
        sOthers<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){
            (async(THIS)=>{
                const {status}:Response = await THIS.promiseResponse as Response;
                if( THIS.excludeStatus.some(x=>x==status) )
                    return THIS;
                
                THIS.excludeStatus.push(status);
                THIS.parseData<JSON_BODY_TYPE_OTHER>(callback);
            })(this);
            return this;
        }
        //This is same with default but it doesn't return raw response but instead works like status codes method. However this one works regardless of status code, and it may trigger both twice like you call the method 200 and chain this one then those two will run together. Maybe use this as an after-effect once everything is finish.
        sAfter<JSON_BODY_TYPE_OTHER>(callback:RESPONSE_DATA<JSON_BODY_TYPE|JSON_BODY_TYPE_OTHER>){
            return this.parseData<JSON_BODY_TYPE_OTHER>(callback);
        }
    }
    
    /*|---------------------------------------------------------------------------------------|*/
    /*|----------This one is for vanilla JS Form Request--------------------------------------|*/
    /*|---------------------------------------------------------------------------------------|*/
    interface DOM_REQUEST_CONFIG{
        method:undefined|"POST"|"GET",
        action:undefined|string,
        target?:undefined|string,
        enctype?:undefined|string,
    }
    interface DOM_REQUEST_DATA{
        key:string,
        value:string,
    }
    
    class DOMRequest{
        private config:DOM_REQUEST_CONFIG = {method:undefined, action:undefined, target:undefined};
        private dataContainer:HTMLElement[] = [];
    
        constructor(method?:undefined|"POST"|"GET", action?:undefined|string, target?:undefined|string){
            if(method)
                this.method(method);
            if(action)
                this.action(action);
            if(target)
                this.target(target);
        }
    
        //--Setter--//
        public method(method:"POST"|"GET"){
            this.config.method = method;
            return this;
        }
        public get(){
            return this.method("GET");
        }
        public post(){
            return this.method("POST");
        }
        public action(action:string){
            this.config.action = action;
            return this;
        }
        public url(action:string){
            return this.action(action);
        }
        public target(target:string){
            this.config.target = target;
            return this;
        }
        //--Setter--//
    
        //--In House--//
        protected pushDataToStack(data:DOM_REQUEST_DATA){
            const newElement:HTMLInputElement = document.createElement("input");
            newElement.name = data.key;
            newElement.value = data.value;
            
            this.dataContainer.push( newElement );
        }
        //--In House--//1
    
    
        //--Functionalities--//
        public data(data:DOM_REQUEST_DATA|DOM_REQUEST_DATA[]){
            const THIS = this;
    
            if(!Array.isArray(data)){
                this.pushDataToStack(data);
                return this;
            }
    
            data.forEach((e:DOM_REQUEST_DATA)=>{
                THIS.pushDataToStack(e);
            })
            
            return this;
        }
        public request(){
            if(this.config.action === undefined || this.config.method === undefined)
                return;
            const formContainer = document.createElement("form");
            formContainer.style.opacity = "0";
            formContainer.style.position = "absolute";
            formContainer.style.pointerEvents = "none";
            formContainer.style.visibility = "hidden";
            formContainer.action = this.config.action;
            formContainer.method = this.config.method;
    
            this.dataContainer.forEach(e=>{
                formContainer.appendChild(e);
            });
    
            const submitButton = document.createElement("button");
            submitButton.type = "submit";
    
            formContainer.appendChild(submitButton);
    
            //Finally submit the request
            submitButton.click();
        }
        //--Functionalities--//
    }