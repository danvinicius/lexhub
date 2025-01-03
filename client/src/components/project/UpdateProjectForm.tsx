import { FC, FormEvent, ReactNode, useContext, useEffect, useState } from 'react';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Form from '../forms/Form';
import './UpdateProjectForm.scss';
import { UserContext } from '../../context/UserContext';
import Loading from '../helper/Loading';
import { UPDATE_PROJECT } from '../../api';
import useForm from '../../hooks/useForm';
import api from '../../lib/axios';
import Error from '../helper/Error';
import { ErrorResponse, IProject } from '../../shared/interfaces';
import Close from '../../assets/icon/Close_Dark.svg';
import { AxiosError } from 'axios';
import { RichTextEditor } from '../forms/RichTextEditor';
import { ProjectVisibilityForm } from './ProjectVisibilityForm';

export interface UpdateProjectRequestDTO {
    name: string;
    description: string;
    private: boolean;
}

interface UpdateProjectFormProps {
    project: IProject;
    onClose: () => void;
    resetProjectInfo: () => void;
}

const UpdateProjectForm: FC<UpdateProjectFormProps> = ({ project, onClose, resetProjectInfo }: UpdateProjectFormProps): ReactNode => {
    const nameEdit = useForm('dontValidateName');
    const descriptionEdit = useForm('projectDescription');
    const [visibilityEdit, setVisibilityEdit] = useState('');

    useEffect(() => {
        nameEdit.setValue(project.name);
        descriptionEdit.setValue(project.description);
        setVisibilityEdit(project.private ? 'private' : 'public');
    }, []);

    const { isAuthenticated } = useContext(UserContext) || {};

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const updateProject = async (body: UpdateProjectRequestDTO) => {
        if (project?.id) {
            setLoading(true);
            try {
                const { url, options } = UPDATE_PROJECT(project.id, isAuthenticated()?.token || '');
                await api[options.method](url, body, options);
                resetProjectInfo();
            } catch (error) {
                const err = error as AxiosError<ErrorResponse>;
                setError(err?.response?.data?.error || 'Erro inesperado');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (nameEdit.validate() && descriptionEdit.validate()) {
            updateProject({ name: nameEdit.value, description: descriptionEdit.value, private: visibilityEdit === 'private' });
        }
    };

    return (
        <section className='update-project-form flex column gap-125'>
            <div className='update-scenario-form-header'>
                <h2>Editar projeto</h2>
                <img src={Close} alt="Ícone 'X' popup" title="Ícone 'X' popup" onClick={onClose} />
            </div>
            <br />
            <div className='flex gap-4'>
                <div className='flex column gap-125'>
                    <Form>
                        <Input
                            type='text'
                            name='name'
                            placeholder='Plataforma de petróleo'
                            label='Nome do projeto'
                            {...nameEdit}
                            onInput={() => setError('')}
                        />
                        <RichTextEditor label='Descrição' {...descriptionEdit} />
                        {loading ? <Loading /> : <Button theme='primary' text='Salvar' onClick={handleSubmit} />}
                        <Error error={error} />
                    </Form>
                </div>
                    <ProjectVisibilityForm
                        visibility={visibilityEdit}
                        setVisibility={setVisibilityEdit}
                    />
            </div>
        </section>
    );
};

export default UpdateProjectForm;
