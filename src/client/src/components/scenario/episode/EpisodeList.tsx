import { FormEvent, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, TableFooter } from '@mui/material';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ReorderIcon from '@mui/icons-material/Reorder';

import { UPDATE_SCENARIO } from '../../../api';
import api from '../../../lib/axios';
import { ErrorResponse, ILexiconScenario } from '../../../shared/interfaces';
import { useLexicon } from '../../../hooks/useLexicon';
import { StyledTableCell } from '../../../shared/table';
import { UserContext } from '../../../context/UserContext';
import { ProjectContext } from '../../../context/ProjectContext';

import DeleteIcon from '../../helper/icons/DeleteIcon';
import EditIcon from '../../helper/icons/EditIcon';
import { ScenarioRequestDTO } from '../../../shared/dto';

interface EpisodeListProps {
    episodes: ILexiconScenario['episodes'];
    isColaborador: boolean;
    handleOpenEpisodesModal: (episodeId?: string) => void;
    scenario: ILexiconScenario;
    resetScenarioInfo: () => void;
    handleOpenDeleteEpisodeModal: (episodeId: string) => void;
}

const EpisodesList = ({
    episodes,
    isColaborador,
    handleOpenEpisodesModal,
    handleOpenDeleteEpisodeModal,
    scenario,
    resetScenarioInfo,
}: EpisodeListProps) => {
    const { processContent } = useLexicon();
    const { isAuthenticated } = useContext(UserContext);
    const projectContext = useContext(ProjectContext);

    const [, setError] = useState('');
    const [, setLoading] = useState(false);

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

    const handleAddNonSequentialEpisodesGroup = (e: FormEvent) => {
        e.preventDefault();
        if (projectContext.project?.id) {
            const lastEpisode = episodes?.[episodes?.length - 1];
            const lastEpisodePosition = lastEpisode?.position || 0;
            updateScenarioWithEpisodes({
                episodes: [
                    ...(episodes?.filter((episode) => episode != null) ?? []).map((episode) => {
                        if (!episode.nonSequentialEpisodes) {
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
                            nonSequentialEpisodes: episode.nonSequentialEpisodes?.map((nse) => ({
                                id: nse.id,
                                description: nse.description.content,
                                restriction: nse.restriction.content,
                                type: nse.type,
                            })),
                        };
                    }),
                    {
                        id: uuidv4(),
                        position: lastEpisodePosition + 1,
                        nonSequentialEpisodes: [],
                    },
                ],
                projectId: projectContext.project.id,
            });
        }
    };

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [localEpisodes, setLocalEpisodes] = useState([...episodes]);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggedIndex(index);

        const img = new Image();
        img.src = '';
        event.dataTransfer.setDragImage(img, 0, 0);

        event.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
    };

    const handleDrop = (index: number) => {
        if (draggedIndex === null || draggedIndex === index) return;

        const reorderedEpisodes = [...localEpisodes];
        const [movedItem] = reorderedEpisodes.splice(draggedIndex, 1);
        reorderedEpisodes.splice(index, 0, movedItem);

        const updatedEpisodes = reorderedEpisodes.map((episode, idx) => ({
            ...episode,
            position: idx + 1,
        }));

        setLocalEpisodes(updatedEpisodes);
        setDraggedIndex(null);

        if (projectContext.project?.id) {
            updateScenarioWithEpisodes({
                episodes: updatedEpisodes.map((episode) => {
                    if (!episode.nonSequentialEpisodes) {
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
                        nonSequentialEpisodes: episode.nonSequentialEpisodes?.map((nse) => ({
                            id: nse.id,
                            description: nse.description.content,
                            restriction: nse.restriction.content,
                            type: nse.type,
                        })),
                    };
                }),
                projectId: projectContext.project.id,
            });
        }
    };

    useEffect(() => {
        setLocalEpisodes([...episodes]);
    }, [episodes]);

    return (
        <div className='flex column gap-1'>
            <div className='flex gap-1 align-center'>
                <div className='flex gap-5 border-none'>
                    <ChecklistIcon />
                    <h3>Episódios</h3>
                </div>
                <div className='scenario-episodes flex gap-1'>
                    {isColaborador && (
                        <>
                            <span className='add-episode pointer flex align-center gap-5' onClick={() => handleOpenEpisodesModal()}>
                                {<small>Cadastrar episódio</small>}
                            </span>
                            |
                            <span className='add-episode pointer flex align-center gap-5' onClick={handleAddNonSequentialEpisodesGroup}>
                                {<small>Cadastrar grupo de episódios</small>}
                            </span>
                        </>
                    )}
                </div>
            </div>
            {episodes.length > 0 && (
                <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                {isColaborador && (
                                    <StyledTableCell style={{ width: '0.25%', textAlign: 'center' }}>
                                    </StyledTableCell>
                                )}
                                <StyledTableCell>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem' }}>
                                        <FormatListNumberedOutlinedIcon />
                                        Posição
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem' }}>
                                        <StickyNote2OutlinedIcon />
                                        Descrição
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem' }}>
                                        <LockOutlinedIcon />
                                        Restrição
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem' }}>
                                        <LocalOfferOutlinedIcon />
                                        Tipo
                                    </div>
                                </StyledTableCell>
                                {isColaborador && (
                                    <StyledTableCell style={{ width: '100px', textAlign: 'center' }}>
                                    </StyledTableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {localEpisodes?.map((episode, index) => {
                                return (
                                    <TableRow
                                        key={episode.id}
                                        draggable={isColaborador}
                                        onDragStart={(e) => isColaborador && handleDragStart(e, index)}
                                        onDragOver={(e) => isColaborador && handleDragOver(e)}
                                        onDrop={() => isColaborador && handleDrop(index)}
                                        style={{ cursor: isColaborador ? 'grab' : 'default' }}
                                    >
                                        {isColaborador && (
                                            <StyledTableCell>
                                                <ReorderIcon />
                                            </StyledTableCell>
                                        )}
                                        <StyledTableCell style={{ width: '10%' }}>
                                            {episode.position} &nbsp;
                                            {episode?.nonSequentialEpisodes && <small>(grupo)</small>}
                                        </StyledTableCell>
                                        {episode?.nonSequentialEpisodes ? (
                                            <StyledTableCell colSpan={4} style={{ width: '45%' }}>
                                                <Table style={{ width: '100%' }}>
                                                    <TableBody>
                                                        {episode.nonSequentialEpisodes?.map((nse) => {
                                                            return (
                                                                <TableRow key={nse.id} style={{ border: 'none' }}>
                                                                    <StyledTableCell style={{ width: '50%' }}>
                                                                        {processContent(nse.description)}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell style={{ width: '40%' }}>
                                                                        {processContent(nse.restriction)}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell>{nse.type}</StyledTableCell>
                                                                    {isColaborador && (
                                                                        <StyledTableCell style={{ width: '10px', textAlign: 'center' }}>
                                                                            <div className='flex gap-2'>
                                                                                <EditIcon onClick={() => handleOpenEpisodesModal(nse.id)} />
                                                                                <DeleteIcon
                                                                                    onClick={() => handleOpenDeleteEpisodeModal(nse.id)}
                                                                                />
                                                                            </div>
                                                                        </StyledTableCell>
                                                                    )}
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                    <TableFooter>
                                                        <TableRow>
                                                            {isColaborador && (
                                                                <TableCell sx={{ border: 'none', fontSize: 16 }}>
                                                                    <div className='flex gap-2'>
                                                                        <span
                                                                            className='add-episode pointer flex align-center gap-5'
                                                                            onClick={() => handleOpenEpisodesModal(episode.id)}
                                                                        >
                                                                            {<small>Cadastrar episódio não sequencial</small>}
                                                                        </span>
                                                                        {!episode.nonSequentialEpisodes?.length && (
                                                                            <DeleteIcon
                                                                                onClick={() => handleOpenDeleteEpisodeModal(episode.id)}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </TableCell>
                                                            )}
                                                        </TableRow>
                                                    </TableFooter>
                                                </Table>
                                            </StyledTableCell>
                                        ) : (
                                            <StyledTableCell style={{ width: '45%' }}>
                                                {processContent(episode.description)}
                                            </StyledTableCell>
                                        )}
                                        {episode?.restriction && (
                                            <StyledTableCell style={{ width: '35%' }}>
                                                {processContent(episode.restriction)}
                                            </StyledTableCell>
                                        )}
                                        {episode?.type && (
                                            <>
                                                <StyledTableCell>{episode.type}</StyledTableCell>
                                                {isColaborador && (
                                                    <StyledTableCell style={{ width: '10px', textAlign: 'center' }}>
                                                        <div className='flex gap-2'>
                                                            <EditIcon onClick={() => handleOpenEpisodesModal(episode.id)} />
                                                            <DeleteIcon onClick={() => handleOpenDeleteEpisodeModal(episode.id)} />
                                                        </div>
                                                    </StyledTableCell>
                                                )}
                                            </>
                                        )}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default EpisodesList;
