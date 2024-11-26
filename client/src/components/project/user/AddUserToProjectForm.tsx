import { FC, FormEvent, ReactNode, SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import Button from '../../forms/Button';
import Error from '../../helper/Error';
import api from '../../../lib/axios';
import { ADD_USER_TO_PROJECT } from '../../../api';
import { UserContext } from '../../../context/UserContext';
import './AddUserToProjectForm.scss';
import Select from '../../forms/Select';
import Close from '../../../assets/icon/Close_Dark.svg';
import { ProjectContext } from '../../../context/ProjectContext';
import { AddUserEmailComboBox } from './AddUserEmailComboBox';
import { Snackbar, SnackbarCloseReason } from '@mui/material';
import { ErrorResponse } from '../../../shared/interfaces';
import { AxiosError } from 'axios';
import { ProfilePicture } from '../../user/ProfilePicture';

interface AddUserToProjectRequestDTO {
  email: string;
  role: string;
  projectId: string;
}

interface AddUserToProjectFormProps {
  onClose: () => void;
}

const formatRoles = {
	OWNER: 'PROPRIETÁRIO',
	ADMIN: 'ADMIN',
	COLLABORATOR: 'COLABORADOR',
	OBSERVER: 'OBSERVADOR',
};

const AddUserToProjectForm: FC<AddUserToProjectFormProps> = ({ onClose }: AddUserToProjectFormProps): ReactNode => {
	const { isAuthenticated } = useContext(UserContext || {});

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleCloseSnackbar = (
		_event: SyntheticEvent | Event,
		reason?: SnackbarCloseReason
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackbar(false);
	};

	const navigate = useNavigate();

	const [emails, setEmails] = useState<string[]>([]);
	const [roles, setRoles] = useState<Record<string, string>>({});

	const projectContext = useContext(ProjectContext);

	const AddUserToProject = async (body: AddUserToProjectRequestDTO) => {
		setLoading(true);
		if (projectContext.project?.id) {
			try {
				const { url, options } = ADD_USER_TO_PROJECT(
					projectContext.project.id,
					isAuthenticated()?.token || ''
				);
				await api[options.method](url, body, options);
				window.location.href = '/home';
			} catch (error) {
				const err = error as AxiosError<ErrorResponse>;
				setError(err?.response?.data?.error || 'Erro inesperado');
			} finally {
				setLoading(false);
			}
		}
	};

	function copyCurrentUrlToClipboard() {
		const currentUrl = window.location.href;

		// Verifica se a API Clipboard está disponível
		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard
				.writeText(currentUrl)
				.then(() => {
					setOpenSnackbar(true);
				})
				.catch((err) => {
					console.error('Falha ao copiar a URL:', err);
				});
		} else {
			// Método de fallback para navegadores mais antigos
			const textArea = document.createElement('textarea');
			textArea.value = currentUrl;
			textArea.style.position = 'fixed'; // Evita que o textarea afete o layout da página
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand('copy');
				setOpenSnackbar(true);
			} catch (err) {
				console.error('Falha ao copiar a URL:', err);
			}
			document.body.removeChild(textArea);
		}
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (projectContext.project?.id) {
			for (const email of emails) {
				AddUserToProject({
					email,
					role: roles[email],
					projectId: projectContext.project.id,
				});
			}
		}
	};

	return (
		<section className="add-user-form flex column gap-125">
			<div className="add-user-form-header">
				<h2>
          Compartilhe &quot;{projectContext.project?.name}&quot; com outros usuários
				</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			<Form>
				<AddUserEmailComboBox emails={emails} setEmails={setEmails} />

				{emails.length > 0 && (
					<div className="pessoas-convidadas">
						<h3>Compartilhar com:</h3>
						<br />
						<ul className="flex column gap-5">
							{emails.map((email) => {
								return (
									<li key={email} className="flex space-between align-center">
										<span>{email}</span>
										<Select
											style={{ padding: '0.5rem' }}
											defaultOption="Selecione uma função"
											name="role"
											options={[
												{
													value: 'OBSERVER',
													label: 'Observador',
												},
												{
													value: 'COLLABORATOR',
													label: 'Colaborador',
												},
												{
													value: 'ADMIN',
													label: 'Administrador',
												},
											]}
											value={roles[email] || ''}
											onChange={(e) =>
												setRoles({ ...roles, [email]: e.target.value })
											}
										></Select>
									</li>
								);
							})}
						</ul>
					</div>
				)}

				{emails.length > 0 && <hr />}

				<div className="pessoas-com-acesso">
					<h3>Pessoas com acesso:</h3>
					<br />
					<ul className="flex column gap-15">
						{projectContext.project?.users.map((user) => {
							return (
								<li key={user.id} className="flex align-center gap-1">
									<ProfilePicture user={user.user}/>
									<div className="flex column">
										<span>
											{user.user.name}{' '}
											{user.user.name == isAuthenticated()?.name && '(você)'}
										</span>
										<small>{user.user.email}</small>
									</div>
									<h4 style={{marginLeft: 'auto'}}>{formatRoles[user.role]}</h4>
								</li>
							);
						})}
					</ul>
				</div>
				<br />

				{loading ? (
					<Loading />
				) : (
					<div className="flex space-between">
						<Button
							theme="helper"
							text="Copiar link"
							onClick={copyCurrentUrlToClipboard}
						/>
						<Button
							theme="primary"
							text="Compartilhar"
							onClick={handleSubmit}
						/>
					</div>
				)}
				<Error error={error} />
			</Form>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={2500}
				onClose={handleCloseSnackbar}
				message="Link copiado para a área de transferência"
			/>
		</section>
	);
};

export default AddUserToProjectForm;
