import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_RESTRICTION } from "../../../api";
import api from "../../../lib/axios";
import { ILexiconScenario } from "../../../shared/interfaces";
import Button from "../../forms/Button";
import { AddRestrictionComboBox } from "./AddRestrictionComboBox";
import { ProjectContext } from "../../../context/ProjectContext";
import { UserContext } from "../../../context/UserContext";
import Close from "../../../assets/icon/Close_Dark.svg";
import './CreateRestrictionForm.scss'

interface CreateRestrictionDTO {
  id?: string;
  description: string;
  scenarioId: string;
  contextId?: string;
  resourceId?: string;
  episodeId?: string;
}

interface CreateRestrictionFormProps {
  onClose: () => void;
  scenarioId: string;
  contextId?: string;
  resourceId?: string;
  episodeId?: string;
}

export const CreateRestrictionForm = ({
  onClose,
  scenarioId,
  episodeId,
  resourceId,
  contextId
}: CreateRestrictionFormProps) => {
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const { isAuthenticated } = useContext(UserContext || {});
  const projectContext = useContext(ProjectContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createRestriction = async (body: CreateRestrictionDTO) => {
    setLoading(true);
    if (projectContext.project?.id) {
      try {
        const { url, options } = CREATE_RESTRICTION(
          projectContext.project.id,
          scenarioId,
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

  const handleAddRestrictions = async () => {
    const existingRestrictions = [
      ...new Set(
        projectContext.project?.scenarios
          ?.map((scenario: ILexiconScenario) => scenario.context.restrictions)
          .flat()
      ),
    ];
    const mappedRestrictions: CreateRestrictionDTO[] = [];
    restrictions.map((restriction) => {
      const existingRestriction = existingRestrictions.find(
        (existingRestriction) => existingRestriction.description.content == restriction
      );
      if (existingRestriction) {
        mappedRestrictions.push({
          id: existingRestriction.id,
          description: restriction,
          scenarioId,
          contextId,
          resourceId,
          episodeId,
        });
      } else {
        mappedRestrictions.push({
          description: restriction,
          scenarioId,
          contextId,
          resourceId,
          episodeId,
        });
      }
    });
    await Promise.all(
      mappedRestrictions.map((restriction) => {
        createRestriction(restriction);
      })
    );
  };
  return (
    <section className="create-restriction-form flex column gap-125">
      <div className="create-restriction-form-header">
        <h2>Nova restrição</h2>
        <img
          src={Close}
          alt="Ícone 'X' popup"
          title="Ícone 'X' popup"
          onClick={onClose}
        />
      </div>
      <br />
      <AddRestrictionComboBox
        restrictions={restrictions}
        setRestrictions={setRestrictions}
        currentScenarioId={scenarioId}
      />
      <Button
        text="Adicionar restrições"
        theme="secondary"
        onClick={handleAddRestrictions}
      />
    </section>
  );
};
