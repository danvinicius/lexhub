import { ChangeEvent, FC, KeyboardEvent } from 'react';
import './Textarea.scss';
import Error from '../../helper/Error';

interface TextareaProps {
  rows: number;
  placeholder: string;
  name: string;
  value: string;
  label: string;
  error?: string | null;
  required?: boolean;
  autoFocus?: boolean;
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
	autoFocus,
	onChange,
	onInput,
	onKeyDown,
	required = false,
}: TextareaProps) => {
	return (
		<label htmlFor={name} className={`flex gap-25 column ${error ? 'error' : ''}`}>
			<p>
				{label}
			</p>
			<textarea
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onInput={onInput}
				onKeyDown={onKeyDown}
				required={required}
				autoFocus={autoFocus}
				rows={rows}
				className='w-100 border-radius-5 outline-none'
			></textarea>
			<Error error={error}/>
		</label>
	);
};

export default Textarea;
