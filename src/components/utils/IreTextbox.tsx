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
    type?: "text" | "textarea" | "password" | "number";
    widthFull?: boolean;
    min?: number;
    max?: number;
    formatType?: "phone" | "currency" | "number" | "email" | "studentId" | "textOnly";
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
    max,
    formatType
}: IreTextboxProps) => {
    // ฟังก์ชันสำหรับฟอร์แมตเบอร์โทรศัพท์
    const formatPhoneNumber = (value: string) => {
        // ลบตัวอักษรที่ไม่ใช่ตัวเลข
        const numbers = value.replace(/\D/g, '');
        // ฟอร์แมตเป็น XXX-XXX-XXXX
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    };

    // ฟังก์ชันสำหรับฟอร์แมตจำนวนเงิน
    const formatCurrency = (value: string) => {
        // ลบตัวอักษรที่ไม่ใช่ตัวเลขและจุดทศนิยม
        const cleanValue = value.replace(/[^\d.]/g, '');

        // ถ้าเป็นค่าว่างให้คืนค่าว่าง
        if (cleanValue === '') return '';

        // แปลงเป็นตัวเลข
        const number = parseFloat(cleanValue);

        // ถ้าไม่ใช่ตัวเลขที่ถูกต้องให้คืนค่าเดิม
        if (isNaN(number)) return cleanValue;

        // แสดงเป็นทศนิยม 2 ตำแหน่งเสมอ
        return number.toFixed(2);
    };

    // ฟังก์ชันจัดการการเปลี่ยนแปลงค่า
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (formatType === "phone") {
            value = formatPhoneNumber(value);
        } else if (formatType === "currency") {
            // สำหรับจำนวนเงิน ให้อนุญาตให้พิมพ์ได้ปกติ แต่จะฟอร์แมตเมื่อ onBlur เท่านั้น
            // กรองเฉพาะตัวเลขและจุดทศนิยม
            value = value.replace(/[^\d.]/g, '');
        } else if (formatType === "number") {
            // กรองเฉพาะตัวเลข
            value = value.replace(/\D/g, '');
        } else if (formatType === "studentId") {
            // สำหรับรหัสประจำตัวนิสิต กรองเฉพาะตัวเลขและจำกัด 10 ตัว
            value = formatStudentId(value);
        } else if (formatType === "textOnly") {
            // สำหรับข้อความเฉพาะตัวอักษร
            value = formatTextOnly(value);
        } else if (formatType === "email") {
            // สำหรับอีเมล กรองเฉพาะตัวอักษรอังกฤษ ตัวเลข และสัญลักษณ์ที่อนุญาต
            // อนุญาต: a-z, A-Z, 0-9, @, ., _, %, +, -
            value = value.replace(/[^a-zA-Z0-9@._%+-]/g, '');
        }

        formContext.setValue(registerName.name, value);
    };

    // ฟังก์ชันสำหรับฟอร์แมตรหัสประจำตัวนิสิต (ตัวเลข 10 ตัว)
    const formatStudentId = (value: string) => {
        // ลบตัวอักษรที่ไม่ใช่ตัวเลข
        const numbers = value.replace(/\D/g, '');
        // จำกัดความยาวไม่เกิน 10 ตัว
        return numbers.slice(0, 10);
    };

    // ฟังก์ชันสำหรับฟอร์แมตข้อความเฉพาะตัวอักษร
    const formatTextOnly = (value: string) => {
        // ลบตัวเลขและสัญลักษณ์พิเศษ เหลือเฉพาะตัวอักษรและช่องว่าง
        return value.replace(/[^a-zA-Zก-๙\s]/g, '');
    };

    // ฟังก์ชันตรวจสอบอีเมล
    const validateEmail = (email: string) => {
        // รูปแบบอีเมลที่ถูกต้อง: มี @ และ . และไม่ขึ้นต้นด้วย @ หรือ .
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // ฟังก์ชันจัดการเมื่อออกจากฟิลด์ (onBlur)
    const handleBlur = () => {
        formContext.clearErrors(registerName.name);

        // ถ้าเป็นฟิลด์จำนวนเงิน ให้ฟอร์แมตเมื่อออกจากฟิลด์
        if (formatType === "currency") {
            const currentValue = formContext.getValues(registerName.name);
            if (currentValue) {
                // แปลงเป็นตัวเลขและแสดงทศนิยม 2 ตำแหน่งเสมอ
                const number = parseFloat(currentValue);
                if (!isNaN(number)) {
                    const formattedValue = number.toFixed(2);
                    formContext.setValue(registerName.name, formattedValue);
                }
            }
        }

        // ถ้าเป็นฟิลด์อีเมล ให้ตรวจสอบความถูกต้อง
        if (formatType === "email") {
            const currentValue = formContext.getValues(registerName.name);
            if (currentValue && !validateEmail(currentValue)) {
                formContext.setError(registerName.name, {
                    type: "manual",
                    message: "รูปแบบอีเมลไม่ถูกต้อง"
                });
            }
        }

        // ถ้าเป็นฟิลด์รหัสประจำตัวนิสิต ให้ตรวจสอบความยาว
        if (formatType === "studentId") {
            const currentValue = formContext.getValues(registerName.name);
            if (currentValue && currentValue.length !== 10) {
                formContext.setError(registerName.name, {
                    type: "manual",
                    message: "รหัสประจำตัวนิสิตต้องมี 10 หลัก"
                });
            }
        }
    };

    return (
        <>
            <Flex vertical className={`gap-2 ${widthFull ? "w-full" : ""}`}>
                <label className={`w-full text-md ${isRequired ? "is-required" : ""}`} style={{ color: '#000000' }}>
                    {label}
                </label>
                <Input
                    size="large"
                    placeholder={placeholder ?? label}
                    value={formContext.watch(registerName.name) ?? ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    status={formContext.formState.errors[registerName.name] ? "error" : undefined}
                    min={min}
                    max={max}
                    type={formatType === "number" || formatType === "currency" ? "text" : type}
                    suffix={suffix}
                    className="rounded-lg"
                    style={{
                        borderColor: '#99CCB3',
                        backgroundColor: '#fff',
                        textAlign: formatType === "currency" && formContext.getValues(registerName.name) ? "right" : "left"
                    }}
                />
                <label className="text-red-500 text-xs min-h-[18px]">
                    {
                        (errorMessage || formContext.formState.errors[registerName.name]?.message) && (
                            <>{errorMessage || String(formContext.formState.errors[registerName.name]?.message)}</>
                        )
                    }
                </label>
            </Flex>

        </>
    )
}

export default IreTextbox;