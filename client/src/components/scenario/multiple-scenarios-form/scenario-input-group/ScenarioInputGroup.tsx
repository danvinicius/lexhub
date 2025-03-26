import { useRef, useCallback, SetStateAction, Dispatch, FC } from 'react';
import { Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { IScenario } from '../../../../shared/interfaces';

import './ScenarioInputGroup.scss';

interface ScenarioInputGroupProps {
    scenarios: Omit<IScenario, 'project'>[];
    setScenarios: Dispatch<SetStateAction<Omit<IScenario, 'project'>[]>>;
}

const ScenarioInputGroup: FC<ScenarioInputGroupProps> = ({ scenarios, setScenarios }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScenarioChange = useCallback(
        (
            index: number,
            field: keyof IScenario,
            value: string | number | { title: string; }[]
        ) => {
            setScenarios((prevScenarios) =>
                prevScenarios.map((scenario, i) => {
                    if (i === index) {
                        return { ...scenario, [field]: value };
                    }
                    return scenario;
                })
            );
        },
        [setScenarios]
    );

    const handleAddScenario = () => {
        const newScenario: Omit<IScenario, 'project'> = {
            title: '',
        };
        setScenarios((prevScenarios) => [...prevScenarios, newScenario]);

        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    const handleDeleteScenario = useCallback(
        (index: number) => {
            setScenarios((prevScenarios) => {
                {
                    return prevScenarios
                        .filter((_, i) => i !== index)
                        .map((scenario) => ({
                            ...scenario,
                        }));
                }
            });
        },
        [setScenarios]
    );

    return (
        <div className="scenarios-form">
            <div className="scenarios-form-wrapper" ref={scrollRef}>
                {scenarios.map((scenario, index) => (
                    <div className="scenario-form-group" key={index}>
                        <TextField
                            placeholder="Insira o título"
                            multiline
                            fullWidth
                            value={scenario.title}
                            onChange={(e) => handleScenarioChange(index, 'title', e.target.value)}
                            InputProps={{
                                sx: {
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        border: '1px solid #ccc',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        border: '1px solid var(--primary-color)',
                                    },
                                },
                            }}
                        />
    
                        <div className="delete-scenario-input" onClick={() => handleDeleteScenario(index)}>
                            <DeleteIcon />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-5">
                <Button onClick={handleAddScenario} variant="outlined" color="primary">
                    Adicionar cenário
                </Button>
            </div>
        </div>
    );
};

export default ScenarioInputGroup;
