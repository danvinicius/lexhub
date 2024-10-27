import "./Scenario.scss";
import { ILexiconScenario } from "../../shared/interfaces";
import { useHelpers } from "../../hooks/useHelpers";
import { EpisodesList } from "./EpisodesList";
import { useLexicon } from "../../hooks/useLexicon";
import KebabVertical from "../../assets/icon/Kebab_Vertical.svg";
import Plus from "../../assets/icon/Plus.svg";
import { useContext, useState } from "react";
import { Modal } from "@mui/material";
import { CreateResourceForm } from "./resource/CreateResourceForm";
import { ScenarioActionsOptionsMenu } from "./ScenarioActionsOptionsMenu";
import UpdateScenarioForm from "./UpdateScenarioForm";
import DeleteScenarioForm from "./DeleteScenarioForm";
import User from "../../assets/icon/User_Empty.svg";
import EditPen from "../../assets/icon/Edit.svg";
import Warning from "../../assets/icon/Triangle_Warning.svg";
import { CreateRestrictionForm } from "./restriction/CreateRestrictionForm";
import { ProjectContext } from "../../context/ProjectContext";

interface IScenarioProps {
  scenario: ILexiconScenario;
}

const Scenario = ({ scenario }: IScenarioProps) => {
  const { slugify } = useHelpers();
  const { processContent } = useLexicon();
  const { project } = useContext(ProjectContext);

  const [isCreateResourceModalOpen, setIsCreateResourceModalOpen] =
    useState(false);

  const [isCreateRestrictionModalOpen, setIsCreateRestrictionModalOpen] =
    useState(false);

  const handleOpenCreateRestriction = (
    resourceId?: string,
    episodeId?: string
  ) => {
    setRestrictionResourceId(resourceId);
    setRestrictionEpisodeId(episodeId);
    setIsCreateRestrictionModalOpen(true);
  };

  const handleCloseCreateRestriction = () => {
    setRestrictionResourceId("");
    setRestrictionEpisodeId("");
    setIsCreateRestrictionModalOpen(false);
  };

  const [restrictionResourceId, setRestrictionResourceId] = useState<
    string | undefined
  >("");
  const [, setRestrictionEpisodeId] = useState<string | undefined>("");

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
  const handleOpenUpdateScenarioModal = () => {
    setIsEdiScenarioModalOpen(true);
    setIsScenarioActionsOptionsMenuOpen(false);
  };
  const handleCloseUpdateScenarioModal = () =>
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
          className="scenario-options-button"
          onClick={() => setIsScenarioActionsOptionsMenuOpen(true)}
        />
        <div className="scenario-options">
          {isScenarioActionsOptionsMenuOpen && (
            <ScenarioActionsOptionsMenu
              handleOpenUpdateScenarioModal={handleOpenUpdateScenarioModal}
              handleCloseUpdateScenarioModal={handleCloseUpdateScenarioModal}
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
                <td className="restrictions">
                  <span
                    className="add-restriction"
                    onClick={() => handleOpenCreateRestriction()}
                  >
                    {scenario.context.restrictions.length > 0 ? (
                      <>
                        Atualizar restrições <img src={EditPen} alt="" />
                      </>
                    ) : (
                      <>
                        Cadastrar restrições <img src={Plus} alt="" />{" "}
                      </>
                    )}
                  </span>
                  {scenario.context.restrictions.length > 0 && (
                    <ul>
                      {scenario.context?.restrictions?.map((restriction) => {
                        return (
                          <li key={restriction.description.content}>
                            {processContent(restriction.description)}
                          </li>
                        );
                      })}
                    </ul>
                  )}
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
                  <li key={actor.name.content}>
                    <img src={User} alt="" />
                    {processContent(actor.name)}
                  </li>
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
            {scenario.resources.length > 0 ? (
              <>
                Atualizar recursos <img src={EditPen} alt="" />
              </>
            ) : (
              <>
                Cadastrar recursos <img src={Plus} alt="" />{" "}
              </>
            )}
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
                      <td className="restrictions">
                        <span
                          className="add-restriction"
                          onClick={() =>
                            handleOpenCreateRestriction(resource.id)
                          }
                        >
                          {resource.restrictions?.length > 0 ? (
                            <>
                              Atualizar restrições <img src={EditPen} alt="" />
                            </>
                          ) : (
                            <>
                              Cadastrar restrições <img src={Plus} alt="" />{" "}
                            </>
                          )}
                        </span>
                        {resource.restrictions?.length > 0 && (
                          <ul>
                            {resource.restrictions?.map((restriction) => {
                              return (
                                <li key={restriction.description.content}>
                                  {processContent(restriction.description)}
                                </li>
                              );
                            })}
                          </ul>
                        )}
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
        <UpdateScenarioForm
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
      <Modal
        open={isCreateRestrictionModalOpen}
        onClose={handleCloseCreateRestriction}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateRestrictionForm
          resourceId={restrictionResourceId}
          onClose={handleCloseCreateRestriction}
          scenarioId={scenario.id}
          projectId={project?.id || ""}
        />
      </Modal>
    </div>
  );
};

export default Scenario;
