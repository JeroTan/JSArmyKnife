import { AnimeTroupe } from "@jsarmyknife/native--animation";
import { popDispatch } from "@jsarmyknife/native--pop";
/*|------------------------------------------------------------------------------------------|*/
/*|               Swapclass                                                                  |*/
/*|------------------------------------------------------------------------------------------|*/
interface SWAPPER{
  id: string|HTMLElement;
  mk?: string|string[];
  rm?: string|string[];
  tg?: string|string[];
  sw?: string|[string, string];
}
/**
 * @description This function is used to swap class of an element. It can be used to swap multiple elements at once.
 * @param query 
 * @param recalculate 
 * @returns 
 */
export function swapClass(query:SWAPPER|SWAPPER[], recalculate:boolean = false){
  /* //This is the nostalgic JQuery
    $(keys).removeClass(query[keys][0]);
    $(keys).addClass(query[keys][1]);
    $(keys)[0].offsetHeight;
  */

  //This function contains logic to swap class
  function swap(id:string|HTMLElement, mk?:string|string[], rm?:string|string[], tg?:string|string[], sw?: string|[string, string]){
    const element = (id instanceof HTMLElement ? id :  document.querySelector<HTMLElement>(id)) as HTMLElement;
    if(rm){
      if(typeof rm === "string"){
        rm = rm.trim().split(/\s+/);
      }
      element.classList.remove(...rm);
    }
    if(mk){
      if(typeof mk === "string"){
        mk = mk.trim().split(/\s+/);
      }
      element.classList.add(...mk);
    }
    if(tg){
      if(typeof tg === "string"){
        tg = tg.trim().split(/\s+/);
      }
      tg.forEach((x)=>{
        element.classList.toggle(x);
      })
    }
    if(sw){
      if(typeof sw === "string"){
        sw = sw.trim().split(/\s+/).slice(0, 2) as [string, string];
      }
      element.classList.replace(sw[0], sw[1]);
    }

    //dom re-calculate
    if(recalculate)
      element.offsetHeight;
  }
  
  //Either list of swapping or normal swap
  if(!Array.isArray(query)){
    swap(query.id, query.mk, query.rm);
    return;
  }
  query.forEach(q=>{
    swap(q.id, q.mk, q.rm);
  })
  return;
}

/*|------------------------------------------------------------------------------------------|*/
/*|               Elements                                                                   |*/
/*|------------------------------------------------------------------------------------------|*/
//Use this to create new element
/**
 * @description This function is used to create new element. It can be used to create any element with any attributes and children.
 * @param tag 
 * @param props 
 * @param children 
 * @returns 
 */
export function E<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  props: { 
    style?: Partial<CSSStyleDeclaration>,
  } & Partial<Omit<HTMLElementTagNameMap[T], "style">> = {},
  ...children: (string | Node)[]
): HTMLElementTagNameMap[T] {
  const el = document.createElement(tag);
  // Set attributes and properties
  for (const key in props) {
    if (key === "style" && typeof props.style === "object") {
      // Apply inline styles
      Object.assign(el.style, props.style);
    } else if (key.startsWith("on") && typeof (props as {[key:string]:any})[key] === "function") {
      // Add event listeners (e.g., onClick => click)
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, (props as {[key:string]:any})[key]);
    } else if (key in el) {
      // Set DOM properties (e.g., id, className)

      try{
        (el as any)[key] = (props as {[key:string]:any})[key];
      }catch{
        // el.setAttribute(key, String(props[key]));
      }
      
    } else {
      // Set attributes for everything else
      el.setAttribute(key, String((props as {[key:string]:any})[key]));
    }
  }

  // Append children
  children.forEach(child => {
    if (typeof child === "string") {
      el.innerHTML = el.innerHTML + child;
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });

  return el;
}
/**
 * @description This function creates document fragment. It can be used to create multiple elements at once.
 */
export function F(...children: (string | Node)[]): DocumentFragment {
  const fragment = document.createDocumentFragment();
  children.forEach(child => {
    if (typeof child === "string") {
      const template = document.createElement("template");
      template.innerHTML = child;
      fragment.appendChild(template.content);
    } else if (child instanceof Node) {
      fragment.appendChild(child);
    }
  });
  return fragment;
}


