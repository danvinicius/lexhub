/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useContext, useEffect, useState } from "react";
import Button from "../forms/Button";
import Input from "../forms/Input";
import Form from "../forms/Form";
import "./EditProjectForm.scss";
import { UserContext } from "../../context/UserContext";
import Loading from "../helper/Loading";
import { EDIT_PROJECT } from "../../api";
import useForm from "../../hooks/useForm";
import api from "../../lib/axios";
import Error from "../helper/Error";
import { useNavigate } from "react-router-dom";
import { IProject } from "../../shared/interfaces";
import Close from "../../assets/icon/Close_Dark.svg";

export interface EditProjectRequestDTO {
  name: string;
  description: string;
}

interface EditProjectFormProps {
  project: IProject;
  onClose: () => void;
}

const EditProjectForm = ({ project, onClose }: EditProjectFormProps) => {
  const nameEdit = useForm("dontValidateName");
  const descriptionEdit = useForm("dontValidateDescription");

  useEffect(() => {
    nameEdit.setValue(project.name);
    descriptionEdit.setValue(project.description);
  }, []);

  const { isAuthenticated } = useContext(UserContext) || {};

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const editProject = async (body: EditProjectRequestDTO) => {
    console.log(project?.id);
    
    if (project?.id) {
      setLoading(true);

      try {
        const { url, options } = EDIT_PROJECT(
          project.id,
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
    if (nameEdit.validate() && descriptionEdit.validate()) {
      editProject({ name: nameEdit.value, description: descriptionEdit.value });
    }
  };

  return (
    <section className="edit-project-form flex column gap-125">
      <div className="edit-scenario-form-header">
        <h2>Editar projeto</h2>
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
          placeholder="Plataforma de petróleo"
          label="Nome do projeto"
          {...nameEdit}
          onInput={() => setError("")}
        />
        <Input
          type="text"
          name="description"
          placeholder="Um projeto focado no desenvolvimento de uma plataforma de petróleo sustentável."
          label="Descrição"
          {...descriptionEdit}
          onInput={() => setError("")}
        />
        {loading ? (
          <Loading />
        ) : (
          <Button theme="primary" text="Salvar" onClick={handleSubmit} />
        )}
        <Error error={error} />
      </Form>
    </section>
  );
};

export default EditProjectForm;
