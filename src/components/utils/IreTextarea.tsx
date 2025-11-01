import { Flex, Input } from "antd";
import { type UseFormRegisterReturn, type UseFormReturn } from "react-hook-form";

interface IreTextareaProps {
    label?: string;
    placeholder?: string;
    formContext: UseFormReturn<any>;
    registerName: UseFormRegisterReturn;
    isRequired?: boolean;
    errorMessage?: string;
    widthFull?: boolean;
    rows?: number;
    maxLength?: number;
}

const IreTextarea = ({
    label,
    placeholder,
    formContext,
    registerName,
    isRequired = false,
    widthFull = true,
    errorMessage,
    rows = 4,
    maxLength
}: IreTextareaProps) => {
    return (
        <>
            <Flex vertical className={`gap-1 ${widthFull ? "w-full" : ""}`}>
                <label className={`w-full text-md ${isRequired ? "is-required" : ""}`}>
                    {label}
                </label>
                <Input.TextArea
                    rows={rows}
                    size="large"
                    placeholder={placeholder ?? label}
                    value={formContext.getValues(registerName.name)}
                    onBlur={() => formContext.clearErrors(registerName.name)}
                    onChange={(e) => formContext.setValue(registerName.name, e.target.value)}
                    status={formContext.formState.errors[registerName.name] ? "error" : undefined}
                    maxLength={maxLength}
                    autoSize={false}
                />
                {
                    <label className="text-red-500 text-xs min-h-[18px]">
                        {
                            (errorMessage || formContext.formState.errors[registerName.name]?.message) && (
                                <>{errorMessage || String(formContext.formState.errors[registerName.name]?.message)}</>
                            )
                        }
                    </label>
                }
            </Flex>
        </>
    );
};

export default IreTextarea;