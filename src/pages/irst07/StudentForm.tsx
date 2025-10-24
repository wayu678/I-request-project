import { Flex, Row, Col, Input, Card } from "antd"
import { useState, useEffect } from "react"
import { useTranslate } from "../../provider/hooks/translate.hook"

interface StudentFormData {
    studentName: string;
    studentYear: string;
    major: string;
    email: string;
    studentId: string;
    faculty: string;
    phoneNumber: string;
}

interface StudentFormProps {
    onFormChange?: (data: StudentFormData) => void;
}

const StudentForm = ({ onFormChange }: StudentFormProps) => {
    const { translate } = useTranslate()

    const [formData, setFormData] = useState<StudentFormData>({
        studentName: '',
        studentYear: '',
        major: '',
        email: '',
        studentId: '',
        faculty: '',
        phoneNumber: ''
    })

    const [errors, setErrors] = useState<Partial<StudentFormData>>({})

    // ส่งข้อมูลไปยัง parent component ทุกครั้งที่เปลี่ยน
    useEffect(() => {
        if (onFormChange) {
            onFormChange(formData);
        }
    }, [formData, onFormChange]);

    const errorMessages = {
        studentName: translate("กรุณากรอกชื่อนิสิต", "Please enter student name"),
        studentId: translate("กรุณากรอกรหัสประจำตัวนิสิต", "Please enter student ID"),
        studentYear: translate("กรุณากรอกชั้นปี", "Please enter student year"),
        faculty: translate("กรุณากรอกคณะ", "Please enter faculty"),
        major: translate("กรุณากรอกสาขา", "Please enter major/branch"),
        phoneNumber: translate("กรุณากรอกหมายเลขโทรศัพท์", "Please enter phone number"),
        email: translate("กรุณากรอกอีเมล", "Please enter email")
    }

    const handleInputChange = (field: keyof StudentFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }))
        }
    }

    const validateField = (field: keyof StudentFormData, value: string): string | undefined => {
        if (!value.trim()) {
            return errorMessages[field]
        }

        if (field === 'email' && value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(value)) {
                return translate("รูปแบบอีเมลไม่ถูกต้อง", "Invalid email format")
            }
        }

        return undefined
    }

    const handleBlur = (field: keyof StudentFormData) => {
        const error = validateField(field, formData[field])
        setErrors(prev => ({
            ...prev,
            [field]: error
        }))
    }

    const renderInputField = (
        field: keyof StudentFormData,
        label: string,
        placeholder: string,
        className: string = "bg-gray-100 border-gray-300 rounded-lg"
    ) => (
        <Flex vertical gap="small">
            <span className="text-sm font-medium text-gray-700">
                {label} <span className="text-red-500">*</span>
            </span>
            <Input
                placeholder={placeholder}
                className={`${className} ${errors[field] ? 'border-red-500' : ''}`}
                size="large"
                value={formData[field]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(field, e.target.value)
                }
                onBlur={() => handleBlur(field)}
                status={errors[field] ? 'error' : undefined}
            />
            {errors[field] && (
                <span className="text-red-500 text-xs">
                    {errors[field]}
                </span>
            )}
        </Flex>
    )

    const formFields: { field: keyof StudentFormData, label: string, placeholder: string, className?: string }[] = [
        {
            field: 'studentName',
            label: translate("ชื่อนิสิต", "Student Name"),
            placeholder: translate("ชื่อนิสิต", "Student Name")
        },
        {
            field: 'studentId',
            label: translate("รหัสประจำตัวนิสิต", "Student ID"),
            placeholder: translate("รหัสประจำตัวนิสิต", "Student ID")
        },
        {
            field: 'studentYear',
            label: translate("นิสิตชั้นปีที่", "Student Year"),
            placeholder: translate("นิสิตชั้นปีที่", "Student Year")
        },
        {
            field: 'faculty',
            label: translate("คณะ", "Faculty"),
            placeholder: translate("คณะ", "Faculty")
        },
        {
            field: 'major',
            label: translate("สาขา", "Major/Branch"),
            placeholder: translate("สาขา", "Major/Branch")
        },
        {
            field: 'phoneNumber',
            label: translate("หมายเลขโทรศัพท์", "Phone Number"),
            placeholder: "099-999-9999",
            className: "bg-white border-green-300 rounded-lg"
        },
        {
            field: 'email',
            label: translate("E-mail", "E-mail"),
            placeholder: "email@address.com",
            className: "bg-white border-green-300 rounded-lg"
        }
    ]

    return (
        <Flex justify="center" align="start" className="w-full mb-6">
            <Card className="w-full max-w-6xl">
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Flex vertical gap="middle">
                            {formFields
                                .filter((_, index) => index % 2 === 0)
                                .map((field) => (
                                    <div key={field.field}>
                                        {renderInputField(
                                            field.field,
                                            field.label,
                                            field.placeholder,
                                            field.className || "bg-gray-100 border-gray-300 rounded-lg"
                                        )}
                                    </div>
                                ))}
                        </Flex>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Flex vertical gap="middle">
                            {formFields
                                .filter((_, index) => index % 2 === 1)
                                .map((field) => (
                                    <div key={field.field}>
                                        {renderInputField(
                                            field.field,
                                            field.label,
                                            field.placeholder,
                                            field.className || "bg-gray-100 border-gray-300 rounded-lg"
                                        )}
                                    </div>
                                ))}
                        </Flex>
                    </Col>
                </Row>
            </Card>
        </Flex>
    )
}

export default StudentForm
