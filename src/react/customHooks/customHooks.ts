import { useState, useEffect, useRef } from "react";

export function useStateEx<T>(
  propValue: T,
  onChange?: (value: T) => void
): [T, (value: T) => void] {
  const [internal, setInternal] = useState(propValue);
  const prevPropRef = useRef(propValue);

  // Sync from parent -> internal state
  useEffect(() => {
    if (prevPropRef.current !== propValue) {
      setInternal(propValue);
      prevPropRef.current = propValue;
    }
  }, [propValue]);

  const setEx = (value: T) => {
    setInternal((prev) => {
      if (prev !== value) {
        onChange?.(value); // send update to parent
        prevPropRef.current = value;
        return value;
      }
      return prev;
    });
  };

  return [internal, setEx];
}
 
export function useStateRe<T>(value?:T, setter?:(old:T)=>void, fallbackValue?: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  return ( (value !== undefined && setter !== undefined) ? [value, setter as React.Dispatch<React.SetStateAction<T>>] : useState(fallbackValue as T) ) 
}