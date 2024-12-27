import './ScenariosList.scss';
import { ILexiconScenario } from '../../shared/interfaces';
import Scenario from './Scenario';
import { Element } from 'react-scroll';
import { useHelpers } from '../../hooks/useHelpers';
import { FC, ReactNode } from 'react';

interface IScenariosListProps {
  scenarios: ILexiconScenario[];
  resetProjectInfo: () => void;
}

const ScenariosList: FC<IScenariosListProps> = ({ scenarios, resetProjectInfo }: IScenariosListProps): ReactNode => {
	const { slugify } = useHelpers();
	return (
		<section className="scenarios-list-container" id="scenarios-list">
			<div className="scenarios-list slide-right">
				{!!scenarios?.length && (
					<ul>
						{scenarios.map((scenario: ILexiconScenario) => {
							return (
								<li key={`${scenario.id}-${slugify(scenario.title.content)}`}>
									<Element
										key={`${scenario.id}-${slugify(scenario.title.content)}`}
										name={`${scenario.id}-${slugify(scenario.title.content)}`}
									>
										<Scenario scenario={scenario} resetProjectInfo={resetProjectInfo}/>
									</Element>
								</li>
							);
						})}
					</ul>
				)}
				{!scenarios.length && (
					<span className="no-scenarios">
            Ainda não há cenários nesse projeto
					</span>
				)}
			</div>
		</section>
	);
};

export default ScenariosList;
