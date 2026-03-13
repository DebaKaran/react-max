import React from 'react'

type InputFieldProps = {
    label: string;
    id: string;
    name: string;
    type?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    error?: React.ReactNode;
};
const InputField = ({ label, id, name, type = "text", value, onChange, onBlur, error }: InputFieldProps) => {
    return (
        <div className="control no-margin">
            <label htmlFor={label}>Email</label>
            <input id={id} type={type} name={name} onChange={onChange} value={value} onBlur={onBlur} />
            <div className="control-error">
                {error}
            </div>
        </div>
    )
}

export default InputField