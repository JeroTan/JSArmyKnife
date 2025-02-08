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