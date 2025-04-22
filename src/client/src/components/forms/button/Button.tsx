import { CSSProperties, FC, FormEvent } from 'react';

import './Button.scss';

interface ButtonProps {
    text: string
    theme: 'primary' | 'secondary' | 'danger' | 'helper'
	className?: string
    style?: CSSProperties
    onClick?: (e: FormEvent) => void
}

const Button: FC<ButtonProps> = ({text, theme, className, style, onClick}: ButtonProps) => {
	return (
		<button className={`button ${theme} ${className}`} onClick={onClick ? onClick : () => null} style={style}>
			{text}
		</button>
	);
};

export default Button;