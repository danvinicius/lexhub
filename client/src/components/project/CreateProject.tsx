import { FC } from 'react';
import './CreateProject.scss';
import CreateProjectForm from '../../components/project/CreateProjectForm';

const CreateProject: FC = () => {
	return (
		<div className='create-project'>
			<CreateProjectForm></CreateProjectForm>
		</div>
	);
};

export default CreateProject;
