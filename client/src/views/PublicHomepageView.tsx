import './css/PublicProjectView.scss';
import { GET_PROJECT } from '../api';
import api from '../lib/axios';
import Loading from '../components/helper/Loading';
import Error from '../components/helper/Error';
import ScenariosList from '../components/scenario/ScenariosList';
import { Box, Tab, Tabs } from '@mui/material';
import SymbolsList from '../components/symbol/SymbolsList';
import { ProfilePicture } from '../components/user/ProfilePicture';
import { extendTheme } from '@mui/material/styles';
import { AppProvider, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Logo } from '../components/logo/Logo';
import { ErrorResponse, ILexiconSymbol, IUserProject } from '../shared/interfaces';
import { AxiosError } from 'axios';
import { UserContext } from '../context/UserContext';
import './css/Homepage.scss';
import SymbolDetails from '../components/symbol/SymbolDetails';
import { ProjectContext } from '../context/ProjectContext';
import { LoginButton } from '../components/login/LoginButton';
import { useState, useContext, useEffect, useMemo, useCallback, FC, ReactNode, SyntheticEvent } from 'react';
import { NavbarMenuLinks } from '../components/navbar/NavbarMenuLinks';

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

const LightNavbarMenuLinks = () => {
    return (
        <div style={{ marginRight: '1rem' }}>
            <NavbarMenuLinks light={true} />
        </div>
    );
};

const PublicProjectView: FC<ProjectProps> = ({ projectId }: ProjectProps) => {
    const { isAuthenticated } = useContext(UserContext) || {};
    const { setProject, project, setSymbol, currentTab, setCurrentTab } = useContext(ProjectContext || {});

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setSymbol(null);
        setCurrentTab(newValue);
    };

    const proprietario = project?.users.find((userProject: IUserProject) => userProject.role == 'Proprietario')?.user;

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getProject = useCallback(async () => {
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

    const resetProjectInfo = () => {
        getProject();
    };

    useEffect(() => {
        resetProjectInfo();
    }, [getProject, isAuthenticated, project?.id]);
    return (
        <>
            <div className='container'>
                <div className='project flex column justify-center' id='project'>
                    {loading && <Loading />}
                    {error && <Error error={error} />}
                    {!loading && !error && (
                        <div className='project-info'>
                            <div className='project-header flex align-center gap-4 relative'>
                                <h1 className='project-name'>{project?.name}</h1>
                            </div>
                            <div className='project-description' dangerouslySetInnerHTML={{ __html: project?.description || '' }}></div>
                            {proprietario && (
                                <small className='project-proprietario flex align-center gap-5'>
                                    <ProfilePicture user={proprietario} />
                                    Criado por <span>{proprietario.name}</span>em {new Date(project?.createdAt).toLocaleDateString('pt-br')} às{' '}
                                    {new Date(project?.createdAt).toLocaleTimeString('pt-br')}
                                </small>
                            )}
                        </div>
                    )}
                    <div className='flex column gap-1 border-radius-5'>
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
                            <div className='gap-15 relative'>
                                {currentTab == 0 && (
                                    <>
                                        <CustomTabPanel value={currentTab} index={0}>
                                            {project?.scenarios && (
                                                <ScenariosList scenarios={project?.scenarios} resetProjectInfo={resetProjectInfo} />
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
                </div>
            </div>
        </>
    );
};

const demoTheme = extendTheme({
    colorSchemes: { light: true },
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
    const [pathname, setPathname] = useState(window.location.pathname);
    const { refreshUser } = useContext(UserContext) || {};

    useEffect(() => {
        // Atualiza a URL do navegador sempre que o pathname mudar
        if (window.location.pathname !== pathname) {
            window.history.pushState(null, '', pathname);
        }
    }, [pathname]);

    useEffect(() => {
        refreshUser();
        // Ouve as mudanças no histórico (ex.: botões de voltar/avançar do navegador)
        const handlePopState = () => setPathname(window.location.pathname);

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const router = useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path: string | URL) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

interface FooterSidebarProps {
    symbol: ILexiconSymbol | null;
}

export const FooterSidebar = ({ symbol }: FooterSidebarProps) => {
    return (
        <>
            {symbol && <SymbolDetails symbol={symbol} />}
            <LoginButton></LoginButton>
        </>
    );
};

interface PublicHomepageViewProps {
    projectId: string;
}

export const PublicHomepageView = ({ projectId }: PublicHomepageViewProps) => {
    const router = useDemoRouter();
    const { symbol } = useContext(ProjectContext);

    const renderFooterSidebar = () => {
        return <FooterSidebar symbol={symbol} />;
    };

    return (
        <AppProvider
            router={router}
            theme={demoTheme}
            branding={{
                logo: <Logo light={true}/>,
                title: '',
            }}
        >
            <DashboardLayout
                slots={{
                    sidebarFooter: renderFooterSidebar,
                    toolbarActions: LightNavbarMenuLinks,
                }}
                sidebarExpandedWidth={400}
                sx={{
                    '& .MuiStack-root.css-m69qwo-MuiStack-root': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                    '& header': {
                        backgroundColor: 'var(--primary-color)',
                        '.MuiButtonBase-root': {
                            color: '#fff',
                        },
                    },
                    '.MuiList-root.MuiList-padding': {
                        '.MuiListSubheader-root': {
                            paddingTop: '3rem',
                        }
                    },
                }}
            >
                <PageContainer breadcrumbs={[{ title: '', path: '' }]} title='' sx={{ padding: 0 }}>
                    <PublicProjectView projectId={projectId} />
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
};

export default PublicHomepageView;
