// TYPE SETUP
export interface POP_STRUCTURE{
	isOpen: boolean,
	width: string|number,
	icon: "check"|"cross"|"i"|"warning"|"loadingDonut"|string,
	iconColor: string,
	iconAnimate: string,
	title: string|number,
	message: string|number,
	additionalBody: string|HTMLElement|undefined,
	acceptButton: true,
	rejectButton: true,
	acceptButtonText: string,
	rejectButtonText: string
	acceptButtonCallback: undefined|((closeModal:Function)=>void),
	rejectButtonCallback: undefined|((closeModal:Function)=>void),
	closeButton: true,
	closeButtonCallback: undefined|((closeModal:Function)=>void),
	backdropTrigger: true,
	backdropTriggerCallback: undefined|((closeModal:Function)=>void),
	customDialog: undefined|string|HTMLElement|Node|((data:POP_STRUCTURE)=>string|HTMLElement|Node),
	[key:string|number]: any,
}
export interface POP_COMMON_FRAME{
	close?:POP_STRUCTURE|{[key:string|number]: any},
	success?:POP_STRUCTURE|{[key:string|number]: any},
	error?:POP_STRUCTURE|{[key:string|number]: any},
	info?:POP_STRUCTURE|{[key:string|number]: any},
	warning?:POP_STRUCTURE|{[key:string|number]: any},
	loading?:POP_STRUCTURE|{[key:string|number]: any},
	custom?:POP_STRUCTURE|{[key:string|number]: any},
}

// EXPORT OR COPY THIS ONE
export const popStructure:POP_STRUCTURE = {
	isOpen: false,
	width: "450px",
	icon: "check",
	iconColor: "fill-green-600",
	iconAnimate: "a-fade-in-scale",
	title: "Title",
	message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima adipisci recusandae tempore unde. Ut rem a asperiores laboriosam fugiat molestiae possimus quisquam excepturi, ullam ratione rerum distinctio, et inventore obcaecati.",
	additionalBody: undefined,
	acceptButton: true,
	rejectButton: true,
	acceptButtonText: "Okay",
	rejectButtonText: "Cancel",
	acceptButtonCallback: undefined,
	rejectButtonCallback: undefined,
	closeButton: true,
	closeButtonCallback: undefined,
	backdropTrigger: true,
	backdropTriggerCallback: undefined,
	customDialog: undefined,
};

const originalStructureCopy = structuredClone(popStructure);

// EXPORT OR CREATE SIMILAR TO THIS
export function popDispatch( instruction:{pop:string, [key:string|number]: any} ){
	switch(instruction.pop){
		case "open":
			popStructure.isOpen = true;
		break;
		case "close":
			popStructure.isOpen = false;
		break;
		case "update":
			Object.keys(instruction.val).forEach((key) => {
				popStructure[key] = instruction.val[key];
			});
		break;
	}
	return popStructure;
}


// Pop is used to modify the dialog modal
// Color here uses TailwindCSS but you may configure it here if you want.
export type OPEN_FUNCTION = ()=>void;
export type ClOSE_FUNCTION = ()=>void;
export class Pop{
	private dispatch:((instruction:{pop:string, [key:string|number]: any})=>[OPEN_FUNCTION, ClOSE_FUNCTION]) = ()=>[()=>true, ()=>false];
	private frame:POP_COMMON_FRAME = {};
	private cachedContent:POP_STRUCTURE;

