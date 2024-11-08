import ChevronRight from '../../assets/icon/ChevronRight.svg';
import './Navbar.scss';
import { FC, useContext, useEffect, useState } from 'react';
import './NavbarMenuLinks.scss';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Button from '../forms/Button';

interface NavbarMenuLinksProps {
  toggleMenu?: () => void;
}

export const NavbarMenuLinks: FC<NavbarMenuLinksProps> = ({
	toggleMenu,
}: NavbarMenuLinksProps) => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const { isAuthenticated, logout } = useContext(UserContext) || {};

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	const isMobile = width <= 998;

	const handleClick = () => {
		if (toggleMenu) {
			toggleMenu();
		}
	};

	const handleLogout = () => {
		if (isAuthenticated()?.token) {
			if (logout) logout();
		}
	};

	return (
		<ul className="navbar-menu">
			<li>
				<Link to="/sobre" onClick={isMobile ? handleClick : undefined}>
					{isMobile ? (
						<div className="arrow-link">
              Sobre o Lexhub
							<img
								src={ChevronRight}
								alt="Ícone seta para direita"
								title="Ícone seta para direita"
							/>
						</div>
					) : (
						'Sobre o Lexhub'
					)}
				</Link>
			</li>
			<li>
				<Link to="/como-usar" onClick={isMobile ? handleClick : undefined}>
					{isMobile ? (
						<div className="arrow-link">
              Como usar
							<img
								src={ChevronRight}
								alt="Ícone seta para direita"
								title="Ícone seta para direita"
							/>
						</div>
					) : (
						'Como usar'
					)}
				</Link>
			</li>
			<li>
				<Link to="/blog" onClick={isMobile ? handleClick : undefined}>
					{isMobile ? (
						<div className="arrow-link">
              Nosso blog
							<img
								src={ChevronRight}
								alt="Ícone seta para direita"
								title="Ícone seta para direita"
							/>
						</div>
					) : (
						'Nosso blog'
					)}
				</Link>
			</li>
			<li>
				<Button
					theme="primary"
					text={isAuthenticated()?.token ? 'Sair' : 'Fazer login'}
					onClick={handleLogout}
				></Button>
			</li>
		</ul>
	);
};
