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
				responseRead = await response.clone().text();   
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
	public s409<OTHER>(callback:STRING_ONLY_RESPONSE|PURE_RESPONSE|OBJECT_READY_RESPONSE<OTHER>){ //Not Found
		return this.checkParseExclude<OTHER>(409, callback);
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
	// This

	stream(callback: (eventTrigger: (callback2: (data: string) => void) => void) => void, decode: true): Promise<Response>;
	stream(callback: (eventTrigger: (callback2: (data: Uint8Array) => void) => void) => void, decode?: false): Promise<Response>;
	stream(
		callback: (eventTrigger: (callback2: (data: (Uint8Array|string|any)) => void) => void) => void,
		decode: boolean = false
	): Promise<Response> {
		this.promiseResponse.then(async (response) => {
			if (response.ok) {
				const reader = response.clone().body?.getReader();
				if (!reader) {
					throw new Error("can't read the stream");
				}
				callback((callback2: (data: string | Uint8Array) => void) => {
					(async () => {
						while (true) {
							try {
								const { value, done } = await reader.read();
								if (value) {
									if (decode) {
										const decoder = new TextDecoder("utf-8", { fatal: true });
										const decoded = decoder.decode(value, { stream: true });
										const cleaned = decoded
											.replace(/^data:\s*/, '')
											.replace(/data: \[DONE\]/g, '')
											.trim();
										callback2(cleaned);
									} else {
										callback2(value as Uint8Array);
									}
								}
								if (done) {
									break;
								}
							} catch {
								break;
							}
						}
					})();
				});
			}
		});
		return this.promiseResponse;
	}
}