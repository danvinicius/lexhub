import { ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { ProjectContext } from '../../../context/ProjectContext';

import { ScenariosSummary } from './ScenarioSummary';
import Arrow from '../../assets/icon/Arrow_Left_M.svg';
import SymbolDetails from '../../symbol/symbol-details/SymbolDetails';
import './SummaryWrapper.scss';

const SummaryWrapper = (): ReactNode => {
	const { symbol, setSymbol } = useContext(ProjectContext || {});
	const [isFixed, setIsFixed] = useState(false);
	const summaryRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			const summaryPosition = summaryRef.current?.getBoundingClientRect();
			if (summaryPosition) {
				if (document.documentElement.scrollTop >= 284) {
					setIsFixed(true);
				} else {
					setIsFixed(false);
				}
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<>
			<div
				className="placeholder"
				ref={placeholderRef}
				style={{ grid: '30%' }}
			></div>
			<div
				className="summary-wrapper-container"
				ref={summaryRef}
				style={
					isFixed == true
						? { position: 'fixed', left: '7.5%', top: '.5rem', width: '21.25%' }
						: { position: 'absolute' }
				}
			>
				{!symbol && <ScenariosSummary />}
				{symbol && (
					<div className="summary-wrapper slide-left">
						<div className="back-to-summary">
							<img
								src={Arrow}
								alt="Voltar ao sumário"
								title="Voltar ao sumário"
								onClick={() => setSymbol(null)}
							/>
						</div>
						<SymbolDetails symbol={symbol}></SymbolDetails>
					</div>
				)}
			</div>
		</>
	);
};

export default SummaryWrapper;
