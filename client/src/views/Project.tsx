import { FC, ReactNode, SyntheticEvent, useCallback, useContext, useEffect, useState } from 'react';
import './css/Project.scss';
import { Navbar } from '../components/navbar/Navbar';
import { UserContext } from '../context/UserContext';
import { GET_PROJECT } from '../api';
import api from '../lib/axios';
import { useParams } from 'react-router-dom';
import Loading from '../components/helper/Loading';
import Error from '../components/helper/Error';
import ScenariosList from '../components/scenario/ScenariosList';
import Button from '../components/forms/Button';
import { ProjectContext } from '../context/ProjectContext';
import SummaryWrapper from '../components/scenario/SummaryWrapper';
import UserAdd from '../assets/icon/User_Add.svg';
import Kebab from '../assets/icon/Kebab_Vertical.svg';
import { Box, Modal, Tab, Tabs } from '@mui/material';
import CreateSymbolForm from '../components/symbol/CreateSymbolForm';
import CreateScenarioForm from '../components/scenario/CreateScenarioForm';
import { ErrorResponse, IProject, IUserProject, IUserRole } from '../shared/interfaces';
import UpdateProjectForm from '../components/project/UpdateProjectForm';
import { ProjectActionsOptionsMenu } from '../components/project/ProjectActionsOptionsMenu';
import DeleteProjectForm from '../components/project/DeleteProjectForm';
import SymbolsList from '../components/symbol/SymbolsList';
import AddUserToProjectForm from '../components/project/user/AddUserToProjectForm';
import { AxiosError } from 'axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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

