import { ReactNode } from 'react';

import UpdateUserForm from '../../user/user-form/UpdateUserForm';
import '../overview/Overview.scss';

export const Configurations = (): ReactNode => {
	return (

		<div className="overview">
			{<UpdateUserForm/>}
		</div>
	);
};