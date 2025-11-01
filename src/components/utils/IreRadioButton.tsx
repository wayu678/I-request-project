import { Flex, Radio } from "antd";
import { type UseFormRegisterReturn, type UseFormReturn } from "react-hook-form";

interface OptionItem {
  label: string;
  value: string | number;
}

interface IreRadioButtonProps {
  label?: string;
  options: OptionItem[];
  formContext: UseFormReturn<any>;
  registerName: UseFormRegisterReturn;
  isRequired?: boolean;
  errorMessage?: string;
  widthFull?: boolean;
  direction?: "horizontal" | "vertical";
}

const IreRadioButton = ({
  label,
  options,
  formContext,
  registerName,
  isRequired = false,
  widthFull = true,
  errorMessage,
  direction = "horizontal"
}: IreRadioButtonProps) => {
  const currentValue = formContext.getValues(registerName.name);

  return (
    <Flex vertical className={`gap-2 ${widthFull ? "w-full" : ""}`}>
      {label && (
        <label className={`text-md ${isRequired ? "is-required" : ""}`} style={{ color: '#000000' }}>
          {label}
        </label>
      )}

      <Radio.Group
        value={currentValue}
        onChange={(e) => formContext.setValue(registerName.name, e.target.value)}
        onBlur={() => formContext.clearErrors(registerName.name)}
        className="ire-radio-custom"
      >
        {/* ✅ ใช้ Flex เพื่อจัดแนวแสดงผล */}
        <Flex
          vertical={direction === "vertical"}
          gap={direction === "horizontal" ? 24 : 8}
          className={direction === "horizontal" ? "flex-wrap" : ""}
        >
          {options.map((opt) => (
            <Radio key={opt.value} value={opt.value}>
              {opt.label}
            </Radio>
          ))}
        </Flex>
      </Radio.Group>

      <label className="text-red-500 text-xs min-h-[18px]">
        {
          (errorMessage || formContext.formState.errors[registerName.name]?.message) && (
            <>{errorMessage || String(formContext.formState.errors[registerName.name]?.message)}</>
          )
        }
      </label>
    </Flex>
  );
};

export default IreRadioButton;