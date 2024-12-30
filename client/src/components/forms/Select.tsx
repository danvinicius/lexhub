import { FC, ChangeEvent, CSSProperties } from 'react';
import './Select.scss';
import Error from '../helper/Error';

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
  style?: CSSProperties;
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
		<label htmlFor={name} className={`flex column gap-5 ${error ? 'error' : ''}`}>
			{label}
			<select
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				required={required}
				style={style}
				className='pointer w-100 border-radius-5 outline-none'
			>
				<option value="" disabled className='pointer'>
					{defaultOption}
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value} className='pointer'>
						{option.label}
					</option>
				))}
			</select>
			<Error error={error} />
		</label>
	);
};

export default Select;
