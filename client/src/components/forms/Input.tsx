import React from "react";
import "./Input.scss";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  label: string;
  required?: boolean;
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
    </label>
  );
};

export default Input;
