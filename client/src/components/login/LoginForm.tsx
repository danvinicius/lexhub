import React, { useContext, useState } from "react";
import Button from "../forms/Button";
import Input from "../forms/Input";
import Form from "../forms/Form";
import "./LoginForm.scss";
import PasswordInput from "../forms/PasswordInput";
import { UserContext } from "../../context/UserContext";
import Loading from "../helper/Loading";

interface LoginFormProps {
  setCurrentScreen: (screen: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  setCurrentScreen,
}: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = useContext(UserContext) || {};

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
    if (login) login(formData);
  };

  return (
    <section className="login-form flex column gap-125">
      <div className="title">
        <h1>Login</h1>
        <p className="signup">
          Não tem uma conta ainda? &nbsp;
          <span onClick={() => setCurrentScreen("signup")} className="pointer">
            Se inscreva.
          </span>
        </p>
      </div>
      <Form>
        <Input
          type="email"
          name="email"
          placeholder="seu@email.com"
          label="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <PasswordInput
          enableForgotPassword={true}
          placeholder="*********"
          label="Senha"
          value={formData.password}
          onChange={handleChange}
          setCurrentScreen={setCurrentScreen}
          error={error}
        />
        {loading ? <Loading/> : <Button text="Entrar" onClick={handleSubmit} />}
      </Form>
    </section>
  );
};

export default LoginForm;
