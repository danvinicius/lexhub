import { Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { ProjectContext } from '../../../context/ProjectContext';

interface AddRestrictionComboBoxProps {
  scenarioId: string;
  restrictions: string[];
  setRestrictions: Dispatch<SetStateAction<string[]>>;
}

export const AddRestrictionComboBox: FC<AddRestrictionComboBoxProps> = ({
	scenarioId,
	restrictions,
	setRestrictions,
}: AddRestrictionComboBoxProps): ReactNode => {
	const projectContext = useContext(ProjectContext);

	const [localOptions, setLocalOptions] = useState(() => {
		return [
			...new Set(
				projectContext.project?.scenarios
					?.filter((scenario) => scenario.id != scenarioId)
					?.map((scenario) =>
						scenario.resources.map(
							(resource) =>
								resource.restrictions?.map(
									(restriction) => restriction.description.content
								) || []
						)
					)
					.flat()
					.concat(
						...projectContext.project.scenarios
							.filter((scenario) => scenario.id != scenarioId)
							.map((scenario) =>
								scenario.context.restrictions?.map(
									(restriction) => restriction.description.content
								)
							)
					)
			),
		].flat();
	});

	const handleAddRestriction = (newRestrictions: string[]) => {
		setRestrictions(newRestrictions);
	};

	return (
		<div className="restrictions">
			<Autocomplete
				multiple
				freeSolo
				options={localOptions}
				value={restrictions}
				onChange={(_, newValue) => {
					handleAddRestriction(newValue as string[]);
					const newOptions = newValue.filter(
						(value: string) => !localOptions.includes(value)
					);
					setLocalOptions([...localOptions, ...newOptions]);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder="Cadastre ou remova restrições ('Enter' para adicionar outro)"
						sx={{
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									border: '1px solid var(--secondary-text-color)',
								},
								'&:hover fieldset': {
									border: '1px solid var(--secondary-text-color)',
								},
								'&.Mui-focused fieldset': {
									border: '1px solid var(--primary-text-color)',
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
