import { FC, FormEvent, KeyboardEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { CREATE_SCENARIO, UPDATE_SCENARIO } from '../../../api';
import api from '../../../lib/axios';
import useForm from '../../../hooks/useForm';
import { UserContext } from '../../../context/UserContext';
import { ProjectContext } from '../../../context/ProjectContext';
import { useToast } from '../../../context/ToastContext';
import { ErrorResponse, ILexiconScenario } from '../../../shared/interfaces';
import { ScenarioRequestDTO } from '../../../shared/dto';

import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import Button from '../../forms/button/Button';
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
    const { success, error } = useToast();

    const title = useForm('dontValidateTitle');
    const goal = useForm('');

    useEffect(() => {
        if (scenario) {
            title.setValue(scenario.title.content);
            goal.setValue(scenario.goal.content);
        }
    }, [scenario]);

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
        } catch (err) {
            const typedError = err as AxiosError<ErrorResponse>;
            error(typedError?.response?.data?.error || 'Erro inesperado');
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
            success('Cenário atualizado com sucesso');
        } catch (err) {
            const typedError = err as AxiosError<ErrorResponse>;
            error(typedError?.response?.data?.error || 'Erro inesperado');
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
                    placeholder='Insira o título do cenário'
                    label='Título'
                    autoFocus
                    {...title}
                    onInput={() => title.setError('')}
                    onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && e.preventDefault()}
                />
                <Textarea
                    name='goal'
                    placeholder='Insira o objetivo do cenário'
                    label='Objetivo'
                    rows={10}
                    {...goal}
                    onInput={() => goal.setError('')}
                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                />
            </Form>
            {loading ? <Loading /> : <Button theme='primary' text={scenario ? 'Salvar' : 'Criar'} onClick={handleSubmit} />}
        </section>
    );
};

export default ScenarioForm;
