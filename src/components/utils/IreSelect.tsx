import { Flex, Select } from "antd";
import { type UseFormRegisterReturn, type UseFormReturn } from "react-hook-form";

interface OptionItem {
    label: string;
    value: string | number;
    disabled?: boolean;
}

interface IreSelectProps {
    label?: string;
    placeholder?: string;
    formContext: UseFormReturn<any>;
    registerName: UseFormRegisterReturn;
    isRequired?: boolean;
    errorMessage?: string;
    widthFull?: boolean;
    options: OptionItem[];
    allowClear?: boolean;
    disabled?: boolean;
}

const IreSelect = ({
    label,
    placeholder,
    formContext,
    registerName,
    isRequired = false,
    widthFull = true,
    errorMessage,
    options,
    allowClear = true,
    disabled = false
}: IreSelectProps) => {
    return (
        <>
            <Flex vertical className={`gap-1 ${widthFull ? "w-full" : ""}`}>
                <label className={`w-full text-md ${isRequired ? "is-required" : ""}`}>
                    {label}
                </label>
                <Select
                    size="large"
                    className="w-full"
                    placeholder={placeholder ?? label}
                    value={formContext.getValues(registerName.name)}
                    onBlur={() => formContext.clearErrors(registerName.name)}
                    onChange={(value) => formContext.setValue(registerName.name, value)}
                    status={formContext.formState.errors[registerName.name] ? "error" : undefined}
                    options={options}
                    allowClear={allowClear}
                    disabled={disabled}
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

export default IreSelect;