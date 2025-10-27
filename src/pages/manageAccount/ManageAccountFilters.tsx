import React, { useEffect, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { useTranslate } from '../../provider/hooks/translate.hook';
import { useForm } from 'react-hook-form';
import { IreTextbox, IreSelect, IreButton } from '../../components/utils';

// Component for filtering and managing account list

interface ManageAccountFiltersProps {
    usernameFilter: string;
    roleFilter: string | undefined;
    statusFilter: string | undefined;
    onUsernameChange: (value: string) => void;
    onRoleChange: (value: string | undefined) => void;
    onStatusChange: (value: string | undefined) => void;
    onAddClick: () => void;
}

const ManageAccountFilters: React.FC<ManageAccountFiltersProps> = ({
    usernameFilter,
    roleFilter,
    statusFilter,
    onUsernameChange,
    onRoleChange,
    onStatusChange,
    onAddClick
}) => {
    const { translate } = useTranslate();

    const formContext = useForm({
        defaultValues: {
            username: usernameFilter,
            role: roleFilter || '',
            status: statusFilter || ''
        }
    });

    useEffect(() => {
        formContext.setValue('username', usernameFilter);
    }, [usernameFilter, formContext]);

    useEffect(() => {
        formContext.setValue('role', roleFilter || '');
    }, [roleFilter, formContext]);

    useEffect(() => {
        formContext.setValue('status', statusFilter || '');
    }, [statusFilter, formContext]);

    const roleOptions = useMemo(() => [
        { label: translate('เจ้าหน้าที่', 'Staff'), value: 'STAFF' },
        { label: translate('ผู้ดูแลระบบ', 'Admin'), value: 'ADMIN' }
    ], [translate]);

    const statusOptions = useMemo(() => [
        { label: translate('ใช้งาน', 'Active'), value: 'ACTIVE' },
        { label: translate('ปิดใช้งาน', 'Inactive'), value: 'INACTIVE' }
    ], [translate]);

    const watchedUsername = formContext.watch('username');
    const watchedRole = formContext.watch('role');
    const watchedStatus = formContext.watch('status');

    useEffect(() => {
        if (watchedUsername !== undefined) {
            onUsernameChange(watchedUsername);
        }
    }, [watchedUsername, onUsernameChange]);

    useEffect(() => {
        if (watchedRole !== undefined) {
            onRoleChange(watchedRole || undefined);
        }
    }, [watchedRole, onRoleChange]);

    useEffect(() => {
        if (watchedStatus !== undefined) {
            onStatusChange(watchedStatus || undefined);
        }
    }, [watchedStatus, onStatusChange]);

    return (
        <>
            <Row gutter={16} className="mb-4">
                <Col span={12}>
                    <IreTextbox
                        label={translate('ชื่อผู้ใช้', 'Username')}
                        placeholder={translate('ชื่อผู้ใช้', 'Username')}
                        formContext={formContext}
                        registerName={formContext.register('username')}
                    />
                </Col>

                <Col span={12}>
                    <IreSelect
                        label={translate('บทบาท', 'Role')}
                        placeholder={translate('เจ้าหน้าที่/ผู้ดูแลระบบ', 'Staff/Admin')}
                        formContext={formContext}
                        registerName={formContext.register('role')}
                        options={roleOptions}
                    />
                </Col>
            </Row>

            <Row gutter={16} className="mb-4">
                <Col span={12}>
                    <IreSelect
                        label={translate('สถานะ', 'Status')}
                        placeholder={translate('ใช้งาน/ปิดใช้งาน', 'Active/Inactive')}
                        formContext={formContext}
                        registerName={formContext.register('status')}
                        options={statusOptions}
                    />
                </Col>
            </Row>

            <div className="flex justify-end">
                <IreButton
                    label={translate('เพิ่ม', 'Add')}
                    color="green"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={onAddClick}
                />
            </div>
        </>
    );
};

export default ManageAccountFilters;
