import { CSSProperties, FC, ReactNode } from "react";
import "./Form.scss";

interface FormProps {
  children: ReactNode
  style?: CSSProperties
}

const Form: FC<FormProps> = ({children, style}: FormProps) => {


  return (
    <form className="form" style={style} onSubmit={e => { e.preventDefault(); }}>
      {children}
    </form>
  );
};

export default Form;
