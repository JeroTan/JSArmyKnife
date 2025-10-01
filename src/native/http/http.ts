/**
 * HttpNativePlate - A lightweight, chainable HTTP request builder class.
 * 
 * This utility provides a fluent interface for constructing and executing
 * `fetch` requests in TypeScript/JavaScript. It helps with setting base URLs,
 * headers, query params, HTTP methods, and request bodies in a consistent way.
 * 
 * Example usage:
 * 
 * const api = new HttpNativePlate("https://api.example.com");
 * const response = await api
 *   .path("/users")
 *   .params({ page: "2" })
 *   .get()
 *   .request();
 * 
 * const data = await response.json();
 */
//------------------------ Imports
import { parseQueryToString } from "@jsarmyknife/native--parse";

//------------------------ Constants' Definition
/**
 * List of possible fetch response types
 */
export const responseType = ["basic", "cors", "default", "error", "opaque", "opaqueredirect"] as const;

/**
 * Comprehensive list of all known HTTP header keys
 */
export const allHeadersKey = [
	"A-IM",
	"Accept",
	"Accept-Additions",
	"Accept-CH",
	"Accept-Charset",
	"Accept-Datetime",
	"Accept-Encoding",
	"Accept-Features",
	"Accept-Language",
	"Accept-Patch",
	"Accept-Post",
	"Accept-Ranges",
	"Accept-Signature",
	"Access-Control",
	"Access-Control-Allow-Credentials",
	"Access-Control-Allow-Headers",
	"Access-Control-Allow-Methods",
	"Access-Control-Allow-Origin",
	"Access-Control-Expose-Headers",
	"Access-Control-Max-Age",
	"Access-Control-Request-Headers",
	"Access-Control-Request-Method",
	"Age",
	"Allow",
	"ALPN",
	"Alt-Svc",
	"Alt-Used",
	"Alternates",
	"AMP-Cache-Transform",
	"Apply-To-Redirect-Ref",
	"Authentication-Control",
	"Authentication-Info",
	"Authorization",
	"Cache-Control",
	"Cache-Status",
	"Cal-Managed-ID",
	"CalDAV-Timezones",
	"Capsule-Protocol",
	"CDN-Cache-Control",
	"CDN-Loop",
	"Cert-Not-After",
	"Cert-Not-Before",
	"Clear-Site-Data",
	"Client-Cert",
	"Client-Cert-Chain",
	"Close",
	"Configuration-Context",
	"Connection",
	"Content-Digest",
	"Content-Disposition",
	"Content-Encoding",
	"Content-Language",
	"Content-Length",
	"Content-Location",
	"Content-Range",
	"Content-Script-Type",
	"Content-Security-Policy",
	"Content-Security-Policy-Report-Only",
	"Content-Type",
	"Cookie",
	"Cross-Origin-Embedder-Policy",
	"Cross-Origin-Embedder-Policy-Report-Only",
	"Cross-Origin-Opener-Policy",
	"Cross-Origin-Opener-Policy-Report-Only",
	"Cross-Origin-Resource-Policy",
	"DASL",
	"Date",
	"DAV",
	"Default-Style",
	"Delta-Base",
	"Depth",
	"Derived-From",
	"Destination",
	"DPoP",
	"DPoP-Nonce",
	"Early-Data",
	"EDIINT-Features",
	"ETag",
	"Expect",
	"Expires",
	"Forwarded",
	"From",
	"Hobareg",
	"Host",
	"If",
	"If-Match",
	"If-Modified-Since",
	"If-None-Match",
	"If-Range",
	"If-Schedule-Tag-Match",
	"If-Unmodified-Since",
	"IM",
	"Include-Referred-Token-Binding-ID",
	"Isolation",
	"Keep-Alive",
	"Label",
	"Last-Event-ID",
	"Last-Modified",
	"Link",
	"Link-Template",
	"Location",
	"Lock-Token",
	"Market",
	"Max-Forwards",
	"Memento-Datetime",
	"Meter",
	"MIME-Version",
	"Negotiate",
	"NEL",
	"OData-EntityId",
	"OData-Isolation",
	"OData-MaxVersion",
	"OData-Version",
	"Optional-WWW-Authenticate",
	"Ordering-Type",
	"Origin",
	"Origin-Agent-Cluster",
	"OSCORE",
	"OSLC-Core-Version",
	"Overwrite",
	"Permissions-Policy",
	"Ping-From",
	"Ping-To",
	"Position",
	"Pragma",
	"Prefer",
	"Preference-Applied",
	"Priority",
	"Proxy-Authenticate",
	"Proxy-Authentication-Info",
	"Proxy-Authorization",
	"Proxy-Features",
	"Proxy-Instruction",
	"Proxy-Status",
	"Public",
	"Public-Key-Pins",
	"Public-Key-Pins-Report-Only",
	"Range",
	"Redirect-Ref",
	"Referer",
	"Refresh",
	"Repeatability-Client-ID",
	"Repeatability-First-Sent",
	"Repeatability-Request-ID",
	"Repeatability-Result",
	"Replay-Nonce",
	"Reporting-Endpoints",
	"Repr-Digest",
	"Retry-After",
	"Schedule-Reply",
	"Schedule-Tag",
	"Sec-GPC",
	"Sec-Purpose",
	"Sec-Token-Binding",
	"Sec-WebSocket-Accept",
	"Sec-WebSocket-Extensions",
	"Sec-WebSocket-Key",
	"Sec-WebSocket-Protocol",
	"Sec-WebSocket-Version",
	"Security-Scheme",
	"Server",
	"Server-Timing",
	"Set-Cookie",
	"Signature",
	"Signature-Input",
	"SLUG",
	"SoapAction",
	"Status-URI",
	"Strict-Transport-Security",
	"Sunset",
	"Surrogate-Capability",
	"Surrogate-Control",
	"TCN",
	"TE",
	"Timeout",
	"Timing-Allow-Origin",
	"Topic",
	"Traceparent",
	"Tracestate",
	"Trailer",
	"Transfer-Encoding",
	"TTL",
	"Upgrade",
	"Urgency",
	"User-Agent",
	"Variant-Vary",
	"Vary",
	"Via",
	"Want-Content-Digest",
	"Want-Repr-Digest",
	"WWW-Authenticate",
	"X-Content-Type-Options",
	"X-Frame-Options",
	"*",
] as const;


