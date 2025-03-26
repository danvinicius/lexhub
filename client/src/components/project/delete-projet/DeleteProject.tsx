import { FC, FormEvent, ReactNode, useContext, useState } from 'react';
import { AxiosError } from 'axios';

import { DELETE_PROJECT } from '../../../api';
import api from '../../../lib/axios';
import { ErrorResponse, IProject } from '../../../shared/interfaces';
import { UserContext } from '../../../context/UserContext';
import useForm from '../../../hooks/useForm';

import Button from '../../forms/button/Button';
import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import Error from '../../helper/Error';
import Close from '../../../assets/icon/Close_Dark.svg';
import './DeleteProject.scss';

interface DeleteProjectProps {
  project: IProject;
  onClose: () => void;
}

const DeleteProject: FC<DeleteProjectProps> = ({ project, onClose }: DeleteProjectProps): ReactNode => {
	const nameDelete = useForm('dontValidateName');

	const { isAuthenticated } = useContext(UserContext) || {};

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const deleteProject = async () => {
		if (project?.id) {
			setLoading(true);
			try {
				const { url, options } = DELETE_PROJECT(
					project.id,
					isAuthenticated()?.token || ''
				);
				await api[options.method](url, options);
				window.location.href = '/home';
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
		
		if (nameDelete.value != project.name) {
			nameDelete.setError('Nome inválido');
			return;
		}
		deleteProject();
	};

	return (
		<section className="delete-project flex column gap-125">
			<div className="delete-scenario-header">
				<h2>Tem certeza que deseja excluir o projeto {project.name}?</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			<Form style={{gap: '.5rem'}}>
				<p>
          Por motivos de segurança, para excluir este projeto digite{' '}
					<b>{project.name}</b>
				</p>
				<Input
					type="text"
					name="name"
					placeholder=""
					label=""
					{...nameDelete}
					onInput={() => setError('')}
					onBlur={() => null}
				/>
				{loading ? (
					<Loading />
				) : (
					<Button theme="danger" text="Excluir" onClick={handleSubmit} />
				)}
				<Error error={error} />
			</Form>
		</section>
	);
};

export default DeleteProject;
