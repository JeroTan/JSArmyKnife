/**
 * Welcome to Validation Helper. The purpose of this helper is to streamline validation of forms coming from client-side or server-side (Which you may extends this on another directory to add server-side validation.).
 *
 * Helper that you may use
 * For Extending
 * - ValidationErrorMessage
 * - Validation - The use case of extending this one is to separate general validation from server-side validation
 *
 * General Use
 * - Validation
 *      - ValidationResult
 * - validationFactory() - use for creating multiple instance of validation
 * - validationRunner() - use for multiple processing of validation
 */
interface VALIDATION_PROPS {
    input: any;
    field: string;
    display?: string | undefined;
}
interface REJECT_ARGUMENT {
    validator: string;
    args?: (string | any)[];
}
type VALIDATION_RESPONSE = (thisClass: any) => Promise<true | REJECT_ARGUMENT> | true | REJECT_ARGUMENT;
export interface VALIDATION_ERROR_MESSAGE {
    required: string;
    string: string;
    number: string;
    date: string;
    regex: string;
    notRegex: string;
    max: string;
    min: string;
    same: string;
    match: string;
    modInput: string;
    custom: string;
    [key: string | number]: string;
}
export declare const validationErrorMessage: VALIDATION_ERROR_MESSAGE;
export declare class Validation {
    props: VALIDATION_PROPS;
    action: VALIDATION_RESPONSE[];
    errorMessages: VALIDATION_ERROR_MESSAGE;
    constructor(input?: any, field?: string | undefined, display?: string | undefined);
    input<INPUT_TYPE>(d: INPUT_TYPE): this;
    field(d: string): this;
    display(d: string | undefined): this;
    getInput(): any;
    getField(): string;
    getDisplay(): string | undefined;
    protected validationStackPush(process: VALIDATION_RESPONSE): this;
    required(): this;
    string(): this;
    /**
     *
     * @param argument Turn the input value if string into a number for the next validation purposes.
     */
    number(argument?: boolean): this;
    date(argument?: boolean): this;
    regex(argument: string | RegExp | RegExpConstructor | (string | RegExp | RegExpConstructor)[]): this;
    notRegex(argument: string | RegExp | RegExpConstructor | (string | RegExp | RegExpConstructor)[]): this;
    max(argument: number): this;
    min(argument: number): this;
    same(argument: this): this;
    match(argument: Array<string | number> | string | number): this;
    modInput(argument: (input: any | string | number) => any | string | number): this;
    custom(argument: (props: VALIDATION_PROPS) => true | {
        validator: string;
        args?: Array<string | number>;
    } | Promise<true | {
        validator: string;
        args?: Array<string | number>;
    }>): this;
    messages(customMessages: Partial<VALIDATION_ERROR_MESSAGE>): this;
    validate(): ValidationResult;
    validate(raw: false): ValidationResult;
    validate(raw: true): Promise<string | true>;
}
export declare class ValidationResult {
    validationPromise: Promise<string | true | undefined>;
    constructor(validationPromise?: Promise<string | true | undefined> | undefined);
    addPromise(validationPromise: Promise<string | true | undefined>): this;
    success(callback: Function): this;
    fail(callback: (errorMessage: string) => void): this;
    promise(callback?: Function | undefined): Promise<string | true | undefined | void>;
}
export interface ValidationFactoryList<Type> {
    [key: string | number]: Type;
}
export declare function validationFactory<Type>(total: number | (string | number)[], ValidationClass: new (...args: any[]) => Type, ...args: any): ValidationFactoryList<Type>;
export interface ValidationRunnerList {
    [key: string | number]: ValidationResult | string | true;
}
export declare function validationRunner<Type>(validatorList: ValidationFactoryList<Type>, resultOnly?: boolean): Promise<ValidationRunnerList>;
export {};
