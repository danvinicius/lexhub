import { FC, FormEvent, KeyboardEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { CREATE_SCENARIO, UPDATE_SCENARIO } from '../../../api';
import api from '../../../lib/axios';
import useForm from '../../../hooks/useForm';
import { UserContext } from '../../../context/UserContext';
import { ProjectContext } from '../../../context/ProjectContext';
import { ErrorResponse, ILexiconScenario } from '../../../shared/interfaces';
import { ScenarioRequestDTO } from '../../../shared/dto';

import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import Button from '../../forms/button/Button';
import Error from '../../helper/Error';
import Textarea from '../../forms/textarea/Textarea';
import Close from '../../../assets/icon/Close_Dark.svg';
import './ScenarioForm.scss';

interface ScenarioFormProps {
    onClose: () => void;
    resetInfo: () => void;
    scenario?: ILexiconScenario;
}

const ScenarioForm: FC<ScenarioFormProps> = ({ onClose, resetInfo, scenario }: ScenarioFormProps): ReactNode => {
    const { isAuthenticated } = useContext(UserContext) || {};
    const projectContext = useContext(ProjectContext);

    const title = useForm('dontValidateTitle');
    const goal = useForm('');

    useEffect(() => {
        if (scenario) {
            title.setValue(scenario.title.content);
            goal.setValue(scenario.goal.content);
        }
    }, [scenario]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (title.validate() && goal.validate()) {
            const body: ScenarioRequestDTO = {
                title: title.value,
                goal: goal.value,
                projectId: projectContext.project?.id || '',
            };

            if (scenario) {
                await updateScenario(body);
            } else {
                await createScenario(body);
            }
        }
    };

    const createScenario = async (body: ScenarioRequestDTO) => {
        setLoading(true);
        try {
            const { url, options } = CREATE_SCENARIO(projectContext.project?.id || '', isAuthenticated()?.token || '');
            await api[options.method](url, body, options);
            resetInfo();
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            setError(err?.response?.data?.error || 'Erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    const updateScenario = async (body: ScenarioRequestDTO) => {
        setLoading(true);
        try {
            const { url, options } = UPDATE_SCENARIO(projectContext.project?.id || '', scenario?.id || '', isAuthenticated()?.token || '');
            await api[options.method](url, body, options);
            resetInfo();
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            setError(err?.response?.data?.error || 'Erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='scenario-form flex column gap-125'>
            <div className='scenario-form-header'>
                <h2>{scenario ? 'Editar cenário' : 'Novo cenário'}</h2>
                <img src={Close} alt="Ícone 'X' popup" title="Ícone 'X' popup" onClick={onClose} />
            </div>
            <Form>
                <Input
                    type='text'
                    name='title'
                    placeholder='Logar no sistema'
                    label='Título'
                    autoFocus
                    {...title}
                    onInput={() => setError('')}
                    onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && e.preventDefault()}
                />
                <Textarea
                    name='goal'
                    placeholder='Permitir ao usuário se identificar'
                    label='Objetivo'
                    rows={10}
                    {...goal}
                    onInput={() => setError('')}
                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                />
            </Form>
            {loading ? <Loading /> : <Button theme='primary' text={scenario ? 'Salvar' : 'Criar'} onClick={handleSubmit} />}
            <Error error={error} />
        </section>
    );
};

export default ScenarioForm;
