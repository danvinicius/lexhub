import { useRef, useCallback, SetStateAction, Dispatch, FC } from 'react';
import { Button, TextField } from '@mui/material';
import './ScenarioInputGroup.scss';
import { IScenario } from '../../shared/interfaces';
import DeleteIcon from '@mui/icons-material/Delete';

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
            value: string | number | { title: string; goal: string; }[]
        ) => {
            setScenarios((prevScenarios) =>
                prevScenarios.map((scenario, i) => {
                    if (i === index) {
                        // Atualizando o cenário principal
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
            goal: '',
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
                    // Removendo um cenário principal
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
        <div className='scenarios-form'>
            <div className='scenarios-form-wrapper' ref={scrollRef}>
                {scenarios
                    .map((scenario, index) => (
                        <div className='scenario-form-group'>
                            <div className='scenario-title'>
                                <TextField
                                    label='Título'
                                    placeholder='Insira o título'
                                    multiline
                                    fullWidth
                                    value={scenario.title}
                                    onChange={(e) => handleScenarioChange(index, 'title', e.target.value)}
                                />
                            </div>

                            <div className='scenario-goal'>
                                <TextField
                                    label='Objetivo'
                                    placeholder='Insira o objetivo'
                                    rows={3}
                                    multiline
                                    fullWidth
                                    value={scenario.goal}
                                    onChange={(e) => handleScenarioChange(index, 'goal', e.target.value)}
                                />
                            </div>

                            <div className='delete-scenario' onClick={() => handleDeleteScenario(index)}>
                                <DeleteIcon />
                            </div>
                        </div>
                    ))}
            </div>
            <div className='flex gap-5'>
                <Button onClick={handleAddScenario} variant='outlined' color='primary'>
                    Adicionar cenário
                </Button>
            </div>
        </div>
    );
};

export default ScenarioInputGroup;
