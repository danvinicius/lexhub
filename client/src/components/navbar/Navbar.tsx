import { FC, useState } from 'react';
import { Logo } from '../logo/Logo';
import './Navbar.scss';
import Hamburger from '../../assets/icon/Hamburger.svg';
import Close from '../../assets/icon/Close.svg';
import { NavbarMenuLinks } from './navbar-menu-links/NavbarMenuLinks';

export const Navbar: FC = () => {
	const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

	const toggleMenu = () => {
		setIsMobileMenuActive(!isMobileMenuActive);
	};

	return (
		<nav role="navigation" className='navbar'>
			<div className="container">
				<Logo />
				<NavbarMenuLinks />
			</div>

			<div className="menu-toggle">
				<Logo />
				<button className="menu-toggle-button" onClick={toggleMenu}>
					{!isMobileMenuActive && <img src={Hamburger} alt="Ícone barra tripla abrir menu" title="Ícone barra tripla abrir menu" />}
					{isMobileMenuActive && <img src={Close} alt="Ícone 'X' fechar menu" title="Ícone 'X' fechar menu" />}
				</button>
				<div className={`menu ${isMobileMenuActive ? 'active' : ''}`}>
					<div className="menu-header" onClick={toggleMenu}>
						<Logo toggleMenu={toggleMenu} />
					</div>
					<NavbarMenuLinks toggleMenu={toggleMenu}/>
					<h3>Nos siga nas redes sociais</h3>
					{/* <SocialMediaLinks /> */}
				</div>
			</div>
		</nav>
	);
};
