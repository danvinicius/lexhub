import { ReactNode, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-scroll';

import { ProjectContext } from '../../../context/ProjectContext';
import { ILexiconScenario } from '../../../shared/interfaces';
import { useHelpers } from '../../../hooks/useHelpers';

import './ScenariosSummary.scss';

export const ScenariosSummary = (): ReactNode => {
	const { project } = useContext(ProjectContext);
	const { slugify } = useHelpers();
	const params = useParams();

	return (
		<div className="scenarios-summary slide-right">
			<h3>Sumário</h3>
			<ol>
				{project?.scenarios?.length ? (
					project.scenarios.map((scenario: ILexiconScenario) => {
						return (
							<li key={scenario.id}>
								<Link
									activeClass="active"
									to={`${scenario.id}-${slugify(scenario.title.content)}`}
									spy={true}
									hashSpy={params.id == project.id}
									smooth={true}
									duration={800}
								>
									{scenario.title.content}
								</Link>
							</li>
						);
					})
				) : (
					<p>Ainda não há cenários nesse projeto</p>
				)}
			</ol>
		</div>
	);
};
