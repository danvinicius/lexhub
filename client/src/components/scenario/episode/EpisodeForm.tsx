import { FC, ReactNode, useContext, useState, KeyboardEvent, FormEvent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AxiosError } from 'axios';

import { UPDATE_SCENARIO } from '../../../api';
import api from '../../../lib/axios';
import { ErrorResponse, ILexiconScenario } from '../../../shared/interfaces';
import { UserContext } from '../../../context/UserContext';
import { ProjectContext } from '../../../context/ProjectContext';
import useForm from '../../../hooks/useForm';
import { useSelect } from '../../../hooks/useSelect';
import { ScenarioRequestDTO } from '../../../shared/dto';

import Button from '../../forms/button/Button';
import Close from '../../../assets/icon/Close_Dark.svg';
import Error from '../../helper/Error';
import Form from '../../forms/Form';
import Input from '../../forms/input/Input';
import Select from '../../forms/select/Select';
import Loading from '../../helper/Loading';
import Textarea from '../../forms/textarea/Textarea';
import './EpisodeForm.scss';

interface EpisodesFormProps {
    onClose: () => void;
    scenario: ILexiconScenario;
    resetScenarioInfo: () => void;
    nonSequentialEpisodesGroupId?: string;
    updatingEpisodeId?: string;
}

export const EpisodesForm: FC<EpisodesFormProps> = ({
    onClose,
    scenario,
    resetScenarioInfo,
    nonSequentialEpisodesGroupId,
    updatingEpisodeId,
}: EpisodesFormProps): ReactNode => {
    const projectContext = useContext(ProjectContext);
    const { isAuthenticated } = useContext(UserContext);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const description = useForm('dontValidateDescription');
    const restriction = useForm('');
    const type = useSelect('dontValidateType');

    const updateScenarioWithEpisodes = async (body: ScenarioRequestDTO) => {
        setLoading(true);
        if (projectContext.project?.id) {
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (description.validate() && restriction.validate() && type.validate()) {
            if (projectContext.project?.id) {
                const lastEpisode = scenario.episodes?.[scenario.episodes?.length - 1];
                const lastEpisodePosition = lastEpisode?.position || 0;
                let updtedEpisodes = [
                    ...(scenario.episodes?.filter((episode) => episode != null) ?? []).map((episode) => {
                        if (!episode.nonSequentialEpisodes) {
                            if (updatingEpisodeId && episode.id === updatingEpisodeId) {
                                return {
                                    id: episode.id,
                                    description: description.value,
                                    restriction: restriction.value,
                                    type: type.value,
                                    position: episode.position,
                                };
                            }
                            return {
                                id: episode.id,
                                description: episode.description.content,
                                restriction: episode.restriction.content,
                                type: episode.type,
                                position: episode.position,
                            };
                        }
                        return {
                            id: episode.id,
                            position: episode.position,
                            nonSequentialEpisodes: episode.nonSequentialEpisodes?.map((nse) => {
                                if (updatingEpisodeId && nse.id === updatingEpisodeId) {
                                    return {
                                        id: nse.id,
                                        description: description.value,
                                        restriction: restriction.value,
                                        type: type.value,
                                    }
                                }
                                return {
                                    id: nse.id,
                                    description: nse.description.content,
                                    restriction: nse.restriction.content,
                                    type: nse.type,
                                }
                            }),
                        };
                    }),
                ];

                if (nonSequentialEpisodesGroupId) {
                    updtedEpisodes
                        .find((episode) => episode.id === nonSequentialEpisodesGroupId)
                        ?.nonSequentialEpisodes?.push({
                            id: uuidv4(),
                            description: description.value,
                            restriction: restriction.value,
                            type: type.value,
                        });
                } else {
                    updtedEpisodes = [
                        ...updtedEpisodes,
                        {
                            id: uuidv4(),
                            description: description.value,
                            restriction: restriction.value,
                            type: type.value,
                            position: lastEpisodePosition + 1,
                        },
                    ];
                }

                updateScenarioWithEpisodes({
                    episodes: updtedEpisodes,
                    projectId: projectContext.project.id,
                });
            }
        }
    };

    useEffect(() => {
        if (updatingEpisodeId && scenario.episodes) {
            const episodeToEdit = scenario.episodes.find(episode => 
                episode.id === updatingEpisodeId
            );

            if (episodeToEdit && !episodeToEdit.nonSequentialEpisodes) {
                description.setValue(episodeToEdit.description.content);
                restriction.setValue(episodeToEdit.restriction.content);
                type.setValue(episodeToEdit.type);
            } else {
                scenario.episodes.forEach(episode => {
                    if (episode.nonSequentialEpisodes) {
                        const nonSeqEpisode = episode.nonSequentialEpisodes.find(
                            nse => nse.id === updatingEpisodeId
                        );
                        if (nonSeqEpisode) {
                            description.setValue(nonSeqEpisode.description.content);
                            restriction.setValue(nonSeqEpisode.restriction.content);
                            type.setValue(nonSeqEpisode.type);
                        }
                    }
                });
            }
        }
    }, [updatingEpisodeId, scenario.episodes]);

    return (
        <section className='create-episode-form flex column gap-125'>
            <div className='create-episode-form-header'>
                <h2>Novo episódio</h2>
                <img src={Close} alt="Ícone 'X' popup" title="Ícone 'X' popup" onClick={onClose} />
            </div>
            <Form>
                <Textarea
                    autoFocus
                    rows={5}
                    name='description'
                    placeholder='Digite a descrição do episódio'
                    label='Descrição'
                    {...description}
                    onInput={() => setError('')}
                    onKeyDown={(e: KeyboardEvent) => {
                        e.key === 'Enter' && e.preventDefault();
                    }}
                />
                <Input
                    type='text'
                    name='restriction'
                    placeholder='Digite a restrição do episódio'
                    label='Restrição'
                    {...restriction}
                    onInput={() => setError('')}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && e.preventDefault();
                    }}
                />
                <Select
                    name='type'
                    label='Tipo'
                    options={[
                        {
                            value: 'Condicional',
                            label: 'Condicional',
                        },
                        {
                            value: 'Opcional',
                            label: 'Opcional',
                        },
                    ]}
                    {...type}
                ></Select>
                {loading ? <Loading /> : <Button theme='primary' text='Criar' onClick={handleSubmit} />}
                <Error error={error} />
            </Form>
        </section>
    );
};
