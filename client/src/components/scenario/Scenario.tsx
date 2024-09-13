import "./Scenario.scss";
import { ILexiconScenario } from "../../shared/interfaces";
import { useHelpers } from "../../hooks/useHelpers";
import { EpisodesList } from "./EpisodesList";
import { useLexicon } from "../../hooks/useLexicon";

interface IScenarioProps {
  scenario: ILexiconScenario;
}

const Scenario = ({ scenario }: IScenarioProps) => {
  const { slugify } = useHelpers();
  const { processContent } = useLexicon();

  return (
    <div
      className="scenario"
      id={`${scenario.id}-${slugify(scenario.title.content)}`}
    >
      <div className="scenario-header">
        <h2>{processContent(scenario.title)}</h2>
      </div>
      <div className="scenario-details">
        <h3>Objetivo</h3>
        <p>{processContent(scenario.goal)}</p>
        <h3>Contexto</h3>
        <div className="scenario-context">
          <table className="scenario-context-details">
            <tbody>
              <tr>
                <th>Pré-condição</th>
                <th>Localização geográfica</th>
                <th>Localização temporal</th>
                <th>Restrições</th>
              </tr>
              <tr>
                <td>{processContent(scenario.context?.preCondition)}</td>
                <td>{processContent(scenario.context?.geographicLocation)}</td>
                <td>{processContent(scenario.context?.temporalLocation)}</td>
                <td>
                  <ul>
                    {scenario.context?.restrictions?.map((restriction) => {
                      return (
                        <li key={restriction.description.content}>
                          {processContent(restriction.description)}
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>Atores</h3>
        <div className="scenario-actors">
          {scenario.actors?.length ? (
            <ul>
              {scenario.actors?.map((actor) => {
                return (
                  <li key={actor.name.content}>{processContent(actor.name)}</li>
                );
              })}
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>
        <h3>Exceções</h3>
        <div className="scenario-exceptions">
          {scenario.exceptions?.length ? (
            <ul>
              {scenario.exceptions?.map((exception) => {
                return (
                  <li key={exception.description.content}>
                    {processContent(exception.description)}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>
        <h3>Recursos</h3>
        <div className="scenario-resources">
          <table className="scenario-resources-details">
            <tbody>
              <tr>
                <th>Nome</th>
                <th>Restrições</th>
              </tr>
              {scenario.resources?.map((resource) => {
                return (
                  <tr key={resource.name.content}>
                    <td>{processContent(resource.name)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <h3>Episódios</h3>
        {scenario.episodes?.length || scenario.groups.length ? (
          <EpisodesList scenario={scenario}></EpisodesList>
        ) : (
          <p>N/A</p>
        )}
      </div>
    </div>
  );
};

export default Scenario;
