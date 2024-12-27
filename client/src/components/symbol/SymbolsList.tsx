import './SymbolsList.scss';
import { ILexiconSymbol } from '../../shared/interfaces';
import { Element } from 'react-scroll';
import { useHelpers } from '../../hooks/useHelpers';
import SymbolDetails from './SymbolDetails';
import { FC, ReactNode } from 'react';

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
								<li key={`${symbol.id}-${slugify(symbol.name.content)}`}>
									<Element
										key={`${symbol.id}-${slugify(symbol.name.content)}`}
										name={`${symbol.id}-${slugify(symbol.name.content)}`}
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
