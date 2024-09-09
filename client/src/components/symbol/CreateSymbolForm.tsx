import {
  ChangeEvent,
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
import { CREATE_SYMBOL } from "../../api";
import { UserContext } from "../../context/UserContext";
import "./CreateSymbolForm.scss";
import Select from "../forms/Select";
import { useSelect } from "../../hooks/useSelect";
import Close from "../../assets/icon/Close_S.svg";
import Add from "../../assets/icon/Add.svg";

interface CreateSymbolRequestDTO {
  name: string;
  notion: string;
  classification: string;
  synonyms: {
    name: string;
  }[];

  impacts: {
    description: string;
  }[];
  projectId: number;
}

const CreateSymbolForm = () => {
  const { isAuthenticated } = useContext(UserContext || {});

  const name = useForm("dontValidateName");
  const notion = useForm('dontValidateNotion');
  const synonym = useForm("dontValidateSynonym");
  const impact = useForm("dontValidateImpact");
  const classification = useSelect();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [addNewSynonym, setAddNewSynonym] = useState(false);
  const [addNewImpact, setAddNewImpact] = useState(false);

  const [impacts, setImpacts] = useState<string[]>([]);
  const [synonyms, setSynonyms] = useState<string[]>([]);

  const handleAddImpact = (newImpact: string) => {
    setImpacts([...impacts, newImpact]);
    impact.setValue("");
    setAddNewImpact(false);
  };

  const handleAddSynonym = (newSynonym: string) => {
    setSynonyms([...synonyms, newSynonym]);
    synonym.setValue("");
    setAddNewSynonym(false);
  };

  const handleDeleteSynonym = (index: number) => {
    setSynonyms(synonyms.filter((_, i) => i != index));
  };

  const handleDeleteImpact = (index: number) => {
    setImpacts(impacts.filter((_, i) => i != index));
  };

  const createSymbol = async (body: CreateSymbolRequestDTO) => {
    setLoading(true);
    if (params.id) {
      try {
        const { url, options } = CREATE_SYMBOL(
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
    if (name.validate() && notion.validate() && classification.validate()) {
      if (params.id) {
        createSymbol({
          name: name.value,
          notion: notion.value,
          classification: classification.value,
          projectId: +params.id,
          impacts: impacts.map((impact: string) => ({
            description: impact,
          })),
          synonyms: synonyms.map((synonym: string) => ({
            name: synonym,
          })),
        });
      }
    }
  };

  return (
    <section className="create-symbol-form flex column gap-125">
      <h2>Adicionar novo símbolo</h2>
      <br />
      <Form>
        <Input
          type="text"
          name="name"
          placeholder="Usuário do sistema"
          label="Nome do símbolo"
          {...name}
          onInput={() => setError("")}
          onKeyDown={(e: KeyboardEvent) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        <Input
          type="text"
          name="notion"
          placeholder="Usuário principal que irá interagir com o software"
          label="Noção do símbolo"
          {...notion}
          onInput={() => setError("")}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        <Select
          name="classification"
          label="Classificação do símbolo"
          options={[
            {
              value: "resource",
              label: "Recurso",
            },
            {
              value: "actor",
              label: "Ator",
            },
            {
              value: "state",
              label: "Estado",
            },
            {
              value: "object",
              label: "Objeto",
            },
          ]}
          {...classification}
        ></Select>
        <div className="synonyms">
          <h3>Sinônimos</h3>
          {
            <ul>
              {synonyms?.map((synonym: string, index: number) => {
                return (
                  <li key={index}>
                    {synonym}{" "}
                    <img
                      src={Close}
                      onClick={() => handleDeleteSynonym(index)}
                    />
                  </li>
                );
              })}
              {addNewSynonym ? (
                <>
                  <Input
                    type="text"
                    name="synonym"
                    placeholder="Novo sinônimo"
                    label=""
                    style={{
                      width: "max-content",
                      borderRadius: "30px",
                      padding: "0.5rem 0.75rem",
                    }}
                    onInput={() => setError("")}
                    {...synonym}
                    onBlur={(
                      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      if (synonym.validate())
                        handleAddSynonym(event.target.value);
                    }}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                      if (e.key === "Enter" && synonym.validate())
                        handleAddSynonym((e.target as HTMLInputElement).value);
                    }}
                  />
                </>
              ) : null}
              <li
                onClick={() => setAddNewSynonym(true)}
                className="add-synonym"
              >
                Adicionar sinônimo <img src={Add} />
              </li>
            </ul>
          }
        </div>
        <div className="impacts">
          <h3>Impactos</h3>
          {
            <ul>
              {impacts?.map((impact: string, index: number) => {
                return (
                  <li key={index}>
                    {impact}{" "}
                    <img
                      src={Close}
                      onClick={() => handleDeleteImpact(index)}
                    />
                  </li>
                );
              })}
              {addNewImpact ? (
                <>
                  <Input
                    type="text"
                    name="impact"
                    placeholder="Novo impacto"
                    label=""
                    style={{
                      width: "max-content",
                      borderRadius: "30px",
                      padding: "0.5rem 0.75rem",
                    }}
                    onInput={() => setError("")}
                    {...impact}
                    onBlur={(
                      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      if (impact.validate())
                        handleAddImpact(event.target.value);
                    }}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                      if (e.key === "Enter" && impact.validate())
                        handleAddImpact((e.target as HTMLInputElement).value);
                    }}
                  />
                </>
              ) : null}

              <li onClick={() => setAddNewImpact(true)} className="add-impact">
                Adicionar impacto <img src={Add} />
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

export default CreateSymbolForm;
