import { FC, ReactNode, useContext, useState } from 'react';
import { AxiosError } from 'axios';

import api from '../../../../lib/axios';
import { UPDATE_SCENARIO } from '../../../../api';
import { UserContext } from '../../../../context/UserContext';
import { ErrorResponse, ILexiconScenario } from '../../../../shared/interfaces';
import { ScenarioRequestDTO } from '../../../../shared/dto';

import Close from '../../../../assets/icon/Close_Dark.svg';
import Loading from '../../../helper/Loading';
import Form from '../../../forms/Form';
import Button from '../../../forms/button/Button';
import Error from '../../../helper/Error';
import './DeleteEpisode.scss';

interface DeleteEpisodeProps {
    scenario: ILexiconScenario;
    projectId: string;
    onClose: () => void;
    resetScenarioInfo: () => void;
    episodeId: string;
}

const DeleteEpisode: FC<DeleteEpisodeProps> = ({
    projectId,
    episodeId,
    scenario,
    onClose,
    resetScenarioInfo,
}: DeleteEpisodeProps): ReactNode => {
    const { isAuthenticated } = useContext(UserContext) || {};

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const updateScenarioWithEpisodes = async (body: ScenarioRequestDTO) => {
        setLoading(true);
        if (projectId) {
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

    const handleDeleteEpisode = async (episodeId: string) => {
        if (scenario) {
            const deletedEpisodeInfo = scenario.episodes.find((episode) => episode.id === episodeId);
            const deletedEpisodePosition = deletedEpisodeInfo?.position;
            const isInNonSequentialGroup = scenario.episodes.some(
                ep => ep.nonSequentialEpisodes?.some(nse => nse.id === episodeId)
            );
    
            await updateScenarioWithEpisodes({
                projectId: projectId || '',
                episodes: (scenario.episodes?.filter((episode) => episode != null) ?? [])
                    .filter((episode) => episode.id !== episodeId)
                    .map((episode) => {
                        if (!episode.nonSequentialEpisodes) {
                            return {
                                id: episode.id,
                                description: episode.description.content,
                                restriction: episode.restriction.content,
                                type: episode.type,
                                position: !isInNonSequentialGroup && deletedEpisodePosition && 
                                         episode.position > deletedEpisodePosition 
                                        ? episode.position - 1 
                                        : episode.position,
                            };
                        }
                        return {
                            id: episode.id,
                            position: !isInNonSequentialGroup && deletedEpisodePosition && 
                                     episode.position > deletedEpisodePosition 
                                    ? episode.position - 1 
                                    : episode.position,
                            nonSequentialEpisodes: episode.nonSequentialEpisodes
                                ?.map((nse) => ({
                                    id: nse.id,
                                    description: nse.description.content,
                                    restriction: nse.restriction.content,
                                    type: nse.type,
                                }))
                                .filter((nse) => nse.id !== episodeId),
                        };
                    }),
            });
        }
    };

    return (
        <section className='delete-episode flex column gap-125'>
            <div className='delete-episode-header'>
                <h2>Tem certeza que deseja excluir este episódio?</h2>
                <img src={Close} alt="Ícone 'X' popup" title="Ícone 'X' popup" onClick={onClose} />
            </div>
            <br />
            <Form style={{ gap: '.5rem', userSelect: 'none' }}>
                {loading ? <Loading /> : <Button theme='danger' text='Excluir' onClick={() => handleDeleteEpisode(episodeId)} />}
                <Error error={error} />
            </Form>
        </section>
    );
};

export default DeleteEpisode;
