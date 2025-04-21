import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import { AxiosError } from 'axios';
import { ptBR } from 'date-fns/locale';

import api from '../../../lib/axios';
import { GET_CHANGES_BY_USER_PROJECTS } from '../../../api';
import { ErrorResponse, IChange } from '../../../shared/interfaces';
import { UserContext } from '../../../context/UserContext';
import { useChanges } from '../../../hooks/useChanges';

import { ProfilePicture } from '../../user/profile-picture/ProfilePicture';
import './LastChanges.scss';

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
                        const firstDifference = change.differences[0];
                        const path = firstDifference?.path[firstDifference.path.length - 1];
                        if (
                            firstDifference &&
                            !['id', 'createdAt', 'updatedAt', 'deletedAt', 'project'].includes(path) &&
                            !firstDifference?.path.includes('nonSequentialEpisodes')
                        ) {
                            return (
                                <li key={change.id}>
                                    <div className='change-summary flex align-center'>
                                        <ProfilePicture user={change.responsible} />
                                        <div className='flex column'>
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: formatChange(
                                                        firstDifference,
                                                        change.responsible,
                                                        change.project,
                                                        change.entityName
                                                    ),
                                                }}
                                            ></p>
                                            <small>{distance}</small>
                                        </div>
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>
            ) : (
                <p>As atualizações dos seus projetos aparecerão aqui.</p>
            )}
        </div>
    );
};
