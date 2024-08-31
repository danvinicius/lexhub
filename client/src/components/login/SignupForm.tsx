import React, { useContext } from "react";
import Button from "../forms/Button";
import Input from "../forms/Input";
import Form from "../forms/Form";
import "./LoginForm.scss";
import { CreateUserRequestDTO, UserContext } from "../../context/UserContext";
import Loading from "../helper/Loading";
import {  CREATE_USER } from "../../api";
import api from "../../lib/axios";
import useForm from "../../hooks/useForm";
import Error from "../helper/Error";

interface LoginFormProps {
  setCurrentScreen: (screen: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  setCurrentScreen,
}: LoginFormProps) => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const {setUser} = useContext(UserContext) || {};

  const name = useForm()
  const email = useForm('email');
  const password = useForm('password');

  const signup = async (body: CreateUserRequestDTO) => {
    setLoading(true);
    try {
      const { url, options } = CREATE_USER();
      const response = await api[options.method](url, body);
      if (setUser) setUser(response.data);
    } catch (error: any) {
      setError(error.response.data.error)
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.validate() && password.validate()) {
      if (signup) signup({ name: name.value, email: email.value, password: password.value });
    }
  };

  return (
    <section className="signup-form flex column gap-125">
      <div className="title">
        <h1>Se inscreva</h1>
        <p className="signup">
          Já tem uma conta? &nbsp;
          <span onClick={() => setCurrentScreen("login")} className="pointer">
            Faça login
          </span>
        </p>
      </div>
      <Form>
        <Input
          type="name"
          name="name"
          placeholder="Seu nome"
          label="Nome completo"
          {...name}
          onInput={() => {setError('')}}
        />
        <Input
          type="email"
          name="email"
          placeholder="seu@email.com"
          label="E-mail"
          {...email}
          onInput={() => {setError('')}}
        />
        <Input
          type="password"
          name="password"
          placeholder="***********"
          label="Senha"
          {...password}
          onInput={() => {setError('')}}
        />
        {loading ? (
          <Loading />
        ) : (
          <Button text="Entrar" onClick={handleSubmit} />
        )}
        <Error error={error} />
      </Form>
    </section>
  );
};

export default LoginForm;
