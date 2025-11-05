import React from 'react';
import { Table, Button, Pagination, Flex, Dropdown, message, Modal } from 'antd';
import type { MenuProps } from 'antd';
import { EditOutlined, DownOutlined, UpOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../provider/hooks/translate.hook';
import { useAuth } from '../contexts/AuthContext';
import { createTranslationFunctions, getStatusColor } from '../utils/dashboardUtils';
import { previewPostponePdf } from '../services/api/pdfClient';
import { dashboardService } from '../services/api/dashboard';

interface DashboardRow {
    key: string;
    no: number;
    documentDate: string;
    term: string;
    academicYear: string;
    requestType: string;
    status: string;
    statusColor?: string;
    headerUuid?: string;
}

interface DashboardTableProps {
    tableData: DashboardRow[];
    loading: boolean;
    currentPage: number;
    total: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onRefresh?: () => void;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
    tableData,
    loading,
    currentPage,
    total,
    pageSize,
    onPageChange,
    onRefresh
}) => {
    const { translate } = useTranslate();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { translateStatus, translateSemester, translateRequestType } = createTranslationFunctions(translate);

    const canCreateRequest = user?.roleCode === 'STUDENT' || user?.roleCode === 'STAFF';

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
                    <span className="text-sm font-normal text-teal-700">{translate('วันที่เอกสาร', 'Document Date')}</span>
                    <UpOutlined className="text-xs text-green-800" />
                </Flex>
            ),
            dataIndex: 'documentDate',
            key: 'documentDate',
            width: 120,
            align: 'center' as const,
        },
        {
            title: (
                <Flex align="center" justify="center" gap={4}>
                    <span className="text-sm font-normal text-teal-700">{translate('เทอม', 'Semester')}</span>
                    <UpOutlined className="text-xs text-green-800" />
                </Flex>
            ),
            dataIndex: 'term',
            key: 'term',
            width: 100,
            align: 'center' as const,
            render: (term: string) => translateSemester(term),
        },
        {
            title: (
                <Flex align="center" justify="center" gap={4}>
                    <span className="text-sm font-normal text-teal-700">{translate('ปีการศึกษา', 'Academic Year')}</span>
                    <UpOutlined className="text-xs text-green-800" />
                </Flex>
            ),
            dataIndex: 'academicYear',
            key: 'academicYear',
            width: 120,
            align: 'center' as const,
        },
        {
            title: (
                <Flex align="center" justify="center" gap={4}>
                    <span className="text-sm font-normal text-teal-700">{translate('ประเภทคำร้อง', 'Request Type')}</span>
                    <UpOutlined className="text-xs text-green-800" />
                </Flex>
            ),
            dataIndex: 'requestType',
            key: 'requestType',
            width: 150,
            align: 'left' as const,
            render: (requestType: string) => translateRequestType(requestType),
        },
        {
            title: (
                <Flex align="center" justify="center" gap={4}>
                    <span className="text-sm font-normal text-teal-700">{translate('สถานะคำร้อง', 'Status')}</span>
                    <UpOutlined className="text-xs text-green-800" />
                </Flex>
            ),
            dataIndex: 'status',
            key: 'status',
            width: 170,
            align: 'center' as const,
            render: (status: string) => {
                const statusColor = getStatusColor(status);
                return (
                    <Button
                        className="rounded-2xl w-36 h-8 text-xs font-normal px-3 cursor-default text-white"
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
            render: (_: any, row: DashboardRow) => {
                // Debug: Log row data to check headerUuid
                console.log('[DashboardTable] Rendering row:', {
                    key: row.key,
                    headerUuid: row.headerUuid,
                    fullRow: row
                });

                const items: MenuProps['items'] = [
                    {
                        key: 'preview',
                        label: translate('พรีวิว PDF', 'Preview PDF'),
                        disabled: !row?.headerUuid,
                    },
                    {
                        key: 'delete',
                        label: translate('ลบ', 'Delete'),
                        icon: <DeleteOutlined />,
                        danger: true,
                        disabled: !row?.headerUuid || row?.status !== 'ร่าง',
                    },
                ];

                const onMenuClick: MenuProps['onClick'] = async ({ key }) => {
                    console.log('[DashboardTable] Menu clicked:', {
                        key,
                        headerUuid: row?.headerUuid,
                        rowKey: row?.key,
                        fullRow: row
                    });

                    if (key === 'preview') {
                        if (!row?.headerUuid) {
                            const errorMsg = `ไม่สามารถพรีวิว PDF ได้: ไม่พบ headerUuid สำหรับ row key: ${row?.key}`;
                            console.warn('[DashboardTable] Cannot preview PDF: headerUuid is missing', {
                                row: row,
                                availableKeys: Object.keys(row || {}),
                                rowKey: row?.key
                            });
                            message.error(errorMsg);
                            return;
                        }

                        console.log('[DashboardTable] Starting PDF preview with headerUuid:', row.headerUuid);
                        try {
                            await previewPostponePdf(row.headerUuid);
                            console.log('[DashboardTable] PDF preview initiated successfully');
                        } catch (error: any) {
                            console.error('[DashboardTable] Error previewing PDF:', error);
                            const errorMsg = error?.message || 'เกิดข้อผิดพลาดในการพรีวิว PDF';
                            message.error(errorMsg);
                        }
                    } else if (key === 'delete') {
                        if (!row?.headerUuid) {
                            message.error(translate('ไม่สามารถลบคำร้องได้: ไม่พบ headerUuid', 'Cannot delete request: headerUuid not found'));
                            return;
                        }

                        const headerUuidToDelete = row.headerUuid; // Store in a const to satisfy TypeScript

                        Modal.confirm({
                            title: translate('ยืนยันการลบคำร้อง', 'Confirm Delete Request'),
                            icon: <ExclamationCircleOutlined />,
                            content: translate('คุณต้องการลบคำร้องนี้หรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้', 'Are you sure you want to delete this request? This action cannot be undone.'),
                            okText: translate('ลบ', 'Delete'),
                            okType: 'danger',
                            cancelText: translate('ยกเลิก', 'Cancel'),
                            onOk: async () => {
                                try {
                                    console.log('[DashboardTable] Deleting request with headerUuid:', headerUuidToDelete);
                                    await dashboardService.deleteRequest(headerUuidToDelete);
                                    message.success(translate('ลบคำร้องเรียบร้อย', 'Request deleted successfully'));

                                    // Refresh table data
                                    if (onRefresh) {
                                        onRefresh();
                                    }
                                } catch (error: any) {
                                    console.error('[DashboardTable] Error deleting request:', error);
                                    const errorMsg = error?.message || translate('เกิดข้อผิดพลาดในการลบคำร้อง', 'Failed to delete request');
                                    message.error(errorMsg);
                                }
                            },
                        });
                    }
                };

                return (
                    <Dropdown menu={{ items, onClick: onMenuClick }} trigger={['click']}>
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
                {/* Create Request Button - Visible for Student and Staff */}
                {canCreateRequest && (
                    <div className="mb-3">
                        <Flex justify="flex-end">
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                className="rounded-md w-40"
                                style={{ backgroundColor: '#339966', borderColor: '#339966', boxShadow: 'none' }}
                                onClick={() => navigate('/irst07/postpone-tuition-and-fee-payments')}
                            >
                                {translate('สร้างคำร้อง', 'Create Request')}
                                <DownOutlined className="text-xs ml-2" />
                            </Button>
                        </Flex>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto">
                    <Table
                        columns={columns}
                        dataSource={tableData}
                        rowKey={(record) => record.key || String(record.no)}
                        pagination={false}
                        size="middle"
                        loading={loading}
                        className="border-0"
                    />
                </div>

                {/* Pagination */}
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

export default DashboardTable;