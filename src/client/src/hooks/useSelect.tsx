import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';

interface UseSelectReturn {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    error: string | null;
    validate: () => boolean;
    onBlur: () => boolean;
}

export const useSelect = (type?: string): UseSelectReturn => {
	const [value, setValue] = useState<string>('');
	const [error, setError] = useState<string | null>('');

	const validate = (value: string): boolean => {
		if (!type) return true;
		if (value.length === 0) {
			setError('Selecione uma opção.');
			return false;
		}
		setError(null);
		return true;
	};

	const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setError('');
		setValue(event.target.value);
	};

	return {
		value,
		setValue,
		onChange,
		error,
		validate: () => validate(value),
		onBlur: () => validate(value),
	};
};
