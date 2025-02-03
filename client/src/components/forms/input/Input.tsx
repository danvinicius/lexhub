import { ChangeEvent, CSSProperties, FC, KeyboardEvent } from 'react';
import './Input.scss';
import Error from '../../helper/Error';

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  required?: boolean;
  label: string;
  error?: string | null;
  style?: CSSProperties;
  autoFocus?: boolean;
  disabled?: boolean;
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
    e: KeyboardEvent<HTMLInputElement>
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
	autoFocus,
	disabled,
	onChange,
	onInput,
	onBlur,
	onKeyDown,
	required = false,
}: InputProps) => {
	return (
		<label htmlFor={name} className={`gap-25 flex column ${error ? 'error' : ''}`}>
			<p>
				{label}
			</p>
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
				autoFocus={autoFocus}
				disabled={disabled}
				className='w-100 border-radius-5 outline-none'
			/>
			<Error error={error}/>
		</label>
	);
};

export default Input;
