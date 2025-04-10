/**
 * In house Function(private): 
 * - Abort
 * 
 */

import { parseQueryToString } from "@jsarmyknife/native--parse";

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