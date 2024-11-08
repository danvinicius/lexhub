import { FC, useContext } from 'react';
import './css/Home.scss';
import { Navbar } from '../components/navbar/Navbar';
import ProjectsList from '../components/project/ProjectsList';
import Banner from '../components/home/Banner';
import UpdatesList from '../components/home/UpdatesList';
import { UserContext } from '../context/UserContext';

const Home: FC = () => {
	const { isAuthenticated } = useContext(UserContext) || {};
	const firstName = isAuthenticated()?.name.split(' ')[0];
	return (
		<>
			<Navbar navBg={true} />
			<div className="home">
				<Banner></Banner>
				<ProjectsList></ProjectsList>
				<div className="container">
					<h1>Bem-vindo, {firstName}</h1>
					<hr />
					<UpdatesList></UpdatesList>
				</div>
			</div>
		</>
	);
};

export default Home;
