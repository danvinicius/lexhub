import ChevronRight from '../../assets/icon/ChevronRight.svg';
import './Navbar.scss';
import { FC, useContext, useEffect, useState } from 'react';
import './NavbarMenuLinks.scss';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { AuthMenu } from './AuthMenu';

interface NavbarMenuLinksProps {
    toggleMenu?: () => void;
    light?: boolean;
}

export const NavbarMenuLinks: FC<NavbarMenuLinksProps> = ({ toggleMenu, light }: NavbarMenuLinksProps) => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const { isAuthenticated } = useContext(UserContext) || {};

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
                <Link to='/como-usar' onClick={isMobile ? handleClick : undefined}>
                    {isMobile ? (
                        <div className='arrow-link'>
                            Como usar
                            <img src={ChevronRight} alt='Ícone seta para direita' title='Ícone seta para direita' />
                        </div>
                    ) : (
                        'Como usar'
                    )}
                </Link>
            </li>
            <li>
                <Link to='/blog' onClick={isMobile ? handleClick : undefined}>
                    {isMobile ? (
                        <div className='arrow-link'>
                            Nosso blog
                            <img src={ChevronRight} alt='Ícone seta para direita' title='Ícone seta para direita' />
                        </div>
                    ) : (
                        'Nosso blog'
                    )}
                </Link>
            </li>
            {isAuthenticated()?.email && (
                <li>
                    <AuthMenu />
                </li>
            )}
        </ul>
    );
};
