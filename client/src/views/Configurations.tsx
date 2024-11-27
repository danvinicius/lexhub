import { ReactNode } from 'react';
import './css/Overview.scss';
import UpdateUserForm from '../components/user/UpdateUserForm';

export const Configurations = (): ReactNode => {
	return (

		<div className="overview">
			{<UpdateUserForm/>}
			
		</div>
	);
};