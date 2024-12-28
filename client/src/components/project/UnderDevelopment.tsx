import { ReactNode } from 'react';
import './UnderDevelopment.scss';

export const UnderDevelopment = (): ReactNode => {
	return (
		<div className="under-development">
			<span>&#9888;</span>
			<p>Esta página está em desenvolvimento. <br/>Aqui ficarão as atualizações dos seus projetos. Aguarde mais um pouco.</p>
		</div>
	);
};