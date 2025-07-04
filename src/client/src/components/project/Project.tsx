import { FC, ReactNode, SyntheticEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Public from '@mui/icons-material/Public';
import { Lock } from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Modal, Tab, Tabs } from '@mui/material';
import { AxiosError } from 'axios';

import { GET_PROJECT } from '../../api';
import api from '../../lib/axios';
import { ErrorResponse, IProject, IUserProject, IUserRole } from '../../shared/interfaces';
import { UserContext } from '../../context/UserContext';
import { ProjectContext } from '../../context/ProjectContext';

import Loading from '../helper/Loading';
import Error from '../helper/Error';
import ScenariosList from '../scenario/scenario-list/ScenarioList';
import Button from '../forms/button/Button';
import Kebab from '../../assets/icon/Kebab_Vertical.svg';
import { ProjectActionsOptionsMenu } from './project-actions-options-menu/ProjectActionsOptionsMenu';
import DeleteProjectForm from './delete-projet/DeleteProject';
import SymbolsList from '../symbol/symbol-list/SymbolList';
import AddUserToProjectForm from './user/AddUserToProjectForm';
import { ProfilePicture } from '../user/profile-picture/ProfilePicture';
import { CreateMultipleScenariosForm } from '../scenario/multiple-scenarios-form/CreateMultipleScenariosForm';
import ProjectForm from './project-form/ProjectForm';
import ScenarioForm from '../scenario/scenario-form/ScenarioForm';
import SymbolForm from '../symbol/symbol-form/SymbolForm';
import './Project.scss';

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel: FC<TabPanelProps> = (props: TabPanelProps): ReactNode => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            style={{ display: value !== index ? 'none' : 'block', width: '100%' }}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: '1rem 0rem', width: '100%' }}>{children}</Box>}
        </div>
    );
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface ProjectProps {
    projectId: string;
}

