import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { LogoutOutlined } from '@mui/icons-material';
import './LogoutButton.scss';

export const LogoutButton = () => {
	const { logout} = useContext(UserContext);
	const handleLogout = () => {
		if (logout) logout();
	};
	return (
		<div className='logout' onClick={handleLogout}>
			<LogoutOutlined/>
			<p>Sair da conta</p>
		</div>
	);
};