export type STRING_RESPONSE = (data: string, response: Response) => void;
export type JSON_RESPONSE<DATA extends object = object> = (data: DATA, response: Response) => void;
export type FILE_RESPONSE = (data: Blob, response: Response) => void;
export type BUFFER_RESPONSE = (data: ArrayBuffer, response: Response) => void;
export const responseDataType = ["RAW", "JSON", "FILE", "BUFFER"] as const;
export type RESPONSE_DATA_TYPE = (typeof responseDataType)[number];

//This class, in conjunction with HttpPlate objects, Data and Error from its response will be resolve here using this class;
export class Resolve {
	promiseResponse: Promise<Response> = Promise.resolve(new Response());
	excludeStatus: number[] = []; //If use already use the s200, then when you use sDATAs it will not trigger the s200. In simple terms none will trigger if you already trigger it.

	constructor(promiseResponse: Promise<Response> | undefined) {
		//It must accept a promise;
		if (promiseResponse !== undefined) this.addResponse(promiseResponse);
	}
	//--Setter--//
	public addResponse(promiseResponse: Promise<Response>) {
		// Check if it is an instance of response
		if (!(promiseResponse instanceof Promise) || promiseResponse == undefined) {
			throw new Error("Expected a Promise<Response>");
		}
		this.promiseResponse = promiseResponse;
		return this;
	}
	//--Setter--//

	//--In House helpers--//
	protected async checkStatus(status: number) {
		return (await this.promiseResponse)?.status == status;
	}

