import React, { useMemo } from "react"; //You may remove the React the parent has react already
import { IconList, type ICON, type VECTORS } from "../helpers/IconifyIcons.ts";

interface Props{
    name: string;
    inClass: string;
    outClass: string;
    [key: (string|number)]: any
}

export default (props:Props)=>{
    const { name, inClass, outClass, ...attributes } = props;
    
    const iconData:undefined|ICON = useMemo(()=>{
        return IconList[name];
    }, [name]);

    if(iconData === undefined)
        return ""

    return <>
    <div className={outClass} {...attributes} >
        <svg xmlns={iconData.svg.xmlns} width="100%" height="100%" viewBox={iconData.svg.viewBox} >
            <g className={inClass}>
                {iconData.vectors.map((x:any|VECTORS, i)=>{
                    const {element, ...elementAttributes} = x;
                    switch(element){
                        case "path":
                            return <path key={i} {...elementAttributes} />
                        break;
                    }
                })}
            </g>
        </svg>
    </div>
    </>
}
