import { FC, FormEvent, useContext, useEffect, useState } from 'react';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Form from '../forms/Form';
import './UpdateUserForm.scss';
import { UserContext } from '../../context/UserContext';
import Loading from '../helper/Loading';
import {  UPDATE_USER } from '../../api';
import api from '../../lib/axios';
import useForm from '../../hooks/useForm';
import Error from '../helper/Error';
import { ErrorResponse } from '../../shared/interfaces';
import { AxiosError } from 'axios';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface UpdateUserRequestDTO {
    name: string;
    currentPassword: string | null;
    newPassword: string | null;
}

const UpdateUserForm: FC = () => {

	const { isAuthenticated, refreshUser } = useContext(UserContext) || {};
    
	const nameEdit = useForm('dontValidateName');
	const emailEdit = useForm('dontValidateEmail');

	const currentPassword = useForm('password');
	const newPassword = useForm('password');
	const confirmPassword = useForm('password');

	useEffect(() => {
		nameEdit.setValue(isAuthenticated()?.name || '');
		emailEdit.setValue(isAuthenticated()?.email || '');
	}, []);


	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const updateUser = async (body: UpdateUserRequestDTO) => {
		try {
			const { url, options } = UPDATE_USER(
				isAuthenticated()?.token || ''
			);
			await api[options.method](url, body, options);
			refreshUser();
			window.location.href = '/configuracoes';
		} catch (error) {
			const err = error as AxiosError<ErrorResponse>;
			setError(err?.response?.data?.error || 'Erro inesperado');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		if (newPassword.value && !currentPassword.value) {
			currentPassword.setError('Preencha sua senha atual');
			return;
		}
		if (currentPassword.value && !newPassword.value) {
			newPassword.setError('Preencha uma senha válida');
			return;
		}
		if (newPassword.value && !newPassword.validate()) {
			return;
		}
		if (newPassword.value !== confirmPassword.value) {
			confirmPassword.setError('As senhas não coincidem.');
			return;
		}
		e.preventDefault();
		if (nameEdit.validate()) {
			updateUser({
				name: nameEdit.value,
				currentPassword: currentPassword.value,
				newPassword: newPassword.value || ''
			});
		}
	};

	return (
		<section className="update-user-form flex column gap-125">
			<div className="title">
				<h1>Informações da conta</h1>
			</div>
			<Form>
				<Input
					type="name"
					name="name"
					placeholder="Seu nome"
					label="Nome completo"
					autoFocus
					{...nameEdit}
					onInput={() => {setError('');}}
				/>
				<Input
					type="email"
					name="email"
					placeholder="seu@email.com"
					label="E-mail"
					disabled={true}
					{...emailEdit}
					onInput={() => {setError('');}}
				/>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1-content"
						id="panel1-header"
					>
						<h2>Alterar senha</h2>
					</AccordionSummary>
					<AccordionDetails>
						<Form>
							<Input
								type="password"
								name="current-password"
								placeholder="***********"
								label="Senha atual"
								{...currentPassword}
								onInput={() => {setError('');}}
							/>
							<Input
								type="password"
								name="password"
								placeholder="***********"
								label="Nova senha"
								{...newPassword}
								onInput={() => {setError('');}}
							/>
							<Input
								type="password"
								name="password-confirm"
								placeholder="***********"
								label="Confirme sua nova senha"
								{...confirmPassword}
								onInput={() => {setError('');}}
							/>
						</Form>
					</AccordionDetails>
				</Accordion>
				

				{loading ? (
					<Loading />
				) : (
					<Button theme="primary" text="Atualizar" onClick={handleSubmit} />
				)}
				<Error error={error} />
			</Form>
		</section>
	);
};

export default UpdateUserForm;
