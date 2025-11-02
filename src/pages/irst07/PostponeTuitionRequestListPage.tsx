import { useState, useEffect } from 'react';
import { Table, Tag, message, Spin } from 'antd';
import { useTranslate } from '../../provider/hooks/translate.hook';
import { dashboardService, type DashboardRow } from '../../services/api/dashboard';


interface RequestListRow extends DashboardRow {
    headerUuid?: string;
}

const PostponeTuitionRequestListPage = () => {
    const { translate } = useTranslate();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState<RequestListRow[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    // PDF states removed

    useEffect(() => {
        loadRequests();
    }, [currentPage]);

    const loadRequests = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                pageSize: pageSize,
                requestType: '07', // กรองเฉพาะ IRST07/07 (backend รองรับทั้งคู่)
                month: null,
                term: null,
                year: null,
            };

            console.log('[PostponeTuitionRequestListPage] Loading requests with params:', params);
            const result = await dashboardService.getRequests(params);
            console.log('[PostponeTuitionRequestListPage] API response:', result);
            console.log('[PostponeTuitionRequestListPage] Items count:', result.items?.length || 0);
            console.log('[PostponeTuitionRequestListPage] Total:', result.total);

            // Map ข้อมูลเพื่อเพิ่ม UUID จาก dashboard API
            const mappedData: RequestListRow[] = (result.items || []).map((item: any, index: number) => {
                console.log(`[PostponeTuitionRequestListPage] Item ${index}:`, item);
                return {
                    ...item,
                    headerUuid: item.header_uuid || item.headerUuid || item.key || '',
                };
            });

            console.log('[PostponeTuitionRequestListPage] Mapped data:', mappedData);
            setTableData(mappedData);
            setTotal(result.total || 0);
        } catch (error: any) {
            console.error('[PostponeTuitionRequestListPage] Error loading requests:', error);
            console.error('[PostponeTuitionRequestListPage] Error details:', {
                message: error.message,
                stack: error.stack
            });
            message.error(`ไม่สามารถโหลดข้อมูลได้: ${error.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    // PDF handlers removed

    const columns = [
        {
            title: translate('ลำดับ', 'No.'),
            dataIndex: 'no',
            key: 'no',
            width: 80,
            align: 'center' as const,
        },
        {
            title: translate('วันที่สร้าง', 'Document Date'),
            dataIndex: 'documentDate',
            key: 'documentDate',
            width: 120,
            align: 'center' as const,
        },
        {
            title: translate('ภาค', 'Term'),
            dataIndex: 'term',
            key: 'term',
            width: 100,
            align: 'center' as const,
        },
        {
            title: translate('ปีการศึกษา', 'Academic Year'),
            dataIndex: 'academicYear',
            key: 'academicYear',
            width: 100,
            align: 'center' as const,
        },
        {
            title: translate('สถานะ', 'Status'),
            dataIndex: 'status',
            key: 'status',
            width: 150,
            align: 'center' as const,
            render: (status: string, record: RequestListRow) => (
                <Tag color={record.statusColor || '#108ee9'}>
                    {status}
                </Tag>
            ),
        },
        // PDF action column removed
    ];

    return (
        <div className="bg-gray-100 px-4 pt-[10px] pb-4 lg:px-6 lg:pt-[10px] lg:pb-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg p-6">
                    <h1 className="text-xl font-semibold mb-6">
                        {translate('รายการคำร้องขอผ่อนผันค่าธรรมเนียมการศึกษา', 'Postpone Tuition Fee Payment Requests')}
                    </h1>

                    {loading ? (
                        <div className="text-center py-12">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <>
                            {tableData.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-lg mb-2">
                                        {translate('ไม่มีข้อมูล', 'No data')}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {translate('ยังไม่มีคำร้องขอผ่อนผันค่าธรรมเนียมการศึกษา', 'No postpone tuition fee payment requests found')}
                                    </div>
                                    <div className="mt-4 text-xs text-gray-400">
                                        {translate('ตรวจสอบ Browser Console (F12) เพื่อดู logs', 'Check Browser Console (F12) to view logs')}
                                    </div>
                                </div>
                            ) : (
                                <Table
                                    columns={columns}
                                    dataSource={tableData}
                                    loading={loading}
                                    pagination={{
                                        current: currentPage,
                                        pageSize: pageSize,
                                        total: total,
                                        onChange: (page) => setCurrentPage(page),
                                        showSizeChanger: false,
                                    }}
                                    rowKey="key"
                                />
                            )}

                            {/* PDF preview removed */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostponeTuitionRequestListPage;

