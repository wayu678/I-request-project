import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Card,
    Row,
    Col,
    Table,
    Button,
    Pagination,
    Flex,
    Spin,
    message,
    Typography,
    Tag,
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DownOutlined,
    UpOutlined,
    UnorderedListOutlined,
    UserOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
    IreSelect,
    IreCalendar,
} from '../../components/utils';
import { fetchDashboardSummary, fetchDashboardTable } from '../../services/api/dashboard';
import type { DashboardSummaryItem, DashboardRow } from '../../services/api/dashboard';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [loading, setLoading] = useState(true);

    // สร้างฟังก์ชันสำหรับข้อมูล default ที่สวยงาม
    const getDefaultChartData = (): DashboardSummaryItem[] => [
        { name: 'รอการอนุมัติ', value: 1, color: '#ffc107' },
        { name: 'อนุมัติแล้ว', value: 1, color: '#28a745' },
        { name: 'ปฏิเสธ', value: 1, color: '#dc3545' },
        { name: 'กำลังดำเนินการ', value: 1, color: '#17a2b8' },
        { name: 'เสร็จสิ้น', value: 1, color: '#6f42c1' }
    ];

    const [chartData, setChartData] = useState<DashboardSummaryItem[]>(getDefaultChartData());
    const [tableData, setTableData] = useState<DashboardRow[]>([]);
    const [total, setTotal] = useState(0);

    // ตรวจสอบประเภทผู้ใช้
    const isStudent = user?.roleCode === 'STUDENT';
    const isApprover = user?.roleCode === 'ADMIN' || user?.roleCode === 'APPROVER';

    const formContext = useForm({
        defaultValues: {
            month: null,
            term: null,
            academicYear: null,
            requestType: null
        }
    });

    const termOptions = [
        { label: 'ภาคต้น', value: 'ภาคต้น' },
        { label: 'ภาคปลาย', value: 'ภาคปลาย' },
        { label: 'ภาคฤดูร้อน', value: 'ภาคฤดูร้อน' }
    ];

    const requestTypeOptions = [
        { label: 'คำร้องทั่วไป', value: 'คำร้องทั่วไป' }
    ];

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
                term: formValues.term || null,
                year: formValues.academicYear || null,
                requestType: formValues.requestType || null
            };

            // ดึงข้อมูล chart summary พร้อม filter
            const summaryData = await fetchDashboardSummary(filterParams);

            // ใช้ข้อมูลจริงหรือข้อมูล default ที่สวยงาม
            setChartData(summaryData && summaryData.length > 0 ? summaryData : getDefaultChartData());

            // ดึงข้อมูล table พร้อม filter
            const tableParams = {
                page: currentPage,
                pageSize: pageSize,
                ...filterParams
            };

            const tableResult = await fetchDashboardTable(tableParams);
            setTableData(tableResult.items);
            setTotal(tableResult.total);

        } catch (error) {
            console.error('Error loading dashboard data:', error);
            message.error('ไม่สามารถโหลดข้อมูลได้');
            setChartData(getDefaultChartData());
        } finally {
            setLoading(false);
        }
    };

    const renderIreCalendar = (label: string, field: "month" | "academicYear", placeholder: string, format: string | "MM" | "YYYY") => (
        <IreCalendar
            label={label}
            formContext={formContext}
            registerName={formContext.register(field)}
            placeholder={placeholder}
            format={format}
            widthFull={true}
        />
    );

    const columns = [
        {
            title: (
                <Flex align="center" justify="center">
                    <span className="text-sm font-medium text-gray-700">ลำดับ</span>
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
                    <span className="text-sm font-medium text-gray-700">วันที่เอกสาร</span>
                    <UpOutlined className="text-xs text-gray-500" />
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
                    <span className="dashboard-table-header-text">เทอม</span>
                    <UpOutlined className="dashboard-table-header-icon" />
                </Flex>
            ),
            dataIndex: 'term',
            key: 'term',
            width: 100,
            align: 'center' as const,
        },
        {
            title: (
                <Flex align="center" justify="center" gap={4}>
                    <span className="dashboard-table-header-text">ปีการศึกษา</span>
                    <UpOutlined className="dashboard-table-header-icon" />
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
                    <span className="dashboard-table-header-text">ประเภทคำร้อง</span>
                    <UpOutlined className="dashboard-table-header-icon" />
                </Flex>
            ),
            dataIndex: 'requestType',
            key: 'requestType',
            width: 150,
            align: 'left' as const,
        },
        {
            title: (
                <Flex align="center" justify="center" gap={4}>
                    <span className="dashboard-table-header-text">สถานะคำร้อง</span>
                    <UpOutlined className="dashboard-table-header-icon" />
                </Flex>
            ),
            dataIndex: 'status',
            key: 'status',
            width: 150,
            align: 'center' as const,
            render: (status: string, record: any) => (
                <Button
                    className="dashboard-status-button"
                    style={{
                        backgroundColor: record.statusColor,
                        borderColor: record.statusColor,
                        color: '#fff'
                    }}
                    disabled
                >
                    {status}
                </Button>
            ),
        },
        {
            title: (
                <Flex align="center" justify="center">
                    <span className="dashboard-table-header-text">ดำเนินการ</span>
                </Flex>
            ),
            key: 'action',
            width: 120,
            align: 'center' as const,
            render: () => (
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    className="dashboard-action-button"
                >
                    View
                    <DownOutlined className="dashboard-icon-small" />
                </Button>
            ),
        },
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        loadDashboardData();
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <Card className="dashboard-card">
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <Spin size="large" />
                            <div style={{ marginTop: '16px' }}>กำลังโหลดข้อมูล...</div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                {/* First Card - Dashboard Content */}
                <Card className="dashboard-card">
                    <div className="dashboard-header">
                        <div className="dashboard-title">
                            <UnorderedListOutlined className="dashboard-icon-large" />
                            <span className="dashboard-title-text">Dashboard</span>
                        </div>
                    </div>
                    <Row gutter={[24, 24]}>
                        {/* Left Side - Chart */}
                        <Col xs={24} lg={12}>
                            <div className="dashboard-filters">
                                {/* Legend */}
                                <div className="dashboard-legend">
                                    {(chartData || []).map((item) => (
                                        <div key={item.name} className="dashboard-legend-item">
                                            <div
                                                className="dashboard-legend-dot dashboard-legend-dot-custom"
                                                style={{
                                                    backgroundColor: item.color
                                                }}
                                            />
                                            <span className="dashboard-legend-text">{item.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Donut Chart */}
                                <div className="dashboard-chart-wrapper">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartData || []}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={120}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {(chartData || []).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Col>

                        {/* Right Side - Filters */}
                        <Col xs={24} lg={12}>
                            <div className="dashboard-filters">
                                <div className="dashboard-filters-container">
                                    {renderIreCalendar("เดือน", "month", "MM", "MM")}
                                    <IreSelect
                                        label="เทอม"
                                        placeholder="ภาคต้น, ภาคปลาย, ภาคฤดูร้อน"
                                        formContext={formContext}
                                        registerName={formContext.register('term')}
                                        options={termOptions}
                                        widthFull={true}
                                    />
                                    {renderIreCalendar("ปีการศึกษา", "academicYear", "YYYY", "YYYY")}
                                    <IreSelect
                                        label="ประเภทคำร้อง"
                                        placeholder="คำร้องทั่วไป"
                                        formContext={formContext}
                                        registerName={formContext.register('requestType')}
                                        options={requestTypeOptions}
                                        widthFull={true}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* Second Card - Table Section */}
                <Card className="dashboard-card">
                    <div className="dashboard-table-container">
                        {/* Create Request Button - Only for Students */}
                        {isStudent && (
                            <div className="dashboard-create-request-button">
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<PlusOutlined />}
                                    className="dashboard-create-request-button-button"
                                >
                                    สร้างคำร้อง
                                    <DownOutlined className="dashboard-icon-button" />
                                </Button>
                            </div>
                        )}

                        {/* Table */}
                        <div className="dashboard-table">
                            <Table
                                className="dashboard-table"
                                columns={columns}
                                dataSource={tableData}
                                pagination={false}
                                size="middle"
                                loading={loading}
                                rowClassName={(_, index) =>
                                    index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                                }
                                components={{
                                    header: {
                                        cell: (props: any) => (
                                            <th
                                                {...props}
                                                className="dashboard-table-header-cell"
                                            />
                                        ),
                                    },
                                }}
                            />
                        </div>

                        {/* Pagination */}
                        <div className="dashboard-pagination">
                            <Pagination
                                current={currentPage}
                                total={total}
                                pageSize={pageSize}
                                showSizeChanger={false}
                                showQuickJumper={false}
                                showTotal={() => null}
                                onChange={handlePageChange}
                                itemRender={(_, type, originalElement) => {
                                    if (type === 'prev') {
                                        return <Button
                                            size="small"
                                            icon={<UpOutlined className="dashboard-pagination-icon-prev" />}
                                            className="dashboard-pagination-prev-btn"
                                        />;
                                    }
                                    if (type === 'next') {
                                        return <Button
                                            size="small"
                                            icon={<UpOutlined className="dashboard-pagination-icon-next" />}
                                            className="dashboard-pagination-next-btn"
                                        />;
                                    }
                                    if (type === 'jump-prev') {
                                        return <Button
                                            size="small"
                                            className="dashboard-pagination-jump-btn"
                                        >«</Button>;
                                    }
                                    if (type === 'jump-next') {
                                        return <Button
                                            size="small"
                                            className="dashboard-pagination-jump-btn"
                                        >»</Button>;
                                    }
                                    return originalElement;
                                }}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;