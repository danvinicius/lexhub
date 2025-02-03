import { FC, ReactNode, useContext, useState } from 'react';
import { UPDATE_SCENARIO } from '../../../../api';
import { UserContext } from '../../../../context/UserContext';
import api from '../../../../lib/axios';
import { ErrorResponse, ILexiconScenario } from '../../../../shared/interfaces';
import Close from '../../../../assets/icon/Close_Dark.svg';
import { AxiosError } from 'axios';
import Loading from '../../../helper/Loading';
import Form from '../../../forms/Form';
import Button from '../../../forms/button/Button';
import Error from '../../../helper/Error';
import './DeleteEpisode.scss';
import { ScenarioRequestDTO } from '../../../../shared/dto';

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
            await updateScenarioWithEpisodes({
                projectId: projectId || '',
                episodes: (scenario.episodes?.filter((episode) => episode != null) ?? [])
                    .filter((episode) => episode.id !== episodeId)
                    .map((episode) => {
                        if (!episode.nonSequentialEpisodes) {
                            const episodePosition = scenario.episodes.find((episode) => episode.id === episodeId)?.position;
                            return {
                                id: episode.id,
                                description: episode.description.content,
                                restriction: episode.restriction.content,
                                type: episode.type,
                                position: episodePosition && episode.position > episodePosition ? episode.position - 1 : episode.position,
                            };
                        }
                        return {
                            id: episode.id,
                            position: episode.position,
                            nonSequentialEpisodes: episode.nonSequentialEpisodes
                                ?.map((nse) => ({
                                    id: nse.id,
                                    description: nse.description.content,
                                    restriction: nse.restriction.content,
                                    type: nse.type,
                                }))
                                .filter((episode) => episode.id !== episodeId),
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
