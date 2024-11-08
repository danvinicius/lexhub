import './Logo.scss';
import { FC } from 'react';
import LogoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

interface LogoProps {
    toggleMenu?: () => void
}

export const Logo: FC<LogoProps> = ({toggleMenu}: LogoProps) => {
	return (
		<Link to="/" className="logo" onClick={toggleMenu}>
			<img src={LogoImg} alt="Logo do Lexhub" title="Logo do Lexhub" />
		</Link>
	);
};