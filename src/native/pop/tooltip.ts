type POSITION = "top"|"right"|"bottom"|"left";

/**
 * @info This is intended for client-side only. Please advised that this requires some tailwindcss classes to work properly.
 */
export class ToolTip{
  private referenceElement?:HTMLElement;
  private position:POSITION = "top";
  private message:string|HTMLElement = "";
  private outside = false;
  private useHover = false;
  private toolTip:null|HTMLElement = null;

  constructor(position?:POSITION, message?:string|HTMLElement, referenceElement?:HTMLElement, outside?:boolean, useHover?:boolean){
    if(position){
      this.setPosition(position);
    }
    if(message){
      this.setMessage(message);
    }
    if(referenceElement){
      this.setReference(referenceElement);
    }
    if(outside){
      this.setOutside(outside);
    }
    if(useHover){
      this.setUseHover(useHover);
    }
  }

  //-- In House --//
  //-- In House --//

  public setPosition(position:POSITION){
    this.position = position;
    return this;
  }
  public setMessage(message:string|HTMLElement){
    this.message = message;
    return this;
  }
  public setReference(element:HTMLElement){
    this.referenceElement = element;
    return this;
  }
  public setOutside(outside:boolean){
    this.outside = outside;
    return this;
  }
  public setUseHover(useHover:boolean){
    this.useHover = useHover;
    return this;
  }
  
