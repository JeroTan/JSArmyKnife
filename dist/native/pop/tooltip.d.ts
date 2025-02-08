type POSITION = "top" | "right" | "bottom" | "left";
/**
 * @info This is intended for client-side only. Please advised that this requires some tailwindcss classes to work properly.
 */
export declare class ToolTip {
    private referenceElement?;
    private position;
    private message;
    private outside;
    private useHover;
    private toolTip;
    constructor(position?: POSITION, message?: string | HTMLElement, referenceElement?: HTMLElement, outside?: boolean, useHover?: boolean);
    setPosition(position: POSITION): this;
    setMessage(message: string | HTMLElement): this;
    setReference(element: HTMLElement): this;
    setOutside(outside: boolean): this;
    setUseHover(useHover: boolean): this;
    run(): [() => void, () => void, HTMLDivElement];
    destroy(): void;
}
export {};
