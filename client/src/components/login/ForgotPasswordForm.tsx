import { ChangeEvent, FC, FormEvent, useState } from 'react';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Form from '../forms/Form';
import './ForgotPasswordForm.scss';

interface ForgotPasswordProps {
  setCurrentScreen: (screen: string) => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({
	setCurrentScreen,
}: ForgotPasswordProps) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		try {
			setFormData({
				email: '',
				password: '',
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<section className="forgot-password-form flex column gap-125">
			<div className="title">
				<h1>Esqueceu sua senha?</h1>
				<p className="reset-instructions">
          Não se preocupe, vamos te enviar instruções de recuperação de senha.
					<br />
          Ou&nbsp;
					<span onClick={() => setCurrentScreen('login')} className="pointer">
            volte para o login.
					</span>
				</p>
			</div>
			<Form>
				<Input
					type="email"
					name="email"
					placeholder="seu@email.com"
					label="E-mail"
					value={formData.email}
					onChange={handleChange} onInput={function (e: ChangeEvent<HTMLInputElement>): void {
						throw new Error('Function not implemented.');
					} } onBlur={function (e: ChangeEvent<HTMLInputElement>): void {
						throw new Error('Function not implemented.');
					} }				/>
				<Button theme="primary" text="Enviar e-mail de recuperação" onClick={handleSubmit} />
			</Form>
		</section>
	);
};

export default ForgotPassword;
