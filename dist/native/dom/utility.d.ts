interface Swapper {
    id: string | HTMLElement;
    mk?: string | string[];
    rm?: string | string[];
}
export declare function swapClass(query: Swapper | Swapper[], recalculate?: boolean): void;
export declare function E<T extends keyof HTMLElementTagNameMap>(tag: T, props?: Partial<HTMLElementTagNameMap[T]> & {
    style?: Partial<CSSStyleDeclaration>;
    [key: string]: any;
}, ...children: (string | Node)[]): HTMLElementTagNameMap[T];
type LOAD_CALLBACK = ((() => void) | (() => Promise<any>));
type LOAD_FALLBACK = () => void;
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
export declare function shadowClone<T extends HTMLElement>(element: T, callback: (e: T) => void): void;
export declare function elementTrigger(eventName: string, element: HTMLElement): void;
type INPUT_FIELD = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export declare class FieldBinding {
    private inputDOM;
    private errorDOM;
    private oldInputValue;
    private oldErrorValue;
    private inputOffsetName;
    private errorOffsetName;
    private listenerElement;
    private listenersStack;
    constructor(inputOffsetName?: string, errorOffsetName?: string);
    setInputOffsetName(offset: string): this;
    setErrorOffsetName(offset: string): this;
    private addField;
    private listenTrigger;
    private removeField;
    private getValue;
    private setValue;
    addInputField(name: string | number | string[], field?: INPUT_FIELD | string | undefined | Array<INPUT_FIELD | string | undefined>, includeError?: boolean): this;
    addErrorField(name: string | number | string[], field?: INPUT_FIELD | string | undefined | Array<INPUT_FIELD | string | undefined>): this;
    removeInputField(name: string | string[]): this;
    removeErrorField(name: string | string[]): this;
    getInput(name?: string | number | undefined | Array<string | number>): string | {
        [key: string]: string;
        [key: number]: string;
    };
    getError(name?: string | number | undefined | Array<string | number>): string | {
        [key: string]: string;
        [key: number]: string;
    };
    setInput(name: string | number | Array<string | number> | {
        [name: string | number]: string;
    }, value?: string | undefined, silent?: boolean, useChange?: boolean): this;
    setError(name: string | number | Array<string | number> | {
        [name: string | number]: string;
    }, value?: string | undefined, silent?: boolean, useChange?: boolean): this;
    inputElement(name: string): INPUT_FIELD;
    errorElement(name: string): INPUT_FIELD;
    validation(listToValidate: {
        [key: string | number]: (input: string) => (string | true | Promise<string | true>);
    }): void;
    listen(callback: (input: {
        [key: string | number]: string;
    }, error: {
        [key: string | number]: string;
    }) => void): void;
    listenToInput(whatField: Array<string | number>, callback: (input: {
        [key: string | number]: string;
    }, error: {
        [key: string | number]: string;
    }) => void, returnAll?: boolean): void;
    listenToError(whatField: Array<string | number>, callback: (input: {
        [key: string | number]: string;
    }, error: {
        [key: string | number]: string;
    }) => void, returnAll?: boolean): void;
    listenTo(inputField: Array<string | number>, errorField: Array<string | number> | true, callback: (input: {
        [key: string | number]: string;
    }, error: {
        [key: string | number]: string;
    }) => void, returnAll?: boolean): void;
    onBlur(inputField: Array<string | number>, errorField: Array<string | number>, callback: (input: {
        [key: string | number]: string;
    }, error: {
        [key: string | number]: string;
    }) => void): void;
    fieldNoError(excluded?: Array<string | number>, reverse?: boolean): boolean;
    checkEmptyField(name?: string | number | undefined | Array<string | number>, combine?: boolean): boolean | {
        [key: string | number]: boolean;
    };
}
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
export declare function getFileLink(fileInput: HTMLInputElement, fileIndex?: number): string | null;
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
export {};
