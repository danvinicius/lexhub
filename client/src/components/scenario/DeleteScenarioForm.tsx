/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useContext, useState } from "react";
import Button from "../forms/Button";
import Form from "../forms/Form";
import "./DeleteScenarioForm.scss";
import { UserContext } from "../../context/UserContext";
import Loading from "../helper/Loading";
import { DELETE_SCENARIO } from "../../api";
import api from "../../lib/axios";
import Error from "../helper/Error";
import { useNavigate } from "react-router-dom";
import { ILexiconScenario } from "../../shared/interfaces";
import Close from "../../assets/icon/Close_Dark.svg";

export interface DeleteScenarioRequestDTO {
  name: string;
  description: string;
}

interface DeleteScenarioFormProps {
  scenario: ILexiconScenario;
  projectId: string;
  onClose: () => void;
}

const DeleteScenarioForm = ({ scenario, projectId, onClose }: DeleteScenarioFormProps) => {

  const { isAuthenticated } = useContext(UserContext) || {};

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const deleteScenario = async () => {
    if (scenario?.id) {
      setLoading(true);

      try {
        const { url, options } = DELETE_SCENARIO(
            projectId,
          scenario.id,
          isAuthenticated()?.token || ""
        );
        await api[options.method](url, options);
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
    deleteScenario();
  };

  return (
    <section className="delete-scenario-form flex column gap-125">
      <div className="delete-scenario-form-header">
        <h2>Tem certeza que deseja excluir o cenário "{scenario.title.content}"?</h2>
        <img
          src={Close}
          alt="Ícone 'X' popup"
          title="Ícone 'X' popup"
          onClick={onClose}
        />
      </div>
      <br />
      <Form style={{gap: '.5rem', userSelect: 'none'}}>
        {loading ? (
          <Loading />
        ) : (
          <Button theme="danger" text="Excluir" onClick={handleSubmit} />
        )}
        <Error error={error} />
      </Form>
    </section>
  );
};

export default DeleteScenarioForm;
