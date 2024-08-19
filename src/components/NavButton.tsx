import Button from "./Button";
import { FC } from "react";

interface NavButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

const NavButton: FC<NavButtonProps> = ({ onClick, children }) => (
    <Button
        className="flex items-center gap-1 text-gray-700 px-3 py-1 rounded-lg bg-white border-2 border-gray-300 hover:text-red-500 hover:border-transparent transition-colors"
        onClick={onClick}
    >
        {children}
    </Button>
);

export default NavButton;
