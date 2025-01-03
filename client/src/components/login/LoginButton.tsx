import { LoginOutlined } from '@mui/icons-material';
import './LogoutButton.scss';
import { useNavigate } from 'react-router-dom';

export const LoginButton = () => {
    const navigate = useNavigate();
	const handleLogin = () => {
		navigate('/login')
	};
	return (
		<div className='logout' onClick={handleLogin}>
			<LoginOutlined/>
			<p className='success'>Fazer login</p>
		</div>
	);
};