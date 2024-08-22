import { Link } from 'react-scroll'
import './Logo.scss'
import React from 'react'
import LogoImg from '../../assets/logo.svg'

interface LogoProps {
    toggleMenu?: () => void
}

export const Logo: React.FC<LogoProps> = ({toggleMenu}: LogoProps) => {
    return (
        <Link to="home" smooth={true} duration={500} spy={true} activeClass="active" className="logo" onClick={toggleMenu}>
            <img src={LogoImg} alt="Logo do Lexhub" title="Logo do Lexhub" />
        </Link>
    )
}