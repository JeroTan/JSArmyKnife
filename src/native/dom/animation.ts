//---> Imports
import { E } from "./utility";
import { AnimeTroupe } from "../animation/anime";1


/*|------------------------------------------------------------------------------------------|*/
/*|               Caret Text Animation                                                       |*/
/*|------------------------------------------------------------------------------------------|*/
export function textChangerAnimation({	
	textElement,
	textList,
	switchInterval = 3000,
	swapInterval = 50,
	caretAnimation = 900,
}:{
	textElement: HTMLElement,
	textList: string[],
	switchInterval?: number,
	swapInterval?: number,
	caretAnimation?: number,
}
){

	function createCaret(){
		const caretTemplate = document.createElement("span");
		caretTemplate.style.color = "white";
		caretTemplate.textContent = "|";
		caretTemplate.style.display = "inline-block";
		const animation = new AnimeTroupe(caretTemplate, [
			{ opacity: 1 },
			{ opacity: 0 },
		], {
			duration: caretAnimation,
			fill: "forwards",
			easing: "linear(0, 0, 0, 0, 0, 0, 0, 0, 1,1,1, 1, 1,1,1, 1)",
			iterations: "Infinity",
		});
		
		animation.play();
		return caretTemplate;
	}
	textElement.appendChild(createCaret());


	let currentIndex = 0;
	function updateSubText() {
		const currentText = textList[currentIndex];
		const nextIndex = (currentIndex + 1) % textList.length;
		const nextText = textList[nextIndex];

		// Find the common prefix so we skip re-animating shared text
		function getCommonPrefix(a:string, b:string) {
			let i = 0;
			while (i < a.length && i < b.length && a[i] === b[i]) i++;
			return a.slice(0, i);
		}

		const commonPrefix = getCommonPrefix(currentText, nextText);
		const partialCurrent = currentText.slice(commonPrefix.length);
		const partialNext = nextText.slice(commonPrefix.length);
		
		let i = 0;
		const newCaret = createCaret();
		const interval = setInterval(() => {
			// Remove letters
			if (i < partialCurrent.length) {
				textElement.innerHTML = commonPrefix + partialCurrent.slice(0, partialCurrent.length - i - 1);
				textElement.appendChild(newCaret);
			}
			// Add letters
			else if (i < partialCurrent.length + partialNext.length) {
				const offset = i - partialCurrent.length;
				textElement.innerHTML = commonPrefix + partialNext.slice(0, offset);
				textElement.appendChild(newCaret);
			}
			// Finish
			else {
				clearInterval(interval);
				currentIndex = nextIndex;
				textElement.innerHTML = commonPrefix + partialNext;
				textElement.appendChild(newCaret);
			}
			i++;
		}, swapInterval);
	}
	let timer = setInterval(updateSubText, switchInterval);

	return {
		close(){
			clearInterval(timer);
		}
	}
}


/*|------------------------------------------------------------------------------------------|*/
/*|               Carousel Image                                                             |*/
/*|------------------------------------------------------------------------------------------|*/
export interface CAROUSEL_DATA{
  src:string,
  position?:string,
  content?:string|HTMLElement,
  noSwiping?:boolean
}
export class Carousel{
  private _carouselContainer:HTMLElement|null = null;
  private _carouselData:Array<CAROUSEL_DATA> = [];
  private _transitionInterval = 5000;
  private _transitionDuration = 500;
  private direction:"left"|"right" = "right";
  private elementDump:HTMLDivElement = document.createElement("div");
  private triggerElement:HTMLButtonElement = document.createElement("button");
  private currentSlideIndex = 0;
  private animating = false;
  private timer:number = setTimeout(()=>{}, 0);
  

  //---> constructor
  constructor(carouseContainer?:HTMLElement, carouselData?:Array<CAROUSEL_DATA>){
    if(carouselData){
      this._carouselData = carouselData;
    }
    if(carouseContainer){
      this.carouselContainer = carouseContainer;
    }
    this.setContent();
  }

  //---> Setter
  public set carouselContainer(carouselContainer:HTMLElement){
    this._carouselContainer = carouselContainer;
  }
  public set carouselData(carouselData:Array<CAROUSEL_DATA>){
    this._carouselData = carouselData;
  }
  public set transitionInterval(transitionInterval:number){
    this._transitionInterval = transitionInterval;
  }
  public set transitionDuration(transitionDuration:number){
    this._transitionDuration = transitionDuration;
  }

