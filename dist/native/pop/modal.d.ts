export interface MODAL_STRUCTURE {
    isOpen: boolean;
    width: string | number;
    icon: "check" | "cross" | "i" | "warning" | "loadingDonut" | string;
    iconColor: string;
    iconAnimate: string;
    title: string | number;
    message: string | number;
    additionalBody: string | HTMLElement | undefined;
    acceptButton: true;
    rejectButton: true;
    acceptButtonText: string;
    rejectButtonText: string;
    acceptButtonCallback: undefined | ((closeModal: Function) => void);
    rejectButtonCallback: undefined | ((closeModal: Function) => void);
    closeButton: true;
    closeButtonCallback: undefined | ((closeModal: Function) => void);
    backdropTrigger: true;
    backdropTriggerCallback: undefined | ((closeModal: Function) => void);
    customDialog: undefined | string | HTMLElement | Node | ((data: MODAL_STRUCTURE) => string | HTMLElement | Node);
    [key: string | number]: any;
}
export interface POP_COMMON_FRAME {
    close?: MODAL_STRUCTURE | {
        [key: string | number]: any;
    };
    success?: MODAL_STRUCTURE | {
        [key: string | number]: any;
    };
    error?: MODAL_STRUCTURE | {
        [key: string | number]: any;
    };
    info?: MODAL_STRUCTURE | {
        [key: string | number]: any;
    };
    warning?: MODAL_STRUCTURE | {
        [key: string | number]: any;
    };
    loading?: MODAL_STRUCTURE | {
        [key: string | number]: any;
    };
    custom?: MODAL_STRUCTURE | {
        [key: string | number]: any;
    };
}
export declare const popStructure: MODAL_STRUCTURE;
export declare function popDispatch(instruction: {
    pop: string;
    [key: string | number]: any;
}): MODAL_STRUCTURE;
export type OPEN_FUNCTION = () => void;
export type ClOSE_FUNCTION = () => void;
export declare class Modal {
    private dispatch;
    private frame;
    private cachedContent;
    constructor(dispatch: ((instruction: {
        pop: string;
        [key: string | number]: any;
    }) => [OPEN_FUNCTION, ClOSE_FUNCTION]));
    setDispatch(dispatch: ((instruction: {
        pop: string;
        [key: string | number]: any;
    }) => [OPEN_FUNCTION, ClOSE_FUNCTION])): this;
    cacheData(object: MODAL_STRUCTURE | {
        [key: string | number]: any;
    }): this;
    run(): [OPEN_FUNCTION, ClOSE_FUNCTION];
    type(type: "close" | "success" | "error" | "info" | "warning" | "loading" | "custom"): this;
    width(width: string | number): this;
    title(title: string): this;
    message(message: string): this;
    addtional(addon: string | HTMLElement): this;
    callback(accept?: ((close: Function) => void) | undefined, reject?: ((close: Function) => void) | undefined, close?: ((close: Function) => void) | undefined, backdrop?: ((close: Function) => void) | undefined): this;
    button(accept?: boolean | string, reject?: boolean | string, close?: boolean, backdrop?: boolean): this;
    custom(callback: string | HTMLElement | Node | ((data: MODAL_STRUCTURE) => string | HTMLElement | Node)): this;
    close(): this;
    open(): this;
}
