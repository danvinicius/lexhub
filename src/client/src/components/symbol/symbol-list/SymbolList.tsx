import { FC, ReactNode } from 'react';
import { Element } from 'react-scroll';

import { ILexiconSymbol } from '../../../shared/interfaces';
import { useHelpers } from '../../../hooks/useHelpers';

import SymbolDetails from '../symbol-details/SymbolDetails';
import './SymbolList.scss';

interface ISymbolsListProps {
  symbols: ILexiconSymbol[];
  resetProjectInfo: () => void;
}

const SymbolsList: FC<ISymbolsListProps> = ({ symbols, resetProjectInfo }: ISymbolsListProps): ReactNode => {
	const { slugify } = useHelpers();
	return (
		<section className="symbols-list-container" id="symbols-list">
			<div className="symbols-list slide-right">
				{!!symbols?.length && (
					<ul>
						{symbols.map((symbol: ILexiconSymbol) => {
							return (
								<li key={`${symbol.id}-${slugify(symbol.name)}`}>
									<Element
										key={`${symbol.id}-${slugify(symbol.name)}`}
										name={`${symbol.id}-${slugify(symbol.name)}`}
									>
										<SymbolDetails symbol={symbol} style={{padding: '2rem'}} resetProjectInfo={resetProjectInfo}/>
									</Element>
								</li>
							);
						})}
					</ul>
				)}
				{!symbols.length && (
					<span className="no-symbols">
            Ainda não há símbolos nesse projeto
					</span>
				)}
			</div>
		</section>
	);
};

export default SymbolsList;
