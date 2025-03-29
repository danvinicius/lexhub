import { FC, FormEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import api from '../../../lib/axios';
import { CREATE_PROJECT, UPDATE_PROJECT } from '../../../api';
import { ErrorResponse, IProject } from '../../../shared/interfaces';
import { UserContext } from '../../../context/UserContext';
import { useToast } from '../../../context/ToastContext';
import useForm from '../../../hooks/useForm';
import { ProjectRequestDTO } from '../../../shared/dto';

import Button from '../../forms/button/Button';
import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import { ProjectVisibilityForm } from './ProjectVisibilityForm';
import CloseIcon from '@mui/icons-material/Close';
import './ProjectForm.scss';
import { RichTextEditor } from '../../forms/rich-text-editor/RichTextEditor';

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

    const { error } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing && project) {
            name.setValue(project.name);
            description.setValue(project.description);
            setVisibility(project.private ? 'private' : 'public');
        }
    }, [project]);

    const { isAuthenticated, refreshUser } = useContext(UserContext) || {};
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
                    navigate(`/projeto/${data.id}`);
                    navigate(0)
                }
            } catch (err) {
                const typedError = err as AxiosError<ErrorResponse>;
                error(typedError?.response?.data?.error || 'Erro inesperado');
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
                            onInput={() => name.setError('')}
                        />
                        <RichTextEditor label='Descrição' {...description} />
                        {loading ? <Loading /> : (
                            <Button theme='primary' text={isEditing ? 'Salvar' : 'Criar'} onClick={handleSubmit} />
                        )}
                    </Form>
                </div>
                <ProjectVisibilityForm visibility={visibility} setVisibility={setVisibility} />
            </div>
        </section>
    );
};

export default ProjectForm;
