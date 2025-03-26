import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';

import { ILexiconScenario, IUserRole } from '../../shared/interfaces';
import { useHelpers } from '../../hooks/useHelpers';
import { useLexicon } from '../../hooks/useLexicon';
import { ProjectContext } from '../../context/ProjectContext';
import { UserContext } from '../../context/UserContext';

import { ResourceForm } from './resource/ResourceForm';
import DeleteScenarioForm from './delete-scenario/DeleteScenario';
import { EpisodesForm } from './episode/EpisodeForm';
import ActorsList from './actor/ActorList';
import ExceptionsList from './exception/ExceptionList';
import ResourcesList from './resource/ResourceList';
import EpisodeList from './episode/EpisodeList';
import Context from './context/Context';
import ScenarioHeader from './scenario-header/ScenarioHeader';
import { ActorsForm } from './actor/ActorForm';
import { ExceptionsForm } from './exception/ExceptionForm';
import ContextForm from './context/ContextForm';
import DeleteEpisode from './episode/delete-episode/DeleteEpisode';
import DeleteResource from './resource/delete-resource/DeleteResource';
import ScenarioForm from './scenario-form/ScenarioForm';
import './Scenario.scss';

interface IScenarioProps {
    scenario: ILexiconScenario;
    resetProjectInfo: () => void;
}

