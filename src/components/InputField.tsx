import {useState} from "react";

function InputField(props: {name: string, type?: string, label?: string, min?: string, validate?: Function, callback?: Function, pattern?: string, required?: boolean, defaultValue?: any}) {
    const [name, setName] = useState(props.name);
    const [type, setType] = useState(props.type || 'text');
    const [label, setLabel] = useState(props.label || 'label');
    const [pattern, setPattern] = useState(props.pattern);
    const [validate, setValidate] = useState(props.validate);
    const callback = props.callback;
    const [required, setRequired] = useState(props.required || false);
    const [defaultValue, setDefaultValue] = useState(props.defaultValue);

    const [value, setValue] = useState(defaultValue);
    const handleOnChange = (e: { target: { value: string; }; }) => {
        let value: any = e.target.value;
        let [isValid, val] = (typeof validate !== 'function') ? [true, value] : validate(value);
        if (isValid)
            setValue(val);
        if (callback)
            callback(name, value);
    }

    return (
        <label className="inputField">
            <div className="inputField_label">{label}</div>
            <input className="inputField_value" type={type} onChange={handleOnChange} value={value} pattern={pattern} required={required}></input>
        </label>
    )
}
export default InputField;