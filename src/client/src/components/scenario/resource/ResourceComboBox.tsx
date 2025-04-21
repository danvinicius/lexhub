import { Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { ProjectContext } from '../../../context/ProjectContext';

interface AddResourceComboBoxProps {
  scenarioId: string;
  resources: string[];
  setResources: Dispatch<SetStateAction<string[]>>;
  setCurrentResource: Dispatch<SetStateAction<string>>;
}

export const AddResourceComboBox: FC<AddResourceComboBoxProps> = ({
	scenarioId,
	resources,
	setResources,
	setCurrentResource,
}: AddResourceComboBoxProps): ReactNode => {
	const projectContext = useContext(ProjectContext);

	const [localOptions, setLocalOptions] = useState<string[]>([]);

	useEffect(() => {
		const updatedOptions = [
			...new Set(
				projectContext.project?.scenarios
					?.filter((scenario) => scenario.id !== scenarioId)
					.map((scenario) =>
						scenario.resources
							.map((resource) => resource.name.content)
							.filter((exceptionName) => !resources.includes(exceptionName))
					)
					.flat()
			),
		];

		setLocalOptions(updatedOptions);
	}, [resources, scenarioId, projectContext.project?.scenarios]);

	const handleAddResource = (newResources: string[]) => {
		setResources(newResources);
		setCurrentResource('');
	};

	return (
		<div className="resources">
			<Autocomplete
				multiple
				freeSolo
				options={localOptions}
				value={resources}
				onChange={(_, newValue) => {
					handleAddResource(newValue as string[]);
					const newOptions = newValue.filter(
						(value: string) => !localOptions.includes(value)
					);
					setLocalOptions([...localOptions, ...newOptions]);
				}}
				onInputChange={(_, newInputValue) => {
					setCurrentResource(newInputValue);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Recursos"
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
								color: 'var(--primary-color)',
							},
							'& .MuiInputLabel-outlined.Mui-focused': {
								color: 'var(--primary-color)',
							},
						}}
					/>
				)}
			/>
		</div>
	);
};
