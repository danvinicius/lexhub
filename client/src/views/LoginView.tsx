import { FC, useState } from 'react';

import LoginForm from '../components/login/login-form/LoginForm';
import SignupForm from '../components/login/signup-form/SignupForm';
import LoginBanner from '../components/login/login-banner/LoginBanner';
import ForgotPasswordForm from '../components/login/forgot-password-form/ForgotPasswordForm';
import { Navbar } from '../components/navbar/Navbar';
import './css/Login.scss';
import VerifyRecoveryCodeForm from '../components/login/verify-code-form/VerifyRecoveryCodeForm';
import ResetPasswordForm from '../components/login/reset-password-form/ResetPasswordForm';

const Login: FC = () => {
	const [currentScreen, setCurrentScreen] = useState('login');
	const [email, setEmail]	= useState('');
	const [verifyToken, setVerifyToken] = useState('');
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
				{currentScreen === 'forgot-password' && (
					<ForgotPasswordForm setCurrentScreen={setCurrentScreen} setEmail={setEmail} />
				)}
				{currentScreen === 'verify-recovery-code' && (
					<VerifyRecoveryCodeForm setCurrentScreen={setCurrentScreen} email={email} setVerifyToken={setVerifyToken}/>
				)}
				{currentScreen === 'reset-password' && (
					<ResetPasswordForm verifyToken={verifyToken} email={email} />
				)}
			</div>
		</>
	);
};

export default Login;
