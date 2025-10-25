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
            <Flex vertical className={`gap-1.5 ${widthFull ? "w-full" : ""}`}>
                <label className={`w-full text-md ${isRequired ? "is-required" : ""}`} style={{ color: '#000000' }}>
                    {label}
                </label>
                <Select
                    size="large"
                    className="w-full ire-select-custom"
                    placeholder={placeholder ?? label}
                    value={formContext.getValues(registerName.name)}
                    onBlur={() => formContext.clearErrors(registerName.name)}
                    onChange={(value) => {
                        formContext.setValue(registerName.name, value);
                        formContext.trigger(registerName.name);
                    }}
                    status={formContext.formState.errors[registerName.name] ? "error" : undefined}
                    options={options}
                    allowClear={allowClear}
                    disabled={disabled}
                    showSearch={false}
                    filterOption={false}
                    style={{
                        backgroundColor: '#fff'
                    }}
                    styles={{
                        selector: {
                            borderColor: '#99CCB3'
                        }
                    } as any}
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