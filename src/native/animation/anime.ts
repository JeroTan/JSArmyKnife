//--- Working on this for next time ---//
/**
 * Parameters:
 * - time - number|time ->time is in string with format "00:00:00:0000" / number in millisecond
 * - targetElement - the element that will be change or move
 */

import { binarySearchIndex } from "@jsarmyknife/native--advance";
import { removeDecimal, timeToMilliseconds } from "@jsarmyknife/native--math";


export const Second = 1000;
export const Minute = Second*60;
export const Hour = Minute*60;

interface TIME_CURVATURE{
    easeInQuad: string,
    easeOutQuad: string,
    easeInCubic: string,
    easeOutCubic: string,
    easeInQuart: string,
    easeOutQuart: string,
    easeInQuint: string,
    easeOutQuint: string,
    easeInSine: string,
    easeOutSine: string,
    easeInExpo: string,
    easeOutExpo: string,
    easeInCirc: string,
    easeOutCirc: string,
    easeInBack: string,
    easeOutBack: string,
    [key: (number|string)]: any,
}
export const TimeCurvature:TIME_CURVATURE = {
    easeInQuad: "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
    easeOutQuad: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
    easeInCubic: "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
    easeOutCubic: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
    easeInQuart: "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
    easeOutQuart: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
    easeInQuint: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
    easeOutQuint: "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
    easeInSine: "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
    easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
    easeInExpo: "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
    easeOutExpo: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
    easeInCirc: "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
    easeOutCirc: "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
    easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
    easeOutBack: "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
    //And many more to come;
}
interface ANIMATION_KEYING_OBJECT{
    [key: (number|string)]: string|number
}
interface ANIMATION_TIMER_OBJECT{
    duration: string|number,
    direction?: string|"normal"|"reverse"|"alternate"|"alternate-reverse",
    easing?: string|"ease"|"ease-in"|"ease-out"|"ease-in-out"|"linear"|"step-start"|"step-end"|"cubic-bezier()"|"steps()"|
    "easeInQuad"|"easeOutQuad"|"easeInCubic"|"easeOutCubic"|"easeInQuart"|"easeOutQuart"|"easeInQuint"|"easeOutQuint"|
    "easeInSine"|"easeOutSine"|"easeInExpo"|"easeOutExpo"|"easeInCirc"|"easeOutCirc"|"easeInBack"|"easeOutBack",
    iterations?: string|typeof Infinity|"Infinity",
    fill?: string|"none"|"forwards"|"backwards"|"both"
    
}
export function animate(element:KeyframeEffect|HTMLElement|any, keying: ANIMATION_KEYING_OBJECT[], time:ANIMATION_TIMER_OBJECT|KeyframeEffectOptions|string|number ){
    if(typeof(time) === "object"){
        const refinedTime = time;
        if(typeof refinedTime.duration === "string"){
            refinedTime.duration = timeToMilliseconds(refinedTime.duration);
        }
        if(refinedTime.easing !== undefined && TimeCurvature[refinedTime.easing] !== undefined){
            refinedTime.easing = TimeCurvature[refinedTime.easing];
        }
        time = refinedTime as KeyframeEffectOptions;
    }
    if(typeof(time) === "string"){
        time = timeToMilliseconds(time);
    }
    
    //return new Animation( new KeyframeEffect(element, keying, time ));
    return element.animate(keying, time);
}



interface ANIME_TROUPE{
    element:KeyframeEffect|HTMLElement|any,
    keying:ANIMATION_KEYING_OBJECT[],
    time:ANIMATION_TIMER_OBJECT|KeyframeEffectOptions|string|number|any
}
//Basically the class version of animate but better
export class AnimeTroupe{ //It means as long as the configuration is the same you can redo the animation whenever you want for example a predefined time object.
    private config:ANIME_TROUPE = {
        element:undefined,
        keying:[],
        time:0,
    }
    private currentAnimation:Animation = new Animation;
    
    constructor(element:KeyframeEffect|HTMLElement|any = null, keying:ANIMATION_KEYING_OBJECT[]|null = null, time:ANIMATION_TIMER_OBJECT|KeyframeEffectOptions|string|number|any = 0){
        this.renew(element, keying, time);
    }

