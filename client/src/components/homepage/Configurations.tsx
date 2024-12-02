import { ReactNode } from 'react';
import './Overview.scss';
import UpdateUserForm from '../user/UpdateUserForm';

export const Configurations = (): ReactNode => {
	return (

		<div className="overview">
			{<UpdateUserForm/>}
			
		</div>
	);
};