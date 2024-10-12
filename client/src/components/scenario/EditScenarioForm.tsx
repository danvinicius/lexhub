import {
  FormEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Button from "../forms/Button";
import Input from "../forms/Input";
import Form from "../forms/Form";
import "./EditScenarioForm.scss";
import { UserContext } from "../../context/UserContext";
import Loading from "../helper/Loading";
import { EDIT_SCENARIO } from "../../api";
import useForm from "../../hooks/useForm";
import api from "../../lib/axios";
import Error from "../helper/Error";
import { useNavigate } from "react-router-dom";
import { IActor, IException, ILexiconScenario } from "../../shared/interfaces";
import Close from "../../assets/icon/Close_Dark.svg";
import Textarea from "../forms/Textarea";
import { AddActorComboBox } from "./actor/AddActorComboBox";
import { AddExceptionComboBox } from "./exception/AddExceptionComboBox";

export interface EditScenarioRequestDTO {
  title: string;
  goal: string;
  context: {
    geographicLocation: string;
    temporalLocation: string;
    preCondition: string;
  };
  actors: IActor[];
  exceptions: IException[];
  projectId: string;
}

interface EditScenarioFormProps {
  scenario: ILexiconScenario;
  onClose: () => void;
  projectId: string;
}

const EditScenarioForm = ({ scenario, onClose, projectId }: EditScenarioFormProps) => {
  const titleEdit = useForm("dontValidateTitle");
  const goalEdit = useForm("dontValidateGoal");
  const geographicLocationEdit = useForm("dontValidateGeographicLocation");
  const temporalLocationEdit = useForm("dontValidateTemporalLocation");
  const preConditionEdit = useForm("dontValidatePreCondition");
  const [actorsEdit, setActorsEdit] = useState<string[]>([]);
  const [exceptionsEdit, setExceptionsEdit] = useState<string[]>([]);

  useEffect(() => {
    titleEdit.setValue(scenario.title.content);
    goalEdit.setValue(scenario.goal.content);
    geographicLocationEdit.setValue(scenario.context?.geographicLocation.content || "");
    temporalLocationEdit.setValue(scenario.context?.temporalLocation.content || "");
    preConditionEdit.setValue(scenario.context?.preCondition.content || "");
    setActorsEdit(scenario?.actors?.map((actor) => actor.name.content) || []);
    setExceptionsEdit(
      scenario?.exceptions?.map((exception) => exception.description.content) || []
    );
  }, []);

  const { isAuthenticated } = useContext(UserContext) || {};

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const editScenario = async (body: EditScenarioRequestDTO) => {
    if (projectId && scenario?.id) {
      setLoading(true);

      try {
        const { url, options } = EDIT_SCENARIO(
          projectId,
          scenario.id,
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
    if (titleEdit.validate() && goalEdit.validate()) {
      editScenario({
        title: titleEdit.value,
        goal: goalEdit.value,
        context: {
          geographicLocation: geographicLocationEdit.value,
          temporalLocation: temporalLocationEdit.value,
          preCondition: preConditionEdit.value,
        },
        exceptions: exceptionsEdit.map((exception: string) => ({
          description: exception,
        })),
        actors: actorsEdit.map((actor: string) => ({
          name: actor,
        })),
        projectId,
      });
    }
  };

  return (
    <section className="edit-scenario-form flex column gap-125">
      <div className="edit-scenario-form-header">
        <h2>Editar cenário</h2>
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
            {...titleEdit}
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
            {...goalEdit}
          />
          <AddActorComboBox actors={actorsEdit} setActors={setActorsEdit} />
          <AddExceptionComboBox
            exceptions={exceptionsEdit}
            setExceptions={setExceptionsEdit}
          />
        </Form>
        <Form>
          <h3>Contexto</h3>
          <Input
            type="text"
            name="geographicLocation"
            placeholder="Um lugar qualquer"
            label="Localização geográfica"
            {...geographicLocationEdit}
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
            {...temporalLocationEdit}
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
            {...preConditionEdit}
          />
        </Form>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Button theme="primary" text="Salvar" onClick={handleSubmit} />
      )}
      <Error error={error} />
    </section>
  );
};

export default EditScenarioForm;
