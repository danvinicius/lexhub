import { FC, ReactNode } from 'react';
import { Pagination } from '@mui/material';
import { Element } from 'react-scroll';

import { ILexiconScenario } from '../../../shared/interfaces';
import { useHelpers } from '../../../hooks/useHelpers';

import Scenario from '../Scenario';
import './ScenarioList.scss';

interface IScenariosListProps {
  scenarios: ILexiconScenario[];
  resetProjectInfo: () => void;
  pagination: number;
  setPagination: (page: number) => void;
}

const ITEMS_PER_PAGE = 3;

const ScenariosList: FC<IScenariosListProps> = ({ scenarios, resetProjectInfo, pagination, setPagination }: IScenariosListProps): ReactNode => {
	const { slugify } = useHelpers();
	const startIndex = (pagination - 1) * ITEMS_PER_PAGE;
	const paginatedScenarios = scenarios.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	return (
		<section className="scenarios-list-container" id="scenarios-list">
			<div className="scenarios-list slide-right">
				{!!paginatedScenarios?.length && (
					<ul>
						{paginatedScenarios.map((scenario: ILexiconScenario) => {
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
			<div className="scenarios-list-pagination flex justify-center align-center py-2">
				<Pagination variant="outlined" size="large"               
				count={Math.ceil(scenarios.length / ITEMS_PER_PAGE)}
                page={pagination}
                onChange={(_, page) => setPagination(page)}
				/>
			</div>
		</section>
	);
};

export default ScenariosList;
