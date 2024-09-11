import { FormEvent, KeyboardEvent, useContext, useState } from "react";
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
import { AddImpactComboBox } from "./impact/AddImpactComboBox";
import { AddSynonymComboBox } from "./synonym/AddSynonymComboBox";

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
  const notion = useForm("dontValidateNotion");
  const classification = useSelect();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [impacts, setImpacts] = useState<string[]>([]);
  const [synonyms, setSynonyms] = useState<string[]>([]);

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
