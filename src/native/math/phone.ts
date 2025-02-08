export const countryPhoneMap = {
  "ph":"+63",   
}

export function convertLocalPhone(country:keyof typeof countryPhoneMap, mobileNumber:string|number){
  if( typeof mobileNumber === "number"){
      return countryPhoneMap[country] + String(mobileNumber);
  }
  if( mobileNumber.charAt(0) === "0"){
      return countryPhoneMap[country] + mobileNumber.substring(1);;
  }
  return countryPhoneMap[country] + mobileNumber;
}