/*|------------------------------------------------------------------------------------------|*/
/*|               Custom Elementals                                                          |*/
/*|------------------------------------------------------------------------------------------|*/
/**
 * @description This function is used to create custom elements that you can reuse in the page. meaning once created, you can use it multiple times. i.e. <sample-element></sample-element> will be always available and it retain its functionality every time you use document.createElement("sample-element")
 * @param componentName 
 * @param callback 
 * @param appendToRoot Here you may add the required styles or scripts since the API custom element will not have access to the main document.
 */

export interface HTMLElementsWithProps<T> extends HTMLElement{
  props: T;
  slotData: (content: (string|HTMLElement|HTMLElementsWithProps<any>|Node)|{[slotname:string|number]:(string|HTMLElement|HTMLElementsWithProps<any>|Node)} )=>void;
}

const elementMakerStack:string[] = [];
export function ElementMaker<T extends object>(componentName:string, callback:(element:HTMLElementsWithProps<T>)=>void, noBuild = false){
  if(elementMakerStack.includes(componentName)) return;
  elementMakerStack.push(componentName);
	const customElementSample = (document.querySelector(componentName) as HTMLElement).cloneNode(true) as HTMLElement;

	class AstroElement extends HTMLElement{
    _props: T = {} as T;
    private isOpened:boolean = false;
    private openingStackCalls:Function[] = [];
    private callStackRunner(callback:Function){
      if(this.isOpened){
        callback();
      }else{
        this.openingStackCalls.push(callback);
      }
    }
    private runStackCalls(){
      for(let i = 0; i < this.openingStackCalls.length; i++){
        this.openingStackCalls[i]();
      };
      this.openingStackCalls = [];
    }
    
		constructor(){
			super();
			callback(this);
		}
		connectedCallback(){
      if(noBuild){
        return;
      }
      //1. Check first if the content of customElementSample is the same as the content of "this"
      if (this.innerHTML.trim() === customElementSample.innerHTML.trim()) {
        return;
      }
      //2. If it is not then pre filled the "this" with the customElementSample
      const newChild = customElementSample.cloneNode(true) as HTMLElement;
      this.append(...(newChild).children); // while (this.firstChild) {
      this.isOpened = true;
      this.runStackCalls();
		}
    disconnectedCallback(){
      this.isOpened = false;
    }
    get props(){
      return this._props;
    }
    set props(props:T){
      this._props = {...props};
    }
    slotData(slots:  (string|HTMLElement|HTMLElementsWithProps<any>|Node)|{[slotname:string|number]:(string|HTMLElement|HTMLElementsWithProps<any>|Node)} ){
      const THIS = this;
      this.callStackRunner(()=>{
        const target = [...Array.from(THIS.querySelectorAll("slot"))];
        if(target.length === 0){
          return;
        }
        
        //For named slots
        if(typeof slots === "object"){
          for(let slot in slots){  
            const slotContent = (slots as {[slotname:string|number]:(string|HTMLElement|HTMLElementsWithProps<any>|Node)})[slot] as string|HTMLElement|HTMLElementsWithProps<any>|Node;
          
            //Search for slot element with name tag slot
            const thisSlotTarget = target.find((slotElement)=>{
              return slotElement.getAttribute("name") === slot;
            })
            if(thisSlotTarget === undefined){
              break;
            }
  
            //Replace the <slot> with the content on the given slot data
            if(typeof slotContent === "string"){
              thisSlotTarget.outerHTML = slotContent;
            }else{
              thisSlotTarget.replaceWith(slotContent);
            }
          }
        }
        
        //Find the unnamed slot
        const thisSlotTarget = target.find((slotElement)=>{
          return slotElement.getAttribute("name") === null;
        });
        if(thisSlotTarget === undefined){
          return;
        }

        //Replace the <slot> with the content on the given slot data
        if(typeof slots === "string"){
          thisSlotTarget.outerHTML = slots;
        }else{
          thisSlotTarget.replaceWith(slots as HTMLElement|HTMLElementsWithProps<any>|Node);

        }
      });
      return this;
    }
	}
	//This will wrap your component to make it independent on its own. i.e. make same components in the same page.
	customElements.define(componentName, AstroElement);
}

/**
 * @description This function will regenerate a certain element like how you use a querySelector
 * @param selectorString 
 * @param refElement 
 * @returns 
 */
export function specialComponentSelector<T extends HTMLElement>(selectorString:string, refElement:HTMLElement|Document = document):T{
  const element = refElement.querySelector(selectorString) as T;
  if(!element) throw new Error(`Element with selector ${selectorString} not found`);
  const elementToClone = element.cloneNode(true) as T;
  element.replaceWith(elementToClone);
  return elementToClone;
}