const Scenario: FC<IScenarioProps> = ({ scenario, resetProjectInfo }: IScenarioProps): ReactNode => {
    const { slugify } = useHelpers();
    const { processContent } = useLexicon();
    const { project } = useContext(ProjectContext);

    const { isAuthenticated } = useContext(UserContext) || {};
    const [isColaborador, setIsColaborador] = useState(false);

    const resetScenarioInfo = () => {
        resetProjectInfo();
        closeAllModals();
    };

    const closeAllModals = () => {
        handleCloseEpisodesModal();
        handleCloseResourceModal();
        handleCloseDeleteScenarioModal();
        handleCloseScenarioModal();
        handleCloseActorsModal();
        handleCloseExceptionsModal();
        handleCloseContextModal();
        handleCloseDeleteEpisodeModal();
        handleCloseDeleteResourceModal();
    };

    useEffect(() => {
        const role = isAuthenticated()?.projects.find((someProject) => someProject.project == project?.id)?.role;
        setIsColaborador(role == IUserRole.PROPRIETARIO || role == IUserRole.ADMINISTRADOR || role == IUserRole.COLABORADOR);
    }, [isAuthenticated, project?.id]);

    const [isActorsModalOpen, setIsActorsModalOpen] = useState(false);
    const handleOpenActorsModal = () => {
        setIsActorsModalOpen(true);
    };
    const handleCloseActorsModal = () => {
        setIsActorsModalOpen(false);
    };

    const [isExceptionsModalOpen, setIsExceptionsModalOpen] = useState(false);
    const handleOpenExceptionsModal = () => {
        setIsExceptionsModalOpen(true);
    };
    const handleCloseExceptionsModal = () => {
        setIsExceptionsModalOpen(false);
    };

    const [isContextModalOpen, setIsContextModalOpen] = useState(false);
    const handleOpenContextModal = () => {
        setIsContextModalOpen(true);
    };
    const handleCloseContextModal = () => {
        setIsContextModalOpen(false);
    };

    const [currentResourceId, setCurrentResourceId] = useState('');
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
    const handleOpenResourceModal = (resourceId?: string) => {
        if (resourceId) {
            setCurrentResourceId(resourceId);
        }
        setIsResourceModalOpen(true);
    };
    const handleCloseResourceModal = () => {
        setIsResourceModalOpen(false);
        setCurrentResourceId('');
    };

    const [isDeleteResourceModalOpen, setIsDeleteResourceModalOpen] = useState(false);
    const handleOpenDeleteResourceModal = (episodeId?: string) => {
        if (episodeId) {
            setCurrentResourceId(episodeId);
        }
        setIsDeleteResourceModalOpen(true);
    };
    const handleCloseDeleteResourceModal = () => {
        setIsDeleteResourceModalOpen(false);
        setCurrentResourceId('');
    };

    const [isEpisodesModalOpen, setIsEpisodesModalOpen] = useState(false);
    const [currentEpisodeId, setCurrentEpisodeId] = useState('');
    const handleOpenEpisodesModal = (episodeId?: string) => {
        if (episodeId) {
            setCurrentEpisodeId(episodeId);
        }
        setIsEpisodesModalOpen(true);
    };
    const handleCloseEpisodesModal = () => {
        setIsEpisodesModalOpen(false);
        setCurrentEpisodeId('');
    };

    const [isDeleteEpisodeModalOpen, setIsDeleteEpisodeModalOpen] = useState(false);
    const handleOpenDeleteEpisodeModal = (episodeId?: string) => {
        if (episodeId) {
            setCurrentEpisodeId(episodeId);
        }
        setIsDeleteEpisodeModalOpen(true);
    };
    const handleCloseDeleteEpisodeModal = () => {
        setIsDeleteEpisodeModalOpen(false);
        setCurrentEpisodeId('');
    };

    const [isActionsOptionsMenuOpen, setIsActionsOptionsMenuOpen] = useState(false);

    const handleOpenActionsOptionsMenu = () => setIsActionsOptionsMenuOpen(true);
    const handleCloseActionsOptionsMenu = () => setIsActionsOptionsMenuOpen(false);

    const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
    const handleCloseScenarioModal = () => setIsScenarioModalOpen(false);
    const handleOpenScenarioModal = () => {
        setIsScenarioModalOpen(true);
        handleCloseActionsOptionsMenu();
    };

    const [isDeleteScenarioModalOpen, setIsDeleteScenarioModalOpen] = useState(false);
    const handleCloseDeleteScenarioModal = () => setIsDeleteScenarioModalOpen(false);
    const handleOpenDeleteScenarioModal = () => {
        setIsDeleteScenarioModalOpen(true);
        handleCloseActionsOptionsMenu();
    };

    return (
        <div className='scenario flex column gap-2 relative border-radius-5' id={`${scenario.id}-${slugify(scenario.title.content)}`}>
            <ScenarioHeader
                title={scenario.title}
                isColaborador={isColaborador}
                handleCloseScenarioModal={handleCloseScenarioModal}
                handleOpenActionsOptionsMenu={handleOpenActionsOptionsMenu}
                handleOpenDeleteScenarioModal={handleOpenDeleteScenarioModal}
                handleOpenScenarioModal={handleOpenScenarioModal}
                isActionsOptionsMenuOpen={isActionsOptionsMenuOpen}
                setIsActionsOptionsMenuOpen={setIsActionsOptionsMenuOpen}
            />
            <section className='scenario-details flex column gap-3 relative'>
                <div className='flex column gap-5'>
                    <div className='flex gap-5 border-none'>
                        <FlagIcon />
                        <h3>Objetivo</h3>
                    </div>
                    <p>
                        {scenario.goal.content ? (
                            processContent(scenario.goal)
                        ) : (
                            <small className='empty'>Nenhum objetivo cadastrado</small>
                        )}
                    </p>
                </div>
                <div className='flex gap-2'>
                    <ActorsList actors={scenario.actors} isColaborador={isColaborador} handleOpenActorsModal={handleOpenActorsModal} />
                    <ExceptionsList
                        exceptions={scenario.exceptions}
                        isColaborador={isColaborador}
                        handleOpenExceptionsModal={handleOpenExceptionsModal}
                    />
                </div>
                <Context context={scenario.context} isColaborador={isColaborador} handleOpenContextModal={handleOpenContextModal} />
                <ResourcesList
                    resources={scenario.resources}
                    isColaborador={isColaborador}
                    handleOpenResourceModal={handleOpenResourceModal}
                    resetScenarioInfo={resetScenarioInfo}
                    scenario={scenario}
                    handleOpenDeleteResourceModal={handleOpenDeleteResourceModal}
                />
                <EpisodeList
                    handleOpenDeleteEpisodeModal={handleOpenDeleteEpisodeModal}
                    episodes={scenario.episodes}
                    isColaborador={isColaborador}
                    handleOpenEpisodesModal={handleOpenEpisodesModal}
                    scenario={scenario}
                    resetScenarioInfo={resetProjectInfo}
                />
            </section>
            <Modal
                open={isScenarioModalOpen}
                onClose={handleCloseScenarioModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <ScenarioForm
                    onClose={handleCloseScenarioModal}
                    scenario={scenario ? scenario : ({} as ILexiconScenario)}
                    resetInfo={resetScenarioInfo}
                />
            </Modal>
            <Modal
                open={isDeleteScenarioModalOpen}
                onClose={handleCloseDeleteScenarioModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <DeleteScenarioForm
                    onClose={handleCloseDeleteScenarioModal}
                    scenario={scenario ? scenario : ({} as ILexiconScenario)}
                    resetScenarioInfo={resetScenarioInfo}
                    projectId={scenario.projectId}
                />
            </Modal>
            <Modal
                open={isActorsModalOpen}
                onClose={handleCloseActorsModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <ActorsForm onClose={handleCloseActorsModal} resetScenarioInfo={resetScenarioInfo} scenarioId={scenario.id} />
            </Modal>
            <Modal
                open={isExceptionsModalOpen}
                onClose={handleCloseExceptionsModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <ExceptionsForm onClose={handleCloseExceptionsModal} resetScenarioInfo={resetScenarioInfo} scenarioId={scenario.id} />
            </Modal>
            <Modal
                open={isContextModalOpen}
                onClose={handleCloseContextModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <ContextForm
                    onClose={handleCloseContextModal}
                    resetScenarioInfo={resetScenarioInfo}
                    scenario={scenario}
                    projectId={project?.id || ''}
                />
            </Modal>
            <Modal
                open={isResourceModalOpen}
                onClose={handleCloseResourceModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <ResourceForm
                    onClose={handleCloseResourceModal}
                    resetScenarioInfo={resetScenarioInfo}
                    scenario={scenario}
                    resourceId={currentResourceId}
                />
            </Modal>
            <Modal
                open={isEpisodesModalOpen}
                onClose={handleCloseEpisodesModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <EpisodesForm
                    onClose={handleCloseEpisodesModal}
                    resetScenarioInfo={resetScenarioInfo}
                    scenario={scenario}
                    nonSequentialEpisodesGroupId={currentEpisodeId}
                    updatingEpisodeId={currentEpisodeId}
                />
            </Modal>
            <Modal
                open={isDeleteEpisodeModalOpen}
                onClose={handleCloseDeleteEpisodeModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <DeleteEpisode
                    onClose={handleCloseDeleteEpisodeModal}
                    scenario={scenario ? scenario : ({} as ILexiconScenario)}
                    resetScenarioInfo={resetScenarioInfo}
                    projectId={scenario.projectId}
                    episodeId={currentEpisodeId}
                />
            </Modal>
            <Modal
                open={isDeleteResourceModalOpen}
                onClose={handleCloseDeleteResourceModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <DeleteResource
                    onClose={handleCloseDeleteResourceModal}
                    scenario={scenario ? scenario : ({} as ILexiconScenario)}
                    resetScenarioInfo={resetScenarioInfo}
                    projectId={scenario.projectId}
                    resourceId={currentResourceId}
                />
            </Modal>
        </div>
    );
};

export default Scenario;
