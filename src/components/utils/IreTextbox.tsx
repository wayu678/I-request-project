import { Flex, Input } from "antd";
import { type UseFormRegisterReturn, type UseFormReturn } from "react-hook-form";
import { type ReactNode } from "react";

interface IreTextboxProps {
    label?: string;
    placeholder?: string;
    formContext: UseFormReturn<any>;
    registerName: UseFormRegisterReturn;
    isRequired?: boolean;
    errorMessage?: string;
    suffix?: ReactNode;
    type?: "text" | "textarea" | "password";
    widthFull?: boolean;
    min?: number;
    max?: number;
}

const IreTextbox = ({
    label,
    placeholder,
    formContext,
    registerName,
    type = "text",
    isRequired = false,
    widthFull = true,
    errorMessage,
    suffix,
    min,
    max
}: IreTextboxProps) => {
    return (
        <>
            <Flex vertical className={`gap-1 ${widthFull ? "w-full" : ""}`}>
                <label className={`w-full text-sm mb-2 ${isRequired ? "is-required" : ""}`} style={{ color: 'rgba(0, 0, 0, 0.75)' }}>
                    {label}
                </label>
                <Input
                    size="large"
                    placeholder={placeholder ?? label}
                    value={formContext.getValues(registerName.name)}
                    onBlur={() => formContext.clearErrors(registerName.name)}
                    onChange={(e) => formContext.setValue(registerName.name, e.target.value)}
                    status={formContext.formState.errors[registerName.name] ? "error" : undefined}
                    min={min}
                    max={max}
                    type={type}
                    suffix={suffix}
                    className="rounded-lg"
                    style={{
                        borderColor: '#99CCB3',
                        backgroundColor: '#fff'
                    }}
                />
                {
                    errorMessage && (
                        <label className="text-red-500 text-sm">
                            {errorMessage}
                        </label>
                    )
                }
            </Flex>

        </>
    )
}

export default IreTextbox;