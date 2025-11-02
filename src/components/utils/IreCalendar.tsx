import { DatePicker, Flex } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { type UseFormRegisterReturn, type UseFormReturn } from "react-hook-form";

interface IreCalendarProps {
    label?: string;
    placeholder?: string;
    formContext: UseFormReturn<any>;
    registerName: UseFormRegisterReturn;
    isRequired?: boolean;
    errorMessage?: string;
    widthFull?: boolean;
    format?: string;
    disabled?: boolean;
    picker?: "date" | "month" | "year";
}

const IreCalendar = ({
    label,
    placeholder,
    formContext,
    registerName,
    isRequired = false,
    widthFull = true,
    errorMessage,
    format = "DD/MM/YYYY",
    disabled = false
}: IreCalendarProps) => {
    const value: string | Dayjs | undefined = formContext.getValues(registerName.name);
    const dayValue = typeof value === "string" && value ? dayjs(value, format) : (value as Dayjs | undefined);

    return (
        <>
            <Flex vertical className={`gap-2 ${widthFull ? "w-full" : ""}`}>
                <label className={`w-full text-md ${isRequired ? "is-required" : ""}`} style={{ color: '#000000' }}>
                    {label}
                </label>
                <DatePicker
                    className="w-full"
                    size="large"
                    placeholder={placeholder ?? format}
                    value={dayValue}
                    format={format}
                    onChange={(date) => {
                        const val = date ? (date as Dayjs).format(format) : undefined;
                        formContext.setValue(registerName.name, val as any);
                        formContext.clearErrors(registerName.name);
                    }}
                    status={formContext.formState.errors[registerName.name] ? "error" : undefined}
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

export default IreCalendar;