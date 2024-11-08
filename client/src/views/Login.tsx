import { FC, useState } from 'react';
import LoginForm from '../components/login/LoginForm';
import SignupForm from '../components/login/SignupForm';
import LoginBanner from '../components/login/LoginBanner';
import ForgotPasswordForm from '../components/login/ForgotPasswordForm';
import './css/Login.scss';
import { Navbar } from '../components/navbar/Navbar';

const Login: FC = () => {
	const [currentScreen, setCurrentScreen] = useState('login');
	return (
		<>
			<Navbar navBg={true}/>
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
