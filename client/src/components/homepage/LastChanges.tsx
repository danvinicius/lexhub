import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import './LastChanges.scss';
import api from '../../lib/axios';
import { UserContext } from '../../context/UserContext';
import { GET_CHANGES_BY_USER_PROJECTS } from '../../api';
import { AxiosError } from 'axios';
import { ErrorResponse, IChange } from '../../shared/interfaces';
import { useChanges } from '../../hooks/useChanges';
import { ProfilePicture } from '../user/ProfilePicture';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const LastChanges = (): ReactNode => {
	const { isAuthenticated } = useContext(UserContext) || {};
	const [, setError] = useState('');
	const [, setLoading] = useState(false);
	const [changes, setChanges] = useState<IChange[]>([]);
	const { formatChange } = useChanges();
	const getLastChanges = useCallback(async () => {
		setLoading(true);
		try {
			const { url, options } = GET_CHANGES_BY_USER_PROJECTS(isAuthenticated()?.token || '');
			const response = await api[options.method](url, options);
			setChanges(response.data);
		} catch (error) {
			const err = error as AxiosError<ErrorResponse>;
			setError(err?.response?.data?.error || 'Erro inesperado');
		} finally {
			setLoading(false);
		}
	}, [isAuthenticated, setChanges]);

	useEffect(() => {
		getLastChanges();
	}, []);
	return (
		<div className='last-changes'>
			{changes.length ? (
				<ul className='flex column'>
					{changes.map((change: IChange) => {
						const distance = formatDistance(change.createdAt, new Date(), { addSuffix: true, locale: ptBR });
						return (
							<li key={change.id} className='flex align-center'>
								<ProfilePicture user={change.responsible} />
								<div>
									<p dangerouslySetInnerHTML={{ __html: formatChange(change) }}></p>
									<small>{distance}</small>
								</div>
							</li>
						);
					})}
				</ul>
			) : (
				<p>As atualizações dos seus projetos aparecerão aqui.</p>
			)}
		</div>
	);
};
