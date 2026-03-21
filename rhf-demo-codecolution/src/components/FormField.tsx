interface FormFieldProps {
    label: string;
    id: string;
    error?: string;
    children: React.ReactNode;
}

const FormField = ({ label, id, error, children }: FormFieldProps) => {
    return (
        <div className="form-control">
            <label htmlFor={id}>{label}</label>
            {children}
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default FormField