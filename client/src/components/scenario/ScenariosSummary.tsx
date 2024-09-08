import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { ILexiconScenario } from "../../shared/interfaces";
import "./ScenariosSummary.scss";
import { Link } from "react-scroll";
import { useHelpers } from "../../hooks/useHelpers";

export const ScenariosSummary = () => {
  const { project } = useContext(ProjectContext);
  const { slugify } = useHelpers();

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
                  to={slugify(scenario.title.content)}
                  spy={true}
                  hashSpy={true}
                  smooth={true}
                  duration={800}
                  containerId="scenarios-list"
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
