import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

interface ValidationRule {
  regex: RegExp;
  message: string;
}

const types: Record<string, ValidationRule> = {
	projectName: {
		regex: /^.{0,100}$/,
		message: 'O nome do projeto não pode ter mais de 100 caracteres'
	},
	projectDescription: {
		regex: /^.{0,1000}$/,
		message: 'A descrição do projeto não pode ter mais de 1000 caracteres'
	},
	email: {
		regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		message: 'Preencha um e-mail válido.',
	},
	password: {
		regex: /.{6,}/,
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
		if (value.length === 0) {
			setError('Preencha um valor.');
			return false;
		}
		if (type && types[type] && !types[type].regex.test(value)) {
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
