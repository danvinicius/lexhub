import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UPDATE_SCENARIO } from '../../../api';
import api from '../../../lib/axios';
import { ErrorResponse } from '../../../shared/interfaces';
import Button from '../../forms/button/Button';
import { ProjectContext } from '../../../context/ProjectContext';
import { UserContext } from '../../../context/UserContext';
import Close from '../../../assets/icon/Close_Dark.svg';
import './ExceptionForm.scss';
import { AxiosError } from 'axios';
import { AddExceptionComboBox } from './ExceptionComboBox';
import { ScenarioRequestDTO } from '../../../shared/dto';

interface ExceptionsFormProps {
    onClose: () => void;
    scenarioId: string;
    resetScenarioInfo: () => void;
}

export const ExceptionsForm: FC<ExceptionsFormProps> = ({ onClose, scenarioId, resetScenarioInfo }: ExceptionsFormProps): ReactNode => {
    const projectContext = useContext(ProjectContext);
    const [exceptions, setExceptions] = useState<string[]>([]);

    const [currentException, setCurrentException] = useState('');

    useEffect(() => {
        if (projectContext?.project && scenarioId) {
            const scenario = projectContext.project.scenarios?.find((scenario) => scenario.id === scenarioId);
            if (scenario) {
                const initialExceptions = scenario.exceptions.map((exception) => exception.description.content);
                setExceptions(initialExceptions);
            }
        }
    }, [projectContext, scenarioId]);

    const { isAuthenticated } = useContext(UserContext || {});

    const [, setError] = useState('');
    const [, setLoading] = useState(false);

    const updateScenarioWithExceptions = async (body: ScenarioRequestDTO) => {
        setLoading(true);
        if (projectContext.project?.id) {
            try {
                const { url, options } = UPDATE_SCENARIO(projectContext.project.id, scenarioId, isAuthenticated()?.token || '');
                await api[options.method](url, body, options);
                resetScenarioInfo();
            } catch (error) {
                const err = error as AxiosError<ErrorResponse>;
                setError(err?.response?.data?.error || 'Erro inesperado');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAddExceptions = async () => {
        await updateScenarioWithExceptions({
            projectId: projectContext.project?.id || '',
            exceptions: [...exceptions, currentException.length ? currentException : null]
                .filter((exception) => exception != null)
                .map((exception) => ({
                    id: uuidv4(),
                    description: exception,
                })),
        });
    };
    return (
        <section className='create-exceptions-form flex column gap-125'>
            <div className='create-exceptions-form-header'>
                <h2>Gerenciar exceções</h2>
                <img src={Close} alt="Ícone 'X' popup" title="Ícone 'X' popup" onClick={onClose} />
            </div>
            <AddExceptionComboBox
                exceptions={exceptions}
                setExceptions={setExceptions}
                scenarioId={scenarioId}
                setCurrentException={setCurrentException}
            />
            <Button text='Salvar' theme='primary' onClick={handleAddExceptions} />
        </section>
    );
};
