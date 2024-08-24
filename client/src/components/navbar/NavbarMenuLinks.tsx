import ChevronRight from "../../assets/icon/ChevronRight.svg";
import "./Navbar.scss";
import React from "react";
import "./NavbarMenuLinks.scss";
import { Link } from "react-router-dom";

interface NavbarMenuLinksProps {
  toggleMenu?: () => void;
}

export const NavbarMenuLinks: React.FC<NavbarMenuLinksProps> = ({
  toggleMenu,
}: NavbarMenuLinksProps) => {
  const [width, setWidth] = React.useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 998;

  const handleClick = () => {
    if (toggleMenu) {
      toggleMenu();
    }
  };

  return (
    <ul className="navbarMenu">
      <li>
        <Link to="sobre" onClick={isMobile ? handleClick : undefined}>
          {isMobile ? (
            <div className="arrowLink">
              Sobre o Lexhub
              <img
                src={ChevronRight}
                alt="Ícone seta para direita"
                title="Ícone seta para direita"
              />
            </div>
          ) : (
            "Sobre o Lexhub"
          )}
        </Link>
      </li>
      <li>
        <Link to="como-usar" onClick={isMobile ? handleClick : undefined}>
          {isMobile ? (
            <div className="arrowLink">
              Como usar
              <img
                src={ChevronRight}
                alt="Ícone seta para direita"
                title="Ícone seta para direita"
              />
            </div>
          ) : (
            "Como usar"
          )}
        </Link>
      </li>
      <li>
        <Link to="blog" onClick={isMobile ? handleClick : undefined}>
          {isMobile ? (
            <div className="arrowLink">
              Nosso blog
              <img
                src={ChevronRight}
                alt="Ícone seta para direita"
                title="Ícone seta para direita"
              />
            </div>
          ) : (
            "Nosso blog"
          )}
        </Link>
      </li>
      <li>
        <Link to="login" onClick={isMobile ? handleClick : undefined}>
          {isMobile ? (
            <div className="arrowLink">
              Entrar
              <img
                src={ChevronRight}
                alt="Ícone seta para direita"
                title="Ícone seta para direita"
              />
            </div>
          ) : (
            "Entrar"
          )}
        </Link>
      </li>
    </ul>
  );
};
