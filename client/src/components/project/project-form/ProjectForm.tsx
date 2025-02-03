import { FC, FormEvent, ReactNode, useContext, useEffect, useState } from 'react';
import Button from '../../forms/button/Button';
import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import './ProjectForm.scss';
import { UserContext } from '../../../context/UserContext';
import Loading from '../../helper/Loading';
import { CREATE_PROJECT, UPDATE_PROJECT } from '../../../api';
import useForm from '../../../hooks/useForm';
import api from '../../../lib/axios';
import Error from '../../helper/Error';
import { ErrorResponse, IProject } from '../../../shared/interfaces';
import { AxiosError } from 'axios';
import { RichTextEditor } from '../../forms/rich-text-editor/RichTextEditor';
import { ProjectVisibilityForm } from './ProjectVisibilityForm';
import { ProjectRequestDTO } from '../../../shared/dto';
import CloseIcon from '@mui/icons-material/Close';

interface ProjectFormProps {
    project?: IProject;
    onClose?: () => void;
    resetProjectInfo?: () => void;
}

const ProjectForm: FC<ProjectFormProps> = ({ project, onClose, resetProjectInfo }): ReactNode => {
    const isEditing = Boolean(project);
    const name = useForm('dontValidateName');
    const description = useForm('projectDescription');
    const [visibility, setVisibility] = useState('private');

    useEffect(() => {
        if (isEditing && project) {
            name.setValue(project.name);
            description.setValue(project.description);
            setVisibility(project.private ? 'private' : 'public');
        }
    }, [project]);

    const { isAuthenticated, refreshUser } = useContext(UserContext) || {};
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (name.validate() && description.validate()) {
            const body: ProjectRequestDTO = {
                name: name.value,
                description: description.value,
                private: visibility === 'private',
            };

            setLoading(true);
            try {
                if (isEditing && project?.id) {
                    const { url, options } = UPDATE_PROJECT(project.id, isAuthenticated()?.token || '');
                    await api[options.method](url, body, options);
                    resetProjectInfo?.();
                } else {
                    const { url, options } = CREATE_PROJECT(isAuthenticated()?.token || '');
                    const { data } = await api[options.method](url, body, options);
                    await refreshUser();
                    window.location.href = `/projeto/${data.id}`;
                }
            } catch (error) {
                const err = error as AxiosError<ErrorResponse>;
                setError(err?.response?.data?.error || 'Erro inesperado');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <section className={`project-form ${isEditing ? 'editing' : ''}`}>
            {isEditing && onClose && (
                <div className='project-form-header'>
                    <h2>Editar projeto</h2>
                    <CloseIcon onClick={onClose} className='pointer'/>
                </div>
            )}
            <div className='project-form-wrapper flex gap-3'>
                <div className='flex column gap-125'>
                    <Form>
                        <Input
                            type='text'
                            name='name'
                            placeholder='Digite o nome do seu projeto'
                            label='Nome do projeto'
                            {...name}
                            onInput={() => setError('')}
                        />
                        <RichTextEditor label='Descrição' {...description} />
                        {loading ? <Loading /> : (
                            <Button theme='primary' text={isEditing ? 'Salvar' : 'Criar'} onClick={handleSubmit} />
                        )}
                        <Error error={error} />
                    </Form>
                </div>
                <ProjectVisibilityForm visibility={visibility} setVisibility={setVisibility} />
            </div>
        </section>
    );
};

export default ProjectForm;
