import { useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@mui/icons-material';

import './Authentication.scss';

interface LoginButtonProps {
	light?: boolean;
}

export const LoginButton = ({light}: LoginButtonProps) => {
    const navigate = useNavigate();
	const handleLogin = () => {
		navigate('/login')
	};
	return (
		<div className={`authentication ${light ? 'light' : ''}`} onClick={handleLogin}>
			<LoginOutlined/>
			<p>Fazer login</p>
		</div>
	);
};