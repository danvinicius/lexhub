import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_RESOURCE } from "../../../api";
import api from "../../../lib/axios";
import { ILexiconScenario } from "../../../shared/interfaces";
import Button from "../../forms/Button";
import { AddResourceComboBox } from "./AddResourceComboBox";
import { ProjectContext } from "../../../context/ProjectContext";
import { UserContext } from "../../../context/UserContext";
import Close from "../../../assets/icon/Close_Dark.svg";
import './CreateResourceForm.scss'

interface CreateResourceDTO {
  id?: string;
  name: string;
  scenarioId: string;
}

interface CreateResourceFormProps {
  onClose: () => void;
  scenarioId: string;
}

export const CreateResourceForm = ({
  onClose,
  scenarioId,
}: CreateResourceFormProps) => {
  const [resources, setResources] = useState<string[]>([]);
  const { isAuthenticated } = useContext(UserContext || {});
  const projectContext = useContext(ProjectContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createResource = async (body: CreateResourceDTO) => {
    setLoading(true);
    if (projectContext.project?.id) {
      try {
        const { url, options } = CREATE_RESOURCE(
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
          scenarioId: scenarioId,
        });
      } else {
        mappedResources.push({
          name: resource,
          scenarioId: scenarioId,
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
    <section className="create-resource-form flex column gap-125">
      <div className="create-resource-form-header">
        <h2>Novo recurso</h2>
        <img
          src={Close}
          alt="Ícone 'X' popup"
          title="Ícone 'X' popup"
          onClick={onClose}
        />
      </div>
      <br />
      <AddResourceComboBox
        resources={resources}
        setResources={setResources}
        currentScenarioId={scenarioId}
      />
      <Button
        text="Adicionar recurso(s)"
        theme="secondary"
        onClick={handleAddResources}
      />
    </section>
  );
};
