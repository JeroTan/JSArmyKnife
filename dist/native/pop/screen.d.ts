interface POP_OVER_DATA {
    element?: HTMLElement;
    message: string;
    title: string;
    position?: "top" | "right" | "bottom" | "left";
}
interface SCREENPOP_CONFIG {
    darken?: boolean;
    animate?: boolean;
    highlightElements: HTMLElement[];
    popOver: Array<POP_OVER_DATA>;
    trigger?: (THIS: ScreenPop) => void;
}
/**
 * @info This is intended for client-side only
 */
export declare class ScreenPop {
    private canvas;
    private canvasName;
    private canvasConfig;
    private canvasBreakPoint;
    private isAlreadyClose;
    constructor();
    protected resetCanvas(): this;
    darken(): this;
    highlightElements(elements: HTMLElement | HTMLElement[]): this;
    popOver(details: POP_OVER_DATA | POP_OVER_DATA[]): this;
    animate(): this;
    trigger(callback: (THIS: ScreenPop) => void): this;
    breakPoint(whenToDown: {
        [key: number]: Partial<SCREENPOP_CONFIG>;
    }): this;
    run(): this;
    close(): this;
}
export {};
