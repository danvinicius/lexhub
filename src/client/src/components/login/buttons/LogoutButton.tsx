import { useContext } from 'react';
import { LogoutOutlined } from '@mui/icons-material';

import { UserContext } from '../../../context/UserContext';

import './Authentication.scss';

export const LogoutButton = () => {
	const { logout} = useContext(UserContext);
	const handleLogout = () => {
		if (logout) logout();
	};
	return (
		<div className='authentication logout' onClick={handleLogout}>
			<LogoutOutlined/>
			<p>Sair da conta</p>
		</div>
	);
};