const Project: FC<ProjectProps> = ({projectId}: ProjectProps) => {
	const { isAuthenticated } = useContext(UserContext) || {};
	const { setProject, project, setSymbol } = useContext(ProjectContext || {});
	const [currentTab, setCurrentTab] = useState(0);

	const handleChange = (_: SyntheticEvent, newValue: number) => {
		setSymbol(null);
		setCurrentTab(newValue);
	};

	const owner = project?.users.find((userProject: IUserProject) => userProject.role == 'OWNER')?.user;

	const [isCollaborator, setIsCollaborator] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isOwner, setIsOwner] = useState(false);

	// project actions options modal control
	const [isProjectActionsOptionsMenu, setIsProjectActionsOptionsMenu] = useState(false);
	const handleOpenProjectActionsOptionsMenu = () => setIsProjectActionsOptionsMenu(true);
	const handleCloseProjectActionsOptionsMenu = () => setIsProjectActionsOptionsMenu(false);

	// update project modal control
	const [isUpdateProjectModalOpen, setIsUpdateProjectModalOpen] = useState(false);
	const handleCloseUpdateProjectModal = () => setIsUpdateProjectModalOpen(false);
	const handleOpenUpdateProjectModal = () => {
		setIsUpdateProjectModalOpen(true);
		handleCloseProjectActionsOptionsMenu();
	};

	// delete project modal control
	const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
	const handleOpenDeleteProjectModal = () => {
		setIsDeleteProjectModalOpen(true);
		handleCloseProjectActionsOptionsMenu();
	};
	const handleCloseDeleteProjectModal = () => setIsDeleteProjectModalOpen(false);

	// create symbol modal control
	const [isCreateSymbolModalOpen, setIsCreateSymbolModalOpen] = useState(false);
	const handleOpenCreateSymbolModal = () => setIsCreateSymbolModalOpen(true);
	const handleCloseCreateSymbolModal = () => setIsCreateSymbolModalOpen(false);

	// create scenario modal control
	const [isCreateScenarioModalOpen, setIsCreateScenarioModalOpen] = useState(false);
	const handleOpenCreateScenarioModal = () => setIsCreateScenarioModalOpen(true);
	const handleCloseCreateScenarioModal = () => setIsCreateScenarioModalOpen(false);

	// add user to project modal control
	const [isAddUserToProjectModalOpen, setIsAddUserToProjectModalOpen] = useState(false);

	const handleOpenAddUserToProjectModal = () => setIsAddUserToProjectModalOpen(true);
	const handleCloseAddUserToProjectModal = () => setIsAddUserToProjectModalOpen(false);

	const params = useParams();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const getProject = useCallback(async () => {
		console.log(projectId);
		
		setLoading(true);
		if (projectId) {
			try {
				const { url, options } = GET_PROJECT(projectId, isAuthenticated()?.token || '');
				const response = await api[options.method](url, options);
				setProject(response.data);
			} catch (error) {
				const err = error as AxiosError<ErrorResponse>;
				setError(err?.response?.data?.error || 'Erro inesperado');
			} finally {
				setLoading(false);
			}
		}
	}, [isAuthenticated, projectId, setProject]);

	useEffect(() => {
		getProject();

		const role = isAuthenticated()?.projects.find((someProject) => someProject.project == project?.id)?.role;
		setIsCollaborator(role == IUserRole.OWNER || role == IUserRole.ADMIN || role == IUserRole.COLLABORATOR);
		setIsAdmin(role == IUserRole.OWNER || role == IUserRole.ADMIN);
		setIsOwner(role == IUserRole.OWNER);
	}, [getProject, isAuthenticated, project?.id]);
	return (
		<>
			<div className='project' id='project'>
				{loading && <Loading />}
				{error && <Error error={error} />}
				{!loading && !error && (
					<div className='project-info'>
						<div className='project-header'>
							<h1 className='project-name'>{project?.name}</h1>
							{isAdmin && (
								<div className='project-options'>
									<div className="pointer flex align-center">
										<PersonAddIcon onClick={handleOpenAddUserToProjectModal}/>
									</div>

									<img src={Kebab} alt='Abrir opções do projeto' onClick={handleOpenProjectActionsOptionsMenu} />
									{isProjectActionsOptionsMenu && (
										<ProjectActionsOptionsMenu
											isOwner={isOwner}
											isProjectActionsOptionsMenu={isProjectActionsOptionsMenu}
											handleCloseProjectActionsOptionsMenu={handleCloseProjectActionsOptionsMenu}
											handleOpenUpdateProjectModal={handleOpenUpdateProjectModal}
											handleOpenDeleteProjectModal={handleOpenDeleteProjectModal}
										/>
									)}
								</div>
							)}
							{isCollaborator && (
								<div className='buttons-container'>
									<Button onClick={handleOpenCreateScenarioModal} theme='primary' text='Novo cenário'></Button>
									<Button onClick={handleOpenCreateSymbolModal} theme='secondary' text='Novo símbolo'></Button>
								</div>
							)}
						</div>
						<div className="project-description" dangerouslySetInnerHTML={{ __html: project?.description || '' }}></div>
						{owner && (
							<small className='project-owner'>
                  Criado por {owner.name} em {new Date(project?.createdAt).toLocaleDateString('pt-br')} às{' '}
								{new Date(project?.createdAt).toLocaleTimeString('pt-br')}
							</small>
						)}
					</div>
				)}
				<div className='scenarios-container'>
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
										color: 'var(--primary-color) !important', // Cor da aba ativa
									},
									'.MuiTabs-indicator': {
										backgroundColor: 'var(--primary-color) !important', // Cor da barra abaixo da aba ativa
									},
								}}
							>
								<Tab label='Cenários' {...a11yProps(0)} />
								<Tab label='Símbolos' {...a11yProps(1)} />
							</Tabs>
						</Box>
						<div className='scenarios-content'>
							{currentTab == 0 && (
								<>
									<CustomTabPanel value={currentTab} index={0}>
										{project?.scenarios && <ScenariosList scenarios={project?.scenarios} />}
									</CustomTabPanel>
								</>
							)}
							{currentTab == 1 && (
								<CustomTabPanel value={currentTab} index={1}>
									{project?.symbols && <SymbolsList symbols={project?.symbols} />}
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
					<AddUserToProjectForm onClose={handleCloseAddUserToProjectModal} />
				</Modal>
				<Modal
					open={isUpdateProjectModalOpen}
					onClose={handleCloseUpdateProjectModal}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<UpdateProjectForm onClose={handleCloseUpdateProjectModal} project={project ? project : ({} as IProject)} />
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
					open={isCreateScenarioModalOpen}
					onClose={handleCloseCreateScenarioModal}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<CreateScenarioForm onClose={handleCloseCreateScenarioModal} />
				</Modal>
				<Modal
					open={isCreateSymbolModalOpen}
					onClose={handleCloseCreateSymbolModal}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<CreateSymbolForm onClose={handleCloseCreateSymbolModal} />
				</Modal>
			</div>
		</>
	);
};

export default Project;