  public run():[()=>void, ()=>void, HTMLDivElement]{
    if(this.referenceElement == undefined){
      throw new Error("Reference Element is not yet defined");
    }
    
    function applyConfig(THIS:ToolTip):[()=>void, ()=>void, HTMLDivElement]{
      if(THIS.referenceElement == undefined){
        throw new Error("Reference Element is not yet defined");
      }
      //Set Elements
      const container = document.createElement("div");
      const contentElement = document.createElement("div");
      const pointerElement = document.createElement("div");

      //Set Data
      if(typeof THIS.message == "string"){
        contentElement.innerHTML = THIS.message;
      }else{
        contentElement.appendChild(THIS.message);
      }

      //Designing
      container.style.position = "absolute";
      container.style.display = "flex";
      container.style.zIndex = "999";
      contentElement.style.backgroundColor = "rgb(249, 250, 251)";
      contentElement.style.backgroundColor = "#e5e7eb";
      contentElement.style.borderRadius = "0.25rem";
      contentElement.style.padding = "0.5rem 0.75rem";
      contentElement.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
      pointerElement.style.backgroundColor = "#D1D5DB";
      pointerElement.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";

      switch(THIS.position){
        case "top":
          //pivot
          container.style.bottom = "calc(100% + 10px)";

          //Arterial
          container.style.left = "50%";

          //Center
          container.style.transform = `translate(-50%, 0%)`;

          //Flex centralize
          container.style.display = "flex";
          container.style.flexDirection = "column";
          container.style.justifyContent = "center";
          container.style.alignItems = "center";

          //Pointer
          pointerElement.style.aspectRatio = "1/cos(30deg)";
          pointerElement.style.clipPath = "polygon(50% 100%,100% 0,0 0)";
          pointerElement.style.width = "1.25rem";
          pointerElement.style.height = "0.5rem";

          //Insert Pointer and Content
          container.appendChild(contentElement);
          container.appendChild(pointerElement);

          break;
        case "right":
          //pivot
          container.style.left = `100%`;

          //Arterial
          container.style.top = "50%";

          //Center
          container.style.transform = `translate(0%, -50%)`;

          //Flex centralize
          container.style.display = "flex";
          container.style.justifyContent = "center";
          container.style.alignItems = "center";

          //Pointer
          pointerElement.style.aspectRatio = "cos(30deg)";
          pointerElement.style.clipPath = "polygon(100% 0,0 50%,100% 100%)";
          // Instead of using swapClass, apply the equivalent styles directly:
          pointerElement.style.width = "0.5rem"; // corresponds to the "w-2" class
          pointerElement.style.height = "1.25rem"; // corresponds to the "h-5" class

          //Insert Pointer and Content
          container.appendChild(pointerElement);
          container.appendChild(contentElement);

          break;
        case "bottom":
          //pivot
          container.style.top = `100%`;

          //Arterial
          container.style.left = "50%";
          
          //Center
          container.style.transform = `translate(-50%, 0%)`;

          //Flex centralize
          container.style.display = "flex";
          container.style.flexDirection = "column";
          container.style.justifyContent = "center";
          container.style.alignItems = "center";

          //Pointer
          pointerElement.style.aspectRatio = "1/cos(30deg)";
          pointerElement.style.clipPath = " polygon(50% 0,100% 100%,0 100%)";
          pointerElement.style.width = "1.25rem";
          pointerElement.style.height = "0.5rem";

          //Insert Pointer and Content
          container.appendChild(pointerElement);
          container.appendChild(contentElement);

          break;
        case "left":
          //pivot
          container.style.right = `100%`;

          //Arterial
          container.style.top = "50%";

          //Center
          container.style.transform = `translate(0%, -50%)`;

          //Flex centralize
          container.style.display = "flex";
          container.style.justifyContent = "center";
          container.style.alignItems = "center";

          //Pointer
          pointerElement.style.aspectRatio = "cos(30deg)";
          pointerElement.style.clipPath = "polygon(0 0,100% 50%,0 100%)";
          pointerElement.style.width = "0.5rem";
          pointerElement.style.height = "1.25rem";

          //Insert Pointer and Content
          container.appendChild(contentElement);
          container.appendChild(pointerElement);
          break;
      }
      const outsideContainer = document.createElement("aside");
      if(THIS.outside){
        outsideContainer.style.position = "fixed";
        outsideContainer.style.zIndex = "99";
        switch(THIS.position){
          case "top":
            outsideContainer.style.left = `${THIS.referenceElement.getBoundingClientRect().left + (THIS.referenceElement.clientWidth*.5)}px`;
            outsideContainer.style.top = `${THIS.referenceElement.getBoundingClientRect().top + (THIS.referenceElement.clientHeight*.5)}px`;
          break;
          case "right":
            outsideContainer.style.left = `${THIS.referenceElement.getBoundingClientRect().left + (THIS.referenceElement.clientWidth)}px`;
            outsideContainer.style.top = `${THIS.referenceElement.getBoundingClientRect().top + (THIS.referenceElement.clientHeight*.5)}px`;
          break;
          case "bottom":
            outsideContainer.style.left = `${THIS.referenceElement.getBoundingClientRect().left + (THIS.referenceElement.clientWidth*.5)}px`;
            outsideContainer.style.top = `${THIS.referenceElement.getBoundingClientRect().top + (THIS.referenceElement.clientHeight)}px`;
          break;
          case "left":
            outsideContainer.style.left = `${THIS.referenceElement.getBoundingClientRect().left}px`;
            outsideContainer.style.top = `${THIS.referenceElement.getBoundingClientRect().top + (THIS.referenceElement.clientHeight*.5)}px`;
          break;
        }
      
        outsideContainer.appendChild(container);
        outsideContainer.id = "tooltip-for-this-element";
        THIS.toolTip = outsideContainer;
        document.body.append(outsideContainer);
      }else{
        THIS.referenceElement.appendChild(container);
        container.id = "tooltip-for-this-element";
        THIS.toolTip = container;
        outsideContainer.remove();
      }
      
      function open(){
        container.style.display = "flex";
      }
      function close(){
        container.style.display = "none";
      }

      if(THIS.useHover){
        THIS.referenceElement.addEventListener("pointerenter", ()=>{
          open();
          if(THIS.outside){
            switch(THIS.position){
              case "top":
                outsideContainer.style.left = `${THIS.referenceElement!.getBoundingClientRect().left + (THIS.referenceElement!.clientWidth*.5)}px`;
                outsideContainer.style.top = `${THIS.referenceElement!.getBoundingClientRect().top + (THIS.referenceElement!.clientHeight*.5)}px`;
              break;
              case "right":
                outsideContainer.style.left = `${THIS.referenceElement!.getBoundingClientRect().left + (THIS.referenceElement!.clientWidth)}px`;
                outsideContainer.style.top = `${THIS.referenceElement!.getBoundingClientRect().top + (THIS.referenceElement!.clientHeight*.5)}px`;
              break;
              case "bottom":
                outsideContainer.style.left = `${THIS.referenceElement!.getBoundingClientRect().left + (THIS.referenceElement!.clientWidth*.5)}px`;
                outsideContainer.style.top = `${THIS.referenceElement!.getBoundingClientRect().top + (THIS.referenceElement!.clientHeight)}px`;
              break;
              case "left":
                outsideContainer.style.left = `${THIS.referenceElement!.getBoundingClientRect().left}px`;
                outsideContainer.style.top = `${THIS.referenceElement!.getBoundingClientRect().top + (THIS.referenceElement!.clientHeight*.5)}px`;
              break;
            }
          }
        });
        THIS.referenceElement.addEventListener("pointerleave", ()=>{
          close();
        });
        if(THIS.outside){
          close();
          outsideContainer.addEventListener("pointerenter", ()=>{
            open();
          });
          outsideContainer.addEventListener("pointerleave", ()=>{
            close();
          });
        }
      }
      

      return [
        open,
        close,
        container,
      ]
    }

    return applyConfig(this);
  }

  public destroy(){
    if(this.toolTip == undefined){
      throw new Error("Tooltip Element is not yet defined");
    }
    this.toolTip.remove();
  }
}

