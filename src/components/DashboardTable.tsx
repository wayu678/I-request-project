import React from 'react';
import { Table, Button, Pagination, Flex } from 'antd';
import { EditOutlined, DownOutlined, UpOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../provider/hooks/translate.hook';
import { useAuth } from '../contexts/AuthContext';
import { createTranslationFunctions, getStatusColor } from '../utils/dashboardUtils';

interface DashboardRow {
    key: string;
    no: number;
    documentDate: string;
    term: string;
    academicYear: string;
    requestType: string;
    status: string;
    statusColor?: string;
}

interface DashboardTableProps {
    tableData: DashboardRow[];
    loading: boolean;
    currentPage: number;
    total: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
    tableData,
    loading,
    currentPage,
    total,
    pageSize,
    onPageChange
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
            render: () => (
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    className="rounded w-28 h-8"
                    style={{ backgroundColor: '#17A2B8', borderColor: '#17A2B8', boxShadow: 'none' }}
                >
                    {translate('View', 'View')}
                    <DownOutlined className="text-xs ml-1" />
                </Button>
            ),
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