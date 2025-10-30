import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button, Row, Col, message, Checkbox } from 'antd';
import { useTranslate } from '../../provider/hooks/translate.hook';
import { userManagementService } from '../../services/api/userManagementService';
import styles from './ManageAccountForm.module.css';

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
                // ตั้งค่าเป็น undefined เพื่อให้ Select แสดง placeholder ชัดเจน
                form.setFieldsValue({
                    username: undefined,
                    password: undefined,
                    roleCode: undefined,
                    campusCode: undefined,
                    facultyCode: undefined,
                    majorCode: undefined,
                    departmentCode: undefined,
                    advisorCode: undefined,
                    instructorCode: undefined,
                });
            }
        }
    }, [open, user, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            if (user) {
                // Update existing user
                const updatePayload: any = {
                    username: values.username,
                    roleCode: values.roleCode,
                    campusCode: values.campusCode,
                    facultyCode: values.facultyCode,
                    majorCode: values.majorCode,
                    departmentCode: values.departmentCode,
                    advisorCode: values.advisorCode,
                };
                if (values.password) {
                    updatePayload.password = values.password;
                }
                await userManagementService.updateUser(user.id, updatePayload);
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
            title={user ? '' : translate('เพิ่มข้อมูลผู้ใช้', 'Add User')}
            open={open}
            onCancel={handleCancel}
            footer={null}
            width={800}
            maskClosable={false}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit} className={`mt-6 ${styles.hideAntdRequiredBefore} ${styles.checkboxGreen}`}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label={
                                <span>
                                    {translate('ชื่อผู้ใช้', 'Username')}
                                    <span style={{ color: 'red' }}> *</span>
                                </span>
                            }
                            rules={[{ required: true, message: translate('กรุณากรอกชื่อผู้ใช้', 'Please enter username') }]}
                        >
                            <Input placeholder={translate('ชื่อผู้ใช้', 'Username')} />
                        </Form.Item>

                        <Form.Item
                            name="campusCode"
                            label={
                                <span>
                                    {translate('วิทยาเขต', 'Campus')}
                                    <span style={{ color: 'red' }}> *</span>
                                </span>
                            }
                            rules={[{ required: true, message: translate('กรุณาเลือกวิทยาเขต', 'Please select campus') }]}
                        >
                            <Select placeholder={translate('วิทยาเขต', 'Campus')}>
                                <Option value="01">{translate('วิทยาเขตบางเขน', 'Bang Khen Campus')}</Option>
                                <Option value="02">{translate('วิทยาเขตกำแพงแสน', 'Kamphaeng Saen Campus')}</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="majorCode" label={<span>{translate('สาขา', 'Major')}<span style={{ color: 'red' }}> *</span></span>} rules={[{ required: true, message: translate('กรุณาเลือกสาขา', 'Please select major') }]}>
                            <Select placeholder={translate('สาขา', 'Major')}>
                                <Option value="CS">{translate('วิทยาการคอมพิวเตอร์', 'Computer Science')}</Option>
                                <Option value="IT">{translate('เทคโนโลยีสารสนเทศ', 'Information Technology')}</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="advisorCode" label={<span>{translate('ตำแหน่ง', 'Position')}<span style={{ color: 'red' }}> *</span></span>} rules={[{ required: true, message: translate('กรุณาเลือกตำแหน่ง', 'Please select position') }]}>
                            <Select placeholder={translate('ตำแหน่ง', 'Position')}>
                                <Option value="LEC">{translate('อาจารย์', 'Lecturer')}</Option>
                                <Option value="PROF">{translate('ศาสตราจารย์', 'Professor')}</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="password"
                            label={
                                <span>
                                    {translate('รหัสผ่าน', 'Password')}
                                    <span style={{ color: 'red' }}> *</span>
                                </span>
                            }
                            rules={[
                                { required: !user, message: translate('กรุณากรอกรหัสผ่าน', 'Please enter password') }
                            ]}
                        >
                            <Input.Password placeholder={translate('รหัสผ่าน', 'Password')} />
                        </Form.Item>

                        <Form.Item name="facultyCode" label={<span>{translate('คณะ', 'Faculty')}<span style={{ color: 'red' }}> *</span></span>} rules={[{ required: true, message: translate('กรุณาเลือกคณะ', 'Please select faculty') }]}>
                            <Select placeholder={translate('คณะ', 'Faculty')}>
                                <Option value="ENG">{translate('วิศวกรรมศาสตร์', 'Engineering')}</Option>
                                <Option value="SCI">{translate('วิทยาศาสตร์', 'Science')}</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="departmentCode" label={<span>{translate('ภาควิชา', 'Department')}<span style={{ color: 'red' }}> *</span></span>} rules={[{ required: true, message: translate('กรุณาเลือกภาควิชา', 'Please select department') }]}>
                            <Select placeholder={translate('ภาควิชา', 'Department')}>
                                <Option value="CS">{translate('วิทยาการคอมพิวเตอร์', 'Computer Science')}</Option>
                                <Option value="SE">{translate('วิศวกรรมซอฟต์แวร์', 'Software Engineering')}</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="instructorCode"
                            label={
                                <span>
                                    {translate('รหัสอาจารย์', 'Instructor ID')}
                                    <span style={{ color: 'red' }}> *</span>
                                </span>
                            }
                            rules={[{ required: true, message: translate('กรุณากรอกรหัสอาจารย์', 'Please enter instructor ID') }]}
                        >
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
                            <Button onClick={handleCancel} danger style={{ backgroundColor: '#FF4D4F', borderColor: '#FF4D4F', color: '#FFFFFF', height: 38, padding: '0 24px', width: 80 }}>
                                {translate('Cancel', 'Cancel')}
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    backgroundColor: '#339966',
                                    borderColor: '#339966',
                                    color: '#FFFFFF',
                                    boxShadow: 'none',
                                    outline: 'none',
                                    height: 38,
                                    padding: '0 24px',
                                    width: 80
                                }}
                            >
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