  public setContent(){
    if(this._carouselData.length < 1){
      return this;
    }
    if(!this._carouselContainer){
      return this;
    }

    //Clear the container
    this._carouselContainer.innerHTML = "";

    //Set the screen
    let startX = 0;
    const startingSlide = E("div", 
      {
        id:`carousel-item-${this.currentSlideIndex}`,
        style:{
          width:"100%", 
          height:"100%", 
          position:"absolute",
          backgroundImage: `url('${this._carouselData[this.currentSlideIndex].src}')`,
          backgroundSize: "cover",
          backgroundPosition: `${this._carouselData[this.currentSlideIndex].position || "100% 100%"}`,
        } as Partial<CSSStyleDeclaration> as any,
        ...(()=>{
          if(this._carouselData[this.currentSlideIndex].noSwiping){
            return {};
          }
          return {
            onmousedown: (e: MouseEvent) => {
							startX = e.clientX;
						},
						onmouseup: (e: MouseEvent) => {
							const diffX = e.clientX - startX;
							if (Math.abs(diffX) > 50) {
								if (diffX > 0) {
									this.previous();
								} else {
									this.next();
								}
							}
						},
						ontouchstart: (e: TouchEvent) => {
							startX = e.touches[0].clientX;
						},
						ontouchend: (e: TouchEvent) => {
							const diffX = e.changedTouches[0].clientX - startX;
							if (Math.abs(diffX) > 50) {
								if (diffX > 0) {
									this.previous();
								} else {
									this.next();
								}
							}
						}
          }
        })()
      },
      this._carouselData[this.currentSlideIndex].content || "",
    ) as HTMLDivElement;
    this._carouselContainer.appendChild(startingSlide);
  }
  public play(){
    this.timer = setInterval(()=>{
      if(this.direction === "right"){
        this.next();
      }
      else{
        this.previous();
      }
    }, this._transitionInterval);
  }

  public pause(){
    clearInterval(this.timer as number);
  }

  public next(){
    this.goTo(this.currentSlideIndex+1, "right");
  }

  public previous(){ 
    this.goTo(this.currentSlideIndex-1, "left");
  }

  public goTo(slideIndex:number, direction?:"left"|"right"){
    if(this.animating) return;
    this.animating = true;

    //Get the old and new slide
    const oldIndex = this.currentSlideIndex;
    const oldSlide = this._carouselContainer?.querySelector(`#carousel-item-${oldIndex}`);
    const newIndex = ((this._carouselData.length+slideIndex) % this._carouselData.length);

    let startX = 0;
    const newSlide =  this.elementDump.querySelector(`#carousel-item-${newIndex}`) as HTMLDivElement || E("div", 
      {
        id:`carousel-item-${newIndex}`,
        style:{
          width:"100%", 
          height:"100%", 
          position:"absolute",
          backgroundImage: `url(${this._carouselData[newIndex].src})`,
          backgroundSize: "cover",
          backgroundPosition: `${this._carouselData[newIndex].position || "100% 100%"}`,
        } as Partial<CSSStyleDeclaration> as any,
        ...(()=>{
          if(this._carouselData[newIndex].noSwiping){
            return {};
          }
					return {
						onmousedown: (e: MouseEvent) => {
							startX = e.clientX;
						},
						onmouseup: (e: MouseEvent) => {
							const diffX = e.clientX - startX;
							if (Math.abs(diffX) > 50) {
								if (diffX > 0) {
									this.previous();
								} else {
									this.next();
								}
							}
						},
						ontouchstart: (e: TouchEvent) => {
							startX = e.touches[0].clientX;
						},
						ontouchend: (e: TouchEvent) => {
							const diffX = e.changedTouches[0].clientX - startX;
							if (Math.abs(diffX) > 50) {
								if (diffX > 0) {
									this.previous();
								} else {
									this.next();
								}
							}
						}
					}
        })()
      },
      this._carouselData[newIndex].content || "",
    ) as HTMLDivElement;
    this._carouselContainer?.appendChild(newSlide);

    //Prepare Animation
    direction = direction ? direction : oldIndex > newIndex ? "left" : "right";
    const animateOld = new AnimeTroupe(oldSlide, [
      {transform:"translateX(0)"},
      {transform:`translateX(${direction=="left" ? "100%" : "-100%"})`}
    ], {
      duration:this._transitionDuration,
      easing:"easeOutQuad"
    });
    const animateNew = new AnimeTroupe(newSlide, [
      {transform:`translateX(${direction=="left" ? "-100%" : "100%"})`},
      {transform:"translateX(0%)",opacity:"1"},
    ], {
      duration:this._transitionDuration,
      easing:"easeOutQuad"
    });
    animateNew.play();
    animateOld.play();
    const THIS = this;
    animateOld.isStop(()=>{
      THIS.currentSlideIndex = newIndex;
      THIS.animating = false;
      if(oldSlide)
        this.elementDump.appendChild(oldSlide);
      this.triggerElement.click();
    });
  }
  
  public reverse(){
    this.direction = this.direction === "left" ? "right" : "left";
    return this;
  }
  
  public listen( callback:( currentIndex:number, direction:"left"|"right", THIS:Carousel)=>void ){
    const THIS =this;
    this.triggerElement.addEventListener("click", ()=>{
      callback(this.currentSlideIndex, this.direction, THIS);
    });
  }
}