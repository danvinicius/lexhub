import { ReactNode, useState } from 'react';
import Button from '../../forms/button/Button';
import './Overview.scss';
import { LastChanges } from '../last-changes/LastChanges';
import Arrow from '../../../assets/icon/Arrow_Left_M.svg';
import ProjectForm from '../../project/project-form/ProjectForm';

export const OverView = (): ReactNode => {
	const [isCreateProject, setIsCreateProject] = useState(false);
	return (

		<div className="overview flex column gap-1">
			<div className="flex space-between align-center" style={{marginBottom: '2rem'}}>
				{isCreateProject ?
					<div className='flex gap-1 align-center'>
						<img
							className='pointer'
							src={Arrow}
							alt="Voltar ao sumário"
							title="Voltar ao sumário"
							onClick={() => setIsCreateProject(false)}
						/><h1>Novo projeto</h1></div> :
					<h1>Visão geral</h1>
				}
				{!isCreateProject && <Button theme="primary" text="Criar projeto" onClick={() => setIsCreateProject(true)}></Button>}
				
			</div>
			{isCreateProject && <ProjectForm/>}
			{!isCreateProject && <>
				<LastChanges/>
			</>
			}
		</div>
	);
};