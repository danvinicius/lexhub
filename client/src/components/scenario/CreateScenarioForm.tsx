import {
  FormEvent,
  KeyboardEvent,
  useContext,
  useState,
} from "react";
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
import Close from "../../assets/icon/Close_S.svg";
import Add from "../../assets/icon/Add.svg";

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

const CreateScenarioForm = () => {
  const { isAuthenticated } = useContext(UserContext || {});

  const title = useForm("dontValidateTitle");
  const goal = useForm("dontValidateGoal");
  const geographicLocation = useForm("dontValidateGeographicLocation");
  const temporalLocation = useForm("dontValidateGeographicLocation");
  const preCondition = useForm("dontValidateGeographicLocation");
  const actor = useForm("dontValidateActor");
  const exception = useForm("dontValidateException");
  const resource = useForm("dontValidateResource");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [addNewActor, setAddNewActor] = useState(false);
  const [addNewException, setAddNewException] = useState(false);
  const [addNewResource, setAddNewResource] = useState(false);

  const [exceptions, setExceptions] = useState<string[]>([]);
  const [actors, setActors] = useState<string[]>([]);
  const [resources, setResources] = useState<string[]>([]);

  const handleAddException = (newException: string) => {
    setExceptions([...exceptions, newException]);
    exception.setValue("");
    setAddNewException(false);
  };

  const handleAddActor = (newActor: string) => {
    setActors([...actors, newActor]);
    actor.setValue("");
    setAddNewActor(false);
  };
  const handleAddResource = (newResource: string) => {
    setResources([...resources, newResource]);
    resource.setValue("");
    setAddNewResource(false);
  };

  const handleDeleteActor = (index: number) => {
    setActors(actors.filter((_, i) => i != index));
  };

  const handleDeleteException = (index: number) => {
    setExceptions(exceptions.filter((_, i) => i != index));
  };
  const handleDeleteResource = (index: number) => {
    setResources(resources.filter((_, i) => i != index));
  };

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
      <h2>Adicionar novo cenário</h2>
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
        <div className="actors">
          <h3>Atores</h3>
          {
            <ul>
              {actors?.map((actor: string, index: number) => {
                return (
                  <li key={index}>
                    {actor}{" "}
                    <img src={Close} onClick={() => handleDeleteActor(index)} />
                  </li>
                );
              })}
              {addNewActor ? (
                <>
                  <Input
                    type="text"
                    name="actor"
                    placeholder="Novo ator"
                    label=""
                    style={{
                      width: "max-content",
                      borderRadius: "30px",
                      padding: "0.5rem 0.75rem",
                    }}
                    onInput={() => setError("")}
                    {...actor}
                    onBlur={() => {
                      actor.value.length > 0 && actor.validate();
                    }}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                      if (e.key === "Enter" && actor.validate()) {
                        handleAddActor((e.target as HTMLInputElement).value);
                        setAddNewActor(true);
                      }
                    }}
                  />
                </>
              ) : null}
              <li onClick={() => setAddNewActor(true)} className="add-actor">
                Adicionar ator <img src={Add} />
              </li>
            </ul>
          }
        </div>
        <div className="exceptions">
          <h3>Exceções</h3>
          {
            <ul>
              {exceptions?.map((exception: string, index: number) => {
                return (
                  <li key={index}>
                    {exception}{" "}
                    <img
                      src={Close}
                      onClick={() => handleDeleteException(index)}
                    />
                  </li>
                );
              })}
              {addNewException ? (
                <>
                  <Input
                    type="text"
                    name="exception"
                    placeholder="Nova exceção"
                    label=""
                    style={{
                      width: "max-content",
                      borderRadius: "30px",
                      padding: "0.5rem 0.75rem",
                    }}
                    onInput={() => setError("")}
                    {...exception}
                    onBlur={() => {
                      exception.value.length > 0 && exception.validate();
                    }}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                      if (e.key === "Enter" && exception.validate()) {
                        handleAddException(
                          (e.target as HTMLInputElement).value
                        );
                        setAddNewException(true);
                      }
                    }}
                  />
                </>
              ) : null}

              <li
                onClick={() => setAddNewException(true)}
                className="add-exception"
              >
                Adicionar exceção <img src={Add} />
              </li>
            </ul>
          }
        </div>
        <div className="resources">
          <h3>Recursos</h3>
          {
            <ul>
              {resources?.map((resource: string, index: number) => {
                return (
                  <li key={index}>
                    {resource}{" "}
                    <img
                      src={Close}
                      onClick={() => handleDeleteResource(index)}
                    />
                  </li>
                );
              })}
              {addNewResource ? (
                <>
                  <Input
                    type="text"
                    name="resource"
                    placeholder="Novo recurso"
                    label=""
                    style={{
                      width: "max-content",
                      borderRadius: "30px",
                      padding: "0.5rem 0.75rem",
                    }}
                    onInput={() => setError("")}
                    {...resource}
                    onBlur={() => {
                      resource.value.length > 0 && resource.validate();
                    }}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                      if (e.key === "Enter" && resource.validate()) {
                        handleAddResource((e.target as HTMLInputElement).value);
                        setAddNewResource(true);
                      }
                    }}
                  />
                </>
              ) : null}

              <li
                onClick={() => setAddNewResource(true)}
                className="add-resource"
              >
                Adicionar recurso <img src={Add} />
              </li>
            </ul>
          }
        </div>
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
