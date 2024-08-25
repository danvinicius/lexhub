import React, { useContext, useState } from "react";
import Button from "../forms/Button";
import Input from "../forms/Input";
import Form from "../forms/Form";
import "./LoginForm.scss";
import { UserContext } from "../../context/UserContext";
import Loading from "../helper/Loading";

interface LoginFormProps {
  setCurrentScreen: (screen: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  setCurrentScreen,
}: LoginFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { loading, error, signup } = useContext(UserContext) || {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signup) signup(formData);
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
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="seu@email.com"
          label="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="***********"
          label="Senha"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          type="tel"
          name="phone"
          placeholder="(xx) xxxxx-xxxx"
          label="Telefone"
          value={formData.phone}
          onChange={handleChange}
          error={error}
        />
        {loading ? (
          <Loading />
        ) : (
          <Button text="Entrar" onClick={handleSubmit} />
        )}
      </Form>
    </section>
  );
};

export default LoginForm;
