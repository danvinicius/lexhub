import React from 'react'
import './Button.scss'

interface ButtonProps {
    text: string
    onClick?: (e: React.FormEvent) => void
}

const Button: React.FC<ButtonProps> = ({text, onClick}: ButtonProps) => {
    return (
        <button className='button' onClick={onClick ? onClick : () => {}}>
            {text}
        </button>
    )
}

export default Button;