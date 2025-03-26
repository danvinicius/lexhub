import { FC, useState } from 'react';

import LoginForm from '../components/login/login-form/LoginForm';
import SignupForm from '../components/login/signup-form/SignupForm';
import LoginBanner from '../components/login/login-banner/LoginBanner';
import ForgotPasswordForm from '../components/login/forgot-password-form/ForgotPasswordForm';
import { Navbar } from '../components/navbar/Navbar';
import './css/Login.scss';

const Login: FC = () => {
	const [currentScreen, setCurrentScreen] = useState('login');
	return (
		<>
			<Navbar/>
			<div className="login flex">
				<LoginBanner />
				{currentScreen === 'login' && (
					<LoginForm setCurrentScreen={setCurrentScreen} />
				)}
				{currentScreen === 'signup' && (
					<SignupForm setCurrentScreen={setCurrentScreen} />
				)}
				{currentScreen === 'forgot' && (
					<ForgotPasswordForm setCurrentScreen={setCurrentScreen} />
				)}
			</div>
		</>
	);
};

export default Login;
