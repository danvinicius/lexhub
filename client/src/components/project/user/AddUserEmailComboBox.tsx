import { Autocomplete, TextField } from '@mui/material';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';

interface AddUserEmailComboBoxProps {
  symbolId?: string;
  emails: string[];
  setEmails: Dispatch<SetStateAction<string[]>>;
  setCurrentEmail: Dispatch<SetStateAction<string>>;
}

export const AddUserEmailComboBox: FC<AddUserEmailComboBoxProps> = ({
	emails,
	setEmails,
	setCurrentEmail,
}: AddUserEmailComboBoxProps): ReactNode => {

	const handleAddUserEmails = (newEmails: string[]) => {
		setEmails(newEmails);
		setCurrentEmail('');
	};

	return (
		<div className="emails">
			<Autocomplete
				multiple
				options={[]}
				freeSolo
				value={emails}
				onChange={(_, newValue) => {
					handleAddUserEmails(newValue as string[]);
				}}
				onInputChange={(_, newInputValue) => {
					setCurrentEmail(newInputValue);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder="Adicionar e-mail do usuário convidado ('Enter' para adicionar outro)"
						sx={{
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									border: '1px solid var(--secondary-text-color)',
								},
								'&:hover fieldset': {
									border: '1px solid var(--secondary-text-color)',
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
