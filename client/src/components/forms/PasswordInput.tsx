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
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  onChange,
  setCurrentScreen,
  enableForgotPassword,
  value,
  placeholder,
  label,
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
