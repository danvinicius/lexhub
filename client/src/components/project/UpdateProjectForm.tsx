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

export interface UpdateProjectRequestDTO {
  name: string;
  description: string;
}

interface UpdateProjectFormProps {
  project: IProject;
  onClose: () => void;
}

const UpdateProjectForm: FC<UpdateProjectFormProps> = ({ project, onClose }: UpdateProjectFormProps): ReactNode => {
	const nameEdit = useForm('dontValidateName');

	const descriptionEdit = useForm('projectDescription');

	useEffect(() => {
		nameEdit.setValue(project.name);
		descriptionEdit.setValue(project.description);
	}, []);

	const { isAuthenticated } = useContext(UserContext) || {};

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const updateProject = async (body: UpdateProjectRequestDTO) => {
    
		if (project?.id) {
			setLoading(true);

			try {
				const { url, options } = UPDATE_PROJECT(
					project.id,
					isAuthenticated()?.token || ''
				);
				await api[options.method](url, body, options);
				window.location.href = `/projeto/${project.id}`;
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
			updateProject({ name: nameEdit.value, description: descriptionEdit.value });
		}
	};

	return (
		<section className="update-project-form flex column gap-125">
			<div className="update-scenario-form-header">
				<h2>Editar projeto</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			<br />
			<Form>
				<Input
					type="text"
					name="name"
					placeholder="Plataforma de petróleo"
					label="Nome do projeto"
					{...nameEdit}
					onInput={() => setError('')}
				/>
				<RichTextEditor label='Descrição' {...descriptionEdit}/>
				{loading ? (
					<Loading />
				) : (
					<Button theme="primary" text="Salvar" onClick={handleSubmit} />
				)}
				<Error error={error} />
			</Form>
		</section>
	);
};

export default UpdateProjectForm;