/*|------------------------------------------------------------------------------------------|*/
/*|               Load LIstener Control                                                      |*/
/*|------------------------------------------------------------------------------------------|*/
type LOAD_CALLBACK = ((()=>void)|(()=>Promise<any>));
type LOAD_FALLBACK = ()=>void;
/**
 * @description This class is used to control the load order of the page. It can be used to control the load order of the page.
 */
export class LoadOrder{
  private orderStack:LOAD_CALLBACK[] = [];
  private fallbackStack: LOAD_FALLBACK[] = [];
  private useOnLoad:boolean = false;
  private hammerTrigger = document.createElement("button");

  constructor(useOnLoad = false){
    if(useOnLoad){
      this.setOnLoad(useOnLoad);
    }
  }

  setOnLoad(useOnLoad:boolean){
    this.useOnLoad = useOnLoad;
    return this;
  }
  
  push(callback:LOAD_CALLBACK, fallback?:LOAD_FALLBACK){
    this.orderStack.push(callback);
    if(fallback)
      this.fallbackStack[this.orderStack.length] = fallback;
    this.hammerTrigger.click();
  }

  cutIn(index:number, callback:LOAD_CALLBACK, fallback?:LOAD_FALLBACK){
    this.orderStack.splice(index, 0, callback);
    if(fallback)
      this.fallbackStack.splice(index, 0, fallback);
    this.hammerTrigger.click();
    return this;
  }
  
  insert(index:number, callback:LOAD_CALLBACK, fallback?:LOAD_FALLBACK){
    this.orderStack[index] = callback;
    if(fallback)
      this.fallbackStack[index] = fallback;
    this.hammerTrigger.click();
    return this;
  }

  run(expectedStack = 0){
    async function loader(THIS:LoadOrder){
      let i = 0;
      for(const f of THIS.orderStack){
        try{
          let x = THIS.orderStack[i]();
          if(x instanceof Promise ){
            await x;
          }
        }catch(e){
          try{
            if(THIS.fallbackStack[i]){
              THIS.fallbackStack[i]();
            }
          }catch{}
          console.log("ERROR on Load Order");
          console.log("The order #", i+1, "with content:");
          console.log(f);
          console.log("Has the following error: ", e);
        }
        ++i;
      }
    }
    if(expectedStack == 0){
      if(this.useOnLoad){
        window.addEventListener("load", ()=>{
          loader(this);
        })
      }else{
        loader(this);
      }
      return;
    }

    const THIS = this;
    if(THIS.orderStack.length >= expectedStack){
      loader(this);
      return;
    }
    this.hammerTrigger.addEventListener("click", ()=>{
      if(THIS.orderStack.length >= expectedStack){
        loader(this);
      }
    })
    
  }
}

/*|------------------------------------------------------------------------------------------|*/
/*|               Completely Random                                                      |*/
/*|------------------------------------------------------------------------------------------|*/
/**
 * @description - Clone and destroy the copy after it's usage on callback. It will have a hidden copy in the document body.
 * @param element 
 * @param callback 
 */
export function partialClone<T extends HTMLElement>(element:T, callback:(e:T)=>void){
  const clonedElement = element.cloneNode(true) as HTMLElement;
  document.body.appendChild(clonedElement);
  clonedElement.style.opacity = "0";
  clonedElement.style.position = "absolute";
  clonedElement.style.pointerEvents = "none";
  clonedElement.style.visibility = "hidden";
  callback(clonedElement as T);
  clonedElement.remove();
}

/**
 * @description - Trigger event manually
 * @returns 
 */
export function elementTrigger(eventName:string, element:HTMLElement){
  element.dispatchEvent(new Event(eventName));
}


/*|------------------------------------------------------------------------------------------|*/
/*|               DOMPopTransformer                                                          |*/
/*|------------------------------------------------------------------------------------------|*/

