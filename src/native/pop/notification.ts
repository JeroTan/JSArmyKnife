//-----------------------------------------------------------------------------------------------------------------//
//     NotifPop                                                                                                    //
//-----------------------------------------------------------------------------------------------------------------//
import { AnimeTroupe } from "@jsarmyknife/native--animation";
import { swapClass } from "@jsarmyknife/native--dom";

interface NOTIF_POP_CONFIG{
  location: "top"|"top-right"|"right"|"bottom-right"|"bottom"|"bottom-left"|"left"|"top-left",
  offset:{
    top: string,
    right:string,
    bottom:string,
    left:string,
  }
}

interface NOTIF_MESSAGE{
  title?:string,
  message?:string,
  autoClose?:number, //Milliseconds
}

export class NotifPop{
  private container = document.createElement("aside");
  private containerName = "notif-pop-container";
  private notifConfig:NOTIF_POP_CONFIG = {
    location:"top-right",
    offset:{
      top:"0px",
      right:"0px",
      bottom:"0px",
      left:"0px",
    }
  };

  constructor(){
    if(document.getElementById(this.containerName) != null){
      this.container = document.getElementById(this.containerName) as HTMLElement;
    }else{
      document.body.prepend(this.container);
      this.updateConfig();
    }

    //>--- PRE DEFINED ---<//
    this.offsetTop("calc(100px + 1vh)").offsetRight("calc(10px + 1vw)").updateConfig()
  }

  //--Setter--//
  public location(location:NOTIF_POP_CONFIG["location"]){
    this.notifConfig.location = location;
    return this;
  }
  public offset(location:NOTIF_POP_CONFIG["offset"]){
    this.notifConfig.offset = location;
    return this;
  }
  public offsetTop(pixel:string){
    this.notifConfig.offset.top = pixel;
    return this;
  }
  public offsetRight(pixel:string){
    this.notifConfig.offset.right = pixel;
    return this;
  }
  public offsetLeft(pixel:string){
    this.notifConfig.offset.left = pixel;
    return this;
  }
  public offsetBottom(pixel:string){
    this.notifConfig.offset.bottom = pixel;
    return this;
  }
  public updateConfig(){
    const {notifConfig, container} = this;   

    // let currentPop = this.container.children;

    switch(notifConfig.location){
      
      case "top":
        container.style.top = `${notifConfig.offset.top}`;
        container.style.left = `${50}%`;
        container.style.transform = `translate(-50%, 0%)`;
      break;
      case "top-right":
        container.style.top = `${notifConfig.offset.top}`;
        container.style.right = `${notifConfig.offset.right}`;
      break;
      case "right":
        container.style.right = `${notifConfig.offset.right}`;
        container.style.top = `${50}%`;
        container.style.transform = `translate(0%, -50%)`;
      break;
      case "bottom-right":
        container.style.bottom = `${notifConfig.offset.bottom}`;
        container.style.right = `${notifConfig.offset.right}`;
      break;
      case "bottom":
        container.style.bottom = `${notifConfig.offset.bottom}`;
        container.style.left = `${50}%`;
        container.style.transform = `translate(-50%, 0%)`;
      break;
      case "bottom-left":
        container.style.bottom = `${notifConfig.offset.bottom}`;
        container.style.left = `${notifConfig.offset.left}`;
      break;
      case "left":
        container.style.left = `${notifConfig.offset.left}`;
        container.style.top = `${50}%`;
        container.style.transform = `translate(0%, -50%)`;
      break;
      case "top-left":
        container.style.top = `${notifConfig.offset.top}`;
        container.style.left = `${notifConfig.offset.left}`;
      break;
    }
    container.style.zIndex = "999";
    container.style.position = "fixed";
    return this;
  }
  //--Setter--//

  public add(notif:NOTIF_MESSAGE){
    const notifElement = document.createElement("div");
    //Container Style
    swapClass({id:notifElement, mk:"rounded w-96 bg-gray-50 shadow-lg border border-gray-300 relative pb-4 px-3"});

    //Close Button
    const closeButtonContainer = document.createElement("div");
    notifElement.appendChild(closeButtonContainer);
    closeButtonContainer.style.left = "98%";
    swapClass({id:closeButtonContainer, mk:"relative size-3 mr-2 mt-2 cursor-pointer"});
    closeButtonContainer.onclick = ()=>notifElement.remove();
    const closeButtonImage = document.createElement("div");
    closeButtonImage.textContent = "✖";
    closeButtonImage.style.paddingRight = "2px";
    closeButtonContainer.appendChild(closeButtonImage);
    swapClass({id:closeButtonImage, mk:"object-contain w-full h-full"});
    

    if(notif.title){
      notifElement.title = notif.title;
      const titleElement = document.createElement("div");
      titleElement.innerHTML = notif.title;
      swapClass({id:titleElement, mk:" text-lg font-normal"});
      notifElement.appendChild(titleElement); 
    }

    if(notif.message){
      const messageElement = document.createElement("div");
      messageElement.innerHTML = notif.message;
      swapClass({id:messageElement, mk:"text-gray-600 font-light"});
      notifElement.appendChild(messageElement); 
    }

    if(notif.autoClose){
      setTimeout(()=>{
        notifElement.remove();
      }, notif.autoClose);
    }
    
    const animation = new AnimeTroupe(notifElement, [
      {"opacity":"0"},
      {"opacity":"1"},
    ], {
      duration: 200,
      easing: "easeOutQuad",
    });
    animation.play();

    this.container.appendChild(notifElement);
    return this;
  }


}