    //-- Setter --//
    renew(element:KeyframeEffect|HTMLElement|any = null, keying:ANIMATION_KEYING_OBJECT[]|null = null, time:ANIMATION_TIMER_OBJECT|KeyframeEffectOptions|string|number|any = 0){
        if(element)
            element = this.element(element).config.element;
        if(keying)
            keying = this.keying(keying).config.keying;
        if(time)
            time = this.time(time).config.time;
        this.currentAnimation = new Animation(new KeyframeEffect( element, keying, time ));
    }
    element(element:KeyframeEffect|HTMLElement|any){
        this.config.element = element;
        return this;
    }
    keying(keying:ANIMATION_KEYING_OBJECT[]){
        this.config.keying = keying;
        return this;
    }
    time(time:ANIMATION_TIMER_OBJECT|KeyframeEffectOptions|string|number){
        if(typeof(time) === "object"){
            const refinedTime = time;
            if(typeof refinedTime.duration === "string"){
                refinedTime.duration = timeToMilliseconds(refinedTime.duration);
            }
            if(refinedTime.easing !== undefined && TimeCurvature[refinedTime.easing] !== undefined){
                refinedTime.easing = TimeCurvature[refinedTime.easing];
            }
            time = refinedTime as KeyframeEffectOptions;
        }
        if(typeof(time) === "string"){
            time = timeToMilliseconds(time);
        }
        this.config.time = time;
        return this;
    }
    //-- Setter --//

    reset(){
        this.currentAnimation = new Animation(new KeyframeEffect( this.config.element, this.config.keying, this.config.time ));
        return this;
    }
    play(unChange = false){
        if(!unChange)
            this.currentAnimation = this.reset().currentAnimation;
        this.currentAnimation.play();
        return this;
    }
    reverse(unChange = false){
        if(!unChange)
            this.currentAnimation = this.reset().currentAnimation;
        this.currentAnimation.reverse();
        return this;
    }
    pause(){
        this.currentAnimation.pause();
        return this;
    }
    commitStyle(waitToFinish = false){
        if(this.currentAnimation)
        if(!waitToFinish){
            try{
                this.currentAnimation.commitStyles();
            }catch(e){
                console.log("Animation is Stopped before committing");
            }
            return this;
        }
        const THIS = this;
        this.currentAnimation.addEventListener("finish", ()=>{
            try{
                THIS.currentAnimation.commitStyles();
            }catch(e){
                console.log("Animation is Stopped before committing");
            }
        })
        return this;
    }
    isStop(callback: (THIS: AnimeTroupe, e: AnimationPlaybackEvent)=>void){
        const THIS = this;
        this.currentAnimation.addEventListener("finish", (e)=>{
            callback(THIS, e);
        })
    }

    
}

//--- USe this for grouping animation just like nesting in After Effects ---//
// interface ANIMATION_GROUP_OBJECT{
//     [key: (number|string)]: Animation
// }
export class AnimationGroup{
    // private animationList:ANIMATION_GROUP_OBJECT = {};
    
    constructor(){
    }

    //--Setter--//
    public delay(){

    }
    //--Setter--//

    public play(){

    }
    public pause(){

    }
    public reverse(){

    }

}

class TurnItem{
    public id:string|number = 0;
    public startTime:number = 0;
    public duration:number = 0;
    public repeat:undefined|null|number|typeof Infinity = undefined;
    public iterationCount:number = 0;
    public do:(thisItem:TurnItem)=>void = (thisItem:TurnItem)=>{thisItem};
}

class TurnOrder{
    private stack:TurnItem[] = [];

    //--Setter--//

