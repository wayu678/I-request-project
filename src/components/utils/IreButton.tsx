import { Button } from "antd";
import { type ReactNode } from "react";

type ButtonColor = "green" | "red" | "default";
type ButtonVariant = "solid" | "outlined" | "text";

interface IreButtonProps {
    label?: string;
    color?: ButtonColor;
    variant?: ButtonVariant;
    size?: "small" | "middle" | "large";
    block?: boolean;
    disabled?: boolean;
    htmlType?: "button" | "submit" | "reset";
    icon?: ReactNode;
    onClick?: () => void;
    widthFull?: boolean;
}

const IreButton = ({
    label,
    color = "green",
    variant = "solid",
    size = "middle",
    block = false,
    disabled = false,
    htmlType = "button",
    icon,
    onClick,
    widthFull = false
}: IreButtonProps) => {
    return (
        <Button
            color={color === "default" ? undefined : color}
            variant={variant}
            size={size}
            block={block}
            disabled={disabled}
            htmlType={htmlType}
            icon={icon}
            className={`${widthFull ? "w-full" : ""}`}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};

export default IreButton;