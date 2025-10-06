import { Flex, Input } from "antd";
import { type UseFormRegisterReturn, type UseFormReturn } from "react-hook-form";

interface IrePasswordProps {
    label?: string;
    placeholder?: string;
    formContext: UseFormReturn<any>;
    registerName: UseFormRegisterReturn;
    isRequired?: boolean;
    errorMessage?: string;
    widthFull?: boolean;
    min?: number;
    max?: number;
}

const IrePassword = ({
    label,
    placeholder,
    formContext,
    registerName,
    isRequired = false,
    widthFull = true,
    errorMessage,
    min,
    max
}: IrePasswordProps) => {
    return (
        <>
            <Flex vertical className={`gap-1 ${widthFull ? "w-full" : ""}`}>
                <label className={`w-full text-md ${isRequired ? "is-required" : ""}`}>
                    {label}
                </label>
                <Input.Password
                    size="large"
                    placeholder={placeholder ?? label}
                    value={formContext.getValues(registerName.name)}
                    onBlur={() => formContext.clearErrors(registerName.name)}
                    onChange={(e) => formContext.setValue(registerName.name, e.target.value)}
                    status={formContext.formState.errors[registerName.name] ? "error" : undefined}
                    minLength={min}
                    maxLength={max}
                />
                {
                    errorMessage && (
                        <label className="text-red-500">
                            {errorMessage}
                        </label>
                    )
                }
            </Flex>
        </>
    );
};

export default IrePassword;


