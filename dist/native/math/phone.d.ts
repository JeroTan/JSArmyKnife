export declare const countryPhoneMap: {
    ph: string;
};
export declare function convertLocalPhone(country: keyof typeof countryPhoneMap, mobileNumber: string | number): string;
