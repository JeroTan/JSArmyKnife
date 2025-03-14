import {useEffect, useState} from "react";

export function useStateEx<T>(
  initialValue: T,
  externalSetter?: (value: T) => void
): [T, (value: T) => void]{
  const [internalValue, setInternalValue] = useState<T>(initialValue);

  //Set the state when things change
  useEffect(() => {
    if(initialValue !== internalValue){
      setInternalValue(initialValue);
    }
  }, [initialValue]);

  function setterValue(value: T, internalOnly?:boolean):void;
  function setterValue(value: (prev: T) => T, internalOnly?:boolean): void;
  // function setterValue(value: T|((prev: T) => T)): void{
  //   setInternalValue(value);
  //   if(externalSetter !== undefined){
  //     if(typeof value === "function"){
  //       externalSetter( (value as Function)(internalValue) );
  //     }else{
  //       externalSetter(value);
  //     }
  //   }
  // }
  function setterValue(value: T|((prev: T) => T), internalOnly:boolean = false): void{
    if(typeof value === "function"){
      setInternalValue((old)=>{
        const newValue = (value as Function)(old);
        if(externalSetter !== undefined && !internalOnly){
          externalSetter(newValue);
        }
        
        return newValue;
      })
    }else{
      setInternalValue(value);
      if(externalSetter !== undefined && !internalOnly){
        externalSetter(value);
      }
    }
  }
  
  return [internalValue, setterValue];
}