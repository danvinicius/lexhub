import { FormEvent, ReactNode, useContext, useState } from 'react';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Form from '../forms/Form';
import './CreateProjectForm.scss';
import { UserContext } from '../../context/UserContext';
import Loading from '../helper/Loading';
import { CREATE_PROJECT } from '../../api';
import useForm from '../../hooks/useForm';
import api from '../../lib/axios';
import Error from '../helper/Error';
import { ErrorResponse } from '../../shared/interfaces';
import { AxiosError } from 'axios';
import { RichTextEditor } from '../forms/RichTextEditor';
import { ProjectVisibilityForm } from './ProjectVisibilityForm';

export interface CreateProjectRequestDTO {
    name: string;
    description: string;
    private: boolean;
}

const CreateProjectForm = (): ReactNode => {
    const name = useForm('projectName');
    const description = useForm('projectDescription');
    const [visibility, setVisibility] = useState('private'); // "public" é o valor padrão

    const { isAuthenticated, refreshUser } = useContext(UserContext) || {};

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const createProject = async (body: CreateProjectRequestDTO) => {
        setLoading(true);

        try {
            const { url, options } = CREATE_PROJECT(isAuthenticated()?.token || '');
            const { data } = await api[options.method](url, body, options);
            await refreshUser();
            window.location.href = `/projeto/${data.id}`;
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            setError(err?.response?.data?.error || 'Erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (name.validate() && description.validate()) {
            createProject({ name: name.value, description: description.value, private: visibility == 'private' });
        }
    };

    return (
        <section className='create-project-form flex gap-3'>
            <div className='flex column gap-125'>
                <Form>
                    <Input
                        type='text'
                        name='name'
                        placeholder='Plataforma de petróleo'
                        label='Nome do projeto'
                        autoFocus
                        {...name}
                        onInput={() => setError('')}
                    />
                    <RichTextEditor label='Descrição' {...description} />
                    {loading ? <Loading /> : <Button theme='primary' text='Criar' onClick={handleSubmit} />}
                    <Error error={error} />
                </Form>
            </div>
            <ProjectVisibilityForm visibility={visibility} setVisibility={setVisibility} />
        </section>
    );
};

export default CreateProjectForm;
