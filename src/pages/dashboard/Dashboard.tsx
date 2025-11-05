import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Spin,
    message,
    Flex,
} from 'antd';
import {
    UnorderedListOutlined,
} from '@ant-design/icons';
import { dashboardService } from '../../services/api/dashboard';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslate } from '../../provider/hooks/translate.hook';
import { createDefaultChartData } from '../../utils/dashboardUtils';
import DashboardChart from '../../components/DashboardChart';
import DashboardFilters from '../../components/DashboardFilters';
import DashboardTable from '../../components/DashboardTable';

interface DashboardSummaryItem {
    name: string;
    value: number;
    color?: string;
}

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

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { translate } = useTranslate();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [loading, setLoading] = useState(true);

    const [chartData, setChartData] = useState<DashboardSummaryItem[]>([]);
    const [tableData, setTableData] = useState<DashboardRow[]>([]);
    const [total, setTotal] = useState(0);

    // ตั้งค่า initial data
    useEffect(() => {
        setChartData(createDefaultChartData(translate));
    }, [translate]);

    const formContext = useForm({
        defaultValues: {
            month: null,
            semester: null,
            academicYear: null,
            requestType: null
        }
    });

    // ดึงข้อมูล dashboard เมื่อ component mount
    useEffect(() => {
        loadDashboardData();
    }, []);

    // ดึงข้อมูลใหม่เมื่อ filter เปลี่ยน
    useEffect(() => {
        const subscription = formContext.watch((value) => {
            setCurrentPage(1); // reset หน้าแรกเมื่อ filter เปลี่ยน
            loadDashboardData();
        });
        return () => subscription.unsubscribe();
    }, [formContext.watch]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);

            // ดึงค่า form values และกรองค่า null/undefined
            const formValues = formContext.getValues();
            const filterParams = {
                month: formValues.month || null,
                term: formValues.semester || null,
                year: formValues.academicYear || null,
                requestType: formValues.requestType || null
            };

            // ดึงข้อมูล chart summary พร้อม filter
            const summaryData = await dashboardService.getSummary(filterParams);

            // ใช้ข้อมูลจริงหรือข้อมูล default ที่สวยงาม
            setChartData(summaryData && summaryData.length > 0 ? summaryData : createDefaultChartData(translate));

            // ดึงข้อมูล table พร้อม filter
            const tableParams = {
                page: currentPage,
                pageSize: pageSize,
                ...filterParams
            };

            const tableResult = await dashboardService.getRequests(tableParams);
            console.log('[Dashboard] API response:', tableResult);
            console.log('[Dashboard] API items sample:', tableResult.items?.slice(0, 3));

            // Map ข้อมูลเพื่อเพิ่ม headerUuid จาก dashboard API response
            const mappedTableData: DashboardRow[] = (tableResult.items || []).map((item: any, index: number) => {
                const mappedItem = {
                    ...item,
                    // Map headerUuid จาก API response (รองรับทั้ง snake_case และ camelCase)
                    headerUuid: item.headerUuid || item.header_uuid || null,
                };

                // Debug: Log first few items
                if (index < 3) {
                    console.log(`[Dashboard] Mapping item ${index}:`, {
                        original: item,
                        mapped: mappedItem,
                        headerUuid: mappedItem.headerUuid
                    });
                }

                return mappedItem;
            });

            console.log('[Dashboard] Mapped table data sample:', mappedTableData.slice(0, 3));
            console.log('[Dashboard] Items with headerUuid:', mappedTableData.filter(i => i.headerUuid).length);
            console.log('[Dashboard] Items without headerUuid:', mappedTableData.filter(i => !i.headerUuid).length);

            setTableData(mappedTableData);
            setTotal(tableResult.total);

        } catch (error) {
            console.error('Error loading dashboard data:', error);
            message.error('ไม่สามารถโหลดข้อมูลได้');
            setChartData(createDefaultChartData(translate));
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        loadDashboardData();
    };

    if (loading) {
        return (
            <div className="bg-gray-100 px-4 pt-[10px] pb-4 lg:px-6 lg:pt-[10px] lg:pb-6 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <Card>
                        <div className="text-center py-12">
                            <Spin size="large" />
                            <div className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 px-4 pt-[10px] pb-4 lg:px-6 lg:pt-[10px] lg:pb-6 min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col gap-3">
                {/* First Section - Dashboard Content */}
                <div className="bg-white rounded-lg p-6">
                    {/* Header inside Card */}
                    <Flex align="center" justify="space-between" className="mb-8">
                        <Flex align="center">
                            <UnorderedListOutlined className="text-lg text-black mr-3" />
                            <span className="text-lg font-normal text-black">{translate('แดชบอร์ด', 'Dashboard')}</span>
                        </Flex>
                    </Flex>
                    <Row gutter={[24, 24]}>
                        {/* Left Side - Chart */}
                        <Col xs={24} lg={12}>
                            <DashboardChart chartData={chartData} />
                        </Col>

                        {/* Right Side - Filters */}
                        <Col xs={24} lg={12}>
                            <DashboardFilters formContext={formContext} />
                        </Col>
                    </Row>
                </div>

                {/* Second Section - Table Section */}
                <DashboardTable
                    tableData={tableData}
                    loading={loading}
                    currentPage={currentPage}
                    total={total}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    onRefresh={loadDashboardData}
                />
            </div>
        </div>
    );
};

export default Dashboard;