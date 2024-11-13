import './SymbolsList.scss';
import { ISymbol } from '../../shared/interfaces';
import { Element } from 'react-scroll';
import { useHelpers } from '../../hooks/useHelpers';
import SymbolDetails from './SymbolDetails';
import { FC, ReactNode } from 'react';

interface ISymbolsListProps {
  symbols: ISymbol[];
}

const SymbolsList: FC<ISymbolsListProps> = ({ symbols }: ISymbolsListProps): ReactNode => {
	const { slugify } = useHelpers();
	return (
		<section className="symbols-list-container" id="symbols-list">
			<div className="symbols-list slide-right">
				{!!symbols?.length && (
					<ul>
						{symbols.map((symbol: ISymbol) => {
							return (
								<li key={`${symbol.id}-${slugify(symbol.name)}`}>
									<Element
										key={`${symbol.id}-${slugify(symbol.name)}`}
										name={`${symbol.id}-${slugify(symbol.name)}`}
									>
										<SymbolDetails symbol={symbol} style={{padding: '2rem'}}/>
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
