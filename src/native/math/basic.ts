/**
* @info Use this to generate random number base on selected range
* @param min Number should be the lowest range it can select on random
* @param max Maximum allowable range of number
* @param allowDecimal In case you want to include decimals instead of just whole number. It accepts false and number which is the length of decimal digits
* @returns Random number between min and max params
*/
export function randomizer(min:number=0, max:number=Number.MAX_SAFE_INTEGER, allowDecimal:boolean|number= false){
  const randData = Math.random();
  const minMaxRand:number = randData * (max-min) + min;

  if(minMaxRand % 1 == 0)//If there is no decimal then return immediately
      return minMaxRand;
  
  if(allowDecimal){//If there is a decimal and arguments allowed it, then adjust decimal
      return adjustDecimal(minMaxRand, allowDecimal);
  }else{//If not then just remove the rest.
      return removeDecimal(minMaxRand);
  }
}

/**
* @info Function that will remove a decimal to a number. If you pass a whole number it will just return that number;
* @param number Value that will be use to remove decimal
* @returns Whole number without decimal Value
*/
export function removeDecimal(number:number){
  return number >> 0; //By using module, the orig number minus the remainder of absolute 1 number. With this we remove the decimal
}

/**
* @info This will transform a number like 1.68 to 2 basically any number that has decimal
* @param number Value that you want to transform
* @returns Transform value that is already CEIL
*/
export function ceil(number:number): number{
  if( number % 1 !== 0 ){
      return (number | 0) + 1;
  }
  return number;
}

/**
* @info This will transform a number like 1.68 to 1 basically any number that has decimal
* @param number Value that you want to transform
* @returns Transform value that is already FLOOR
*/
export function floor(number:number): number{
  if( number % 1 !== 0  ){
      return number >> 0;
  }
  return number;
}

/**
* @Info Transform a negative value or any value into a positive value
* @param number Value that you want to transform
* @returns Absolute number with no negative
*/
export function abs(number:number){
  return (0 < number ? number : -number);
}

export function adjustDecimal(number:number, addPlaceValue:boolean|number = true):number{
  const placeValue = typeof addPlaceValue === "boolean" ? (addPlaceValue===true?2:0) : Number(addPlaceValue);
  let result:number = Number(number.toFixed(placeValue));
  const precisionCheck:number = decimalCount(result);

  if(precisionCheck !== placeValue && precisionCheck !== 0){//If the two number decimals didn't match, then further adjustments is needed.
      const precising = String(result).split(".");
      precising[1] = precising[1].slice(0, placeValue);
      result = Number(precising.join("."))
  }

  return result;
}

export function decimalCount(number:number):number{
  const numArrStr = String(number).split(".");
  if(numArrStr.length == 2){
      return numArrStr[1].length;
  }
  return 0;
}

export interface SPLIT_NUMBER{
  sign: boolean,
  whole: number,
  decimal: number,
}
export function separateNumber(raw:number): SPLIT_NUMBER{
  const result: SPLIT_NUMBER = {
      sign: false,
      whole: 0,
      decimal: 0,
  }
  const splitRaw = raw.toString().split(".");
  if(splitRaw[0][0] == "-" ){//check if the first string has "-"
      result.sign = true;
      result.whole = Number(splitRaw[0].substring(1));
  }else{
      result.whole = Number(splitRaw[0]);
  }

  if(splitRaw.length == 2)//If there is decimal
      result.decimal = Number(splitRaw[1]);

  return result;
}

export function combineNumber(data: SPLIT_NUMBER, maintainString:boolean = false):string|number{
  let result = `${data.sign ? "-":""}${data.whole}${ data.decimal!==0 ? "."+data.decimal : "" }`;
  if(maintainString)
      return result;

  return Number(result)
}

export function padNumber(number:number, length:number):string{
  const raw = separateNumber(number); //The reason for separation is to prevent negative numbers from not having a pad
  if(length < 0)
      length = 0;
  const paddingValue = 10 ** length;
  if(paddingValue > raw.whole){
      const padValue = (paddingValue + raw.whole).toString().substring(1);
      return `${raw.sign?"-":""}${padValue}${raw.decimal?"."+raw.decimal:""}`;
  }
  return String(combineNumber(raw, true));
}
/**
* @info Cut Only Whole Number, the decimal will be remove
* @param number
* @param cutWhere 
*/
export function fixedNumber(number:number, limit:number=2, cutWhere:"left"|"right" = "right"){
  const raw = separateNumber(number);
  switch(cutWhere){
      case "left":
          return Number((raw.sign ? "-" :"")+String(raw.whole).substring(0, limit));

      case "right":
          return Number((raw.sign ? "-" :"")+String(raw.whole).substring( String(raw.whole).length > limit ? String(raw.whole).length - limit : 0));
 
  }
}

export function numberAddComma(number:number) {
  const splittedNumber = separateNumber(number);
  return (splittedNumber.sign ? "-":"") + (splittedNumber.whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + (splittedNumber.decimal !== 0 ? "."+splittedNumber.decimal : "");
}




