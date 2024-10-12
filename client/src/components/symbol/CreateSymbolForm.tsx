import { FormEvent, KeyboardEvent, useContext, useState } from "react";
import Input from "../forms/Input";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
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
import { AddImpactComboBox } from "./impact/AddImpactComboBox";
import { AddSynonymComboBox } from "./synonym/AddSynonymComboBox";
import Close from "../../assets/icon/Close_Dark.svg";
import { ProjectContext } from "../../context/ProjectContext";

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
  projectId: string;
}

interface CreateSymbolFormProps {
  onClose: () => void;
}

const CreateSymbolForm = ({ onClose }: CreateSymbolFormProps) => {
  const { isAuthenticated } = useContext(UserContext || {});

  const name = useForm("dontValidateName");
  const notion = useForm("dontValidateNotion");
  const classification = useSelect();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [impacts, setImpacts] = useState<string[]>([]);
  const [synonyms, setSynonyms] = useState<string[]>([]);

  const projectContext = useContext(ProjectContext);

  const createSymbol = async (body: CreateSymbolRequestDTO) => {
    setLoading(true);
    if (projectContext.project?.id) {
      try {
        const { url, options } = CREATE_SYMBOL(
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
    if (name.validate() && notion.validate() && classification.validate()) {
      if (projectContext.project?.id) {
        createSymbol({
          name: name.value,
          notion: notion.value,
          classification: classification.value,
          projectId: projectContext.project.id,
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
      <div className="create-symbol-form-header">
        <h2>Novo símbolo</h2>
        <img
          src={Close}
          alt="Ícone 'X' popup"
          title="Ícone 'X' popup"
          onClick={onClose}
        />
      </div>
      <br />
      <Form>
        <Input
          type="text"
          name="name"
          placeholder="Usuário do sistema"
          label="Nome"
          autoFocus
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
          label="Noção"
          {...notion}
          onInput={() => setError("")}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        <Select
          name="classification"
          label="Classificação"
          options={[
            {
              value: "Recurso",
              label: "Recurso",
            },
            {
              value: "Ator",
              label: "Ator",
            },
            {
              value: "Estado",
              label: "Estado",
            },
            {
              value: "Objeto",
              label: "Objeto",
            },
          ]}
          {...classification}
        ></Select>
        <AddSynonymComboBox synonyms={synonyms} setSynonyms={setSynonyms} />
        <AddImpactComboBox impacts={impacts} setImpacts={setImpacts} />
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
