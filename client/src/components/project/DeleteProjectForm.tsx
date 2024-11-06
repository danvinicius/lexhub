/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useContext, useState } from "react";
import Button from "../forms/Button";
import Input from "../forms/Input";
import Form from "../forms/Form";
import "./DeleteProjectForm.scss";
import { UserContext } from "../../context/UserContext";
import Loading from "../helper/Loading";
import { DELETE_PROJECT } from "../../api";
import useForm from "../../hooks/useForm";
import api from "../../lib/axios";
import Error from "../helper/Error";
import { useNavigate } from "react-router-dom";
import { IProject } from "../../shared/interfaces";
import Close from "../../assets/icon/Close_Dark.svg";

export interface DeleteProjectRequestDTO {
  name: string;
  description: string;
}

interface DeleteProjectFormProps {
  project: IProject;
  onClose: () => void;
}

const DeleteProjectForm = ({ project, onClose }: DeleteProjectFormProps) => {
  const nameDelete = useForm("dontValidateName");

  const { isAuthenticated } = useContext(UserContext) || {};

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const deleteProject = async () => {
    if (project?.id) {
      setLoading(true);

      try {
        const { url, options } = DELETE_PROJECT(
          project.id,
          isAuthenticated()?.token || ""
        );
        await api[options.method](url, options);
        navigate('/');
      } catch (error: any) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (nameDelete.value != project.name) {
      nameDelete.setError("Nome inválido");
      return;
    }
    deleteProject();
  };

  return (
    <section className="delete-project-form flex column gap-125">
      <div className="delete-scenario-form-header">
        <h2>Tem certeza que deseja excluir o projeto {project.name}?</h2>
        <img
          src={Close}
          alt="Ícone 'X' popup"
          title="Ícone 'X' popup"
          onClick={onClose}
        />
      </div>
      <br />
      <Form style={{gap: '.5rem', userSelect: 'none'}}>
        <p>
          Por motivos de segurança, para excluir este projeto digite{" "}
          <b>{project.name}</b>
        </p>
        <Input
          type="text"
          name="name"
          placeholder=""
          label=""
          {...nameDelete}
          onInput={() => setError("")}
          onBlur={() => {}}
        />
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

export default DeleteProjectForm;
