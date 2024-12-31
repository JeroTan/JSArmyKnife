import { parseQueryToString } from "./HttpNative";

export class WebSocketNative{
  private socket:undefined|WebSocket = undefined;
  private url:string = "";
  private param:string = "";
  
  constructor(url?:string, param?:{[key:string|number]:string}){
    if(url){
      this.setUrl(url, param);
    }
  }

  //--Setter--//
  public setUrl(url:string, param?:{[key:string|number]:string}){
    this.url = url;
    this.param = (param != undefined ? (Object.keys(param).length > 0 ? ("?"+parseQueryToString(param)) : "") : "");
    // this.urlCheck();
    return this;
  }
  public setParam(param:{[key:string|number]:string}){
    this.param = (param != undefined ? (Object.keys(param).length > 0 ? ("?"+parseQueryToString(param)) : "") : "");
    return this;
  }
  //--Setter--//

  async urlCheck(callbackSuccess?:Function, callbackFail?:Function){
    try{
      await fetch((this.url+this.param).replace("wss://", "https://"));
      if(callbackSuccess)
        callbackSuccess();
    }catch{
      console.log("There is a problem with: ", (this.url+this.param).replace("wss://", "https://"), "Initial Fetch Failed!");
      if(callbackFail)
        callbackFail();
    }
    return this;
  }
  open(callback?:(e:Event)=>void){
    if(!this.url){
      console.log(`URL is not in this websocketnative instance`);
      return this;
    }
    if(this.socket != undefined && (this.socket.readyState == 1 || this.socket.readyState == 0)){
      this.close();
    }
    
    try{
      this.socket = new WebSocket(this.url+this.param);
      if(callback)
        this.socket?.addEventListener("open", callback);
    }catch{
      console.log("Error connecting on websocket!");
    }
    return this;
  }

  getSocket(){
    return this.socket;
  }

  receiver(callback:(e:MessageEvent)=>void){
    if(this.socket==undefined || !this.url){
      console.log(`${this.socket==undefined?"Websocket":"URL"} is not in this websocketnative class`);
      return this;
    }
    this.socket?.addEventListener("message", callback);
    return this;
  }

  close(callback?:(e:Event)=>void){
    if(this.socket==undefined){
      return this;
    }
    this.socket.close();
    if(callback)
      this.socket.addEventListener("close", callback);
    this.socket = undefined;
    return this;
  }

  toClose(callback:(e:Event)=>void){
    if(this.socket==undefined){
      return this;
    }
    this.socket.addEventListener("close", callback);
  }


}