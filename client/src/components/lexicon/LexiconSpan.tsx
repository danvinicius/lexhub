import { FC, MouseEventHandler, ReactNode, useContext } from 'react';
import './LexiconSpan.scss';
import { ProjectContext } from '../../context/ProjectContext';
import { ISymbol } from '../../shared/interfaces';
import { useHelpers } from '../../hooks/useHelpers';

interface LexiconSpanProps {
  id: string;
  resource: string;
  name: string;
  type: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const LexiconSpan: FC<LexiconSpanProps> = ({ id, name, type, children }: LexiconSpanProps): ReactNode => {
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

	const goToScenario = () => {
		setSymbol(null);
		window.location.href = `/projeto/${project?.id}#${id}-${slugify(name)}`;
	};

	return type == 'símbolo' ? (
		<span
			title={`${type}: ${name}`}
			className="lexicon-span"
			onClick={() => setCurrentSymbol()}
		>
			{children}
		</span>
	) : (
		<span
			title={`${type}: ${name}`}
			className="lexicon-span"
			onClick={goToScenario}
		>
			{name}
		</span>
	);
};

export default LexiconSpan;
