import { ChangeEvent, CSSProperties, FC, KeyboardEvent } from "react";
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
  style?: CSSProperties
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onInput: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  onBlur: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  onKeyDown?: (
    e: KeyboardEvent
  ) => void;
}

const Input: FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  label,
  error,
  style,
  onChange,
  onInput,
  onBlur,
  onKeyDown,
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
        style={style}
        onChange={onChange}
        onInput={onInput}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        required={required}
        autoFocus
      />
      <Error error={error}/>
    </label>
  );
};

export default Input;
