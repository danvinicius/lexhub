import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Logo } from '../components/logo/Logo';
import { GET_PROJECTS } from '../api';
import api from '../lib/axios';
import { ErrorResponse, IProject } from '../shared/interfaces';
import { AxiosError } from 'axios';
import { UserContext } from '../context/UserContext';
import Project from './Project';
import { OverView } from './Overview';
import './css/Homepage.scss';
import SymbolDetails from '../components/symbol/SymbolDetails';
import { ProjectContext } from '../context/ProjectContext';
import { Configurations } from './Configurations';
import Button from '../components/forms/Button';
import { LogoutButton } from '../components/login/LogoutButton';
import { AccountCircle } from '@mui/icons-material';

const demoTheme = extendTheme({
	colorSchemes: { light: true, dark: true },
	colorSchemeSelector: 'class',
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1500,
			xl: 1536,
		},
	},
});

function useDemoRouter(): Router {
	const [pathname, setPathname] = React.useState(window.location.pathname);
	
	React.useEffect(() => {
		// Atualiza a URL do navegador sempre que o pathname mudar
		if (window.location.pathname !== pathname) {
			window.history.pushState(null, '', pathname);
		}
	}, [pathname]);
  
	React.useEffect(() => {
		// Ouve as mudanças no histórico (ex.: botões de voltar/avançar do navegador)
		const handlePopState = () => setPathname(window.location.pathname);
		
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);
	
	const router = React.useMemo(() => {
		return {
			pathname,
			searchParams: new URLSearchParams(),
			navigate: (path: string | URL) => setPathname(String(path)),
		};
	}, [pathname]);
	
	return router;
}
  


export const Homepage = () => {
	const router = useDemoRouter();
	const {symbol} = React.useContext(ProjectContext);
	
	const { isAuthenticated } = React.useContext(UserContext) || {};

	const [projects, setProjects] = React.useState<IProject[]>([]);
	const [, setError] = React.useState('');
	const [, setLoading] = React.useState(false);

	const getProjects = React.useCallback(async () => {
		setLoading(true);
		try {
			const { url, options } = GET_PROJECTS(
				isAuthenticated()?.token || ''
			);
			const response = await api[options.method](url, options);
			setProjects(response.data);
		} catch (error) {
			const err = error as AxiosError<ErrorResponse>;
			setError(err?.response?.data?.error || 'Erro inesperado');
		} finally {
			setLoading(false);
		}
	}, [isAuthenticated]);

	React.useEffect(() => {
		getProjects();
	}, [getProjects]);

	const NAVIGATION: Navigation = [
		{
			kind: 'header',
			title: 'Menu',
		},
		{
			segment: 'home',
			title: 'Visão geral',
			icon: <DashboardIcon />,
		},
		{
			segment: 'projeto',
			title: 'Projetos',
			icon: <FolderIcon />,
			children: projects.length > 0 ?
				projects.map((project: IProject) => ({
					segment: `${project.id}`,
					title: project.name.length > 25 ? project.name.slice(0, 25) + '...' : project.name,
					icon: <DescriptionIcon />,
				}))  : [],
		},
		{
			segment: 'configuracoes',
			title: 'Configurações',
			icon: <SettingsIcon />,
			children: [
				{
					segment: '',
					title: 'Informações da conta',
					icon: <AccountCircle/>
				},
				
			]
		},
		{
			kind: 'divider',
		},
	];

	const [projectId, setProjectId] = React.useState('');
	React.useEffect(() => {
		if (router.pathname.startsWith('/projeto/')) {
			const id = router.pathname.split('/').pop();
			if (id) {
				setProjectId(id);
			}
		}
	}, [router.pathname]);

	const renderSymbolDetails = () => {
		return <SymbolDetails symbol={symbol || undefined} />;
	};

	return (
		<AppProvider
			navigation={NAVIGATION}
			router={router}
			theme={demoTheme}
			branding={{
				logo: <Logo />,
				title: '',
			}}
		>
			<DashboardLayout
				slots={{ sidebarFooter: symbol ? renderSymbolDetails : LogoutButton }}
				sidebarExpandedWidth={400}>
				<PageContainer breadcrumbs={[{title: '', path: ''}]} title='' sx={{padding: 0, width: 1500}}>
					{ router.pathname == '/home' && <OverView/>}
					{ router.pathname.startsWith('/projeto/') && <Project projectId={projectId} />}
					{ router.pathname == '/configuracoes' && <Configurations/>}
				</PageContainer>
			</DashboardLayout>
		</AppProvider>
	);
};