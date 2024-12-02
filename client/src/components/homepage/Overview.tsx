import { ReactNode, useState } from 'react';
import Button from '../forms/Button';
import './Overview.scss';
import { UnderDevelopment } from '../project/UnderDevelopment';
import CreateProject from '../project/CreateProject';

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