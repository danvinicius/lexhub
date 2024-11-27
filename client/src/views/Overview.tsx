import { ReactNode, useState } from 'react';
import Button from '../components/forms/Button';
import './css/Overview.scss';
import CreateProject from './CreateProject';
import { UnderDevelopment } from './UnderDevelopment';

export const OverView = (): ReactNode => {
	const [isCreateProject, setIsCreateProject] = useState(false);
	return (

		<div className="overview">
			<Button theme="primary" text="Criar projeto" onClick={() => setIsCreateProject(true)}></Button>
			{isCreateProject && <CreateProject/>}
			{!isCreateProject && 
			<UnderDevelopment/>
			}
		</div>
	);
};