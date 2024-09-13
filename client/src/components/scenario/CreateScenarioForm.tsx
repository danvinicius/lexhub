import { FormEvent, KeyboardEvent, useContext, useState } from "react";
import Input from "../forms/Input";
import useForm from "../../hooks/useForm";
import { useNavigate, useParams } from "react-router-dom";
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
import { AddResourceComboBox } from "./resource/AddResourceComboBox";
import Close from "../../assets/icon/Close_Dark.svg";

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
  resources: {
    name: string;
  }[];
  projectId: number;
}

interface CreateScenarioFormProps {
  onClose: () => void;
}

const CreateScenarioForm = ({onClose}: CreateScenarioFormProps) => {
  const { isAuthenticated } = useContext(UserContext || {});

  const title = useForm("dontValidateTitle");
  const goal = useForm("dontValidateGoal");
  const geographicLocation = useForm("dontValidateGeographicLocation");
  const temporalLocation = useForm("dontValidateGeographicLocation");
  const preCondition = useForm("dontValidateGeographicLocation");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [exceptions, setExceptions] = useState<string[]>([]);
  const [actors, setActors] = useState<string[]>([]);
  const [resources, setResources] = useState<string[]>([]);

  const createScenario = async (body: CreateScenarioRequestDTO) => {
    setLoading(true);
    if (params.id) {
      try {
        const { url, options } = CREATE_SCENARIO(
          +params.id,
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
      if (params.id) {
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
          resources: resources.map((resource: string) => ({
            name: resource,
          })),
          projectId: +params.id,
        });
      }
    }
  };

  return (
    <section className="create-scenario-form flex column gap-125">
      <div className="create-scenario-form-header">
        <h2>Adicionar novo cenário</h2>
        <img src={Close} alt="Ícone 'X' popup" title="Ícone 'X' popup" onClick={onClose}/>
      </div>
      <br />
      <Form>
        <Input
          type="text"
          name="title"
          placeholder="Logar no sistema"
          label="Título do cenário"
          {...title}
          onInput={() => setError("")}
          onKeyDown={(e: KeyboardEvent) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        <div className="formGroup">
          <Input
            type="text"
            name="goal"
            placeholder="Permitir ao usuário se identificar"
            label="Objetivo do cenário"
            {...goal}
            onInput={() => setError("")}
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
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
        </div>
        <div className="formGroup">
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
          <Input
            type="text"
            name="preCondition"
            placeholder="Para isso deve-se..."
            label="Pré-condição"
            {...preCondition}
            onInput={() => setError("")}
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
        </div>
        <AddActorComboBox actors={actors} setActors={setActors} />
        <AddResourceComboBox
          resources={resources}
          setResources={setResources}
        />
        <AddExceptionComboBox
          exceptions={exceptions}
          setExceptions={setExceptions}
        />
        {loading ? (
          <Loading />
        ) : (
          <Button theme="primary" text="Criar" onClick={handleSubmit} />
        )}
        <Error error={error} />
      </Form>
    </section>
  );
};

export default CreateScenarioForm;
