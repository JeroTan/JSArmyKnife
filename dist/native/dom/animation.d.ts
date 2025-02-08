export declare function textChangerAnimation({ textElement, textList, switchInterval, swapInterval, caretAnimation, }: {
    textElement: HTMLElement;
    textList: string[];
    switchInterval?: number;
    swapInterval?: number;
    caretAnimation?: number;
}): {
    close(): void;
};
export interface CAROUSEL_DATA {
    src: string;
    position?: string;
    content?: string | HTMLElement;
    noSwiping?: boolean;
}
export declare class Carousel {
    private _carouselContainer;
    private _carouselData;
    private _transitionInterval;
    private _transitionDuration;
    private direction;
    private elementDump;
    private triggerElement;
    private currentSlideIndex;
    private animating;
    private timer;
    constructor(carouseContainer?: HTMLElement, carouselData?: Array<CAROUSEL_DATA>);
    set carouselContainer(carouselContainer: HTMLElement);
    set carouselData(carouselData: Array<CAROUSEL_DATA>);
    set transitionInterval(transitionInterval: number);
    set transitionDuration(transitionDuration: number);
    setContent(): this | undefined;
    play(): void;
    pause(): void;
    next(): void;
    previous(): void;
    goTo(slideIndex: number, direction?: "left" | "right"): void;
    reverse(): this;
    listen(callback: (currentIndex: number, direction: "left" | "right", THIS: Carousel) => void): void;
}
