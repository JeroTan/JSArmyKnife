


export class Room {
  private DOMHotSwap: HTMLElement[] | null = null;
  private DOMTempContainer: {
    cachedBody: HTMLElement,
    cachedContent: HTMLElement
  } = {
    cachedBody: document.createElement("body"),
    cachedContent: document.createElement("body")
  };
  public _content: HTMLElement[] = [document.createElement("div")];

  constructor(content?: HTMLElement| HTMLElement[]) {
    this.DOMHotSwap = this.getAllBody();
    if (content) {
      this._content = Array.isArray(content) ? content : [content];
    }
  }

  public set content(value: HTMLElement[]| HTMLElement) {
    this._content = Array.isArray(value) ? value : [value];
  }

  public get content() {
    return this._content;
  }

  private getAllBody(): HTMLElement[] | null {
    const bodyChildren = Array.from(document.body.children) as HTMLElement[];
      // .filter(child =>
      //   // child !== element
      //   // child.tagName.toLowerCase() !== 'script' &&
      //   // child.tagName.toLowerCase() !== 'style'
      // ) as HTMLElement[];
    return bodyChildren.length > 0 ? bodyChildren : null;
  }

  private swapToClearBody() {
    if(this.DOMHotSwap == null) return;
    for(const body of this.DOMHotSwap){
      this.DOMTempContainer.cachedBody.append(body);
    }
    for(const content of this._content){
      document.body.append(content);
    }
  }
  private swapBackToOriginal(){
    if(this.DOMHotSwap == null) return;
    for(const content of this._content){
      this.DOMTempContainer.cachedContent.append(content);
    }
    for(const body of this.DOMHotSwap){
      document.body.append(body);
    }
  }

  public open(){
    this.DOMHotSwap = this.getAllBody();
    this.swapToClearBody();
  }

  public close() {
    this.swapBackToOriginal();
  }

}


export function createRoom(content: HTMLElement[]){
  const dialog = document.createElement("dialog");
  dialog.style.position = "fixed";
  dialog.style.top = "0";
  dialog.style.left = "0";
  dialog.style.width = "100%";
  dialog.style.height = "100%";
  dialog.style.zIndex = "60";
  dialog.style.overflowY = "auto";
  dialog.style.overscrollBehavior = "contain";
  const main = document.createElement("main");
  for(const item of content){
    main.append(item);
  }
  dialog.append(main);
  return dialog;
}