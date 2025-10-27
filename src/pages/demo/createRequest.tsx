import { useTranslate } from "../../provider/hooks/translate.hook";
import { Row, Col, Card } from "antd";
import { useForm } from "react-hook-form";
import { IreTextbox, IreButton } from "../../components/utils";


interface CreateRequestProps {
    onSubmit?: (values: any) => void;
}

const CreateRequest: React.FC<CreateRequestProps> = ({ onSubmit }) => {
    const { translate } = useTranslate();
    const form = useForm({
        defaultValues: {
            studentName: "",
            studentId: "",
            faculty: "",
            major: "",
            email: "",
            phone: ""
        }
    });

    const onSubmitForm = (values: any) => {
        console.log("Form values:", values);
        onSubmit?.(values);
    };

    return (
        <div className="bg-gray-100 px-4 pt-[10px] pb-4 lg:px-6 lg:pt-[10px] lg:pb-6 min-h-screen">
            <Card className="w-full max-w-4xl mx-auto">
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="p-6">
                    {/* Row 1 */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <IreTextbox
                                label={`${translate("ชื่อนิสิต", "Student Name")}`}
                                placeholder={translate("ชื่อนิสิต", "Student Name")}
                                formContext={form}
                                registerName={form.register("studentName", { required: translate("กรุณากรอกชื่อนิสิต", "Please enter student name") })}
                                isRequired
                                errorMessage={form.formState.errors.studentName?.message as string}
                            />
                        </Col>
                        <Col span={12}>
                            <IreTextbox
                                label={`${translate("รหัสประจำตัวนิสิต", "Student ID")} `}
                                placeholder={translate("รหัสประจำตัวนิสิต", "Student ID")}
                                formContext={form}
                                registerName={form.register("studentId", { required: translate("กรุณากรอกรหัสประจำตัวนิสิต", "Please enter student ID") })}
                                isRequired
                                errorMessage={form.formState.errors.studentId?.message as string}
                            />
                        </Col>
                    </Row>

                    {/* Row 2 */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <IreTextbox
                                label={`${translate("คณะ", "Faculty")}`}
                                placeholder={translate("คณะ", "Faculty")}
                                formContext={form}
                                registerName={form.register("faculty", { required: translate("กรุณากรอกคณะ", "Please enter faculty") })}
                                isRequired
                                errorMessage={form.formState.errors.faculty?.message as string}
                            />
                        </Col>
                        <Col span={12}>
                            <IreTextbox
                                label={`${translate("สาขา", "Major")} `}
                                placeholder={translate("สาขา", "Major")}
                                formContext={form}
                                registerName={form.register("major", { required: translate("กรุณากรอกสาขา", "Please enter major") })}
                                isRequired
                                errorMessage={form.formState.errors.major?.message as string}
                            />
                        </Col>
                    </Row>

                    {/* Row 3 */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <IreTextbox
                                label={`${translate("อีเมล์", "Email")} `}
                                placeholder={translate("อีเมล์", "Email")}
                                formContext={form}
                                registerName={form.register("email", { required: translate("กรุณากรอกอีเมล์", "Please enter email") })}
                                isRequired
                                errorMessage={form.formState.errors.email?.message as string}
                            />
                        </Col>
                        <Col span={12}>
                            <IreTextbox
                                label={`${translate("หมายเลขโทรศัพท์", "Phone number")} `}
                                placeholder={translate("099-999-9999", "099-999-9999")}
                                formContext={form}
                                registerName={form.register("phone", { required: translate("กรุณากรอกหมายเลขโทรศัพท์", "Please enter phone number") })}
                                isRequired
                                errorMessage={form.formState.errors.phone?.message as string}
                            />
                        </Col>
                    </Row>

                    {/* Submit */}
                    <div className="mt-6">
                        <IreButton
                            label={translate("บันทึก", "Save")}
                            htmlType="submit"
                            color="green"
                            variant="solid"
                        />
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateRequest;
