import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UPDATE_SCENARIO } from '../../../api';
import api from '../../../lib/axios';
import { ErrorResponse, ILexiconScenario } from '../../../shared/interfaces';
import Button from '../../forms/button/Button';
import { ProjectContext } from '../../../context/ProjectContext';
import { UserContext } from '../../../context/UserContext';
import Close from '../../../assets/icon/Close_Dark.svg';
import './ResourceForm.scss';
import { AxiosError } from 'axios';
import Form from '../../forms/Form';
import Input from '../../forms/input/Input';
import { AddRestrictionComboBox } from '../restriction/RestrictionComboBox';
import Loading from '../../helper/Loading';
import Error from '../../helper/Error';
import useForm from '../../../hooks/useForm';
import { ScenarioRequestDTO } from '../../../shared/dto';

interface ResourceFormProps {
    onClose: () => void;
    resetScenarioInfo: () => void;
    resourceId?: string;
    scenario: ILexiconScenario;
}

export const ResourceForm: FC<ResourceFormProps> = ({ onClose, scenario, resourceId, resetScenarioInfo }: ResourceFormProps): ReactNode => {
    const projectContext = useContext(ProjectContext);
    const nameEdit = useForm('dontValidateGeographicLocation');
    const [restrictions, setRestrictions] = useState<string[]>([]);
    const [currentRestriction, setCurrentRestriction] = useState('');

    useEffect(() => {
        if (resourceId) {
            const resource = scenario.resources?.find((resource) => resource.id === resourceId);
            nameEdit.setValue(resource?.name.content || '');
            let initialRestrictions;
            if (scenario.resources?.length) {
                initialRestrictions = [
                    ...new Set(
                        scenario.resources
                            .find((resource) => resource.id == resourceId)
                            ?.restrictions?.map((restriction) => restriction.description) || []
                    ),
                ];
                setRestrictions(initialRestrictions.map((restriction) => restriction.content));
            }
        }
    }, []);

    const { isAuthenticated } = useContext(UserContext || {});

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const updateScenarioWithResources = async (body: ScenarioRequestDTO) => {
        setLoading(true);
        if (projectContext.project?.id && scenario.id) {
            try {
                const { url, options } = UPDATE_SCENARIO(projectContext.project.id, scenario.id, isAuthenticated()?.token || '');
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

    const handleSubmit = async () => {
        if (scenario.id) {
            await updateScenarioWithResources({
                projectId: projectContext.project?.id || '',
                resources: [
                    ...(scenario.resources?.filter((resource) => resource != null) ?? []).map((resource) => {
                        // Caso seja edição, substitua o recurso correspondente
                        if (resourceId && resource.id === resourceId) {
                            return {
                                id: resourceId,
                                name: nameEdit.value,
                                restrictions: [...restrictions, currentRestriction.length ? currentRestriction : null]
                                    .filter((restriction) => restriction != null)
                                    .map((restriction) => ({
                                        description: restriction,
                                    })),
                            };
                        }
                        // Caso contrário, mantenha o recurso existente
                        return {
                            id: resource.id,
                            name: resource.name.content,
                            restrictions: resource.restrictions?.map((restriction) => ({
                                description: restriction.description.content,
                            })),
                        };
                    }),
                    // Adicione o novo recurso apenas se não for edição (não houver resourceId)
                    ...(resourceId
                        ? []
                        : [
                              {
                                  id: uuidv4(),
                                  name: nameEdit.value,
                                  restrictions: [...restrictions, currentRestriction.length ? currentRestriction : null]
                                      .filter((restriction) => restriction != null)
                                      .map((restriction) => ({
                                          description: restriction,
                                      })),
                              },
                          ]),
                ],
            });
        }
    };

    return (
        <section className='resource-form flex column gap-125'>
            <div className='resource-form-header'>
                <h2>{resourceId ? 'Atualizar' : 'Novo'} recurso</h2>
                <img src={Close} alt="Ícone 'X' popup" title="Ícone 'X' popup" onClick={onClose} />
            </div>
            <Form>
                <Input
                    type='text'
                    name='name'
                    placeholder='Nome do recurso'
                    label='Nome do recurso'
                    {...nameEdit}
                    onInput={() => setError('')}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && e.preventDefault();
                    }}
                />
                <div className='flex column gap-25 combobox'>
                    <p>Restrições</p>
                    <AddRestrictionComboBox
                        scenarioId={scenario.id || ''}
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
