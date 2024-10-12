import { ChangeEvent, FC, KeyboardEvent } from "react";
import "./Textarea.scss";

interface TextareaProps {
  rows: number;
  placeholder: string;
  name: string;
  value: string;
  label: string;
  error?: string | null;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Textarea: FC<TextareaProps> = ({
  placeholder,
  name,
  value,
  label,
  error,
  rows,
  onChange,
  onInput,
  onKeyDown,
  required = false,
}: TextareaProps) => {
  return (
    <label htmlFor={name} className={error ? "error" : ""}>
      {label}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={onInput}
        onKeyDown={onKeyDown}
        required={required}
        rows={rows}
      ></textarea>
    </label>
  );
};

export default Textarea;
