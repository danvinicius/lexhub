import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Public from '@mui/icons-material/Public';

interface ProjectVisibilityFormProps {
    visibility: string;
    setVisibility: any;
}

export const ProjectVisibilityForm = ({ visibility, setVisibility }: ProjectVisibilityFormProps) => {
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVisibility(event.target.value);
    };

    return (
        <div className='flex column gap-125'>
            <FormControl sx={{ maxHeight: 'unset', gap: '0.5rem' }}>
                <FormLabel
                    id='demo-radio-buttons-group-label'
                    sx={{
                        color: 'var(--primary-text-color)', // Altera a cor ao focar
                        '&.Mui-focused': {
                            color: 'var(--primary-text-color)',
                        },
                    }}
                >
                    Visibilidade do projeto
                </FormLabel>
                <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    name='radio-buttons-group'
                    value={visibility} // Define o valor controlado
                    onChange={handleRadioChange}
                >
                    <FormControlLabel
                        value='private'
                        control={
                            <Radio
                                sx={{
                                    color: '#B0BEC5',
                                    '&.Mui-checked': {
                                        color: 'var(--primary-color)', // Cor roxa quando selecionado
                                    },
                                }}
                                icon={<LockIcon />}
                                checkedIcon={<LockIcon />}
                            />
                        }
                        label='Privado'
                    />
                    <FormControlLabel
                        value='public'
                        control={
                            <Radio
                                sx={{
                                    color: '#B0BEC5',
                                    '&.Mui-checked': {
                                        color: 'var(--primary-color)', // Cor roxa quando selecionado
                                    },
                                }}
                                icon={<Public />}
                                checkedIcon={<Public />}
                            />
                        }
                        label='Público'
                    />
                </RadioGroup>
            </FormControl>
        </div>
    );
};
