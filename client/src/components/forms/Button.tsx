import { FC, FormEvent } from 'react'
import './Button.scss'

interface ButtonProps {
    text: string
    theme: 'primary' | 'secondary' | 'danger'
    onClick?: (e: FormEvent) => void
}

const Button: FC<ButtonProps> = ({text, theme, onClick}: ButtonProps) => {
    return (
        <button className={`button ${theme}`} onClick={onClick ? onClick : () => {}}>
            {text}
        </button>
    )
}

export default Button;