/**
 * Supported HTTP methods
 */
export const methods = ["get", "post", "put", "patch", "delete", "GET", "PATCH", "POST", "PUT", "PATCH", "DELETE"] as const;


//------------------------ Types
export type RESPONSE_TYPE = typeof responseType[number];
export type ALL_HEADERS_KEY = typeof allHeadersKey[number];

/**
 * Represents the structure of header data.
 * Allows known header keys + additional custom keys.
 */
export type HEADER_DATA<otherKey extends string = ALL_HEADERS_KEY> = {[header in ALL_HEADERS_KEY]?: string} & {[key in otherKey]?: string};
export type METHOD_TYPE = typeof methods[number];

/**
 * Basic HTTP request configuration object.
 */
interface HTTP_CONFIG<otherKey extends string = ALL_HEADERS_KEY>{
	headers: HEADER_DATA<otherKey>,
	method: "get"|"post"|"put"|"patch"|"delete"|"GET"|"PATCH"|"POST"|"PUT"|"PATCH"|"DELETE",
	body?:    
		| string
    | null
    | ReadableStream
    | ReadableStream<Uint8Array>
    | ArrayBuffer
    | DataView
    | Blob
    | File
    | Uint8Array
    | BufferSource
    | FormData
    | URLSearchParams,
	// credentials?:"omit"|"same-origin"|"include",
}


//------------------------ Main Class
/**
 * HttpNativePlate - A fluent, type-safe wrapper for the Fetch API.
 * 
 * This class provides a chainable interface for constructing HTTP requests.
 * It simplifies common tasks like setting headers, attaching request bodies,
 * adding query parameters, and switching between HTTP methods.
 * 
 * Key Features:
 * - 🔗 Chainable methods (`.get().path("/users").params({...}).request()`)
 * - ⚙️ Strongly typed headers and methods (with support for custom keys)
 * - 🌐 Supports base URLs and relative paths
 * - 🛑 Request cancellation with AbortController (`stopFetching`)
 * - 🔄 Resettable state (`reset` and `newAbortion`)
 * - 🧩 Flexible body types (`JSON`, `FormData`, `Blob`, `ArrayBuffer`, etc.)
 * 
 * Example usage:
 * 
 * ```ts
 * const api = new HttpNativePlate("https://api.example.com", {
 *   Authorization: "Bearer token123",
 * });
 * 
 * // GET request with query params
 * const response = await api
 *   .path("/users")
 *   .params({ page: "2", limit: "20" })
 *   .get()
 *   .request();
 * 
 * const data = await response.json();
 * 
 * // POST request with JSON body
 * const postResponse = await api
 *   .path("/users")
 *   .post()
 *   .data(JSON.stringify({ name: "Alice" }))
 *   .request();
 * ```
 * 
 * Typical workflow:
 * 1. Initialize `HttpNativePlate` with a base URL.
 * 2. Set path, headers, params, method, and/or body as needed.
 * 3. Call `.request()` to execute and receive a standard Fetch `Response`.
 */
