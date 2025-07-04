import { ReactNode } from 'react';

import loginBannerImg from '../../../assets/img/login-banner3.png';
import './LoginBanner.scss';

const LoginBanner = (): ReactNode => {
	return (
		<section className="login-banner flex column justify-center align-center gap-2">
			<img
				src={loginBannerImg}
				alt="Login banner image: Woman accessing e-commerce on mobile"
			/>
			<div className="content flex column">
				<h2>Bem-vindo(a)!</h2>
				<p>
          Transforme suas ideias em requisitos claros e gerenciáveis! Experimente
          o Lexhub e melhore a eficiência dos seus projetos de software.
				</p>
			</div>
		</section>
	);
};

export default LoginBanner;