export function DOMPopTransformer(instruction:{pop:string, [key:string|number]: any}){
  //-- Constants --//
  const structure = popDispatch(instruction);
  const popContainer = document.getElementById("pop-container") as HTMLDivElement;
  const newPop = (((document.getElementById("template-pop-component") as HTMLMetaElement).content as unknown as HTMLElement).cloneNode(true) as HTMLElement).children[0] as HTMLDialogElement;
  const popClose = newPop.querySelector("#pop-close-button") as HTMLDivElement;
  const popIcons = newPop.querySelector("#pop-icon-contents") as HTMLDivElement;
  const popTitle = newPop.querySelector("#pop-title") as HTMLDivElement;
  const popMessage = newPop.querySelector("#pop-message") as HTMLDivElement;
  const popAdditional = newPop.querySelector("#pop-additional") as HTMLDivElement;
  const popButtonContainer = newPop.querySelector("#pop-button-container") as HTMLDivElement;
    const acceptButton = popButtonContainer.children[0];
    const rejectButton = popButtonContainer.children[1];

  //-- States --//
  let isOpen = structure.isOpen;

  //-- Animation --//
  const popAnimation =  new AnimeTroupe(newPop, [
    { opacity:"0"}, {opacity:"1"},
  ], {
    duration: 300, easing: "easeOutBack",
  });

  //-- Do --//
  //Remove the current pop
  while(popContainer.firstChild){
    popContainer.lastChild?.remove();
  }
  //Insert the new one
  popContainer.appendChild(newPop);

  if(structure.isOpen){
    newPop.showModal();
  }else{
    newPop.close();
  }

  if(structure.width){
    newPop.style.width = String(structure.width);
  }

  if(structure.icon){
    let clonedIcon;
    for(const i in popIcons.children){
      if(popIcons.children[i].id == "pop-icon-" + structure.icon){
        clonedIcon = popIcons.children[i].cloneNode(true);
        break;
      }
    }
    popIcons.textContent = "";
    if(clonedIcon){
      popIcons.appendChild(clonedIcon as Node);
    }
  }

  if(structure.title){
    popTitle.children[0].textContent = String(structure.title);
  }

  if(structure.message){
    popMessage.children[0].innerHTML = String(structure.message);
  }

  if(structure.additionalBody){
    if(typeof(structure.additionalBody) === "string"){
      popAdditional.innerHTML = structure.additionalBody;
    }else{
      popAdditional.append(structure.additionalBody);
    }
  }

  if(structure.acceptButton){
    if(structure.acceptButtonText)
      acceptButton.textContent = structure.acceptButtonText;
    if(structure.acceptButtonCallback && typeof structure.acceptButtonCallback == "function" ){
      (acceptButton as HTMLButtonElement).onclick = ()=>{structure.acceptButtonCallback!(closePop)} ;
    }else{
      (acceptButton as HTMLButtonElement).onclick = ()=>{closePopAnimate()}
    }
      
  }else{
    acceptButton.remove();
  }

  if(structure.rejectButton){
    if(structure.rejectButtonText)
      rejectButton.textContent = structure.rejectButtonText;
    if(structure.rejectButtonCallback && typeof structure.rejectButtonCallback == "function"){
      (rejectButton as HTMLButtonElement).onclick = ()=>{structure.rejectButtonCallback!(closePop)} ;
    }else{
      (rejectButton as HTMLButtonElement).onclick = ()=>{closePopAnimate()}
    }
  }else{
    rejectButton.remove();
  }

  if(structure.closeButton){
    if(structure.closeButtonCallback && typeof structure.closeButtonCallback == "function"){
      (popClose.children[0] as HTMLDivElement).onclick = ()=>structure.closeButtonCallback!(closePop);
    }else{
      (popClose.children[0] as HTMLDivElement).onclick = ()=>{closePopAnimate()}
    }
  }else{
    popClose.remove();
  }

  if(structure.backdropTrigger){
    if(structure.backdropTriggerCallback != undefined && typeof structure.backdropTriggerCallback == "function"){
      newPop.onclick = (e)=>{
        if(e.currentTarget == undefined || !isOpen ){
          return;
        }
        const dialogBound = (e.currentTarget as any).getBoundingClientRect();
        if(
          !(dialogBound.left > e.clientX ||
          dialogBound.right < e.clientX ||
          dialogBound.top > e.clientY ||
          dialogBound.bottom < e.clientY)
        ){ //Check if the click is outside the border;
          return;
        }
        if(structure?.backdropTriggerCallback){
          structure?.backdropTriggerCallback!(closePop);
        }
        
      }
    }else{
      newPop.onclick = (e)=>{
        if(e.currentTarget == undefined){
          return;
        }
        const dialogBound = (e.currentTarget as any).getBoundingClientRect();
        if(
          !(dialogBound.left > e.clientX ||
          dialogBound.right < e.clientX ||
          dialogBound.top > e.clientY ||
          dialogBound.bottom < e.clientY)
        ){ //Check if the click is not outside the border;
          return;
        }
        closePopAnimate();
      }
    }
  }

  if(structure.customDialog){
    popIcons.remove();
    // popTitle.remove();
    popMessage.remove();
    popAdditional.remove();
    //find if there are hr element
    const hrElement = popContainer.querySelector("hr");
    hrElement?.remove();
    
    let toInsertElement:Node|HTMLElement|string = (()=>{
      if(typeof structure.customDialog === "function"){
        return structure.customDialog(structure);
      }
      return structure.customDialog;
    })();
    if(typeof structure.customDialog === "string"){
      toInsertElement = document.createElement("div");
      (toInsertElement as HTMLDivElement).innerHTML = structure.customDialog;
    }
  
    if(popButtonContainer)
      newPop.insertBefore(toInsertElement as HTMLElement|Node, popButtonContainer);
    else
      newPop.appendChild(toInsertElement as HTMLElement|Node);
  }

  if(!structure.acceptButton && !structure.rejectButton && !(false) ){ //In case we can opt to have custom buttons
    popButtonContainer.remove();
  }

  popAnimation.play();
  popAnimation.isStop((THIS)=>{
    THIS.commitStyle();
  });

  //Functionalities
  function closePopAnimate(){
    popAnimation.reverse();
    popAnimation.isStop((THIS)=>{
      THIS.commitStyle();
      newPop.close();
    })
  }
  function closePop(){
    isOpen = false;
    newPop.close();
  }
  function openPop(){
    isOpen = true;
    newPop.showModal();
  }
  function openPopAnimate(){
    openPop();
    popAnimation.play();
    popAnimation.isStop((THIS)=>{
      THIS.commitStyle();
    });
  }
  
  return [ openPopAnimate, closePopAnimate ] as [()=>void, ()=>void]
}