export class HttpNativePlate<
	PATH_NAME extends string = string, 
	otherHeaderKey extends string = ALL_HEADERS_KEY
>{
	// Default request config
	private Config: HTTP_CONFIG<otherHeaderKey> = {
		headers: {
			"Content-Type":"application/json",
		},
		method: "get",
		// credentials: "include",
	}
	
	private baseURL: string = "http://localhost:4321" // Default base URL
	private abortion : AbortController = new AbortController; // handles abort
	private pathURL: PATH_NAME = "/" as PATH_NAME; // request path
	private paramObject: {[key: string|number]: string} = {}; // query params

	/**
   * Create a new instance.
   * @param baseURL Optional base URL (defaults to localhost:4321)
   * @param initialHeaders Optional initial headers
   */
	constructor(baseURL?:undefined|string, initialHeaders?:undefined|HEADER_DATA<otherHeaderKey>){
		if(baseURL !== undefined)
			this.setBaseURL(baseURL);
		if(initialHeaders !== undefined)
			this.headers(initialHeaders);
	}

	//--Default Setters--//
	/**
   * Set or change the base URL.
   */
	public setBaseURL(baseURL:string){
		this.baseURL = baseURL;
		return this;
	}
	//--Default Setters--//

	//--Modifiers--//
	/**
   * Attach request body data.
   */

	public data(data:
		|string
		|null
		|ReadableStream
		|ReadableStream<Uint8Array>
		|ArrayBuffer
		|DataView
		|Blob
		|File
		|Uint8Array
		|BufferSource
		|FormData
		|URLSearchParams
	){
		this.Config["body"] = data;
		return this;
	}

	/**
   * Set headers. If `update` is true, merges with existing headers, maintaining existing ones unless overwritten.
   */
	public headers(headers:HEADER_DATA<otherHeaderKey>, update:boolean = false){
		if(!update){
			this.Config.headers = headers;
			return this;
		}
		this.Config.headers = {...this.Config.headers, ...headers};
		// Clean up undefined values
		for(const i in this.Config.headers){
			if(this.Config.headers[i as keyof HEADER_DATA<otherHeaderKey>] == undefined){
				delete this.Config.headers[i as keyof HEADER_DATA<otherHeaderKey>];
			}
		}
		return this;
	}

	/**
   * Define the request path (relative to baseURL).
   */
	public path(path: PATH_NAME){
		this.pathURL = path;
		return this;
	}

	/**
   * Set query parameters. If `update` is true, merges with existing params.
   */
	public params(object:{[key: string|number]: string}, update= false){
		if(update){
			this.paramObject = {...this.paramObject, ...object};
		}else{
			this.paramObject = object;
		}
		return this;
	}

	/**
   * Set request method (GET, POST, PUT, etc.)
   */
	public method(method:METHOD_TYPE){
		this.Config.method = method;
		return this;
	}
	// Convenience shorthands
	public get(){ return this.method("GET");}
	public post(){ return this.method("POST");}
	public put(){ return this.method("PUT");}
	public patch(){ return this.method("PATCH");}
	public delete(){ return this.method("DELETE");}
	//--Modifiers--//
	

	//--Functionalities--//
  /**
   * Creates a new AbortController for cancelling requests.
   */
	public newAbortion(){
		this.abortion = new AbortController;
		return this;
	}
	/**
   * Reset request config (clears body + resets AbortController).
   */
	public reset(){
		this.Config = {  ...this.Config, body: undefined };
		this.abortion = new AbortController;
		return this;
	}
	/**
   * Get current AbortController signal (for passing to fetch).
   */
	public getAbortion(){
		return this.abortion;
	}
	/**
   * Cancel an ongoing fetch request. This function must be used after calling `request()`.
   */
	public stopFetching(){
		this.abortion.abort();
		return this;
	}
	/**
   * Execute the fetch request with the current config.
   * Returns a `Response` object (or a fallback error response).
   */
	async request(){
		try{
			return await fetch(this.baseURL+this.pathURL+(Object.keys(this.paramObject).length > 0? "?" +parseQueryToString(this.paramObject): ""), this.Config as RequestInit);
		}catch{
			return new Promise((resolve)=>{
				console.error(`There is an error before fetching the path name ${this.baseURL+this.pathURL}`);
				resolve(Response.json({message:"Fetch Error"}, {status:503}));
			}) as Promise<Response>
		}
		
	}
}