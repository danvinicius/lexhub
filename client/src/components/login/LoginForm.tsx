import { FC, FormEvent, useContext, useState } from "react";
import Button from "../forms/Button";
import Input from "../forms/Input";
import Form from "../forms/Form";
import "./LoginForm.scss";
import PasswordInput from "../forms/PasswordInput";
import { AuthUserRequestDTO, UserContext } from "../../context/UserContext";
import Loading from "../helper/Loading";
import useForm from "../../hooks/useForm";
import Error from "../helper/Error";
import { AUTH_USER } from "../../api";
import api from "../../lib/axios";
interface LoginFormProps {
  setCurrentScreen: (screen: string) => void;
}

const LoginForm: FC<LoginFormProps> = ({
  setCurrentScreen,
}: LoginFormProps) => {
  const email = useForm('dontValidateEmail');
  const password = useForm('dontValidatePassword');
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {setUser} = useContext(UserContext) || {};

  const login = async (body: AuthUserRequestDTO) => {
    setLoading(true);
    try {
      const { url, options } = AUTH_USER();
      const response = await api[options.method](url, body);
      if (setUser) setUser(response.data);
    } catch (error: any) {
      setError(error.response.data.error)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email.validate() && password.validate()) {
      login({ email: email.value, password: password.value })
    }
  };

  return (
    <section className="login-form flex column gap-125">
      <div className="title">
        <h1>Login</h1>
        <p className="signup">
          Não tem uma conta ainda? &nbsp;
          <span onClick={() => setCurrentScreen("signup")} className="action pointer">
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
          autoFocus
          {...email}
          onInput={() => {setError('')}}
        />
        <PasswordInput
          placeholder="*********"
          label="Senha"
          setCurrentScreen={setCurrentScreen}
          enableForgotPassword={true}
          {...password}
          onInput={() => {setError('')}}
        />
        {loading ? (
          <Loading />
        ) : (
          <Button theme="primary" text="Entrar" onClick={handleSubmit} />
        )}
        <Error error={error} />
      </Form>
    </section>
  );
};

export default LoginForm;
