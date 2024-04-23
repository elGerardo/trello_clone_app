export default function Input({
    id,
    disabled = false,
    required = false,
    className = "",
    defaultValue = "",
    value,
    inputRef,
    placeholder = "",
    type = "text",
    label
  }: {
    id?: string
    type?: "text" | "number" | "password";
    disabled?: boolean;
    required?: boolean;
    value?: string;
    defaultValue?: string;
    className?: string;
    inputRef?: any;
    placeholder?: string;
    label?: string
  }) {
    return (
      <>
      {label != null && <label>{label}</label>}
      <input
        {...(id !== undefined && { id })}
        {...(value !== undefined && { value })}
        {...(inputRef !== undefined && { ref: inputRef })}
        placeholder={placeholder}
        className={`${className}`}
        defaultValue={defaultValue}
        type={type}
        disabled={disabled}
        required={required}
      />
      </>
    );
  }
  