/*|------------------------------------------------------------------------------------------|*/
/*|               REDIRECTION                                                                |*/
/*|------------------------------------------------------------------------------------------|*/
export function openAWindow(url:string, title:string, w:number, h:number){
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  window.open(url, title, 
    `
    scrollbars=yes,
    width=${w / systemZoom}, 
    height=${h / systemZoom}, 
    top=${top}, 
    left=${left}
    `
  )
}

export function changePage(link:string){
  if(window.top){
    try{
      const x = window.top.location.href;
      x;
      window.top.location.href = link;
    }catch{
      location.href = link;	
    }
  }else{
    location.href = link;
  }
}

/*|------------------------------------------------------------------------------------------|*/
/*|               Prefetch                                                                   |*/
/*|------------------------------------------------------------------------------------------|*/
export class Prefetch{
  config:{
    link:string,
    fetching:boolean,
    frameId:string,
  } = {
    link:"#",
    fetching:false,
    frameId:"",
  }

  constructor(link?:string){
    if(link){
      this.setLink(link);
    }
  }

  setLink(link:string){
    this.config.link = link;
    this.config.frameId = `page-prefetch-${Date.now()}`;
    return this;
  }

  fetch(){
    function frameLoad(frameData:{
      link:string,
      fetching:boolean,
      frameId:string,
    }){
      if(frameData == undefined){
        throw new Error("We cannot find the link on Prefetch instance");
      }
      frameData.fetching = true;
      document.getElementById(frameData.frameId)?.remove();
      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "100vh";
      iframe.style.display = "none";
      iframe.src = frameData.link;
      iframe.id = frameData.frameId;
      document.body.appendChild(iframe);
      iframe.addEventListener("load", ()=>{
        frameData.fetching = false;
      })
    };

    frameLoad(this.config);
    return this;
  }

  swapFetched(success?:Function, fail?:Function){
    function swap(frameData:{
      link:string,
      fetching:boolean,
      frameId:string,
    }){
      let index:number = 0;
      for(const e of document.children[0].children){
        if(e.tagName == "BODY"){
          break;
        }
        index++;
      }
      const body = Array.from(document.children[0].children[index].children).map(x=>x) as Array<HTMLElement>;
      for(let i = 0; i < body.length; i++){
        if(body[i].id == frameData.frameId){
          body[i].style.display = "block";
          //Add to tab history
          window.history.replaceState({
            "html":(body[i] as HTMLIFrameElement).contentWindow!.document.documentElement.innerHTML,
            "pageTitle":((body[i] as HTMLIFrameElement).contentWindow! as any).title,
          }, 
            "", 
            (body[i] as HTMLIFrameElement).contentWindow!.location.href
          );
          continue;
        }
        
        body[i].remove();
      }
      
    }

    if(!this.config.fetching){
      swap(this.config);
    }
    if(success && !this.config.fetching){
      success();
    }
    if(fail && this.config.fetching){
      fail();
    }
    return this;
  }
}


