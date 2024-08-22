import React from "react";
import { Logo } from "../logo/Logo";
import "./Navbar.scss";
import Hamburger from "../../assets/icon/Hamburger.svg";
import Close from "../../assets/icon/Close.svg";
import { SocialMediaLinks } from "../contact/SocialMediaLinks";
import { NavbarMenuLinks } from "./NavbarMenuLinks";


interface NavbarProps {
  navBg: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ navBg }: NavbarProps) => {
  const [isMobileMenuActive, setIsMobileMenuActive] = React.useState(false);

  const toggleMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  return (
    <nav role="navigation" className={`navbar ${navBg ? "navBg" : ""}`}>
      <div className="container">
        <Logo />
        <NavbarMenuLinks />
      </div>

      <div className="menuToggle">
        <Logo />
        <button className="menuToggleButton" onClick={toggleMenu}>
          {!isMobileMenuActive && <img src={Hamburger} alt="Ícone barra tripla abrir menu" title="Ícone barra tripla abrir menu" />}
          {isMobileMenuActive && <img src={Close} alt="Ícone 'X' fechar menu" title="Ícone 'X' fechar menu" />}
        </button>
        <div className={`menu ${isMobileMenuActive ? "active" : ""}`}>
          <div className="menuHeader" onClick={toggleMenu}>
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
