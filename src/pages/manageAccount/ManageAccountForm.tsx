import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button, Row, Col, message, Checkbox } from 'antd';
import { useTranslate } from '../../provider/hooks/translate.hook';
import { userManagementService } from '../../services/api/userManagementService';

const { Option } = Select;

interface UserRow {
    key: string;
    no: number;
    id: number;
    username: string;
    roleCode: string;
    roleDescription: string;
    status: string;
    statusColor?: string;
}

interface ManageAccountFormProps {
    open: boolean;
    user: UserRow | null;
    onClose: () => void;
    onSuccess: () => void;
}

const ManageAccountForm: React.FC<ManageAccountFormProps> = ({
    open,
    user,
    onClose,
    onSuccess
}) => {
    const { translate } = useTranslate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            if (user) {
                form.setFieldsValue({
                    username: user.username,
                    roleCode: user.roleCode,
                    status: user.status === 'ACTIVE',
                });
            } else {
                form.resetFields();
            }
        }
    }, [open, user, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            if (user) {
                // Update existing user
                await userManagementService.updateUser(user.id, {
                    username: values.username,
                    roleCode: values.roleCode,
                    campusCode: values.campusCode,
                    facultyCode: values.facultyCode,
                    majorCode: values.majorCode,
                    departmentCode: values.departmentCode,
                    advisorCode: values.advisorCode,
                });
            } else {
                // Create new user
                await userManagementService.createUser({
                    username: values.username,
                    password: values.password,
                    roleCode: values.roleCode,
                    campusCode: values.campusCode,
                    facultyCode: values.facultyCode,
                    majorCode: values.majorCode,
                    departmentCode: values.departmentCode,
                    advisorCode: values.advisorCode,
                });
            }

            setLoading(false);
            onSuccess();
            message.success(translate('บันทึกข้อมูลสำเร็จ', 'Data saved successfully'));
        } catch (error) {
            console.error('Error in form:', error);
            setLoading(false);
            message.error(translate('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'Error saving data'));
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title={translate(
                user ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มข้อมูลผู้ใช้',
                user ? 'Edit User' : 'Add User'
            )}
            open={open}
            onCancel={handleCancel}
            footer={null}
            width={800}
            maskClosable={false}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-6">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label={translate('ชื่อผู้ใช้', 'Username')}
                            rules={[{ required: true, message: translate('กรุณากรอกชื่อผู้ใช้', 'Please enter username') }]}
                        >
                            <Input placeholder={translate('ชื่อผู้ใช้', 'Username')} />
                        </Form.Item>

                        <Form.Item
                            name="campusCode"
                            label={translate('วิทยาเขต', 'Campus')}
                            rules={[{ required: true, message: translate('กรุณาเลือกวิทยาเขต', 'Please select campus') }]}
                        >
                            <Select placeholder={translate('วิทยาเขต', 'Campus')}>
                                <Option value="01">วิทยาเขตบางเขน</Option>
                                <Option value="02">วิทยาเขตกำแพงแสน</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="majorCode" label={translate('สาขา', 'Major')}>
                            <Select placeholder={translate('สาขา', 'Major')}>
                                <Option value="CS">Computer Science</Option>
                                <Option value="IT">Information Technology</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="advisorCode" label={translate('ตำแหน่ง', 'Position')}>
                            <Select placeholder={translate('ตำแหน่ง', 'Position')}>
                                <Option value="LEC">Lecturer</Option>
                                <Option value="PROF">Professor</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        {!user && (
                            <Form.Item
                                name="password"
                                label={translate('รหัสผ่าน', 'Password')}
                                rules={[{ required: true, message: translate('กรุณากรอกรหัสผ่าน', 'Please enter password') }]}
                            >
                                <Input.Password placeholder={translate('รหัสผ่าน', 'Password')} />
                            </Form.Item>
                        )}

                        <Form.Item name="facultyCode" label={translate('คณะ', 'Faculty')}>
                            <Select placeholder={translate('คณะ', 'Faculty')}>
                                <Option value="ENG">Engineering</Option>
                                <Option value="SCI">Science</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="departmentCode" label={translate('ภาควิชา', 'Department')}>
                            <Select placeholder={translate('ภาควิชา', 'Department')}>
                                <Option value="CS">Computer Science</Option>
                                <Option value="SE">Software Engineering</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="instructorCode" label={translate('รหัสอาจารย์', 'Instructor ID')}>
                            <Input placeholder={translate('รหัสอาจารย์', 'Instructor ID')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="status"
                            label={translate('สถานะการใช้งาน', 'Usage Status')}
                            valuePropName="checked"
                            initialValue={true}
                        >
                            <Checkbox>{translate('เปิดใช้งาน', 'Enabled')}</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16} className="mt-6">
                    <Col span={24}>
                        <div className="flex justify-end gap-2 transition-transform duration-300 ease-out">
                            <Button onClick={handleCancel} danger>
                                {translate('Cancel', 'Cancel')}
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading} className="bg-green-600">
                                {translate('Save', 'Save')}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ManageAccountForm;
