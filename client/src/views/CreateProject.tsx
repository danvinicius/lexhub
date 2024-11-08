import { FC } from 'react';
import './css/CreateProject.scss';
import { Navbar } from '../components/navbar/Navbar';
import CreateProjectForm from '../components/project/CreateProjectForm';

const CreateProject: FC = () => {
	return (
		<>
			<Navbar navBg={true} />
			<div className="create-project">
				<div className="container">
					<h1>Crie um novo projeto</h1>
					<hr />
					<CreateProjectForm></CreateProjectForm>
				</div>
			</div>
		</>
	);
};

export default CreateProject;
