//Export this to a Reducer State OR other handler that will cater this properties
export const popStructure = {
    isOpen: false,
    width: "450px",
    icon: "check",
    iconColor: "fill-green-600",
    iconAnimate: "a-fade-in-scale",
    title: "Title",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima adipisci recusandae tempore unde. Ut rem a asperiores laboriosam fugiat molestiae possimus quisquam excepturi, ullam ratione rerum distinctio, et inventore obcaecati.",
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
//Export this to reducer dispatcher OR cater this to handle state changes of properties
export function popDispatch(state, action){
    state = { ...state };
    switch(action.pop){
        case "open":
            state.isOpen = true;
        break;
        case "close":
            state.isOpen = false;
        break;
        case "update":
            Object.keys(action.val).forEach(key => {
                state[key] = action.val[key];
            });
            state = {...state};
        break;
    }

    return state;
}


// Pop is used to modify the dialog modal
// Color here uses TailwindCSS but you may configure it here if you want.
export class Pop{
    constructor(dispatch){
        this.dispatch = dispatch; //External function that is use to change a property

        //Shorteners
        const basicContent = {...popStructure};
        basicContent.isOpen = true; //Upon creation of this one, automatically open the pop;
        //Shorteners

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

    //--InHouseHelper--//
    cacheData(object){//Accepts object key:value
        const THIS = this;
        Object.keys(object).forEach(key=>{
            THIS.cachedContent[key] = object[key];
        })
        return THIS;
    }
    //--InHouseHelper--//

    //--DispatchRunner--//
    //** You must overload this one if you want to change how updating from external function works */
    run(){
        this.dispatch( { pop:"update", val: this.cachedContent } );
        return this;
    }
    //--DispatchRunner--//

    //--Setter--//
    addDispatch(dispatch){
        this.dispatch = dispatch;
        return this;
    }
    type(type){//This will determine the basic structure of the popup
        this.cacheData(this.frame[type]);
        return this;
    }
    width(width){
        this.cacheData({width: width});
        return this;
    }
    title(title){
        this.cacheData({title: title});
        return this;
    }
    message(message){
        this.cacheData({message: message});
        return this;
    }
    /*@accept - callback for accept button, @reject - callback for reject/cancel button, @close - callback for close button. All of them must accept "close" argument. */
    callback(accept = undefined, reject = undefined, close = undefined, backdrop = undefined){
        this.cacheData({
            acceptButtonCallback: accept && typeof accept === "function"?accept : undefined,
            rejectButtonCallback: reject && typeof reject === "function"?reject : undefined,
            closeButtonCallback: close && typeof close === "function"?close : undefined,
            backdropTriggerCallback: backdrop && typeof backdrop === "function"?backdrop : undefined,
        });
        return this;
    }
    button(accept = true, reject = true, close = true, backdrop = true){
        this.cacheData({
            acceptButton: accept,
            rejectButton: reject,
            closeButton: close,
            backdropTrigger: backdrop,
        });
        return this;
    }
    custom(callback){
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

    //--Setter--//
}
