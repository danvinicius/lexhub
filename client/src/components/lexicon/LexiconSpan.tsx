import { FC, MouseEventHandler, ReactNode, useContext, useState } from 'react';
import './LexiconSpan.scss';
import { ProjectContext } from '../../context/ProjectContext';
import { ILexiconSymbol } from '../../shared/interfaces';
import { useHelpers } from '../../hooks/useHelpers';
import SymbolDetails from '../symbol/SymbolDetails';

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

    const [localSymbol, setLocalSymbol] = useState<ILexiconSymbol | null>(null);

    const setCurrentSymbol = (isClick = true) => {
        const currentSymbol = project?.symbols.find((symbol: ILexiconSymbol) => symbol.name == name) || null;
        setLocalSymbol(currentSymbol);
        if (isClick) {
            if (currentSymbol) {
                setSymbol(currentSymbol);
            }
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
        <span
            className='lexicon-span'
            onClick={() => setCurrentSymbol()}
            onMouseOver={() => setCurrentSymbol(false)}
            onMouseLeave={() => setLocalSymbol(null)}
        >
            {children}
            {localSymbol && <SymbolDetails symbol={localSymbol} withOptions={false}></SymbolDetails>}
        </span>
    ) : (
        <span title={`${type}: ${name}`} className='lexicon-span' onClick={goToScenario}>
            {name}
        </span>
    );
};

export default LexiconSpan;
