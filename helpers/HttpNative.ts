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
        [key: string|number]: any;
    }
    
    //------------------------ In house function
    //To have an ability of abortion
    const abortion = new AbortController();
    
    
    //------------------------ In public utility
    export class HttpNativePlate{
        private Config: HttpConfig = {
            headers:{}
        }
        private defaultBaseURL:string = "http://localhost:8000/api";
        private defaultHeaders: AllHeaders = {
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": 'true',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Content-Type": "application/json",
        }
        private pathURL: string = "/";
        
        constructor(baseURL?:undefined|string, headers?:undefined|AllHeaders){
            
            if(baseURL !== undefined)
                this.addBaseURL(baseURL);
            if(headers !== undefined)
                this.addDefaultHeaders(headers);
        }
        //--Default Setters--//
        public addBaseURL(baseURL:string){
            this.defaultBaseURL = baseURL;
            return this;
        }
        public addDefaultHeaders(defaultHeaders:AllHeaders){
            this.defaultHeaders = defaultHeaders;
            return this;
        }
        public updateDefaultHeaders(defaultHeaders:AllHeaders){
            this.defaultHeaders = {...defaultHeaders, ...this.defaultHeaders}
            return this;
        }
        public reset(baseURL?:undefined|string, headers?:undefined|AllHeaders){
            this.Config = {
                baseURL: baseURL || ( this.defaultBaseURL ? this.defaultBaseURL : "" ),
                headers: headers || ( this.defaultHeaders ? this.defaultHeaders : {} ),
                signal: abortion.signal,
            };
            return this;
        }
        //--Default Setters--//
    
        //--Modifiers--//
        public data(data:string|null|ReadableStream){
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
    
    
        //--Fetch Function--//
        async request(withErrorLog:boolean = false){
            try{
                return await fetch(this.defaultBaseURL+this.pathURL, this.Config);
            }catch(e){
                if(withErrorLog)
                    console.error(e);
                return new Promise<Response>((resolve)=>{
                    new Response("Not Found", {status:404});
                })
            }
            
        }
    }
    
    
    type BodyData = (data: ReadableStream<any>|string, ...others:any)=>{};
    type ResponseData = (data: typeof Response)=>{};
    
    //This class, in conjunction with HttpPlate objects, Data and Error from its response will be resolve here using this class;
    export class Resolve{
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
        private parseData(callback:BodyData|ResponseData|any, raw = false){
            (async(THIS, callback, raw)=>{
                const response:any = await THIS.promiseResponse;
                if(!response){
                    return;
                }
                if(raw){
                    return callback(response)
                }
                const {body, headers, ok, status, type, url}:any = response;
                return callback(await (THIS.acceptJSON ? response.json() : response.text()), headers, ok, status, type, url);
            })(this, callback, raw);
            return this;
        }
        //Normally you should just use parseData to get the resolve but we need to exclude some status code once the callback is already use
        private checkParseExclude(status:number, callback:BodyData|ResponseData|any){
            const THIS = this;//To prevent from invalid Self Referencing
            THIS.checkStatus(status).then(match=>{
                if(match){
                    THIS.parseData(callback);
                }
            })
            THIS.excludeStatus.push(status);
            return THIS;
        }
        //--In House helpers--//
    
        //HTTP Code
        default(callback:BodyData|ResponseData|any){
            return this.parseData(callback, true);
        }
        //Success
        //200
        s200(callback:BodyData|ResponseData|any){ //OK
            return this.checkParseExclude(200, callback);
        }
        s201(callback:BodyData|ResponseData|any){ //Created
            return this.checkParseExclude(201, callback);
        }
        s202(callback:BodyData|ResponseData|any){ //Accepted
            return this.checkParseExclude(202, callback);
        }
        s203(callback:BodyData|ResponseData|any){ //Non-Authoritative Information
            return this.checkParseExclude(203, callback);
        }
        s204(callback:BodyData|ResponseData|any){ //No Content
            return this.checkParseExclude(204, callback);
        }
        s205(callback:BodyData|ResponseData|any){ //Reset Content
            return this.checkParseExclude(205, callback);
        }
        //300
        s300(callback:BodyData|ResponseData|any){ //Multiple Choices
            return this.checkParseExclude(300, callback);
        }
        s301(callback:BodyData|ResponseData|any){ //Moved Permanently
            return this.checkParseExclude(301, callback);
        }
        //Error
        //400
        s400(callback:BodyData|ResponseData|any){ //Bad Request
            return this.checkParseExclude(400, callback);
        }
        s401(callback:BodyData|ResponseData|any){ //Unauthorized
            return this.checkParseExclude(401, callback);
        }
        s402(callback:BodyData|ResponseData|any){ //Payment Required
            return this.checkParseExclude(402, callback);
        }
        s403(callback:BodyData|ResponseData|any){ //Forbidden
            return this.checkParseExclude(403, callback);
        }
        s404(callback:BodyData|ResponseData|any){ //Not Found
            return this.checkParseExclude(404, callback);
        }
        s408(callback:BodyData|ResponseData|any){ //Request Timeout
            return this.checkParseExclude(405, callback);
        }
        s410(callback:BodyData|ResponseData|any){ //Gone
            return this.checkParseExclude(410, callback);
        }
        s413(callback:BodyData|ResponseData|any){ //Payload Too Large
            return this.checkParseExclude(413, callback);
        }
        s414(callback:BodyData|ResponseData|any){ //URI Too Long
            return this.checkParseExclude(414, callback);
        }
        s415(callback:BodyData|ResponseData|any){ //Unsupported Media Type
            return this.checkParseExclude(415, callback);
        }
        s416(callback:BodyData|ResponseData|any){ //Range Not Satisfiable
            return this.checkParseExclude(416, callback);
        }
        s417(callback:BodyData|ResponseData|any){ //Expectation Failed
            return this.checkParseExclude(417, callback);
        }
        s418(callback:BodyData|ResponseData|any){ //I'm a teapot
            return this.checkParseExclude(418, callback);
        }
        s421(callback:BodyData|ResponseData|any){ //Misdirected Request
            return this.checkParseExclude(421, callback);
        }
        s422(callback:BodyData|ResponseData|any){ //Unprocessable Content
            return this.checkParseExclude(422, callback);
        }
        s431(callback:BodyData|ResponseData|any){ //Request Header Fields Too Large
            return this.checkParseExclude(431, callback);
        }
        s451(callback:BodyData|ResponseData|any){ //Unavailable For Legal Reasons
            return this.checkParseExclude(451, callback);
        }
        //Server Error
        //500
        s500(callback:BodyData|ResponseData|any){ //Internal Server Error
            return this.checkParseExclude(500, callback);
        }
        s501(callback:BodyData|ResponseData|any){ //Not Implemented
            return this.checkParseExclude(501, callback);
        }
        s502(callback:BodyData|ResponseData|any){ //Bad Gateway
            return this.checkParseExclude(502, callback);
        }
        s503(callback:BodyData|ResponseData|any){ //Service Unavailable
            return this.checkParseExclude(503, callback);
        }
        s504(callback:BodyData|ResponseData|any){ //Gateway Timeout
            return this.checkParseExclude(504, callback);
        }
        s505(callback:BodyData|ResponseData|any){ //HTTP Version Not Supported
            return this.checkParseExclude(505, callback);
        }
        s506(callback:BodyData|ResponseData|any){ //Variant Also Negotiates
            return this.checkParseExclude(506, callback);
        }
        s507(callback:BodyData|ResponseData|any){ //Insufficient Storage
            return this.checkParseExclude(507, callback);
        }
        //If somehow you already specify all the status code and you need to get the unpredictable one then use this.
        sOthers(callback:BodyData|ResponseData|any){
            (async(THIS)=>{
                const {status}:any = await THIS.promiseResponse;
                if( THIS.excludeStatus.some(x=>x==status) )
                    return THIS;
                
                THIS.excludeStatus.push(status);
                THIS.parseData(callback);
            })(this);
            return this;
        }
        //This is same with default but it doesn't return raw response but instead works like status codes method. However this one works regardless of status code, and it may trigger both twice like you call the method 200 and chain this one then those two will run together. Maybe use this as an after-effect once everything is finish.
        sAfter(callback:BodyData|ResponseData|any){
            return this.parseData(callback);
        }
    }
    
    /*|---------------------------------------------------------------------------------------|*/
    /*|----------This one is for vanilla JS Form Request--------------------------------------|*/
    /*|---------------------------------------------------------------------------------------|*/
    interface DOMRequestConfig{
        method:undefined|"POST"|"GET",
        action:undefined|string,
        target?:undefined|string,
        enctype?:undefined|string,
    }
    interface DOMRequestData{
        key:string,
        value:string|any,
        type?:string,
    }
    
    class DOMRequest{
        private config:DOMRequestConfig = {method:undefined, action:undefined, target:undefined};
        private dataContainer:any[] = [];
    
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
        protected pushDataToStack(data:DOMRequestData){
            const newElement = document.createElement("input");
            newElement.name = data.key;
            newElement.value = data.value;
            if(data.type)
                newElement.type = data.type;
            
            this.dataContainer.push( newElement );
        }
        //--In House--//1
    
    
        //--Functionalities--//
        public data(data:DOMRequestData|DOMRequestData[]){
            const THIS = this;
    
            if(!Array.isArray(data)){
                this.pushDataToStack(data);
                return this;
            }
    
            data.forEach((e:DOMRequestData)=>{
                THIS.pushDataToStack(e);
            })
            
            return this;
        }
        public request(){
            if(this.config.action === undefined || this.config.method === undefined)
                return;
            const formContainer = document.createElement("form");
            formContainer.action = this.config.action;
            formContainer.method = this.config.method;
    
            this.dataContainer.forEach((e:any)=>{
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