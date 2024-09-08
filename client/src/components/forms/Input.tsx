import { ChangeEvent, FC } from "react";
import "./Input.scss";
import Error from "../helper/Error";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  label: string;
  required?: boolean;
  error?: string | null;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onInput: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  onBlur: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
}

const Input: FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  label,
  error,
  onChange,
  onInput,
  onBlur,
  required = false,
}: InputProps) => {
  return (
    <label htmlFor={name} className={error ? 'error' : ''}>
      {label}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={onInput}
        onBlur={onBlur}
        required={required}
      />
      <Error error={error}/>
    </label>
  );
};

export default Input;
