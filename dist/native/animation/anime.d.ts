/**
 * Parameters:
 * - time - number|time ->time is in string with format "00:00:00:0000" / number in millisecond
 * - targetElement - the element that will be change or move
 */
export declare const Second = 1000;
export declare const Minute: number;
export declare const Hour: number;
interface TIME_CURVATURE {
    easeInQuad: string;
    easeOutQuad: string;
    easeInCubic: string;
    easeOutCubic: string;
    easeInQuart: string;
    easeOutQuart: string;
    easeInQuint: string;
    easeOutQuint: string;
    easeInSine: string;
    easeOutSine: string;
    easeInExpo: string;
    easeOutExpo: string;
    easeInCirc: string;
    easeOutCirc: string;
    easeInBack: string;
    easeOutBack: string;
    [key: (number | string)]: any;
}
export declare const TimeCurvature: TIME_CURVATURE;
interface ANIMATION_KEYING_OBJECT {
    [key: (number | string)]: string | number;
}
interface ANIMATION_TIMER_OBJECT {
    duration: string | number;
    direction?: string | "normal" | "reverse" | "alternate" | "alternate-reverse";
    easing?: string | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear" | "step-start" | "step-end" | "cubic-bezier()" | "steps()" | "easeInQuad" | "easeOutQuad" | "easeInCubic" | "easeOutCubic" | "easeInQuart" | "easeOutQuart" | "easeInQuint" | "easeOutQuint" | "easeInSine" | "easeOutSine" | "easeInExpo" | "easeOutExpo" | "easeInCirc" | "easeOutCirc" | "easeInBack" | "easeOutBack";
    iterations?: string | typeof Infinity | "Infinity";
    fill?: string | "none" | "forwards" | "backwards" | "both";
}
export declare function animate(element: KeyframeEffect | HTMLElement | any, keying: ANIMATION_KEYING_OBJECT[], time: ANIMATION_TIMER_OBJECT | KeyframeEffectOptions | string | number): any;
export declare class AnimeTroupe {
    private config;
    private currentAnimation;
    constructor(element?: KeyframeEffect | HTMLElement | any, keying?: ANIMATION_KEYING_OBJECT[] | null, time?: ANIMATION_TIMER_OBJECT | KeyframeEffectOptions | string | number | any);
    renew(element?: KeyframeEffect | HTMLElement | any, keying?: ANIMATION_KEYING_OBJECT[] | null, time?: ANIMATION_TIMER_OBJECT | KeyframeEffectOptions | string | number | any): void;
    element(element: KeyframeEffect | HTMLElement | any): this;
    keying(keying: ANIMATION_KEYING_OBJECT[]): this;
    time(time: ANIMATION_TIMER_OBJECT | KeyframeEffectOptions | string | number): this;
    reset(): this;
    play(unChange?: boolean): this;
    reverse(unChange?: boolean): this;
    pause(): this;
    commitStyle(waitToFinish?: boolean): this;
    isStop(callback: (THIS: AnimeTroupe, e: AnimationPlaybackEvent) => void): void;
}
export declare class AnimationGroup {
    constructor();
    delay(): void;
    play(): void;
    pause(): void;
    reverse(): void;
}
declare class TurnItem {
    id: string | number;
    startTime: number;
    duration: number;
    repeat: undefined | null | number | typeof Infinity;
    iterationCount: number;
    do: (thisItem: TurnItem) => void;
}
declare class TurnOrder {
    private stack;
    pushOrder(turnItem: TurnItem): this;
    queuedOrder(): this;
    addOrder(turnItem: TurnItem, sort?: boolean): this;
    removeOrder(id: string | number, sort?: boolean): this;
    sortTimeOrder(reverse?: boolean): this;
    first(): TurnItem;
    all(): TurnItem[];
}
export declare class TimelineFrame {
    private turnOrder;
    private timeInterval;
    private runningMilliseconds;
    private runningSeconds;
    private runningMinutes;
    private runningHour;
    private timer;
    constructor(turnOrder?: TurnOrder | undefined, timeInterval?: number | undefined);
    setTurnOrder(turnOrder: TurnOrder): this;
    settimeInterval(timeInterval: number): this;
    run(): this;
    currentTime(useMilliseconds?: boolean): number;
    interrupt(turnOrder?: TurnOrder | undefined): this;
    getTurnOrder(): TurnOrder | undefined;
}
export {};
