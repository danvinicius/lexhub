import { FC, ReactNode, useContext, useState } from 'react';
import { UPDATE_SCENARIO } from '../../../../api';
import { UserContext } from '../../../../context/UserContext';
import api from '../../../../lib/axios';
import { ErrorResponse, ILexiconScenario } from '../../../../shared/interfaces';
import Close from '../../../../assets/icon/Close_Dark.svg';
import { AxiosError } from 'axios';
import Loading from '../../../helper/Loading';
import Form from '../../../forms/Form';
import Button from '../../../forms/button/Button';
import Error from '../../../helper/Error';
import './DeleteResource.scss';
import { ScenarioRequestDTO } from '../../../../shared/dto';

interface DeleteResourceProps {
    scenario: ILexiconScenario;
    projectId: string;
    onClose: () => void;
    resetScenarioInfo: () => void;
    resourceId: string;
}

const DeleteResource: FC<DeleteResourceProps> = ({
    projectId,
    resourceId,
    scenario,
    onClose,
    resetScenarioInfo,
}: DeleteResourceProps): ReactNode => {
    const { isAuthenticated } = useContext(UserContext) || {};

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const updateScenarioWithResources = async (body: ScenarioRequestDTO) => {
        setLoading(true);
        if (projectId && scenario) {
            try {
                const { url, options } = UPDATE_SCENARIO(projectId, scenario.id, isAuthenticated()?.token || '');
                await api[options.method](url, body, options);
                resetScenarioInfo();
            } catch (error) {
                const err = error as AxiosError<ErrorResponse>;
                setError(err?.response?.data?.error || 'Erro inesperado');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteResource = async (resourceId: string) => {
        if (scenario) {
            await updateScenarioWithResources({
                projectId: projectId || '',
                resources: (scenario.resources?.filter((resource) => resource != null) ?? [])
                    .map((resource) => {
                        return {
                            id: resource.id,
                            name: resource.name.content,
                            restrictions: resource.restrictions?.map((restriction) => ({
                                description: restriction.description.content,
                            })),
                        };
                    })
                    .filter((resource) => resource.id !== resourceId),
            });
        }
    };

    return (
        <section className='delete-resource flex column gap-125'>
            <div className='delete-resource-header'>
                <h2>Tem certeza que deseja excluir este recurso?</h2>
                <img src={Close} alt="Ícone 'X' popup" title="Ícone 'X' popup" onClick={onClose} />
            </div>
            <br />
            <Form style={{ gap: '.5rem', userSelect: 'none' }}>
                {loading ? <Loading /> : <Button theme='danger' text='Excluir' onClick={() => handleDeleteResource(resourceId)} />}
                <Error error={error} />
            </Form>
        </section>
    );
};

export default DeleteResource;
