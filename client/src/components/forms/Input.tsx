import React from "react";
import "./Input.scss";
import Error from "../helper/Error";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  label: string;
  required?: boolean;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  label,
  error,
  onChange,
  required = false,
}: InputProps) => {
  return (
    <label htmlFor={name}>
      {label}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <Error error={error}/>
    </label>
  );
};

export default Input;