const Project: FC<ProjectProps> = ({ projectId }: ProjectProps) => {
    const { isAuthenticated } = useContext(UserContext) || {};
    const { setProject, project, setSymbol, currentTab, setCurrentTab } = useContext(ProjectContext || {});

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setSymbol(null);
        setCurrentTab(newValue);
    };

    const proprietario = project?.users.find((userProject: IUserProject) => userProject.role == 'Proprietario')?.user;

    const [isColaborador, setIsColaborador] = useState(false);
    const [isAdministrador, setIsAdministrador] = useState(false);
    const [isProprietario, setIsProprietario] = useState(false);

    const [isProjectActionsOptionsMenuOpen, setIsProjectActionsOptionsMenuOpen] = useState(false);
    const handleOpenProjectActionsOptionsMenu = () => setIsProjectActionsOptionsMenuOpen(true);
    const handleCloseProjectActionsOptionsMenu = () => setIsProjectActionsOptionsMenuOpen(false);

    const [isUpdateProjectModalOpen, setIsUpdateProjectModalOpen] = useState(false);
    const handleCloseUpdateProjectModal = () => setIsUpdateProjectModalOpen(false);
    const handleOpenUpdateProjectModal = () => {
        setIsUpdateProjectModalOpen(true);
        handleCloseProjectActionsOptionsMenu();
    };

    const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
    const handleOpenDeleteProjectModal = () => {
        setIsDeleteProjectModalOpen(true);
        handleCloseProjectActionsOptionsMenu();
    };
    const handleCloseDeleteProjectModal = () => setIsDeleteProjectModalOpen(false);

    const [isCreateSymbolModalOpen, setIsCreateSymbolModalOpen] = useState(false);
    const handleOpenCreateSymbolModal = () => setIsCreateSymbolModalOpen(true);
    const handleCloseCreateSymbolModal = () => setIsCreateSymbolModalOpen(false);

    const [isCreateScenarioOptionsMenuOpen, setIsCreateScenarioOptionsMenuOpen] = useState(false);
    const handleOpenCreateScenarioOptionsMenu = () => setIsCreateScenarioOptionsMenuOpen(true);
    const handleCloseCreateScenarioOptionsMenu = () => setIsCreateScenarioOptionsMenuOpen(false);

    const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
    const handleOpenCreateScenarioModal = () => {
        handleCloseCreateScenarioOptionsMenu();
        setIsScenarioModalOpen(true);
    };
    const handleCloseScenarioModal = () => setIsScenarioModalOpen(false);

    const [isCreateMultipleScenariosModalOpen, setIsCreateMultipleScenariosModalOpen] = useState(false);
    const handleOpenCreateMultipleScenariosModal = () => {
        handleCloseCreateScenarioOptionsMenu();
        setIsCreateMultipleScenariosModalOpen(true);
    };
    const handleCloseCreateMultipleScenariosModal = () => setIsCreateMultipleScenariosModalOpen(false);

    const [isAddUserToProjectModalOpen, setIsAddUserToProjectModalOpen] = useState(false);
    const handleOpenAddUserToProjectModal = () => setIsAddUserToProjectModalOpen(true);
    const handleCloseAddUserToProjectModal = () => setIsAddUserToProjectModalOpen(false);

    const closeAllModals = () => {
        handleCloseAddUserToProjectModal();
        handleCloseScenarioModal();
        handleCloseCreateMultipleScenariosModal();
        handleCloseCreateSymbolModal();
        handleCloseDeleteProjectModal();
        handleCloseProjectActionsOptionsMenu();
        handleCloseUpdateProjectModal();
    };

    const createScenarioOptionsMenuRef = useRef<HTMLDivElement>(null);

    const [pagination, setPagination] = useState(1);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (createScenarioOptionsMenuRef.current && !createScenarioOptionsMenuRef.current.contains(event.target as Node)) {
                handleCloseCreateScenarioOptionsMenu();
            }
        };

        if (isCreateScenarioOptionsMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCreateScenarioOptionsMenuOpen]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getProject = useCallback(async () => {
        setLoading(true);
        if (projectId) {
            try {
                const { url, options } = GET_PROJECT(projectId, isAuthenticated()?.token || '');
                const response = await api[options.method](url, options);
                setProject(response.data);
                setRoles(response.data);
            } catch (error) {
                const err = error as AxiosError<ErrorResponse>;
                setError(err?.response?.data?.error || 'Erro inesperado');
            } finally {
                setLoading(false);
            }
        }
    }, [isAuthenticated, projectId, setProject]);

    const setRoles = (project: IProject) => {
        const role = isAuthenticated()?.projects.find((someProject) => someProject.project === project?.id)?.role;
        setIsColaborador(role === IUserRole.PROPRIETARIO || role === IUserRole.ADMINISTRADOR || role === IUserRole.COLABORADOR);
        setIsAdministrador(role === IUserRole.PROPRIETARIO || role === IUserRole.ADMINISTRADOR);
        setIsProprietario(role === IUserRole.PROPRIETARIO);
    };

    const resetProjectInfo = () => {
        getProject();
        closeAllModals();
    };

    useEffect(() => {
        resetProjectInfo();
    }, [getProject, isAuthenticated]);
    return (
        <>
            <div className='project flex column justify-center' id='project'>
                {loading && <Loading />}
                {error && <Error error={error} />}
                {!loading && !error && (
                    <div className='project-info'>
                        <div className='project-header flex align-center gap-4 relative'>
                            <h1 className='project-name'>{project?.name}</h1>
                            {isAdministrador && (
                                <div className='project-options flex align-center relative gap-15'>
                                    <small className='visiblidade flex align-end gap-25'>
                                        {project?.private ? (
                                            <>
                                                <Lock />
                                                Projeto privado
                                            </>
                                        ) : (
                                            <>
                                                <Public />
                                                Projeto público
                                            </>
                                        )}
                                    </small>
                                    <div className='pointer flex align-center'>
                                        <PersonAddIcon onClick={handleOpenAddUserToProjectModal} />
                                    </div>

                                    <img
                                        className='pointer'
                                        src={Kebab}
                                        alt='Abrir opções do projeto'
                                        onClick={handleOpenProjectActionsOptionsMenu}
                                    />
                                    {isProjectActionsOptionsMenuOpen && (
                                        <ProjectActionsOptionsMenu
                                            isProprietario={isProprietario}
                                            isProjectActionsOptionsMenuOpen={isProjectActionsOptionsMenuOpen}
                                            handleCloseProjectActionsOptionsMenu={handleCloseProjectActionsOptionsMenu}
                                            handleOpenUpdateProjectModal={handleOpenUpdateProjectModal}
                                            handleOpenDeleteProjectModal={handleOpenDeleteProjectModal}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className='project-description' dangerouslySetInnerHTML={{ __html: project?.description || '' }}></div>
                        {proprietario && (
                            <small className='project-proprietario flex align-center gap-5'>
                                <ProfilePicture user={proprietario} />
                                Criado por<span>{proprietario.name}</span>em {new Date(project?.createdAt).toLocaleDateString('pt-br')} às{' '}
                                {new Date(project?.createdAt).toLocaleTimeString('pt-br')}
                            </small>
                        )}
                    </div>
                )}
                <div className='flex column gap-1 border-radius-5 relative'>
                    {isCreateScenarioOptionsMenuOpen && (
                        <section className='create-scenario-options-menu' ref={createScenarioOptionsMenuRef}>
                            <div className='flex column user-info'>
                                <span className='pointer' onClick={handleOpenCreateScenarioModal}>
                                    Criar um único cenário
                                </span>
                                <span className='pointer' onClick={handleOpenCreateMultipleScenariosModal}>
                                    Criar múltiplos cenários
                                </span>
                            </div>
                        </section>
                    )}
                    <Box sx={{ width: '100%', padding: 0 }}>
                        <Box
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                padding: 0,
                                width: '100%',
                            }}
                        >
                            <Tabs
                                value={currentTab}
                                onChange={handleChange}
                                aria-label='basic tabs example'
                                sx={{
                                    '.Mui-selected': {
                                        color: 'var(--primary-color) !important',
                                    },
                                    '.MuiTabs-indicator': {
                                        backgroundColor: 'var(--primary-color) !important',
                                    },
                                }}
                            >
                                <Tab label='Cenários' {...a11yProps(0)} />
                                <Tab label='Símbolos' {...a11yProps(1)} />
                                {isColaborador && (
                                    <div className='buttons-container flex'>
                                        {currentTab == 0 ? (
                                            <Button
                                                onClick={handleOpenCreateScenarioOptionsMenu}
                                                theme='primary'
                                                text='Novo cenário'
                                            ></Button>
                                        ) : (
                                            <Button onClick={handleOpenCreateSymbolModal} theme='primary' text='Novo símbolo'></Button>
                                        )}
                                    </div>
                                )}
                            </Tabs>
                        </Box>
                        <div className='gap-15 relative'>
                            {currentTab == 0 && (
                                <>
                                    <CustomTabPanel value={currentTab} index={0}>
                                        {project?.scenarios && (
                                            <ScenariosList
                                                scenarios={project?.scenarios}
                                                resetProjectInfo={resetProjectInfo}
                                                pagination={pagination} 
                                                setPagination={setPagination}
                                            />
                                        )}
                                    </CustomTabPanel>
                                </>
                            )}
                            {currentTab == 1 && (
                                <CustomTabPanel value={currentTab} index={1}>
                                    {project?.symbols && <SymbolsList symbols={project?.symbols} resetProjectInfo={resetProjectInfo} />}
                                </CustomTabPanel>
                            )}
                        </div>
                    </Box>
                </div>
                <Modal
                    open={isAddUserToProjectModalOpen}
                    onClose={handleCloseAddUserToProjectModal}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <AddUserToProjectForm onClose={handleCloseAddUserToProjectModal} resetProjectInfo={resetProjectInfo} />
                </Modal>
                <Modal
                    open={isUpdateProjectModalOpen}
                    onClose={handleCloseUpdateProjectModal}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <ProjectForm
                        onClose={handleCloseUpdateProjectModal}
                        project={project ? project : ({} as IProject)}
                        resetProjectInfo={resetProjectInfo}
                    ></ProjectForm>
                </Modal>
                <Modal
                    open={isDeleteProjectModalOpen}
                    onClose={handleCloseDeleteProjectModal}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <DeleteProjectForm onClose={handleCloseDeleteProjectModal} project={project ? project : ({} as IProject)} />
                </Modal>
                <Modal
                    open={isScenarioModalOpen}
                    onClose={handleCloseScenarioModal}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <ScenarioForm onClose={handleCloseScenarioModal} resetInfo={resetProjectInfo} />
                </Modal>
                <Modal
                    open={isCreateMultipleScenariosModalOpen}
                    onClose={handleCloseCreateMultipleScenariosModal}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <CreateMultipleScenariosForm onClose={handleCloseCreateMultipleScenariosModal} resetProjectInfo={resetProjectInfo} />
                </Modal>
                <Modal
                    open={isCreateSymbolModalOpen}
                    onClose={handleCloseCreateSymbolModal}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <SymbolForm onClose={handleCloseCreateSymbolModal} resetInfo={resetProjectInfo} />
                </Modal>
            </div>
        </>
    );
};

export default Project;
