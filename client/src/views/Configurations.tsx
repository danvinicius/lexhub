import { ReactNode } from 'react';
import Button from '../components/forms/Button';
import './css/Overview.scss';
import UpdateUserForm from '../components/user/UpdateUserForm';

export const Configurations = (): ReactNode => {
	return (

		<div className="overview">
			{<UpdateUserForm/>}
			
		</div>
	);
};