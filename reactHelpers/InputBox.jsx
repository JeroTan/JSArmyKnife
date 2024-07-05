/**
 * This component requires the following import
 * @InputField.jsx
 * @ParseData.js (soon to be typescript)
 */
import { capitalFirst, removeSpace } from "../../helpers/ParseData";
import InputField from "./InputField";

export default function({fieldName, error, className, children, onInput, outClass, displayName = undefined, ...attributes}){
    displayName = displayName ?? capitalFirst(fieldName);//If displayName is not provided then field name will be used instead
    fieldName = removeSpace(fieldName);

    return <>
        <div className={` ${outClass || "flex flex-wrap mb-3"} `}>
            <label htmlFor={fieldName}>{displayName}</label>
            <InputField name={fieldName} id={fieldName} className={className} onInput={onInput} error={error} {...attributes} />
            <small className="text-error">{error}</small>
            {children}
        </div>
    </>
}