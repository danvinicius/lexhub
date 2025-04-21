import { FC, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { UserContext } from '../../../context/UserContext';

import ChevronRight from '../../../assets/icon/ChevronRight.svg';
import { AuthMenu } from '../auth-menu/AuthMenu';
import { LoginButton } from '../../login/buttons/LoginButton';
import '../Navbar.scss';
import './NavbarMenuLinks.scss';

interface NavbarMenuLinksProps {
    toggleMenu?: () => void;
    light?: boolean;
}

export const NavbarMenuLinks: FC<NavbarMenuLinksProps> = ({ toggleMenu, light }: NavbarMenuLinksProps) => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const { isAuthenticated } = useContext(UserContext) || {};
    const location = useLocation();
    const isLogin = location.pathname == '/login'

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

    return (
        <ul className={`navbar-menu ${light ? 'light' : ''}`}>
            <li>
                <Link to='/sobre' onClick={isMobile ? handleClick : undefined}>
                    {isMobile ? (
                        <div className='arrow-link'>
                            Sobre o Lexhub
                            <img src={ChevronRight} alt='Ícone seta para direita' title='Ícone seta para direita' />
                        </div>
                    ) : (
                        'Sobre o Lexhub'
                    )}
                </Link>
            </li>
            <li>
                <Link to='/blog' onClick={isMobile ? handleClick : undefined}>
                    {isMobile ? (
                        <div className='arrow-link'>
                            Blog
                            <img src={ChevronRight} alt='Ícone seta para direita' title='Ícone seta para direita' />
                        </div>
                    ) : (
                        'Blog'
                    )}
                </Link>
            </li>
            <li>{isAuthenticated()?.email ? <AuthMenu /> : (!isLogin && <LoginButton light={light}/>)}</li>
        </ul>
    );
};
