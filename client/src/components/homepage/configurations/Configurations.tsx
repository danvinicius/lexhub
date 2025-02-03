import { ReactNode } from 'react';
import '../overview/Overview.scss';
import UpdateUserForm from '../../user/user-form/UpdateUserForm';

export const Configurations = (): ReactNode => {
	return (

		<div className="overview">
			{<UpdateUserForm/>}
		</div>
	);
};