import "./ScenariosList.scss";
import { ILexiconScenario } from "../../shared/interfaces";
import Scenario from "./Scenario";
import { Element } from "react-scroll";
import { useHelpers } from "../../hooks/useHelpers";

interface IScenariosListProps {
  scenarios: ILexiconScenario[];
}

const ScenariosList = ({ scenarios }: IScenariosListProps) => {
  const { slugify } = useHelpers();
  return (
    <section className="scenarios-list-container" id="scenarios-list">
      <div className="scenarios-list slide-right">
        {!!scenarios?.length && (
          <ul>
            {scenarios.map((scenario: ILexiconScenario) => {
              return (
                <li key={slugify(scenario.title.content)}>
                  <Element
                    key={slugify(scenario.title.content)}
                    name={slugify(scenario.title.content)}
                  >
                    <Scenario scenario={scenario} />
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
