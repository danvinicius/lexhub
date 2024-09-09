import { FC, ReactNode } from "react";
import "./Form.scss";

interface FormProps {
  children: ReactNode
}

const Form: FC<FormProps> = ({children}: FormProps) => {


  return (
    <form className="form" onSubmit={e => { e.preventDefault(); }}>
      {children}
    </form>
  );
};

export default Form;
