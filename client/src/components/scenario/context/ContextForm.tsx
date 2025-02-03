import { AxiosError } from 'axios';
import { FC, ReactNode, useEffect, useContext, useState, FormEvent } from 'react';
import { UPDATE_SCENARIO } from '../../../api';
import { UserContext } from '../../../context/UserContext';
import useForm from '../../../hooks/useForm';
import api from '../../../lib/axios';
import { ILexiconScenario, ErrorResponse } from '../../../shared/interfaces';
import Textarea from '../../forms/textarea/Textarea';
import Loading from '../../helper/Loading';
import Close from '../../../assets/icon/Close_Dark.svg';
import Form from '../../forms/Form';
import Input from '../../forms/input/Input';
import Error from '../../helper/Error';
import Button from '../../forms/button/Button';
import './ContextForm.scss';
import { AddRestrictionComboBox } from '../restriction/RestrictionComboBox';
import { ScenarioRequestDTO } from '../../../shared/dto';

interface ContextFormProps {
    scenario: ILexiconScenario;
    onClose: () => void;
    resetScenarioInfo: () => void;
    projectId: string;
}

const ContextForm: FC<ContextFormProps> = ({ scenario, onClose, projectId, resetScenarioInfo }: ContextFormProps): ReactNode => {
    const geographicLocationEdit = useForm('dontValidateGeographicLocation');
    const temporalLocationEdit = useForm('dontValidateTemporalLocation');
    const preConditionEdit = useForm('dontValidatePreCondition');
    const [restrictions, setRestrictions] = useState<string[]>([]);
    const [currentRestriction, setCurrentRestriction] = useState('');

    useEffect(() => {
        geographicLocationEdit.setValue(scenario.context?.geographicLocation.content || '');
        temporalLocationEdit.setValue(scenario.context?.temporalLocation.content || '');
        preConditionEdit.setValue(scenario.context?.preCondition.content || '');

        if (scenario) {
            const initialRestrictions = [
                ...new Set(scenario.context.restrictions?.map((restriction) => restriction.description.content) || []),
            ];
            setRestrictions(initialRestrictions);
        }
    }, []);

    const { isAuthenticated } = useContext(UserContext) || {};

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const updateScenario = async (body: ScenarioRequestDTO) => {
        if (projectId && scenario?.id) {
            setLoading(true);
            try {
                const { url, options } = UPDATE_SCENARIO(projectId, scenario.id, isAuthenticated()?.token || '');
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        updateScenario({
            context: {
                geographicLocation: geographicLocationEdit.value,
                temporalLocation: temporalLocationEdit.value,
                preCondition: preConditionEdit.value,
                restrictions: [...restrictions, currentRestriction.length ? currentRestriction : null]
                    .filter((restriction) => restriction != null)
                    .map((restriction) => ({
                        description: restriction,
                    })),
            },
            projectId,
        });
    };

    return (
        <section className='context-form flex column gap-125'>
            <div className='context-form-header'>
                <h2>Gerenciar contexto</h2>
                <img src={Close} alt="Ícone 'X' popup" title="Ícone 'X' popup" onClick={onClose} />
            </div>
            <Form>
                <Input
                    type='text'
                    name='geographicLocation'
                    placeholder='Um lugar qualquer'
                    label='Localização geográfica'
                    {...geographicLocationEdit}
                    onInput={() => setError('')}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && e.preventDefault();
                    }}
                />
                <Input
                    type='text'
                    name='temporalLocation'
                    placeholder='Um dia qualquer'
                    label='Localização temporal'
                    {...temporalLocationEdit}
                    onInput={() => setError('')}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && e.preventDefault();
                    }}
                />
                <Textarea
                    name='preCondition'
                    placeholder='Para isso deve-se...'
                    label='Pré-condição'
                    onInput={() => setError('')}
                    rows={5}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && e.preventDefault();
                    }}
                    {...preConditionEdit}
                />
                <div className='flex column'>
                    <p>Restrições</p>
                    <AddRestrictionComboBox
                        scenarioId={scenario.id}
                        restrictions={restrictions}
                        setRestrictions={setRestrictions}
                        setCurrentRestriction={setCurrentRestriction}
                    />
                </div>
            </Form>
            {loading ? <Loading /> : <Button theme='primary' text='Salvar' onClick={handleSubmit} />}
            <Error error={error} />
        </section>
    );
};

export default ContextForm;
