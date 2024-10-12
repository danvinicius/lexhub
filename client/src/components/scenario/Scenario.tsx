import "./Scenario.scss";
import { ILexiconScenario } from "../../shared/interfaces";
import { useHelpers } from "../../hooks/useHelpers";
import { EpisodesList } from "./EpisodesList";
import { useLexicon } from "../../hooks/useLexicon";
import KebabVertical from "../../assets/icon/Kebab_Vertical.svg";
import Plus from "../../assets/icon/Plus.svg";
import { useState } from "react";
import { Modal } from "@mui/material";
import { CreateResourceForm } from "./resource/CreateResourceForm";
import { ScenarioActionsOptionsMenu } from "./ScenarioActionsOptionsMenu";
import EditScenarioForm from "./EditScenarioForm";
import DeleteScenarioForm from "./DeleteScenarioForm";
import User from '../../assets/icon/User_Empty.svg'
import Warning from '../../assets/icon/Triangle_Warning.svg'

interface IScenarioProps {
  scenario: ILexiconScenario;
}

const Scenario = ({ scenario }: IScenarioProps) => {
  const { slugify } = useHelpers();
  const { processContent } = useLexicon();

  const [isCreateResourceModalOpen, setIsCreateResourceModalOpen] =
    useState(false);

  const [
    isScenarioActionsOptionsMenuOpen,
    setIsScenarioActionsOptionsMenuOpen,
  ] = useState(false);

  const [isEdiScenarioModalOpen, setIsEdiScenarioModalOpen] = useState(false);

  const [isDeleteScenarioModalOpen, setIsDeleteScenarioModalOpen] =
    useState(false);

  const handleCloseDeleteScenarioModal = () =>
    setIsDeleteScenarioModalOpen(false);
  const handleOpenDeleteScenarioModal = () => {
    setIsDeleteScenarioModalOpen(true);
    setIsScenarioActionsOptionsMenuOpen(false);
  };

  const handleCloseEdiScenarioModal = () => setIsEdiScenarioModalOpen(false);
  const handleOpenEditScenarioModal = () => {
    setIsEdiScenarioModalOpen(true);
    setIsScenarioActionsOptionsMenuOpen(false);
  };
  const handleCloseEditScenarioModal = () =>
    setIsScenarioActionsOptionsMenuOpen(false);

  return (
    <div
      className="scenario"
      id={`${scenario.id}-${slugify(scenario.title.content)}`}
    >
      <div className="scenario-header">
        <h2>{processContent(scenario.title)}</h2>
        <img
          src={KebabVertical}
          alt=""
          className="scenario-options"
          onClick={() => setIsScenarioActionsOptionsMenuOpen(true)}
        />
        <div className="scenario-options">
          {isScenarioActionsOptionsMenuOpen && (
            <ScenarioActionsOptionsMenu
              handleOpenEditScenarioModal={handleOpenEditScenarioModal}
              handleCloseEditScenarioModal={handleCloseEditScenarioModal}
              setIsScenarioActionsOptionsMenuOpen={
                setIsScenarioActionsOptionsMenuOpen
              }
              isScenarioActionsOptionsMenuOpen={
                isScenarioActionsOptionsMenuOpen
              }
              handleOpenDeleteScenarioModal={handleOpenDeleteScenarioModal}
            />
          )}
        </div>
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
                  <li key={actor.name.content}><img src={User} alt="" />{processContent(actor.name)}</li>
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
                    <img src={Warning} alt="" />
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
          <span
            className="add-resource"
            onClick={() => setIsCreateResourceModalOpen(true)}
          >
            Adicionar recurso <img src={Plus} alt="" />{" "}
          </span>
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
      <Modal
        open={isEdiScenarioModalOpen}
        onClose={handleCloseEdiScenarioModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditScenarioForm
          onClose={handleCloseEdiScenarioModal}
          scenario={scenario ? scenario : ({} as ILexiconScenario)}
          projectId={scenario.projectId}
        />
      </Modal>
      <Modal
        open={isDeleteScenarioModalOpen}
        onClose={handleCloseDeleteScenarioModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeleteScenarioForm
          onClose={handleCloseDeleteScenarioModal}
          scenario={scenario ? scenario : ({} as ILexiconScenario)}
          projectId={scenario.projectId}
        />
      </Modal>
      <Modal
        open={isCreateResourceModalOpen}
        onClose={() => setIsCreateResourceModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateResourceForm
          onClose={() => setIsCreateResourceModalOpen(false)}
          scenarioId={scenario.id}
        />
      </Modal>
    </div>
  );
};

export default Scenario;
