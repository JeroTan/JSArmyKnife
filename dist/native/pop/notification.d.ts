interface NOTIF_POP_CONFIG {
    location: "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left";
    offset: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    };
}
interface NOTIF_MESSAGE {
    title?: string;
    message?: string;
    autoClose?: number;
}
export declare class NotifPop {
    private container;
    private containerName;
    private notifConfig;
    constructor();
    location(location: NOTIF_POP_CONFIG["location"]): this;
    offset(location: NOTIF_POP_CONFIG["offset"]): this;
    offsetTop(pixel: string): this;
    offsetRight(pixel: string): this;
    offsetLeft(pixel: string): this;
    offsetBottom(pixel: string): this;
    updateConfig(): this;
    add(notif: NOTIF_MESSAGE): this;
}
export {};
