import { Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { ProjectContext } from '../../../context/ProjectContext';

interface AddActorComboBoxProps {
  scenarioId?: string;
  actors: string[];
  setActors: Dispatch<SetStateAction<string[]>>;
  setCurrentActor: Dispatch<SetStateAction<string>>;
}

export const AddActorComboBox: FC<AddActorComboBoxProps> = ({
	scenarioId,
	actors,
	setActors,
	setCurrentActor,
}: AddActorComboBoxProps): ReactNode => {
	const projectContext = useContext(ProjectContext);

	const [localOptions, setLocalOptions] = useState<string[]>([]);

	useEffect(() => {
		const updatedOptions = [
			...new Set(
				projectContext.project?.scenarios
					?.filter((scenario) => scenario.id !== scenarioId)
					.map((scenario) =>
						scenario.actors
							.map((actor) => actor.name.content)
							.filter((actorName) => !actors.includes(actorName))
					)
					.flat()
			),
		];

		setLocalOptions(updatedOptions);
	}, [actors, scenarioId, projectContext.project?.scenarios]);

	const handleAddActor = (newActors: string[]) => {
		setActors(newActors);
		setCurrentActor('');
	};

	return (
		<div className="actors flex column gap-25">
			<p>Atores</p>
			<Autocomplete
				multiple
				freeSolo
				options={localOptions}
				value={actors}
				onChange={(_, newValue) => {
					handleAddActor(newValue as string[]);
					const newOptions = newValue.filter(
						(value: string) => !localOptions.includes(value)
					);
					setLocalOptions([...localOptions, ...newOptions]);
				}}
				onInputChange={(_, newInputValue) => {
					setCurrentActor(newInputValue);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder="Cadastre ou remova atores ('Enter' para adicionar outro)"
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
