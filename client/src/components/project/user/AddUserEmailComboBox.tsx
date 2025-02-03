import { Autocomplete, TextField } from '@mui/material';
import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import Error from '../../helper/Error';

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
    const [error, setError] = useState<string | null>(null);

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAddUserEmails = (newEmails: string[]) => {
        setEmails(newEmails);
        setCurrentEmail('');
    };

    return (
        <div className={`emails flex column gap-5 ${error ? 'error' : ''}`}>
            <Autocomplete
                multiple
                options={[]}
                freeSolo
                value={emails}
                onChange={(_, newValue) => {
                    const lastEmail = newValue[newValue.length - 1];
                    if (lastEmail && !isValidEmail(lastEmail)) {
                        setError('Por favor, insira um e-mail válido.');
                    } else {
                        setError(null);
                        handleAddUserEmails(newValue as string[]);
                    }
                }}
                onInputChange={(_, newInputValue) => {
                    setCurrentEmail(newInputValue);
                    setError(null);
                }}
                renderInput={(params) => (
                    <>
                        <TextField
                            {...params}
                            placeholder="Adicionar e-mail do usuário convidado ('Enter' para adicionar outro)"
                            error={!!error}
							className={error ? 'error' : ''}
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
                    </>
                )}
            />
            {error && <Error error={error} />}
        </div>
    );
};
