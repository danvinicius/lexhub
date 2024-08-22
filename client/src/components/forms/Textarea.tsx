import React from "react";
import "./Textarea.scss";

interface TextareaProps {
  placeholder: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  name,
  value,
  onChange,
  required = false,
}: TextareaProps) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      rows={10}
    ></textarea>
  );
};

export default Textarea;
