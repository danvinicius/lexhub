import "./Scenario.scss";
import { ILexiconScenario } from "../../shared/interfaces";
import { useHelpers } from "../../hooks/useHelpers";
import { EpisodesList } from "./EpisodesList";
import { useLexicon } from "../../hooks/useLexicon";
import KebabVertical from "../../assets/icon/Kebab_Vertical.svg";
import Plus from "../../assets/icon/Plus.svg";
import { AddResourceComboBox } from "./resource/AddResourceComboBox";
import { useContext, useState } from "react";
import Button from "../forms/Button";
import { useNavigate } from "react-router-dom";
import { CREATE_RESOURCE } from "../../api";
import { UserContext } from "../../context/UserContext";
import api from "../../lib/axios";
import { ProjectContext } from "../../context/ProjectContext";

interface IScenarioProps {
  scenario: ILexiconScenario;
}

interface CreateResourceDTO {
  id?: string;
  name: string;
  scenarioId: string;
}

const Scenario = ({ scenario }: IScenarioProps) => {
  const { slugify } = useHelpers();
  const { processContent } = useLexicon();
  const { isAuthenticated } = useContext(UserContext || {});
  const projectContext = useContext(ProjectContext);

  const [isCreateResourceInputActive, setIsCreateResourceInputActive] =
    useState(false);
  const [resources, setResources] = useState<string[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createResource = async (body: CreateResourceDTO) => {
    setLoading(true);
    if (projectContext.project?.id) {
      try {
        const { url, options } = CREATE_RESOURCE(
          projectContext.project.id,
          scenario.id,
          isAuthenticated().token
        );
        await api[options.method](url, body, options);
        navigate(0);
      } catch (err: any) {
        console.log(error);
        console.log(loading);
        setError(err.response.data.error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddResources = async () => {
    const existingResources = [
      ...new Set(
        projectContext.project?.scenarios
          ?.map((scenario: ILexiconScenario) => scenario.resources)
          .flat()
      ),
    ];
    const mappedResources: CreateResourceDTO[] = [];
    resources.map((resource) => {
      const existingResource = existingResources.find(
        (existingResource) => existingResource.name.content == resource
      );
      if (existingResource) {
        mappedResources.push({
          id: existingResource.id,
          name: resource,
          scenarioId: scenario.id,
        });
      } else {
        mappedResources.push({
          name: resource,
          scenarioId: scenario.id,
        });
      }
    });
    await Promise.all(
      mappedResources.map((resource) => {
        createResource(resource);
      })
    );
  };

  return (
    <div
      className="scenario"
      id={`${scenario.id}-${slugify(scenario.title.content)}`}
    >
      <img src={KebabVertical} alt="" className="scenario-options" />
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
                  <span className="add-restriction">
                    Adicionar restrição <img src={Plus} alt="" />{" "}
                  </span>
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
          {!isCreateResourceInputActive && <span
            className="add-resource"
            onClick={() => setIsCreateResourceInputActive(true)}
          >
            Adicionar recurso <img src={Plus} alt="" />{" "}
          </span>}
          {isCreateResourceInputActive && (
            <div className="add-resource-field">
              <AddResourceComboBox
                resources={resources}
                setResources={setResources}
                currentScenarioId={scenario.id}
              />
              <Button text="Adicionar recurso(s)" theme="secondary" onClick={handleAddResources}/>
            </div>
          )}
          {scenario.resources.length > 0 && (
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
                      <td>
                        <span className="add-restriction">
                          Adicionar restrição <img src={Plus} alt="" />{" "}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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
