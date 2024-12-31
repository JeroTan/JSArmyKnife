/**
 * In house Function(private): 
 * - Abort
 * 
 */

//------------------------ Interface/Type definition
export type RESPONSE_TYPE = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
export interface ALL_HEADERS<>{
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
//OTHERS
"apiKey"?:string,
"return"?:string,
 "X-Toyota-API-Key"?:string
}
interface HTTP_CONFIG{
	headers: ALL_HEADERS,
	method: "get"|"post"|"put"|"patch"|"delete"|"GET"|"PATCH"|"POST"|"PUT"|"PATCH"|"DELETE",
	body?: string|null|ReadableStream|ReadableStream<Uint8Array>|ArrayBuffer|DataView|Blob|File|Uint8Array|BufferSource|FormData|URLSearchParams,
	// credentials?:"omit"|"same-origin"|"include",
}


//------------------------ In public utility
export class HttpNativePlate{
	private Config: HTTP_CONFIG = {
		headers: {
			"Content-Type":"application/json",
		},
		method: "get",
		// credentials: "include",
	}
	private baseURL: string = "http://localhost:4321"
	private signal : AbortController = new AbortController;

	private pathURL: string = "/";

	private paramObject: {[key: string|number]: string} = {};;
	
	constructor(baseURL?:undefined|string, initialHeaders?:undefined|ALL_HEADERS){
		
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
	public data(data:string|null|ReadableStream|ReadableStream<Uint8Array>|ArrayBuffer|DataView|Blob|File|Uint8Array|BufferSource|FormData|URLSearchParams){
		this.Config["body"] = data;
		return this;
	}
	public headers(headers:ALL_HEADERS, update:boolean = false){
		if(!update){
			this.Config.headers = headers;
			return this;
		}
		this.Config.headers = {...this.Config.headers, ...headers};
		for(const i in this.Config.headers){
			if(this.Config.headers[i as keyof ALL_HEADERS] == undefined){
				delete this.Config.headers[i as keyof ALL_HEADERS];
			}
		}
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
	public method(method:"get"|"post"|"put"|"patch"|"delete"|"GET"|"PATCH"|"POST"|"PUT"|"PATCH"|"DELETE"){
		this.Config.method = method;
		return this;
	}
	public get(){
		return this.method("GET");
	}
	public post(){
		return this.method("POST");
	}
	public put(){
		return this.method("PUT");
	}
	public patch(){
		return this.method("PATCH");
	}
	public delete(){
		return this.method("DELETE");
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
		try{
			return await fetch(this.baseURL+this.pathURL+(Object.keys(this.paramObject).length > 0? "?" +parseQueryToString(this.paramObject): ""), this.Config as RequestInit);
		}catch{
			return new Promise((resolve)=>{
				resolve(Response.json({message:"Fetch Error"}, {status:503}));
			}) as Promise<Response>
		}
		
	}
}


export type STRING_ONLY_RESPONSE = (data:string, headers:Headers, ok:boolean, status:number, url:string)=>void;
export type PURE_RESPONSE = (data:Response)=>void;
export type OBJECT_READY_RESPONSE<T> = (data:T, headers:Headers, ok:boolean, status:number, url:string)=>void;

//This class, in conjunction with HttpPlate objects, Data and Error from its response will be resolve here using this class;
export class Resolve{
	promiseResponse:Promise<Response> = Promise.resolve(new Response);
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
	protected async checkStatus(status:number){
		return (await this.promiseResponse)?.status == status;
	}
	protected parseData<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>, raw = false){
		(async(THIS, callback, raw)=>{
			const response = await THIS.promiseResponse;
			if(!response || response === undefined){
				return;
			}
			if(raw){
				return (callback as PURE_RESPONSE)(response);
			}
			const {headers, ok, status, url} = response; //body: can be also added when using

			let responseRead:string|OTHER;
			try{
				if(THIS.acceptJSON){
					responseRead = await response.clone().json();
				}else{
					responseRead = await response.clone().text();
				}
			}catch{
				try{
					responseRead = await response.clone().text();
				}catch{
					responseRead = response.clone().body as unknown as OTHER;
				}  
			}
			if(typeof responseRead === "string"){
				return (callback as STRING_ONLY_RESPONSE)(responseRead, headers, ok, status, url);
			}else{
				return (callback as OBJECT_READY_RESPONSE<OTHER>)(responseRead, headers, ok, status, url);
			}
			
		})(this, callback, raw);
		return this;
	}
	//Normally you should just use parseData to get the resolve but we need to exclude some status code once the callback is already use
	protected checkParseExclude<OTHER>(status:number, callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){
		const THIS = this;//To prevent from invalid Self Referencing
		THIS.checkStatus(status).then(match=>{
			if(match){
				THIS.parseData<OTHER>(callback);
			}
		});
		THIS.excludeStatus.push(status);
		return THIS;
	}
	//--In House helpers--//

	//HTTP Code
	public default<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){
		return this.parseData<OTHER>(callback, true);
	}
	//Zero
	public s0<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //OK
		return this.checkParseExclude<OTHER>(0, callback);
	}

	//Success
	//200
	public s200<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //OK
		return this.checkParseExclude<OTHER>(200, callback);
	}
	public s201<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Created
		return this.checkParseExclude<OTHER>(201, callback);
	}
	/**
	 * @info Accepted
	 */
	public s202<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Accepted
		return this.checkParseExclude<OTHER>(202, callback);
	}
	public s203<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Non-Authoritative Information
		return this.checkParseExclude<OTHER>(203, callback);
	}
	public s204<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //No Content
		return this.checkParseExclude<OTHER>(204, callback);
	}
	public s205<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Reset Content
		return this.checkParseExclude<OTHER>(205, callback);
	}
	//300
	public s300<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Multiple Choices
		return this.checkParseExclude<OTHER>(300, callback);
	}
	public s301<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Moved Permanently
		return this.checkParseExclude<OTHER>(301, callback);
	}
	public s303<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Redirect to a GET request
		return this.checkParseExclude<OTHER>(303, callback);
	}
	//Error
	//400
	public s400<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Bad Request
		return this.checkParseExclude<OTHER>(400, callback);
	}
	public s401<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Unauthorized
		return this.checkParseExclude<OTHER>(401, callback);
	}
	public s402<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Payment Required
		return this.checkParseExclude<OTHER>(402, callback);
	}
	public s403<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Forbidden
		return this.checkParseExclude<OTHER>(403, callback);
	}
	public s404<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Not Found
		return this.checkParseExclude<OTHER>(404, callback);
	}
	/**
	 * @info Not Acceptable
	 */
	public s406<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Not Found
		return this.checkParseExclude<OTHER>(406, callback);
	}
	public s408<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Request Timeout
		return this.checkParseExclude<OTHER>(408, callback);
	}
	public s410<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Gone
		return this.checkParseExclude<OTHER>(410, callback);
	}
	public s413<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Payload Too Large
		return this.checkParseExclude<OTHER>(413, callback);
	}
	public s414<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //URI Too Long
		return this.checkParseExclude<OTHER>(414, callback);
	}
	public s415<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Unsupported Media Type
		return this.checkParseExclude<OTHER>(415, callback);
	}
	public s416<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Range Not Satisfiable
		return this.checkParseExclude<OTHER>(416, callback);
	}
	public s417<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Expectation Failed
		return this.checkParseExclude<OTHER>(417, callback);
	}
	public s418<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //I'm a teapot
		return this.checkParseExclude<OTHER>(418, callback);
	}
	public s421<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Misdirected Request
		return this.checkParseExclude<OTHER>(421, callback);
	}
	public s422<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Unprocessable Content
		return this.checkParseExclude<OTHER>(422, callback);
	}
	/**
	 * @info Too Early
	 */
	public s425<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Too Early
		return this.checkParseExclude<OTHER>(425, callback);
	}
	public s429<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Too Many Request
		return this.checkParseExclude<OTHER>(429, callback);
	}
	public s431<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Request Header Fields Too Large
		return this.checkParseExclude<OTHER>(431, callback);
	}
	public s451<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Unavailable For Legal Reasons
		return this.checkParseExclude<OTHER>(451, callback);
	}
	//Server Error
	//500
	public s500<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Internal Server Error
		return this.checkParseExclude<OTHER>(500, callback);
	}
	public s501<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Not Implemented
		return this.checkParseExclude<OTHER>(501, callback);
	}
	public s502<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Bad Gateway
		return this.checkParseExclude<OTHER>(502, callback);
	}
	public s503<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Service Unavailable
		return this.checkParseExclude<OTHER>(503, callback);
	}
	public s504<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Gateway Timeout
		return this.checkParseExclude<OTHER>(504, callback);
	}
	public s505<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //HTTP Version Not Supported
		return this.checkParseExclude<OTHER>(505, callback);
	}
	public s506<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Variant Also Negotiates
		return this.checkParseExclude<OTHER>(506, callback);
	}
	public s507<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Insufficient Storage
		return this.checkParseExclude<OTHER>(507, callback);
	}
	//If somehow you already specify all the status code and you need to get the unpredictable one then use this.
	sOthers<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){
		(async(THIS)=>{
			const {status}:Response = await THIS.promiseResponse as Response;
			if( THIS.excludeStatus.some(x=>x==status) )
				return THIS;
			
			THIS.excludeStatus.push(status);
			THIS.parseData<OTHER>(callback);
		})(this);
		return this;
	}
	//This is same with default but it doesn't return raw response but instead works like status codes method. However this one works regardless of status code, and it may trigger both twice like you call the method 200 and chain this one then those two will run together. Maybe use this as an after-effect once everything is finish.
	sAfter<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){
		return this.parseData<OTHER>(callback);
	}
	//This
	stream<OTHER>(callback:(eventTrigger:(callback2:(data:Uint8Array)=>void)=>void)=>void){
		this.promiseResponse.then(async (response)=>{
			if(response.ok){
				const res = response.clone().body?.getReader();
				if(!res){
					throw new Error("can't reade the stream");
				}
				callback(( callback2:(data:Uint8Array)=>void)=>{
					(async ()=>{
						while(true){
							try{
								const { value, done} = await res?.read();
								if(value){
									callback2(value);	
								}
								if(done){
									break;
								}
							}catch{
								break;
							}
						}
					})()
				})
				

			}
		})
		return this.promiseResponse
	}
}

/*|---------------------------------------------------------------------------------------|*/
/*|          This one is for vanilla JS Form Request                                      |*/
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

export class DOMRequest{
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
		document.body.appendChild(formContainer);

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


/*|------------------------------------------------------------------------------------------|*/
/*|               Helpers                                                                    |*/
/*|------------------------------------------------------------------------------------------|*/

export function parseQueryToString(object:{[key:string|number]:Array<string|number>|string|number}){
	return Object.keys(object).length > 0 ? Object.keys(object).map((key)=>{
		if(!Array.isArray(object[key])){
			return `${key}=${String(object[key]).replaceAll("&","%26").replaceAll("?","%3F").replaceAll("=","%3D").replaceAll("+","%2B")}`
		}
		if( (object[key] as Array<string|number>).length < 1 )
			return `${key}=null`

		return `${key}=${(object[key] as Array<string|number>).map((e:string|number)=>{
			return String(e).replaceAll("&","%26").replaceAll("?","%3F").replaceAll("=","%3D").replace(",","%2C").replaceAll("+","%2B")
		}).join(",")}`
	}).join("&"):"";

}