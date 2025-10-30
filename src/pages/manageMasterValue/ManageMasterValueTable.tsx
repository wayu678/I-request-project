import React from 'react';
import { Table, Pagination, Dropdown, Button, Flex, Modal } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, EditOutlined, UpOutlined } from '@ant-design/icons';
import { useTranslate } from '../../provider/hooks/translate.hook';

interface MasterValueRow {
    key: string;
    no: number;
    code: string;
    name: string;
    status: 'ACTIVE' | 'INACTIVE';
}

interface ManageMasterValueTableProps {
    tableData: MasterValueRow[];
    loading: boolean;
    currentPage: number;
    total: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onDelete?: (row: MasterValueRow) => void;
}

const ManageMasterValueTable: React.FC<ManageMasterValueTableProps> = ({
    tableData,
    loading,
    currentPage,
    total,
    pageSize,
    onPageChange,
    onDelete
}) => {
    const { translate } = useTranslate();

    const translateStatus = (status: MasterValueRow['status']) =>
        status === 'ACTIVE' ? translate('ใช้งาน', 'Active') : translate('ปิดใช้งาน', 'Inactive');

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
                    <span className="text-sm font-normal text-teal-700">{translate('รหัสค่าหลัก', 'Master Code')}</span>
                    <UpOutlined className="text-xs text-green-800" />
                </Flex>
            ),
            dataIndex: 'code',
            key: 'code',
            width: 120,
            align: 'center' as const,
        },
        {
            title: (
                <Flex align="center" justify="center" gap={4}>
                    <span className="text-sm font-normal text-teal-700">{translate('คำอธิบายค่าหลัก', 'Master Name')}</span>
                    <UpOutlined className="text-xs text-green-800" />
                </Flex>
            ),
            dataIndex: 'name',
            key: 'name',
            width: 200,
            align: 'left' as const,
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
            render: (status: MasterValueRow['status']) => (
                <span className={`text-sm ${status === 'ACTIVE' ? 'text-gray-900' : 'text-gray-500'}`}>{translateStatus(status)}</span>
            )
        },
        {
            title: (
                <Flex align="center" justify="center">
                    <span className="text-sm font-normal text-teal-700">{translate('ดำเนินการ', 'Action')}</span>
                </Flex>
            ),
            key: 'actions',
            width: 120,
            align: 'center' as const,
            render: (_: any, record: MasterValueRow) => {
                const menuItems: MenuProps['items'] = [
                    { key: 'view', label: translate('ดูรายละเอียด', 'View Details') },
                    { key: 'edit', label: translate('แก้ไข', 'Edit') },
                    { key: 'delete', label: translate('ลบ', 'Delete'), danger: true },
                ];

                const onMenuClick: MenuProps['onClick'] = ({ key }) => {
                    if (key === 'delete') {
                        Modal.confirm({
                            title: translate('ยืนยันการลบ', 'Confirm delete'),
                            content: translate('คุณต้องการลบรายการนี้หรือไม่?', 'Do you want to delete this item?'),
                            okText: translate('ลบ', 'Delete'),
                            cancelText: translate('ยกเลิก', 'Cancel'),
                            okButtonProps: { danger: true },
                            onOk: () => onDelete && onDelete(record)
                        });
                    }
                };

                return (
                    <Dropdown menu={{ items: menuItems, onClick: onMenuClick }} trigger={['click']}>
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
            }
        }
    ];

    return (
        <div className="bg-white rounded-lg">
            <div className="px-5 pt-3">
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
                                return <Button size="small" icon={<UpOutlined className="rotate-[-90deg] text-gray-500" />} className="border border-gray-300 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-500" />;
                            }
                            if (type === 'next') {
                                return <Button size="small" icon={<UpOutlined className="rotate-90 text-gray-500" />} className="border border-gray-300 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-500" />;
                            }
                            if (type === 'jump-prev') {
                                return <Button size="small" className="border border-gray-300 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-500">«</Button>;
                            }
                            if (type === 'jump-next') {
                                return <Button size="small" className="border border-gray-300 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-500">»</Button>;
                            }
                            return originalElement;
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageMasterValueTable;


