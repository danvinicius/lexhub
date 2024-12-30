import { CSSProperties, FC, ReactNode } from 'react';

interface FormProps {
  children: ReactNode
  style?: CSSProperties
}

const Form: FC<FormProps> = ({children, style}: FormProps) => {
	return (
		<form className="flex column gap-125" style={style} onSubmit={e => { e.preventDefault(); }}>
			{children}
		</form>
	);
};

export default Form;
