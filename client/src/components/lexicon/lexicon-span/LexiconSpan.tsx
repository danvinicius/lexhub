import { FC, MouseEventHandler, ReactNode, useContext } from 'react';
import './LexiconSpan.scss';
import { ProjectContext } from '../../../context/ProjectContext';
import { ILexiconSymbol } from '../../../shared/interfaces';
import { useHelpers } from '../../../hooks/useHelpers';

interface LexiconSpanProps {
    id: string;
    resource: string;
    name: string;
    type: string;
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
}
const LexiconSpan: FC<LexiconSpanProps> = ({ id, name, type, children }: LexiconSpanProps): ReactNode => {
    const { project, setSymbol, setCurrentTab } = useContext(ProjectContext || {});
    const { slugify } = useHelpers();

    const setCurrentSymbol = () => {
        const currentSymbol =
            project?.symbols.find(
                (symbol: ILexiconSymbol) => symbol.name === name || symbol.synonyms.find((synonym) => synonym.name.content == name)
            ) || null;
        if (currentSymbol) {
            setSymbol(currentSymbol);
        }
    };

    const goToScenario = () => {
        setSymbol(null);
        setCurrentTab(0);
        setTimeout(() => {
            window.location.href = `/projeto/${project?.id}#${id}-${slugify(name)}`;
        }, 50);
    };

    return type == 'símbolo' ? (
        <span className='lexicon-span' onClick={() => setCurrentSymbol()}>
            {children}
        </span>
    ) : (
        <span title={`${type}: ${name}`} className='lexicon-span' onClick={goToScenario}>
            {name}
        </span>
    );
};

export default LexiconSpan;
