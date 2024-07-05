import { useState, useEffect } from "react";

export default function({className, onInput, set, error, ...attributes}){
    //InputState
    const [ inputState, inputSet ] = useState("");

    //When someone set on the parent
    useEffect(()=>{
        if(set === undefined)
            return;
        inputSet(set);
    }, [set]);

    //Function
    function onInputRevise(e){//To insert a callback outside of this inputBox
        if(onInput)
            onInput(e, inputState, inputSet);
        inputSet(e.target.value);
    }
    return <>
        <input className={`input input-bordered input-md max-w-none w-full rounded ${className} ${error && "input-error"} `} value={inputState} onInput={onInputRevise} {...attributes} />
    </>
}