import { FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Navigate, useParams } from 'react-router-dom';
import { IS_PROJECT_PRIVATE } from '../../api';
import api from '../../lib/axios';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../shared/interfaces';
import { Homepage } from '../../views/HomepageView';

const ProjectRoute: FC = (): ReactNode => {
	const { projectId } = useParams();
	const [isProjectPrivate, setIsProjectPrivate] = useState();
	const { isAuthenticated } = useContext(UserContext) || {};
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	
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
	});
	if (!isProjectPrivate && !isAuthenticated()?.token) {
		console.log('here');
		return null;
	}
	if (isAuthenticated()?.token) {
		
		return <Homepage />;
	}
	return <Navigate to="/login" />;
};

export default ProjectRoute;
