import { Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { ProjectContext } from '../../../context/ProjectContext';

interface AddExceptionComboBoxProps {
  scenarioId?: string;
  exceptions: string[];
  setExceptions: Dispatch<SetStateAction<string[]>>;
  setCurrentException: Dispatch<SetStateAction<string>>;
}

export const AddExceptionComboBox: FC<AddExceptionComboBoxProps> = ({
	scenarioId,
	exceptions,
	setExceptions,
	setCurrentException,
}: AddExceptionComboBoxProps): ReactNode => {
	const projectContext = useContext(ProjectContext);

	const [localOptions, setLocalOptions] = useState<string[]>([]);

	useEffect(() => {
		const updatedOptions = [
			...new Set(
				projectContext.project?.scenarios
					?.filter((scenario) => scenario.id !== scenarioId)
					.map((scenario) =>
						scenario.exceptions
							.map((actor) => actor.description.content)
							.filter((exceptionDescription) => !exceptions.includes(exceptionDescription))
					)
					.flat()
			),
		];

		setLocalOptions(updatedOptions);
	}, [exceptions, scenarioId, projectContext.project?.scenarios]);

	const handleAddException = (newExceptions: string[]) => {
		setExceptions(newExceptions);
		setCurrentException('');
	};

	return (
		<div className="exceptions" style={{maxWidth: 452}}>
			<p>Exceções</p>
			<Autocomplete
				multiple
				freeSolo
				options={localOptions}
				value={exceptions}
				onChange={(_, newValue) => {
					handleAddException(newValue as string[]);
					const newOptions = newValue.filter(
						(value: string) => !localOptions.includes(value)
					);
					setLocalOptions([...localOptions, ...newOptions]);
				}}
				onInputChange={(_, newInputValue) => {
					setCurrentException(newInputValue);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder="Cadastre ou remova exceções ('Enter' para adicionar outro)"
						sx={{
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									border: '1px solid #ccc',
									color: 'var(--secondary-text-color)'
								},
								'&:hover fieldset': {
									border: '1px solid #ccc',
									color: 'var(--secondary-text-color)'
								},
								'&.Mui-focused fieldset': {
									border: '1px solid var(--primary-color)',
								},
								'& input': {
									padding: '0.5rem 1rem',
								},
							},
							'& .MuiInputLabel-outlined': {
								color: 'var(--primary-text-color)',
							},
							'& .MuiInputLabel-outlined.Mui-focused': {
								color: 'var(--primary-text-color)',
							},
						}}
					/>
				)}
			/>
		</div>
	);
};
