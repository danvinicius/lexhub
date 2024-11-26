import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { LogoutOutlined } from '@mui/icons-material';
import './LogoutButton.scss';

export const LogoutButton = () => {
	const {isAuthenticated, logout} = useContext(UserContext);
	const handleLogout = () => {
		if (isAuthenticated()?.token) {
			if (logout) logout();
		}
	};
	return (
		<div className='logout'>
			<LogoutOutlined/>
			<p onClick={handleLogout}>Sair da conta</p>
		</div>
	);
};