import { MouseEventHandler, ReactNode, useContext } from "react";
import "./LexiconSpan.scss";
import { ProjectContext } from "../../context/ProjectContext";
import { ISymbol } from "../../shared/interfaces";
import { Link } from "react-scroll";
import { useHelpers } from "../../hooks/useHelpers";

interface LexiconSpanProps {
  resource: string;
  name: string;
  type: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const LexiconSpan = ({ name, type, children }: LexiconSpanProps) => {
  const { project, setSymbol } = useContext(ProjectContext || {});
  const { slugify } = useHelpers();

  const setCurrentSymbol = () => {
    const currentSymbol = project?.symbols.find(
      (symbol: ISymbol) => symbol.name == name
    );
    if (currentSymbol) {
      setSymbol(currentSymbol);
    }
  };

  return type == "símbolo" ? (
    <span
      title={`${type}: ${name}`}
      className="lexicon-span"
      onClick={() => setCurrentSymbol()}
    >
      {children}
    </span>
  ) : (
    <Link
      className="lexicon-span"
      to={slugify(name)}
      spy={true}
      hashSpy={true}
      smooth={true}
      duration={800}
      containerId="scenarios-list"
      onClick={() => setSymbol(null)}
    >
      {name}
    </Link>
  );
};

export default LexiconSpan;
