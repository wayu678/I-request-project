import { Card, Col, Flex, Row } from "antd";
import { useEffect, useMemo, useState } from "react";

import { useTranslate } from "../../../provider/hooks/translate.hook";

import RequestPipeline, { type Step } from "../../../components/RequestPipeline";
import { IreFormsGroupButton, IreTextbox } from "../../../components/utils";
import { useForm } from "react-hook-form";
import type { GeneralRequestDetailRequest, GeneralRequestDetailResponse, GeneralRequestRequest, GeneralRequestResponse } from "../../../services/generated-api/models";
import { generalRequestService } from "../../../services/api/irst05Service";

interface GeneralRequestFormProps {
    // Common
    headerUuid: string;
    documentStatus: string;
    // Step 0
    studentName: string;
    studentId: string;
    faculty: string;
    major: string;
    email: string;
    phone: string;
    // Step 1
    subject: string;
    cause: string;
}

const GeneralRequest = () => {
    // Providers
    const { translate, language } = useTranslate();

    // Steps
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState<Step[]>([] as Step[]);

    // Form Context
    const generalRequestForm = useForm<GeneralRequestFormProps>({
        defaultValues: {
            // Common
            headerUuid: "",
            documentStatus: "D",
            // Step 0
            studentName: "",
            studentId: "",
            faculty: "",
            major: "",
            email: "",
            phone: "",
            // Step 1
            subject: "",
            cause: "",
        }
    })

    useEffect(() => {
        const steps: Step[] = [
            {
                title: translate("สร้างคำร้อง", "Create Request"),
                stepNumber: 0,
                disabled: false
            },
            {
                title: translate("แก้ไขข้อมูลคำร้อง", "Edit Request Information"),
                stepNumber: 1,
                disabled: generalRequestForm.watch("headerUuid") === ""
            },
            {
                title: translate("ส่งคำร้อง", "Send Request"),
                stepNumber: 2,
                disabled: generalRequestForm.watch("headerUuid") === ""
            },
        ];

        setSteps(steps);
    }, [language, generalRequestForm.watch("headerUuid")]);

    const getDocumentStage = useMemo(() => {
        const documentStatus = generalRequestForm.watch("documentStatus");
        let stage: 'draft' | 'processing' | null = null;
        if (documentStatus === "D") {
            stage = "draft";
        } else if (documentStatus === "P") {
            stage = "processing";
        }
        return stage;
    }, [generalRequestForm.watch("documentStatus")]);

    const onSave = async () => {
        try {
            const isValid = await generalRequestForm.trigger();
            if (!isValid) {
                return;
            }

            console.log(generalRequestForm.getValues());

            if (currentStep === 0) {
                // Save general request information
                const generalRequestRequest: GeneralRequestRequest = {
                    studentName: generalRequestForm.getValues("studentName"),
                    studentCode: generalRequestForm.getValues("studentId"),
                    facultyCode: generalRequestForm.getValues("faculty"),
                    majorCode: generalRequestForm.getValues("major"),
                    email: generalRequestForm.getValues("email"),
                    phone: generalRequestForm.getValues("phone"),
                }
                const response: GeneralRequestResponse = await generalRequestService.createGeneralRequestPost(generalRequestRequest);
                if (response) {
                    generalRequestForm.setValue("headerUuid", response.headerUuid || "");
                }
            } else if (currentStep === 1) {
                // Save general request cause
                const generalRequestDetailRequest: GeneralRequestDetailRequest = {
                    headerUuid: generalRequestForm.getValues("headerUuid"),
                    topic: generalRequestForm.getValues("subject"),
                    cause: generalRequestForm.getValues("cause"),
                }
                const response: GeneralRequestDetailResponse = await generalRequestService.updateGeneralRequestDetailByUuidPut(generalRequestDetailRequest);
                if (response) {
                    generalRequestForm.setValue("headerUuid", response.headerUuid || "");
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error at onSave: Save general request failed:', error.message);
            } else {
                console.error('Error at onSave: Save general request failed:', error);
            }
            throw error;
        }
    }

    const onSubmit = () => {
        try {

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error at onSubmit: Submit general request failed:', error.message);
            } else {
                console.error('Error at onSubmit: Submit general request failed:', error);
            }
            throw error;
        }
    }

    const onCancel = () => {
        try {

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error at onCancel: Cancel general request failed:', error.message);
            } else {
                console.error('Error at onCancel: Cancel general request failed:', error);
            }
            throw error;
        }
    }

    const onApprove = () => {
        try {

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error at onApprove: Approve general request failed:', error.message);
            } else {
                console.error('Error at onApprove: Approve general request failed:', error);
            }
            throw error;
        }
    }

    const onReject = () => {
        try {

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error at onReject: Reject general request failed:', error.message);
            } else {
                console.error('Error at onReject: Reject general request failed:', error);
            }
            throw error;
        }
    }

    return (
        <Flex vertical gap={16}>
            <RequestPipeline steps={steps} currentStep={currentStep} onChangeStep={setCurrentStep} />
            {
                currentStep === 0 ? (
                    <Card>
                        <Flex vertical gap={16}>
                            <Row gutter={16}>
                                <Col span={24} md={12}>
                                    <IreTextbox
                                        label={translate("ชื่อนิสิต", "Student Name")}
                                        formContext={generalRequestForm}
                                        registerName={generalRequestForm.register("studentName")}
                                        placeholder={translate("กรอกชื่อนิสิต", "Enter Student Name")}
                                        isRequired={true}
<<<<<<< HEAD
                                        formatType="textOnly"
=======
>>>>>>> cb819bd (irst05)
                                    // rules={[{ required: translate("กรุณากรอกชื่อนิสิต", "Please enter student name") }]}
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <IreTextbox
                                        label={translate("รหัสนิสิต", "Student ID")}
                                        formContext={generalRequestForm}
                                        registerName={generalRequestForm.register("studentId")}
                                        placeholder={translate("กรอกรหัสนิสิต", "Enter Student ID")}
                                        isRequired={true}
<<<<<<< HEAD
                                        formatType="studentId"
=======
>>>>>>> cb819bd (irst05)
                                    // rules={[{ required: translate("กรุณากรอกรหัสนิสิต", "Please enter student ID") }]}
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <IreTextbox
                                        label={translate("คณะ", "Faculty")}
                                        formContext={generalRequestForm}
                                        registerName={generalRequestForm.register("faculty")}
                                        placeholder={translate("กรอกคณะ", "Enter Faculty")}
                                        isRequired={true}
<<<<<<< HEAD
                                        formatType="textOnly"
=======
>>>>>>> cb819bd (irst05)
                                    // rules={[{ required: translate("กรุณากรอกคณะ", "Please enter faculty") }]}
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <IreTextbox
                                        label={translate("สาขา", "Major")}
                                        formContext={generalRequestForm}
                                        registerName={generalRequestForm.register("major")}
                                        placeholder={translate("กรอกสาขา", "Enter Major")}
                                        isRequired={true}
<<<<<<< HEAD
                                        formatType="textOnly"
=======
>>>>>>> cb819bd (irst05)
                                    // rules={[{ required: translate("กรุณากรอกสาขา", "Please enter major") }]}
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <IreTextbox
                                        label={translate("อีเมล์", "Email")}
                                        formContext={generalRequestForm}
                                        registerName={generalRequestForm.register("email")}
                                        placeholder={translate("กรอกอีเมล์", "Enter Email")}
                                        isRequired={true}
<<<<<<< HEAD
                                        formatType="email"
=======
>>>>>>> cb819bd (irst05)
                                    // rules={[{ required: translate("กรุณากรอกอีเมล์", "Please enter email") }]}
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <IreTextbox
                                        label={translate("เบอร์โทรศัพท์", "Phone")}
                                        formContext={generalRequestForm}
                                        registerName={generalRequestForm.register("phone")}
                                        placeholder={translate("กรอกเบอร์โทรศัพท์", "Enter Phone")}
                                        isRequired={true}
                                        formatType="phone"
                                    // rules={[{ required: translate("กรุณากรอกเบอร์โทรศัพท์", "Please enter phone") }]}
                                    />
                                </Col>
                            </Row>
                        </Flex>
                    </Card>
                ) : (
                    <Card>
                        <Flex vertical gap={16}>
                            <Row gutter={16}>
                                <Col span={24} md={12}>
                                    <IreTextbox
                                        label={translate("เรื่อง", "Subject")}
                                        formContext={generalRequestForm}
                                        registerName={generalRequestForm.register("subject")}
                                        placeholder={translate("กรอกเรื่อง", "Enter Subject")}
                                        isRequired={true}
                                    // rules={[{ required: translate("กรุณากรอกเรื่อง", "Please enter subject") }]}
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <IreTextbox
                                        label={translate("ระบุความประสงค์", "Cause")}
                                        formContext={generalRequestForm}
                                        registerName={generalRequestForm.register("cause")}
                                        placeholder={translate("ระบุความประสงค์", "Enter Cause")}
                                        isRequired={true}
                                    // rules={[{ required: translate("กรุณากรอกความประสงค์", "Please enter cause") }]}
                                    />
                                </Col>
                            </Row>
                        </Flex>
                    </Card>
                )
            }
            <IreFormsGroupButton
                stage={getDocumentStage}
                currentStep={currentStep}
                onSave={onSave}
                onSubmit={onSubmit}
                onCancel={onCancel}
                onApprove={onApprove}
                onReject={onReject}
            />
        </Flex>
    );
};

export default GeneralRequest;