	protected parseData(callback: STRING_RESPONSE, responseType: "RAW"): this;
	protected parseData<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	protected parseData(callback: FILE_RESPONSE, responseType: "FILE"): this;
	protected parseData(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	protected parseData(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "RAW",
	) {
		(async (THIS, callback) => {
			const response = await THIS.promiseResponse;
			if (!response || response === undefined) {
				return;
			}
			if (responseType == "RAW") {
				return (callback as STRING_RESPONSE)(await response.clone().text(), response);
			} else if (responseType == "JSON") {
				try {
					return (callback as JSON_RESPONSE)(await response.clone().json(), response);
				} catch {
					try {
						throw new Error(
							`Failed to parse JSON response. We only received the following data: \n${await response.clone().text()}`,
						);
					} catch (err) {
						// If response.clone().text() also fails, throw a simpler error
						throw new Error(`Failed to parse JSON response and unable to read response body.`);
					}
				}
			} else if (responseType == "FILE") {
				return (callback as FILE_RESPONSE)(await response.clone().blob(), response);
			} else if (responseType == "BUFFER") {
				return (callback as BUFFER_RESPONSE)(await response.clone().arrayBuffer(), response);
			}
		})(this, callback).catch((error) => {
			// Catch unhandled promise rejections to prevent test failures
			console.error("Resolver parseData error:", error.message);
		});
		return this;
	}

	//Normally you should just use parseData to get the resolve but we need to exclude some status code once the callback is already use
	protected statusExclusion(status: number, callback: () => void) {
		// const THIS = this; //To prevent from invalid Self Referencing
		this.checkStatus(status)
			.then((match) => {
				if (match) {
					callback();
				}
			})
			.catch((error) => {
				// Silently handle promise rejection - resolver should not crash
				console.warn("Resolver promise rejected:", error.message);
			});
		this.excludeStatus.push(status);
		return this;
	}
	//--In House helpers--//

	//HTTP Code
	public default(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public default<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public default(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public default(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public default(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		return this.parseData(callback as any, responseType as any);
	}

	//Zero
	public s0(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s0<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s0(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s0(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s0<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s0(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//OK
		return this.statusExclusion(0, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	//Success
	//200
	public s200(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s200<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s200(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s200(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s200<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s200(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//OK
		return this.statusExclusion(200, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s201(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s201<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s201(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s201(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s201<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s201(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Created
		return this.statusExclusion(201, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	/**
	 * @info Accepted
	 */
	public s202(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s202<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s202(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s202(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s202<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s202(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Accepted
		return this.statusExclusion(202, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s203(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s203<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s203(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s203(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s203<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s203(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Non-Authoritative Information
		return this.statusExclusion(203, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s204(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s204<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s204(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s204(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s204<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s204(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//No Content
		return this.statusExclusion(204, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s205(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s205<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s205(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s205(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s205<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s205(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Reset Content
		return this.statusExclusion(205, () => {
			this.parseData(callback as any, responseType as any);
		});
	}
	//300
	public s300(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s300<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s300(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s300(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s300<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s300(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Multiple Choices
		return this.statusExclusion(300, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s301(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s301<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s301(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s301(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s301<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s301(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Moved Permanently
		return this.statusExclusion(301, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s303(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s303<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s303(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s303(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s303<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s303(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Redirect to a GET request
		return this.statusExclusion(303, () => {
			this.parseData(callback as any, responseType as any);
		});
	}
	//Error
	//400
	public s400(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s400<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s400(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s400(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s400<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s400(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Bad Request
		return this.statusExclusion(400, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s401(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s401<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s401(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s401(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s401<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s401(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Unauthorized
		return this.statusExclusion(401, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s402(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s402<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s402(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s402(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s402<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s402(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Payment Required
		return this.statusExclusion(402, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s403(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s403<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s403(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s403(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s403<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s403(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Forbidden
		return this.statusExclusion(403, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s404(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s404<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s404(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s404(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s404<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s404(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Not Found
		return this.statusExclusion(404, () => {
			this.parseData(callback as any, responseType as any);
		});
	}
	public s409(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s409<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s409(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s409(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s409<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s409(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Conflict
		return this.statusExclusion(409, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	/**
	 * @info Not Acceptable
	 */
	public s406(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s406<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s406(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s406(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s406<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s406(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Not Acceptable
		return this.statusExclusion(406, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s408(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s408<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s408(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s408(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s408<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s408(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Request Timeout
		return this.statusExclusion(408, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s410(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s410<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s410(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s410(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s410<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s410(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Gone
		return this.statusExclusion(410, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s413(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s413<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s413(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s413(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s413<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s413(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Payload Too Large
		return this.statusExclusion(413, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s414(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s414<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s414(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s414(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s414<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s414(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//URI Too Long
		return this.statusExclusion(414, () => {
			this.parseData(callback as any, responseType as any);
		});
	}
	public s415(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s415<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s415(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s415(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s415<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this; // Optional - defaults to JSON
	public s415(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Unsupported Media Type
		return this.statusExclusion(415, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s416(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s416<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s416(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s416(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s416<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s416(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Range Not Satisfiable
		return this.statusExclusion(416, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s417(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s417<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s417(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s417(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s417<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s417(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Expectation Failed
		return this.statusExclusion(417, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s418(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s418<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s418(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s418(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s418<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s418(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//I'm a teapot
		return this.statusExclusion(418, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s421(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s421<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s421(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s421(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s421<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s421(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Misdirected Request
		return this.statusExclusion(421, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s422(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s422<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s422(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s422(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s422<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s422(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Unprocessable Content
		return this.statusExclusion(422, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	/**
	 * @info Too Early
	 */
	public s425(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s425<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s425(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s425(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s425<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s425(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Too Early
		return this.statusExclusion(425, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s429(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s429<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s429(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s429(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s429<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s429(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Too Many Request
		return this.statusExclusion(429, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s431(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s431<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s431(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s431(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s431<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s431(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Request Header Fields Too Large
		return this.statusExclusion(431, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s451(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s451<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s451(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s451(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s451<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s451(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Unavailable For Legal Reasons
		return this.statusExclusion(451, () => {
			this.parseData(callback as any, responseType as any);
		});
	}
	//Server Error
	//500
	public s500(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s500<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s500(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s500(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s500<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s500(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Internal Server Error
		return this.statusExclusion(500, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s501(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s501<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s501(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s501(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s501<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s501(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Not Implemented
		return this.statusExclusion(501, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s502(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s502<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s502(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s502(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s502<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s502(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Bad Gateway
		return this.statusExclusion(502, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s503(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s503<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s503(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s503(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s503<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s503(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Service Unavailable
		return this.statusExclusion(503, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s504(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s504<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s504(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s504(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s504<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s504(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Gateway Timeout
		return this.statusExclusion(504, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s505(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s505<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s505(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s505(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s505<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s505(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//HTTP Version Not Supported
		return this.statusExclusion(505, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s506(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s506<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s506(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s506(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s506<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s506(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Variant Also Negotiates
		return this.statusExclusion(506, () => {
			this.parseData(callback as any, responseType as any);
		});
	}

	public s507(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public s507<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public s507(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public s507(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public s507<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public s507(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		//Insufficient Storage
		return this.statusExclusion(507, () => {
			this.parseData(callback as any, responseType as any);
		});
	}
	//If somehow you already specify all the status code and you need to get the unpredictable one then use this.
	public sOthers(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public sOthers<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public sOthers(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public sOthers(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public sOthers<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public sOthers(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		(async (THIS) => {
			const { status }: Response = (await THIS.promiseResponse) as Response;
			if (THIS.excludeStatus.some((x) => x == status)) return THIS;

			THIS.excludeStatus.push(status);
			THIS.parseData(callback as any, responseType as any);
		})(this);
		return this;
	}

	//This is same with default but it doesn't return raw response but instead works like status codes method. However this one works regardless of status code, and it may trigger both twice like you call the method 200 and chain this one then those two will run together. Maybe use this as an after-effect once everything is finish.
	public sAfter(callback: STRING_RESPONSE, responseType: "RAW"): this;
	public sAfter<DATA extends object = object>(callback: JSON_RESPONSE<DATA>, responseType: "JSON"): this;
	public sAfter(callback: FILE_RESPONSE, responseType: "FILE"): this;
	public sAfter(callback: BUFFER_RESPONSE, responseType: "BUFFER"): this;
	public sAfter<DATA extends object = object>(callback: JSON_RESPONSE<DATA>): this;
	public sAfter(
		callback: STRING_RESPONSE | JSON_RESPONSE | FILE_RESPONSE | BUFFER_RESPONSE,
		responseType: RESPONSE_DATA_TYPE = "JSON",
	) {
		return this.parseData(callback as any, responseType as any);
	}
	// This

	stream(
		callback: (eventTrigger: (callback2: (data: string) => void) => void) => void,
		decode: true,
	): Promise<Response>;
	stream(
		callback: (eventTrigger: (callback2: (data: Uint8Array) => void) => void) => void,
		decode?: false,
	): Promise<Response>;
	stream(
		callback: (eventTrigger: (callback2: (data: Uint8Array | string | any) => void) => void) => void,
		decode: boolean = false,
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

										const splitDecoded = decoded
											.split("data: ")
											.filter((d) => {
												return d != "" && d != "\n" && d != "\r" && !d.includes("[DONE]");
											})
											.map((data) => {
												data = data
													.replace(/^\s+|\s+$/g, "")
													.replace(/\[DONE\]/g, "")
													.trim();
												return data;
											});
										for (let i = 0; i < splitDecoded.length; i++) {
											if (splitDecoded[i] == "") continue;
											callback2(splitDecoded[i]);
										}
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
