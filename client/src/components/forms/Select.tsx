import { FC, ChangeEvent } from "react";
import "./Select.scss";
import Error from "../helper/Error";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  label?: string;
  options: Option[];
  value: string;
  error?: string | null;
  required?: boolean;
  style?: React.CSSProperties;
  defaultOption?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = ({
  name,
  label,
  options,
  value,
  error,
  style,
  defaultOption = 'Selecione uma opção',
  onChange,
  onBlur,
  required = false,
}: SelectProps) => {
  return (
    <label htmlFor={name} className={error ? "error" : ""}>
      {label}
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        style={style}
      >
        <option value="" disabled>
          {defaultOption}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Error error={error} />
    </label>
  );
};

export default Select;
