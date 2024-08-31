import Input from "./Input";
import Eye from "../../assets/icon/Eye.svg";
import EyeOff from "../../assets/icon/Eye_Off.svg";
import React from "react";
import './PasswordInput.scss'

interface PasswordInputProps {
  onChange: ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setCurrentScreen: (screen: string) => void,
  enableForgotPassword: boolean;
  value: string;
  placeholder: string;
  label: string;
  error?: string | null;
  onInput: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onBlur: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  onChange,
  onInput,
  onBlur,
  setCurrentScreen,
  enableForgotPassword,
  value,
  placeholder,
  label,
  error,
}: PasswordInputProps) => {
  const [type, setType] = React.useState("password");
  return (
    <div className="password-input-wrapper">
      {enableForgotPassword && (
        <small
          className="secondary-text-color pointer"
          onClick={() => setCurrentScreen('forgot')}
        >
          Esqueceu sua senha?
        </small>
      )}

      <Input
        type={type}
        name="password"
        placeholder={placeholder}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onInput={onInput}
        error={error}
      />
      {type == "password" && (
        <img
          className="pointer"
          src={Eye}
          alt="Turn password visible"
          onClick={() => setType("text")}
        />
      )}
      {type == "text" && (
        <img
          className="pointer"
          src={EyeOff}
          alt="Turn password invisible"
          onClick={() => setType("password")}
        />
      )}
    </div>
  );
};

export default PasswordInput;
