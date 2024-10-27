import { FormEvent, KeyboardEvent, useContext, useState } from "react";
import Input from "../forms/Input";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import Form from "../forms/Form";
import Loading from "../helper/Loading";
import Button from "../forms/Button";
import Error from "../helper/Error";
import api from "../../lib/axios";
import { CREATE_SCENARIO } from "../../api";
import { UserContext } from "../../context/UserContext";
import "./CreateScenarioForm.scss";
import { AddActorComboBox } from "./actor/AddActorComboBox";
import { AddExceptionComboBox } from "./exception/AddExceptionComboBox";
import Close from "../../assets/icon/Close_Dark.svg";
import { ProjectContext } from "../../context/ProjectContext";
import Textarea from "../forms/Textarea";

interface CreateScenarioRequestDTO {
  title: string;
  goal: string;
  context: {
    geographicLocation: string;
    temporalLocation: string;
    preCondition: string;
  };
  exceptions: {
    description: string;
  }[];
  actors: {
    name: string;
  }[];
  projectId: string;
}

interface CreateScenarioFormProps {
  onClose: () => void;
}

const CreateScenarioForm = ({ onClose }: CreateScenarioFormProps) => {
  const { isAuthenticated } = useContext(UserContext || {});

  const title = useForm("dontValidateTitle");
  const goal = useForm("dontValidateGoal");
  const geographicLocation = useForm("dontValidateGeographicLocation");
  const temporalLocation = useForm("dontValidateGeographicLocation");
  const preCondition = useForm("dontValidateGeographicLocation");
  const projectContext = useContext(ProjectContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [exceptions, setExceptions] = useState<string[]>([]);
  const [actors, setActors] = useState<string[]>([]);

  const createScenario = async (body: CreateScenarioRequestDTO) => {
    setLoading(true);
    if (projectContext.project?.id) {
      try {
        const { url, options } = CREATE_SCENARIO(
          projectContext.project.id,
          isAuthenticated().token
        );
        await api[options.method](url, body, options);
        navigate(0);
      } catch (error: any) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      title.validate() &&
      goal.validate() &&
      geographicLocation.validate() &&
      temporalLocation.validate() &&
      preCondition.validate()
    ) {
      if (projectContext.project?.id) {
        createScenario({
          title: title.value,
          goal: goal.value,
          context: {
            geographicLocation: geographicLocation.value,
            temporalLocation: temporalLocation.value,
            preCondition: preCondition.value,
          },
          exceptions: exceptions.map((exception: string) => ({
            description: exception,
          })),
          actors: actors.map((actor: string) => ({
            name: actor,
          })),
          projectId: projectContext.project.id,
        });
      }
    }
  };

  return (
    <section className="create-scenario-form flex column gap-125">
      <div className="create-scenario-form-header">
        <h2>Novo cenário</h2>
        <img
          src={Close}
          alt="Ícone 'X' popup"
          title="Ícone 'X' popup"
          onClick={onClose}
        />
      </div>
      <br />
      <div className="flex gap-2">
        <Form>
          <Input
            type="text"
            name="title"
            placeholder="Logar no sistema"
            label="Título"
            autoFocus
            {...title}
            onInput={() => setError("")}
            onKeyDown={(e: KeyboardEvent) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <Textarea
            name="goal"
            placeholder="Permitir ao usuário se identificar"
            label="Objetivo"
            onInput={() => setError("")}
            rows={5}
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            {...goal}
          />
          <AddActorComboBox actors={actors} setActors={setActors}/>
          <AddExceptionComboBox
            exceptions={exceptions}
            setExceptions={setExceptions}
          />
        </Form>
        <Form>
          <h3>Contexto</h3>
            <Input
              type="text"
              name="geographicLocation"
              placeholder="Um lugar qualquer"
              label="Localização geográfica"
              {...geographicLocation}
              onInput={() => setError("")}
              onKeyDown={(e: KeyboardEvent) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <Input
              type="text"
              name="temporalLocation"
              placeholder="Um dia qualquer"
              label="Localização temporal"
              {...temporalLocation}
              onInput={() => setError("")}
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
          <Textarea
            name="preCondition"
            placeholder="Para isso deve-se..."
            label="Pré-condição"
            onInput={() => setError("")}
            rows={5}
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            {...preCondition}
          />
        </Form>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <Button theme="primary" text="Criar" onClick={handleSubmit} />
      )}
      <Error error={error} />
    </section>
  );
};

export default CreateScenarioForm;
