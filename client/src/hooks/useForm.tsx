import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { useHelpers } from './useHelpers';

interface ValidationRule {
  validator: (value: string) => boolean;
  message: string;
}

const {getRawText} = useHelpers();

const types: Record<string, ValidationRule> = {
	projectName: {
		validator: (value: string) => {
			return /^.{0,100}$/.test(value);
		},
		message: 'O nome do projeto não pode conter mais de 100 caracteres'
	},
	projectDescription: {
		validator: (value: string) => {
			return getRawText(value).length <= 5000;
		},
		message: 'A descrição do projeto não pode conter mais de 5000 caracteres'
	},
	email: {
		validator: (value: string) => {
			return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
		},
		message: 'Preencha um e-mail válido.',
	},
	password: {
		validator: (value: string) => {
			return /.{6,}/.test(value);
		},
		message: 'A senha deve conter pelo menos 6 caracteres.',
	},
};

type UseFormReturn = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: string | null;
  validate: () => boolean;
  onBlur: () => boolean;
  setError: Dispatch<SetStateAction<string | null>>;
};

const useForm = (type?: string): UseFormReturn => {
	const [value, setValue] = useState<string>('');
	const [error, setError] = useState<string | null>('');

	const validate = (value: string): boolean => {
		if (!type) return true;
		if (value.trim().length === 0) {
			setError('Preencha um valor.');
			return false;
		}
		if (type && types[type] && !types[type].validator(value)) {
			setError(types[type].message);
			return false;
		}
		setError(null);
		return true;
	};

	const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setError('');
		setValue(event.target.value);
	};

	return {
		value,
		setValue,
		onChange,
		error,
		setError,
		validate: () => validate(value),
		onBlur: () => value.length > 0 && validate(value),
	};
};

export default useForm;
