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
import { ErrorResponse, ILexiconSymbol, IProject } from '../shared/interfaces';
import { AxiosError } from 'axios';
import { UserContext } from '../context/UserContext';
import Project from '../components/project/Project';
import { OverView } from '../components/homepage/Overview';
import './css/Homepage.scss';
import SymbolDetails from '../components/symbol/SymbolDetails';
import { ProjectContext } from '../context/ProjectContext';
import { Configurations } from '../components/homepage/Configurations';
import { AccountCircle } from '@mui/icons-material';
import { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { NavbarMenuLinks } from '../components/navbar/NavbarMenuLinks';

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
        </>
    );
};

const LightNavbarMenuLinks = () => {
    return (
        <div style={{ marginRight: '1rem' }}>
            <NavbarMenuLinks light={true}/>
        </div>
    );
};

export const Homepage = () => {
    const router = useDemoRouter();
    const { symbol } = useContext(ProjectContext);

    const { isAuthenticated } = useContext(UserContext) || {};

    const [projects, setProjects] = useState<IProject[]>([]);
    const [, setError] = useState('');
    const [, setLoading] = useState(false);

    const getProjects = useCallback(async () => {
        setLoading(true);
        try {
            const { url, options } = GET_PROJECTS(isAuthenticated()?.token || '');
            const response = await api[options.method](url, options);
            setProjects(response.data);
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            setError(err?.response?.data?.error || 'Erro inesperado');
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
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
            children:
                projects.length > 0
                    ? projects.map((project: IProject) => ({
                          segment: `${project.id}`,
                          title: project.name.length > 25 ? project.name.slice(0, 25) + '...' : project.name,
                          icon: <DescriptionIcon />,
                      }))
                    : [],
        },
        {
            segment: 'configuracoes',
            title: 'Configurações',
            icon: <SettingsIcon />,
            children: [
                {
                    segment: '',
                    title: 'Informações da conta',
                    icon: <AccountCircle />,
                },
            ],
        },
        {
            kind: 'divider',
        },
    ];

    const [projectId, setProjectId] = useState('');
    useEffect(() => {
        if (router.pathname.startsWith('/projeto/')) {
            const id = router.pathname.split('/').pop();
            if (id) {
                setProjectId(id);
            }
        }
    }, [router.pathname]);

    const renderFooterSidebar = () => {
        return <FooterSidebar symbol={symbol} />;
    };

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            branding={{
                logo: <Logo light={true} />,
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
                    '& .MuiToolbar-gutters > .MuiStack-root': {
                        padding: '.45rem 0',
                    },
                    '& .MuiToolbar-gutters > .MuiStack-root > .MuiStack-root': {
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
                    {router.pathname == '/home' && <OverView />}
                    {router.pathname.startsWith('/projeto/') && <Project projectId={projectId} />}
                    {router.pathname == '/configuracoes' && <Configurations />}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
};
