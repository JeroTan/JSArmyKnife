interface SVG {
    viewBox: string;
    width: string;
    height: string;
    xmlns: string;
}
export interface VECTORS {
    element: string;
    d?: string;
    fillRule?: string;
    clipRule?: string;
    [key: (string | number)]: any;
}
export interface ICON {
    svg: SVG;
    vectors: VECTORS[];
}
export interface ICONLIST {
    [key: (string | number)]: ICON;
}
export declare class MakeIcon {
    private svg;
    private vectors;
    constructor();
    reset(): this;
    addFill(d: string): this;
    addStroke(d: string, fillRule?: string, clipRule?: string): this;
    addPath(element: object): this;
    addViewBox(viewBox: string): this;
    get(): ICON;
}
export declare function iconNew(): MakeIcon;
export declare const IconList: ICONLIST;
export {};
