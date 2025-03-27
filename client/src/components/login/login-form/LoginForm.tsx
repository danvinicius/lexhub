import { FC, FormEvent, useContext, useState } from 'react';
import { AxiosError } from 'axios';

import { AUTH_USER } from '../../../api';
import api from '../../../lib/axios';
import { ErrorResponse } from '../../../shared/interfaces';
import useForm from '../../../hooks/useForm';
import { AuthUserRequestDTO, UserContext } from '../../../context/UserContext';

import Button from '../../forms/button/Button';
import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import PasswordInput from '../../forms/input/PasswordInput';
import Loading from '../../helper/Loading';
import Error from '../../helper/Error';
import './LoginForm.scss';
interface LoginFormProps {
  setCurrentScreen: (screen: string) => void;
}

const LoginForm: FC<LoginFormProps> = ({
	setCurrentScreen,
}: LoginFormProps) => {
	const email = useForm('dontValidateEmail');
	const password = useForm('dontValidatePassword');
  
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const {setUser} = useContext(UserContext) || {};

	const login = async (body: AuthUserRequestDTO) => {
		setLoading(true);
		try {
			const { url, options } = AUTH_USER();
			const response = await api[options.method](url, body);
			if (setUser) setUser(response.data);
		} catch (error) {
			const err = error as AxiosError<ErrorResponse>;
			setError(err?.response?.data?.error || 'Erro inesperado');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (email.validate() && password.validate()) {
			login({ email: email.value, password: password.value });
		}
	};

	return (
		<section className="login-form flex column gap-125">
			<div className="title flex column gap-5">
				<h1>Login</h1>
				<p className="signup">
          Ainda não possui uma conta? &nbsp;
					<span onClick={() => setCurrentScreen('signup')} className="action pointer blue">
            Se inscreva.
					</span>
				</p>
			</div>
			<Form>
				<Input
					type="email"
					name="email"
					placeholder="seu@email.com"
					label="E-mail"
					autoFocus
					{...email}
					onInput={() => {setError('');}}
				/>
				<PasswordInput
					placeholder="*********"
					label="Senha"
					setCurrentScreen={setCurrentScreen}
					enableForgotPassword={true}
					{...password}
					onInput={() => {setError('');}}
				/>
				{loading ? (
					<Loading />
				) : (
					<Button theme="primary" text="Entrar" onClick={handleSubmit} />
				)}
				<Error error={error} />
			</Form>
		</section>
	);
};

export default LoginForm;
