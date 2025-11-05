import { Flex, Row, Col } from "antd"
import { useEffect } from "react"
import { useTranslate } from "../../provider/hooks/translate.hook"
import { useForm } from "react-hook-form"
import { IreTextbox } from "../../components/utils"

interface StudentFormData {
    studentName: string;
    major: string;
    email: string;
    studentId: string;
    faculty: string;
    phoneNumber: string;
}

interface StudentFormProps {
    onFormChange?: (data: Partial<StudentFormData>) => void;
}

const StudentForm = ({ onFormChange }: StudentFormProps) => {
    const { translate } = useTranslate()

    const formContext = useForm({
        defaultValues: {
            studentName: '',
            major: '',
            email: '',
            studentId: '',
            faculty: '',
            phoneNumber: ''
        }
    })

    // ส่งข้อมูลไปยัง parent component ทุกครั้งที่เปลี่ยน
    useEffect(() => {
        if (onFormChange) {
            const subscription = formContext.watch((value) => {
                onFormChange(value as Partial<StudentFormData>);
            });
            return () => subscription.unsubscribe();
        }
    }, [formContext, onFormChange]);

    const formFields: { field: keyof StudentFormData, label: string, placeholder: string, formatType?: string, className?: string }[] = [
        {
            field: 'studentName',
            label: translate("ชื่อนิสิต", "Student Name"),
            placeholder: translate("ชื่อนิสิต", "Student Name"),
            formatType: "textOnly"
        },
        {
            field: 'studentId',
            label: translate("รหัสประจำตัวนิสิต", "Student ID"),
            placeholder: translate("รหัสประจำตัวนิสิต", "Student ID"),
            formatType: "studentId"
        },
        {
            field: 'faculty',
            label: translate("คณะ", "Faculty"),
            placeholder: translate("คณะ", "Faculty"),
            formatType: "textOnly"
        },
        {
            field: 'major',
            label: translate("สาขา", "Major/Branch"),
            placeholder: translate("สาขา", "Major/Branch"),
            formatType: "textOnly"
        },
        {
            field: 'phoneNumber',
            label: translate("หมายเลขโทรศัพท์", "Phone Number"),
            placeholder: "099-999-9999",
            formatType: "phone",
            className: "bg-white border-green-300 rounded-lg"
        },
        {
            field: 'email',
            label: translate("E-mail", "E-mail"),
            placeholder: "email@address.com",
            formatType: "email",
            className: "bg-white border-green-300 rounded-lg"
        }
    ]

    return (
        <div className="bg-white rounded-lg">
            <div className="p-5">
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Flex vertical gap="middle">
                            {formFields
                                .filter((_, index) => index % 2 === 0)
                                .map((field) => (
                                    <div key={field.field}>
                                        <IreTextbox
                                            label={field.label}
                                            formContext={formContext}
                                            registerName={formContext.register(field.field)}
                                            placeholder={field.placeholder}
                                            isRequired={true}
                                            formatType={field.formatType as any}
                                        />
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
                                        <IreTextbox
                                            label={field.label}
                                            formContext={formContext}
                                            registerName={formContext.register(field.field)}
                                            placeholder={field.placeholder}
                                            isRequired={true}
                                            formatType={field.formatType as any}
                                        />
                                    </div>
                                ))}
                        </Flex>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default StudentForm
