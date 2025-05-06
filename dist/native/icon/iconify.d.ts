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
export declare const IconList: {
    person: ICON;
    close: ICON;
    add: ICON;
    search: ICON;
    filter: ICON;
    edit: ICON;
    delete: ICON;
    back: ICON;
    check: ICON;
    cross: ICON;
    warning: ICON;
    i: ICON;
    crown: ICON;
    up: ICON;
    down: ICON;
    upload: ICON;
    eye: ICON;
    right: ICON;
    lastNext: ICON;
    firstPrev: ICON;
    next: ICON;
    prev: ICON;
    facebook: ICON;
    twitter: ICON;
    youtube: ICON;
    compactView: ICON;
    wideView: ICON;
    plus: ICON;
    save: ICON;
    loadingDonut: ICON;
    hamburgerMenu: ICON;
    collapseLeft: ICON;
    upDown: ICON;
    calendar: ICON;
    cash: ICON;
    trash: ICON;
    naturalNote: ICON;
    house: ICON;
    refresh: ICON;
    email: ICON;
    smartphone: ICON;
    vehicle: ICON;
    mapMarker: ICON;
    circledQuestion: ICON;
    manLocation: ICON;
    truck: ICON;
    receipt: ICON;
    map: ICON;
    coin: ICON;
    wrench: ICON;
    wrenchTimer: ICON;
    copyFill: ICON;
    selectRoute: ICON;
    share: ICON;
    contactPerson: ICON;
    telephone: ICON;
    flag: ICON;
    fileUpload: ICON;
    noteBook: ICON;
    ellipses: ICON;
    mousePointDown: ICON;
    calendarDate: ICON;
    calendarTime: ICON;
};
export {};
