import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Radio, Upload, Button, Row, Col, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useTranslate } from '../provider/hooks/translate.hook';
import type { UploadFile } from 'antd/es/upload/interface';

const { TextArea } = Input;
const { Option } = Select;

interface MakeUpExamFormProps {
    onSubmit?: (values: any) => void;
}

const MakeUpExamForm: React.FC<MakeUpExamFormProps> = ({ onSubmit }) => {
    const { translate } = useTranslate();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleSubmit = (values: any) => {
        console.log('Form values:', values);
        onSubmit?.(values);
    };

    const uploadProps = {
        beforeUpload: (file: File) => {
            const uploadFile = {
                uid: Math.random().toString(36).substr(2, 9),
                name: file.name,
                status: 'done' as const,
                originFileObj: file as any,
            };
            setFileList([uploadFile as any]);
            return false;
        },
        fileList,
        onRemove: () => {
            setFileList([]);
        },
    };

    return (
        <div className="bg-gray-100 p-4 lg:p-6 min-h-screen">
            <Card className="w-full max-w-4xl mx-auto">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="p-6"
                >
                    {/* Subject and Exam Type */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={
                                    <span>
                                        {translate("เรื่อง", "Subject")}
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                }
                                name="subject"
                                rules={[{ required: true, message: translate("กรุณากรอกเรื่อง", "Please enter subject") }]}
                            >
                                <Input placeholder={translate("เรื่อง", "Subject")} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={
                                    <span>
                                        {translate("มีความประสงค์ขอสอบชดเชย", "Desire to request a make-up exam")}
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                }
                                name="examType"
                                rules={[{ required: true, message: translate("กรุณาเลือกประเภทการสอบ", "Please select exam type") }]}
                            >
                                <Radio.Group>
                                    <Radio value="midterm">{translate("กลางภาค", "Midterm")}</Radio>
                                    <Radio value="final">{translate("สอบไล่", "Final Exam")}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Left Column */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={
                                    <span>
                                        {translate("ภาค", "Semester")}
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                }
                                name="semester"
                                rules={[{ required: true, message: translate("กรุณาเลือกภาค", "Please select semester") }]}
                            >
                                <Select placeholder={translate("ภาค", "Semester")}>
                                    <Option value="1">{translate("ภาคที่ 1", "Semester 1")}</Option>
                                    <Option value="2">{translate("ภาคที่ 2", "Semester 2")}</Option>
                                    <Option value="3">{translate("ภาคฤดูร้อน", "Summer")}</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label={
                                    <span>
                                        {translate("รหัสวิชา", "Course ID")}
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                }
                                name="courseId"
                                rules={[{ required: true, message: translate("กรุณากรอกรหัสวิชา", "Please enter course ID") }]}
                            >
                                <Input placeholder={translate("รหัสวิชา", "Course ID")} />
                            </Form.Item>

                            <Form.Item
                                label={
                                    <span>
                                        {translate("หมู่เรียน", "Study Group")}
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                }
                                name="studyGroup"
                                rules={[{ required: true, message: translate("กรุณาเลือกหมู่เรียน", "Please select study group") }]}
                            >
                                <Select placeholder={translate("หมู่เรียน", "Study Group")}>
                                    <Option value="1">หมู่ 1</Option>
                                    <Option value="2">หมู่ 2</Option>
                                    <Option value="3">หมู่ 3</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label={
                                    <span>
                                        {translate("กำหนดสอบเดิม", "Original Exam Date")}
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                }
                                name="originalExamDate"
                                rules={[{ required: true, message: translate("กรุณาเลือกวันที่สอบเดิม", "Please select original exam date") }]}
                            >
                                <DatePicker
                                    placeholder="DD/MM/YYYY"
                                    format="DD/MM/YYYY"
                                    className="w-full"
                                />
                            </Form.Item>

                            <Form.Item
                                label={
                                    <span>
                                        {translate("สาเหตุ", "Reason")}
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                }
                                name="reason"
                                rules={[{ required: true, message: translate("กรุณาเลือกสาเหตุ", "Please select reason") }]}
                            >
                                <Select placeholder={translate("สาเหตุ", "Reason")}>
                                    <Option value="sick">1: {translate("ป่วย", "Sick")}</Option>
                                    <Option value="emergency">2: {translate("เหตุฉุกเฉิน", "Emergency")}</Option>
                                    <Option value="other">3: {translate("อื่นๆ", "Other")}</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        {/* Right Column */}
                        <Col span={12}>
                            <Form.Item
                                label={
                                    <span>
                                        {translate("ปีการศึกษา", "Academic Year")}
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                }
                                name="academicYear"
                                rules={[{ required: true, message: translate("กรุณากรอกปีการศึกษา", "Please enter academic year") }]}
                            >
                                <Input placeholder="YYYY" />
                            </Form.Item>

                            <Form.Item
                                label={translate("ชื่อวิชา", "Course Name")}
                                name="courseName"
                            >
                                <Input
                                    placeholder={translate("ชื่อวิชา", "Course Name")}
                                    disabled
                                    className="bg-gray-100"
                                />
                            </Form.Item>

                            <Form.Item
                                label={
                                    <span>
                                        {translate("กำหนดสอบชดเชย", "Make-up Exam Date")}
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                }
                                name="makeupExamDate"
                                rules={[{ required: true, message: translate("กรุณาเลือกวันที่สอบชดเชย", "Please select make-up exam date") }]}
                            >
                                <DatePicker
                                    placeholder="DD/MM/YYYY"
                                    format="DD/MM/YYYY"
                                    className="w-full"
                                />
                            </Form.Item>

                            <Form.Item
                                label={
                                    <span>
                                        {translate("เนื่องจาก", "Due to")}
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                }
                                name="dueTo"
                                rules={[{ required: true, message: translate("กรุณากรอกเหตุผล", "Please enter reason") }]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder={translate("เนื่องจาก", "Due to")}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* File Upload */}
                    <Form.Item
                        label={translate("แนบเอกสาร", "Attach Document")}
                        name="documents"
                    >
                        <Upload {...uploadProps}>
                            <Button
                                icon={<UploadOutlined />}
                                style={{
                                    backgroundColor: '#339966',
                                    borderColor: '#339966',
                                    color: 'white',
                                    height: '38px'
                                }}
                                className="hover:bg-[#2d8555]"
                            >
                                + Choose
                            </Button>
                        </Upload>
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item className="mt-6">
                        <Button type="primary" htmlType="submit" className="bg-blue-500">
                            {translate("บันทึก", "Save")}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default MakeUpExamForm; 