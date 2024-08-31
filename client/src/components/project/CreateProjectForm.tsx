import React, { useContext } from "react";
import Button from "../forms/Button";
import Input from "../forms/Input";
import Form from "../forms/Form";
import "./CreateProjectForm.scss";
import { UserContext } from "../../context/UserContext";
import Loading from "../helper/Loading";
import { CREATE_PROJECT } from "../../api";
import useForm from "../../hooks/useForm";
import api from "../../lib/axios";
import Error from "../helper/Error";
import { useNavigate } from "react-router-dom";

export interface CreateProjectRequestDTO {
  name: string;
  description: string;
}

const CreateProjectForm = () => {
  const name = useForm();
  const description = useForm();

  const { isAuthenticated } = useContext(UserContext) || {};

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate()

  const createProject = async (body: CreateProjectRequestDTO) => {
    setLoading(true);
    
    try {
      const { url, options } = CREATE_PROJECT(isAuthenticated ? isAuthenticated().token : '');
      await api[options.method](url, body, options);
      navigate('/');
    } catch (error: any) {
      setError(error.response.data.error)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (createProject) createProject({ name: name.value, description: description.value });
  };

  return (
    <section className="createProjectForm flex column gap-125">
      <Form>
        <Input
          type="text"
          name="name"
          placeholder="Plataforma de petróleo"
          label="Nome do projeto"
          {...name}
          onInput={() => setError('')}
        />
        <Input
          type="text"
          name="description"
          placeholder="Um projeto focado no desenvolvimento de uma plataforma de petróleo sustentável."
          label="Descrição"
          {...description}
          onInput={() => setError('')}
        />
        {loading ? (
          <Loading />
        ) : (
          <Button text="Criar" onClick={handleSubmit} />
        )}
        <Error error={error}/>
      </Form>
    </section>
  );
};

export default CreateProjectForm;
