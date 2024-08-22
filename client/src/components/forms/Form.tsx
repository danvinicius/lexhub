import React, { ReactNode } from "react";
import "./Form.scss";

interface FormProps {
  children: ReactNode
}

const Form: React.FC<FormProps> = ({children}: FormProps) => {


  return (
    <form className="form">
      {children}
    </form>
  );
};

export default Form;
