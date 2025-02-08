/**
 * @info Kizuna Means Bind
 */
export class Kizuna<RETURN_TYPE, SHARED_DATA extends object>{
	private returnValue:RETURN_TYPE|undefined = undefined;
	private sharedValues:SHARED_DATA = {} as SHARED_DATA;
	private chainStack: Array< ((sharedValues:SHARED_DATA)=>Promise<void|RETURN_TYPE>) | ((sharedValues:SHARED_DATA)=>void|RETURN_TYPE) > = [];

	constructor(shared?:SHARED_DATA){
		if(shared){
			this.sharedValues = shared;
		}
	}

	//-- Setter --//
	public defaultReturn(returnValue:RETURN_TYPE|undefined){
		this.returnValue = returnValue;
	}
	//-- Setter --//

	//-- Functionalities --//
	public link(callback: ((sharedValues:SHARED_DATA)=>Promise<void|RETURN_TYPE>) | ((sharedValues:SHARED_DATA)=>void|RETURN_TYPE) ){
		this.chainStack.push(callback);
		return this;
	}

	public async run(){
		if(this.chainStack.length < 1)
			return this.returnValue;

		const THIS = this;//Create in-house THIS;
		async function runner(current=0, stack = THIS.chainStack){
			if(current >= THIS.chainStack.length){
				return THIS.returnValue;
			}
			let value = THIS.chainStack[current](THIS.sharedValues);
			if(value instanceof Promise){
				value = await value;
			}
			if(value === undefined){
				return await runner(current+1, stack);
			}else{
				THIS.returnValue = value;
				return THIS.returnValue;
			}//They must wait for every await in that function
		}
		return await runner();
	}
}