import { FC } from 'react';
import './css/CreateProject.scss';
import CreateProjectForm from '../components/project/CreateProjectForm';

const CreateProject: FC = () => {
	return (
		<div className='create-project'>
			<div className='container'>
				<h1>Crie um novo projeto</h1>
				<hr />
				<CreateProjectForm></CreateProjectForm>
			</div>
		</div>
	);
};

export default CreateProject;
