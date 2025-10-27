import React from 'react';
import { Table, Button, Pagination, Flex, Dropdown, message } from 'antd';
import type { MenuProps } from 'antd';
import { EditOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useTranslate } from '../../provider/hooks/translate.hook';

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

interface ManageAccountTableProps {
    tableData: UserRow[];
    loading: boolean;
    currentPage: number;
    total: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onEdit: (user: UserRow) => void;
}

const ManageAccountTable: React.FC<ManageAccountTableProps> = ({
    tableData,
    loading,
    currentPage,
    total,
    pageSize,
    onPageChange,
    onEdit
}) => {
    const { translate } = useTranslate();

    const translateStatus = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return translate('ใช้งาน', 'Active');
            case 'INACTIVE':
                return translate('ปิดใช้งาน', 'Inactive');
            default:
                return status;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return '#28a745';
            case 'INACTIVE':
                return '#dc3545';
            default:
                return '#6c757d';
        }
    };

    const handleMenuClick = (e: { key: string }, record: UserRow) => {
        if (e.key === 'view' || e.key === 'edit') {
            onEdit(record);
        } else if (e.key === 'delete') {
            message.info(translate('ฟีเจอร์ลบจะถูกเพิ่มในอนาคต', 'Delete feature will be added in the future'));
        }
    };

    const columns = [
        {
            title: (
                <Flex align="center" justify="center">
                    <span className="text-sm font-normal text-teal-700">{translate('ลำดับ', 'NO')}</span>
                </Flex>
            ),
            dataIndex: 'no',
            key: 'no',
            width: 80,
            align: 'center' as const,
        },
        {
            title: (
                <Flex align="center" justify="center" gap={4}>
                    <span className="text-sm font-normal text-teal-700">{translate('ชื่อผู้ใช้', 'Username')}</span>
                    <UpOutlined className="text-xs text-green-800" />
                </Flex>
            ),
            dataIndex: 'username',
            key: 'username',
            width: 150,
            align: 'left' as const,
        },
        {
            title: (
                <Flex align="center" justify="center" gap={4}>
                    <span className="text-sm font-normal text-teal-700">{translate('บทบาท', 'Role')}</span>
                    <UpOutlined className="text-xs text-green-800" />
                </Flex>
            ),
            dataIndex: 'roleDescription',
            key: 'roleDescription',
            width: 150,
            align: 'center' as const,
        },
        {
            title: (
                <Flex align="center" justify="center" gap={4}>
                    <span className="text-sm font-normal text-teal-700">{translate('สถานะ', 'Status')}</span>
                    <UpOutlined className="text-xs text-green-800" />
                </Flex>
            ),
            dataIndex: 'status',
            key: 'status',
            width: 120,
            align: 'center' as const,
            render: (status: string) => {
                const statusColor = getStatusColor(status);
                return (
                    <Button
                        className="rounded-2xl w-24 h-8 text-xs font-normal px-3 cursor-default text-white"
                        style={{
                            backgroundColor: statusColor,
                            borderColor: statusColor,
                            color: '#fff'
                        }}
                        disabled
                    >
                        {translateStatus(status)}
                    </Button>
                );
            },
        },
        {
            title: (
                <Flex align="center" justify="center">
                    <span className="text-sm font-normal text-teal-700">{translate('ดำเนินการ', 'Action')}</span>
                </Flex>
            ),
            key: 'action',
            width: 120,
            align: 'center' as const,
            render: (_: any, record: UserRow) => {
                const menuItems: MenuProps['items'] = [
                    {
                        key: 'view',
                        label: translate('ดูรายละเอียด', 'View Details'),
                    },
                    {
                        key: 'edit',
                        label: translate('แก้ไข', 'Edit'),
                    },
                    {
                        key: 'delete',
                        label: translate('ลบ', 'Delete'),
                        danger: true,
                    },
                ];

                return (
                    <Dropdown
                        menu={{
                            items: menuItems,
                            onClick: (e) => handleMenuClick(e, record)
                        }}
                        trigger={['click']}
                    >
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            className="rounded w-28 h-8"
                            style={{ backgroundColor: '#17A2B8', borderColor: '#17A2B8', boxShadow: 'none' }}
                        >
                            {translate('View', 'View')}
                            <DownOutlined className="text-xs ml-1" />
                        </Button>
                    </Dropdown>
                );
            },
        },
    ];

    return (
        <div className="bg-white rounded-lg">
            <div className="p-5">
                <div className="overflow-x-auto">
                    <Table
                        columns={columns}
                        dataSource={tableData}
                        pagination={false}
                        size="middle"
                        loading={loading}
                        className="border-0"
                    />
                </div>

                <div className="flex justify-center items-center mt-4">
                    <Pagination
                        current={currentPage}
                        total={total}
                        pageSize={pageSize}
                        showSizeChanger={false}
                        showQuickJumper={false}
                        showTotal={() => null}
                        onChange={onPageChange}
                        itemRender={(_, type, originalElement) => {
                            if (type === 'prev') {
                                return <Button
                                    size="small"
                                    icon={<UpOutlined className="rotate-[-90deg] text-gray-500" />}
                                    className="border border-gray-300 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-500"
                                />;
                            }
                            if (type === 'next') {
                                return <Button
                                    size="small"
                                    icon={<UpOutlined className="rotate-90 text-gray-500" />}
                                    className="border border-gray-300 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-500"
                                />;
                            }
                            if (type === 'jump-prev') {
                                return <Button
                                    size="small"
                                    className="border border-gray-300 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-500"
                                >«</Button>;
                            }
                            if (type === 'jump-next') {
                                return <Button
                                    size="small"
                                    className="border border-gray-300 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-500"
                                >»</Button>;
                            }
                            return originalElement;
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageAccountTable;

