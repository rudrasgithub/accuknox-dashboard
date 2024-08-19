import { FC, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement> | (() => void);
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ className = '', onClick, children, type = 'button', disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
export default Button;