    //--Setter--//
    public pushOrder(turnItem:TurnItem){
        this.stack.push(turnItem);
        return this;
    }
    public queuedOrder(){
        if(this.stack.length < 1)
            return this;
        this.stack.shift();
        return this;
    }
    public addOrder(turnItem:TurnItem, sort = false){
        if(this.stack.length <= 0){
            this.stack.push(turnItem);
            return this;
        }

        if( sort)
            this.stack.sort((a:TurnItem,b:TurnItem)=>a.startTime - b.startTime);
        let index = binarySearchIndex(this.stack, (x:TurnItem, y:TurnItem, z:TurnItem)=>{
            const leftOrRight = turnItem.startTime <= x.startTime ? -1 : 1;
            return y.startTime === z.startTime ? 0 : leftOrRight;
        });
        
        while(index+1 < this.stack.length){
            if(this.stack[index].startTime === this.stack[index+1].startTime){//To ensure that it will be in the last of same startTime
                index++;
            }else{
                break;
            }
        }

        this.stack.splice(index, 0, turnItem);
        return this;
    }
    public removeOrder(id:string|number, sort = false){
        if(this.stack.length <= 0)//if there is none to delete then quit
            return this;
        if(sort)
            this.stack.sort((a:TurnItem,b:TurnItem)=>a.startTime - b.startTime);
        const index = this.stack.findIndex((x:any)=>x.id === id );
        if(index >= 0)//check if index exist
            this.stack.splice(index, 1);
        return this;
    }
    public sortTimeOrder(reverse = false){
        this.stack.sort((a:TurnItem, b:TurnItem):number=>{
            return !reverse ? a.startTime - b.startTime : b.startTime - a.startTime;
        });
        return this;
    }
    public first(){
        return this.stack[0];
    }
    public all(){
        return this.stack;
    }
    
}

export class TimelineFrame{
    private turnOrder:TurnOrder|undefined;
    private timeInterval:number = 100; //The lower is accurate. Do not use 0 or below;
    private runningMilliseconds:number = 0;
    private runningSeconds:number = 0;
    private runningMinutes:number = 0;
    private runningHour:number = 0;
    private timer:any = undefined; //This is for timer;

    constructor(turnOrder?:TurnOrder|undefined, timeInterval?:number|undefined){
        if(turnOrder)
            this.setTurnOrder(turnOrder);
        if(timeInterval)
            this.settimeInterval(timeInterval);
    }

    //--setter--//
    public setTurnOrder(turnOrder:TurnOrder){
        this.turnOrder = turnOrder;
        return this;
    }
    public settimeInterval(timeInterval:number){
        this.timeInterval = timeInterval;
        return this;
    }
    //--setter--//


    //--method--//
    public run(){
        this.timer = setInterval(()=>{
            //-- Do all the logic here for turn order --//
            const ms = this.runningMilliseconds + (this.runningSeconds*Second) + (this.runningMinutes*Minute) + this.timeInterval;

            while(1){
                const item = this.turnOrder?.first();
                if(!item || item.startTime > ms)
                    break;
                
                if( item.startTime <= ms ){
                    item.do(item);
                    this.turnOrder?.queuedOrder();
                    if(item.repeat === null || item.repeat === undefined || item.repeat <= 0)
                        continue;
                    
                    if(item.repeat !== Infinity)
                        --item.repeat;
                    ++item.iterationCount;
                    item.startTime += (item.duration > this.timeInterval) ? item.duration : this.timeInterval+1;
                    this.turnOrder?.addOrder(item);
                };
            }

            //-- Fold the timer here --//
            function timeAdder(baseLine:number, currentTime:number, timeToAdd:number){
                currentTime += timeToAdd;
                if(currentTime < baseLine)
                    return [currentTime, 0];
                const multiplier = removeDecimal(currentTime/baseLine);
                currentTime %= baseLine;
                return [currentTime, multiplier];
            }
            const [newMilliseconds, nextSecond] = timeAdder(1000, this.runningMilliseconds, this.timeInterval);
            this.runningMilliseconds = newMilliseconds;
            if(nextSecond < 1)
                return;
            const [newSeconds, nextMinute] = timeAdder(60, this.runningSeconds, nextSecond);
            this.runningSeconds = newSeconds;
            if(nextMinute < 1)
                return;
            const [newMinutes, nextHour] = timeAdder(60, this.runningMinutes, nextMinute);
            this.runningMinutes = newMinutes;
            if(nextHour < 1)
                return;
            this.runningHour += nextHour;

        }, this.timeInterval);
        return this;
    }
    public currentTime(useMilliseconds=false){
        if(useMilliseconds)
            return this.runningMilliseconds + (this.runningSeconds*Second) + (this.runningMinutes*Minute);
        else
            return this.runningMilliseconds + (this.runningSeconds*Second) + (this.runningMinutes*Minute); //Will change this in the future
    }
    public interrupt(turnOrder?:TurnOrder|undefined){
        clearInterval(this.timer);
        if(turnOrder)
            this.turnOrder = turnOrder;
        return this;
    }
    public getTurnOrder(){
        return this.turnOrder;
    }
    //--method--//

}

// class TimeTrigger{
    
// }

// class Canvas{

// }