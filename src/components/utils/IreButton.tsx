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
    height?: string | number;
    width?: string | number;
    loading?: boolean;
    className?: string;
    style?: React.CSSProperties;
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
    widthFull = false,
    height,
    width,
    loading = false,
    className = "",
    style = {}
}: IreButtonProps) => {
    // แปลง color เป็น type สำหรับ Antd Button
    const getButtonType = () => {
        if (color === "green") return "primary";
        if (color === "red") return "primary";
        return "default";
    };

    const buttonStyle = {
        ...style,
        ...(height && {
            height: `${height}px`,
            minHeight: `${height}px`,
            maxHeight: `${height}px`,
            lineHeight: `${height}px`
        }),
        ...(width && {
            width: `${width}px`,
            minWidth: `${width}px`,
            maxWidth: `${width}px`
        })
    };

    return (
        <Button
            type={getButtonType()}
            size={size}
            block={block}
            disabled={disabled}
            htmlType={htmlType}
            icon={icon}
            loading={loading}
            className={`${widthFull ? "w-full" : ""} ${className}`}
            style={buttonStyle}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};

export default IreButton;