	constructor( dispatch:((instruction:{pop:string, [key:string|number]: any})=>[OPEN_FUNCTION, ClOSE_FUNCTION]) ){
		this.dispatch = dispatch; //External function that is use to change a property

		//Copy the existing frame
		const basicContent = {...originalStructureCopy};
		basicContent.isOpen = true;
		//Open When created unless chain with another method later;
		

		this.frame = {//This will be the basis of types
			close:{
				isOpen: false,
			},
			success:{
				...basicContent,
				icon: "check",
				iconColor: "fill-green-600",
				title: "Success",
			},
			error:{
				...basicContent,
				icon: "cross",
				iconColor: "fill-red-600",
				title: "Error",
			},
			info:{
				...basicContent,
				icon: "i",
				iconColor: "fill-sky-600",
				title: "Info",
			},
			warning:{
				...basicContent,
				icon:"warning",
				iconColor: "fill-amber-500",
				title: "Warning",
			},
			loading:{
				...basicContent,
				icon:"loadingDonut",
				iconColor: "fill-sky-300",
				iconAnimate: "a-kuru-kuru",
				title: "",
				message: "Loading. . .",
				backdropTrigger: undefined,
				acceptButton: undefined,
				rejectButton: undefined,
				closeButton: undefined,
			},
			custom:{
				...basicContent,
				backdropTrigger: true,
				closeButton: true,
			}
		};
		this.cachedContent = basicContent;
	}

	//--Setter--//
	public setDispatch(dispatch:((instruction:{pop:string, [key:string|number]: any})=>[OPEN_FUNCTION, ClOSE_FUNCTION])){
		this.dispatch = dispatch;
		return this;
	}
	//--Setter--//

	//--In-House Helper--//
	cacheData( object:POP_STRUCTURE|{[key:string|number]: any} ){//Accepts object key:value
		const THIS = this;
		Object.keys(object).forEach(key=>{
			THIS.cachedContent[key] = object[key];
		})
		return THIS;
	}
	//--In-House Helper--//

	//--DispatchRunner--//
	//** You must overload this one if you want to change how updating from external function works */
	run(){//RUN THE DIALOG
		return this.dispatch( { pop:"update", val: this.cachedContent } );
	}
	//--DispatchRunner--//

	//--Config--//
	type(type:"close"|"success"|"error"|"info"|"warning"|"loading"|"custom"){//This will determine the basic structure of the popup
		this.cacheData( this.frame[type] as POP_COMMON_FRAME );
		return this;
	}
	width(width:string|number){
		this.cacheData({width});
		return this;
	}
	title(title:string){
		this.cacheData({title: title});
		return this;
	}
	message(message:string){
		this.cacheData({message: message});
		return this;
	}
	addtional(addon:string|HTMLElement){
		this.cacheData({additionalBody:addon});
		return this;
	}
	/*@accept - callback for accept button, @reject - callback for reject/cancel button, @close - callback for close button. All of them must accept "close" argument. */
	callback(accept:((close:Function)=>void)|undefined = undefined, reject:((close:Function)=>void)|undefined = undefined, close:((close:Function)=>void)|undefined = undefined, backdrop:((close:Function)=>void)|undefined = undefined){
		this.cacheData({
			acceptButtonCallback: accept && typeof accept === "function"?accept : undefined,
			rejectButtonCallback: reject && typeof reject === "function"?reject : undefined,
			closeButtonCallback: close && typeof close === "function"?close : undefined,
			backdropTriggerCallback: backdrop && typeof backdrop === "function"?backdrop : undefined,
		});
		return this;
	}
	button(accept:boolean|string = false, reject:boolean|string = false, close = false, backdrop = false){
		const buttonsPops:{
			acceptButton:boolean,
			rejectButton:boolean,
			closeButton:boolean,
			backdropTrigger:boolean,
			acceptButtonText?: string,
			rejectButtonText?: string,
		} = {
			acceptButton: !!accept,
			rejectButton: !!reject,
			closeButton: close,
			backdropTrigger: backdrop,
		};

		if(typeof accept === "string"){
			buttonsPops.acceptButtonText = accept;
		}
		if(typeof reject === "string"){
			buttonsPops.rejectButtonText = reject;
		}
		
		this.cacheData(buttonsPops);
		return this;
	}
	custom(callback:string|HTMLElement|Node|((data:POP_STRUCTURE)=>string|HTMLElement|Node)){
		this.cacheData({
			customDialog:callback,
			backdropTrigger: true,
			closeButton: true,
		})
		return this;
	}
	close(){
		this.cacheData({isOpen: false });
		return this;
	}
	open(){
		this.cacheData({isOpen: true });
		return this;
	}

	//--Config--//
}
