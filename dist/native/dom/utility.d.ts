interface SWAPPER {
    id: string | HTMLElement;
    mk?: string | string[];
    rm?: string | string[];
    tg?: string | string[];
    sw?: string | [string, string];
}
/**
 * @description This function is used to swap class of an element. It can be used to swap multiple elements at once.
 * @param query
 * @param recalculate
 * @returns
 */
export declare function swapClass(query: SWAPPER | SWAPPER[], recalculate?: boolean): void;
/**
 * @description This function is used to create new element. It can be used to create any element with any attributes and children.
 * @param tag
 * @param props
 * @param children
 * @returns
 */
export declare function E<T extends keyof HTMLElementTagNameMap>(tag: T, props?: {
    style?: Partial<CSSStyleDeclaration>;
} & Partial<Omit<HTMLElementTagNameMap[T], "style">>, ...children: (string | Node)[]): HTMLElementTagNameMap[T];
/**
 * @description This function creates document fragment. It can be used to create multiple elements at once.
 */
export declare function F(...children: (string | Node)[]): DocumentFragment;
/**
 * @description This function is used to create custom elements that you can reuse in the page. meaning once created, you can use it multiple times. i.e. <sample-element></sample-element> will be always available and it retain its functionality every time you use document.createElement("sample-element")
 * @param componentName
 * @param callback
 * @param appendToRoot Here you may add the required styles or scripts since the API custom element will not have access to the main document.
 */
export interface HTMLElementsWithProps<T> extends HTMLElement {
    props: T;
    slotData: (content: (string | HTMLElement | HTMLElementsWithProps<any> | Node) | {
        [slotname: string | number]: (string | HTMLElement | HTMLElementsWithProps<any> | Node);
    }) => void;
}
export declare function ElementMaker<T extends object>(componentName: string, callback: (element: HTMLElementsWithProps<T>) => void, noBuild?: boolean): void;
type LOAD_CALLBACK = ((() => void) | (() => Promise<any>));
type LOAD_FALLBACK = () => void;
/**
 * @description This class is used to control the load order of the page. It can be used to control the load order of the page.
 */
export declare class LoadOrder {
    private orderStack;
    private fallbackStack;
    private useOnLoad;
    private hammerTrigger;
    constructor(useOnLoad?: boolean);
    setOnLoad(useOnLoad: boolean): this;
    push(callback: LOAD_CALLBACK, fallback?: LOAD_FALLBACK): void;
    cutIn(index: number, callback: LOAD_CALLBACK, fallback?: LOAD_FALLBACK): this;
    insert(index: number, callback: LOAD_CALLBACK, fallback?: LOAD_FALLBACK): this;
    run(expectedStack?: number): void;
}
/**
 * @description - Clone and destroy the copy after it's usage on callback. It will have a hidden copy in the document body.
 * @param element
 * @param callback
 */
export declare function partialClone<T extends HTMLElement>(element: T, callback: (e: T) => void): void;
/**
 * @description - Trigger event manually
 * @returns
 */
export declare function elementTrigger(eventName: string, element: HTMLElement): void;
export declare function DOMPopTransformer(instruction: {
    pop: string;
    [key: string | number]: any;
}): [() => void, () => void];
export declare function openAWindow(url: string, title: string, w: number, h: number): void;
export declare function changePage(link: string): void;
export declare class Prefetch {
    config: {
        link: string;
        fetching: boolean;
        frameId: string;
    };
    constructor(link?: string);
    setLink(link: string): this;
    fetch(): this;
    swapFetched(success?: Function, fail?: Function): this;
}
export declare class Breakpoint {
    private getWidth;
    private getHeight;
    breakIn({ width, height }: {
        width?: number;
        height?: number;
    }): boolean;
    breakOut({ width, height }: {
        width?: number;
        height?: number;
    }): boolean;
}
export declare class Observer {
    private observer?;
    private target?;
    constructor(target?: HTMLElement);
    setTarget(target: HTMLElement): this;
    observe(observeCallback: ((mutations: MutationRecord[], observer: MutationObserver, thisClass: Observer) => void), config?: MutationObserverInit): void;
    disconnect(): void;
}
export declare function elementInScreen(element: HTMLElement, callback: (result: boolean) => void, offset?: number): void;
export declare function updateURL(url: string): void;
export declare function goToElement(element: HTMLElement): void;
export declare function scrollToBottom(callback: Function, offset?: number): void;
export {};
