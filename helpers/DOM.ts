interface Swapper{
    id: string|HTMLElement;
    mk?: string|string[];
    rm?: string|string[];
}

export function swapClass(query:Swapper|Swapper[], recalculate:boolean = false){
    /* //This is the nostalgic JQuery
        $(keys).removeClass(query[keys][0]);
        $(keys).addClass(query[keys][1]);
        $(keys)[0].offsetHeight;
    */

    //This function contains logic to swap class
    function swap(id:string|HTMLElement, mk?:string|string[], rm?:string|string[]){
        const element = id instanceof HTMLElement ? id :  document.querySelector<HTMLElement>(id);
        if(rm){
            if(typeof rm === "string"){
                rm = rm.trim().split(" ");
            }
            element?.classList.remove(...rm);
        }
        if(mk){
            if(typeof mk === "string"){
                mk = mk.trim().split(" ");
            }
            element?.classList.add(...mk);
        }

        //dom re-calculate
        if(recalculate)
            element?.offsetHeight;
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

//Use this to create new element
class Element{
    newElement: HTMLElement|undefined|null|Node;
    headElement: HTMLElement|undefined|null|Node;
    tailElement: HTMLElement|undefined|null|Node;

    constructor(newElement:HTMLElement|undefined){
        if(newElement)
            this.element(newElement);
    }
    element(newElement:HTMLElement|string){
        if(typeof newElement === "string"){
            this.newElement = document.createElement(newElement);
        }else{
            this.newElement = newElement;
        }
        return this;
    }
    head(element:HTMLElement|string){
        if(typeof element === "string"){
            this.headElement = document.querySelector<HTMLElement>(element);
        }
        else{
            this.headElement = element;
        }
        return this;
    }
    tail(element:HTMLElement|string){
        if(typeof element === "string"){
            this.tailElement = document.querySelector<HTMLElement>(element);
        }
        else{
            this.tailElement = element;
        }
        return this;
    }
    merge(){
        if(this.headElement && this.newElement)
            this.headElement?.appendChild(this.newElement);
        if(this.tailElement && this.newElement)
            this.newElement.appendChild(this.tailElement);
        return this.newElement;
    }
}