import { ChangeEvent, FC } from "react";
import "./Textarea.scss";

interface TextareaProps {
  placeholder: string;
  name: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
}

const Textarea: FC<TextareaProps> = ({
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
