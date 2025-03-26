import { FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import api from '../../lib/axios';
import { IS_PROJECT_PRIVATE } from '../../api';
import { ErrorResponse } from '../../shared/interfaces';
import { UserContext } from '../../context/UserContext';

import ProtectedRoute from './ProtectedRoute';
import { Homepage } from '../../views/HomepageView';
import PublicHomepageView from '../../views/PublicHomepageView';

const ProjectRoute: FC = (): ReactNode => {
    const { projectId } = useParams();
    const [isProjectPrivate, setIsProjectPrivate] = useState();
    const { isAuthenticated } = useContext(UserContext) || {};
    const [, setError] = useState('');
    const [, setLoading] = useState(false);

    const verifyProjectPrivacy = useCallback(async () => {
        setLoading(true);
        if (projectId) {
            try {
                const { url, options } = IS_PROJECT_PRIVATE(projectId);
                const response = await api[options.method](url, options);
                
                setIsProjectPrivate(response.data);
            } catch (error) {
                const err = error as AxiosError<ErrorResponse>;
                setError(err?.response?.data?.error || 'Erro inesperado');
            } finally {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        
        verifyProjectPrivacy();
    }, []);
    
    if (isAuthenticated()?.token) {
        return (
            <ProtectedRoute>
                <Homepage />
            </ProtectedRoute>
        );
    }
    if (!isProjectPrivate && !isAuthenticated()?.token && projectId) {
        return <PublicHomepageView projectId={projectId}/>
    }
    return <Navigate to='/login' />;
};

export default ProjectRoute;