/*|------------------------------------------------------------------------------------------|*/
/*|               Window Breakpoint                                                          |*/
/*|------------------------------------------------------------------------------------------|*/
export class Breakpoint{
  private getWidth(){
    return window.innerWidth;
  }
  private getHeight(){
    return window.innerHeight;
  }
  
  public breakIn({width, height}:{width?:number, height?:number}){
    if(width && height && this.getWidth() < width && this.getHeight() < height){
      return true;
    }
    if(width && this.getWidth() < width){
      return true;
    }
    if(height && this.getHeight() < height){
      return true;
    }
    return false;
  }

  public breakOut({width, height}:{width?:number, height?:number}){
    if(width && height && this.getWidth() < width && this.getHeight() > height){
      return true;
    }
    if(width && this.getWidth() > width){
      return true;
    }
    if(height && this.getHeight() > height){
      return true;
    }
    return false;
  }
}


/*|------------------------------------------------------------------------------------------|*/
/*|               Observe                                                                    |*/
/*|------------------------------------------------------------------------------------------|*/

export class Observer{
  private observer?:MutationObserver;
  private target?:HTMLElement;
  constructor(target?:HTMLElement){
    this.target = target;
  }

  setTarget(target:HTMLElement){
    this.target = target;
    return this;
  }

  public observe(observeCallback:((mutations: MutationRecord[], observer: MutationObserver, thisClass:Observer) => void), config:MutationObserverInit={ attributes: true, childList:true, subtree:true }){
    if(!this.target){
      throw new Error("Target is not set");
    }
    const THIS = this;
    this.observer = new MutationObserver((mutations, observer)=>{
      observeCallback(mutations, observer, THIS);
    });
    this.observer.observe(this.target, config);
  }

  public disconnect(){
    this.observer?.disconnect();
  }
}


/*|------------------------------------------------------------------------------------------|*/
/*|               Check If Scrolled Through                                                  |*/
/*|------------------------------------------------------------------------------------------|*/
export function elementInScreen(element: HTMLElement, callback: (result: boolean) => void, offset = 0) {
  let isIntersecting = false;
  const observer = new IntersectionObserver((entries) => {

    let intersectingComputation = isIntersecting;
    entries.forEach(entry => {
      const documentHeight = document.documentElement.clientHeight;
      if (
        entry.boundingClientRect.top < documentHeight + offset &&
        entry.boundingClientRect.bottom > 0
      ) {
        intersectingComputation = true;
      }else{
        intersectingComputation = false;
      }
    });

    if(isIntersecting === intersectingComputation) 
      return;
    isIntersecting = intersectingComputation;
    callback(isIntersecting);

  }, {rootMargin: offset + "px"});
  observer.observe(element);
}



/*|------------------------------------------------------------------------------------------|*/
/*|               Update URL                                                                 |*/
/*|------------------------------------------------------------------------------------------|*/
export function updateURL(url:string){
  window.history.pushState(document.title, document.title, url);
}



/*|------------------------------------------------------------------------------------------|*/
/*|               Scroll To URL                                                              |*/
/*|------------------------------------------------------------------------------------------|*/
export function goToElement(element:HTMLElement){
  const viewport = new Breakpoint();
  const isMobile = viewport.breakIn({width:1024});
  if(isMobile){
    element.scrollIntoView({behavior:"smooth", block:"start"});
  }else{
    //Smooth on desktop
    element.scrollIntoView({behavior:"smooth", block:"center"});
  }
}


/*|------------------------------------------------------------------------------------------|*/
/*|               Check When Bottom Reached                                                  |*/
/*|------------------------------------------------------------------------------------------|*/
export function scrollToBottom(callback:Function, offset = 0){
  window.addEventListener("scroll", ()=>{
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - offset;
    const totalScroll = window.scrollY + window.innerHeight;
    if( documentHeight <= totalScroll ){
      callback();
    }
  })
}
