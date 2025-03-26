import { CSSProperties, FC, FormEvent } from 'react';

import './Button.scss';

interface ButtonProps {
    text: string
    theme: 'primary' | 'secondary' | 'danger' | 'helper'
    style?: CSSProperties
    onClick?: (e: FormEvent) => void
}

const Button: FC<ButtonProps> = ({text, theme, style, onClick}: ButtonProps) => {
	return (
		<button className={`button ${theme}`} onClick={onClick ? onClick : () => null} style={style}>
			{text}
		</button>
	);
};

export default Button;