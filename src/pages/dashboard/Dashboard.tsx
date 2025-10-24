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
    DatePicker,
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DownOutlined,
    UpOutlined,
    UnorderedListOutlined,
    UserOutlined,
    CheckCircleOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
    IreSelect,
    IreCalendar,
} from '../../components/utils';
import { fetchDashboardSummary, fetchDashboardTable } from '../../services/api/dashboard';
import type { DashboardSummaryItem, DashboardRow } from '../../services/api/dashboard';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslate } from '../../provider/hooks/translate.hook';

const { Title, Text } = Typography;

// Mock data for donut chart - will be translated in component
const getChartData = (translate: (th: string, en: string) => string) => [
    { name: translate('ร่าง', 'Draft'), value: 45, color: '#8C8C8C' },
    { name: translate('กำลังดำเนินการ', 'In Progress'), value: 30, color: '#13C2C2' },
    { name: translate('ส่งกลับแก้ไข', 'Returned for Revision'), value: 15, color: '#FF4D4F' },
    { name: translate('เสร็จสิ้น', 'Completed'), value: 10, color: '#52C41A' }
];

// Mock data for table - will be translated in component
const getTableData = (translate: (th: string, en: string) => string) => [
    {
        key: '1',
        no: 1,
        documentDate: '10/07/2568',
        term: translate('ภาคต้น', 'First Semester'),
        academicYear: '2568',
        requestType: translate('คำร้องทั่วไป', 'General Request'),
        status: translate('ร่าง', 'Draft'),
        statusColor: '#8C8C8C'
    },
    {
        key: '2',
        no: 2,
        documentDate: '11/07/2568',
        term: translate('ภาคต้น', 'First Semester'),
        academicYear: '2568',
        requestType: translate('คำร้องขอสอบชดเชย', 'Make-up Exam Request'),
        status: translate('กำลังดำเนินการ', 'In Progress'),
        statusColor: '#13C2C2'
    },
    {
        key: '3',
        no: 3,
        documentDate: '12/07/2568',
        term: translate('ภาคต้น', 'First Semester'),
        academicYear: '2568',
        requestType: translate('คำร้องขอย้ายคณะ', 'Faculty Transfer Request'),
        status: translate('ส่งกลับแก้ไข', 'Returned for Revision'),
        statusColor: '#FF4D4F'
    },
    {
        key: '4',
        no: 4,
        documentDate: '13/07/2568',
        term: translate('ภาคต้น', 'First Semester'),
        academicYear: '2568',
        requestType: translate('คำร้องขอเทียบโอนรายวิชา', 'Credit Transfer Request'),
        status: translate('ยกเลิก', 'Cancelled'),
        statusColor: '#FA8C16'
    },
    {
        key: '5',
        no: 5,
        documentDate: '14/07/2568',
        term: translate('ภาคต้น', 'First Semester'),
        academicYear: '2568',
        requestType: translate('คำร้องขอลงทะเบียนเรียน', 'Registration Request'),
        status: translate('เสร็จสิ้น', 'Completed'),
        statusColor: '#52C41A'
    }
];

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { translate } = useTranslate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [loading, setLoading] = useState(true);

    // สร้างฟังก์ชันสำหรับข้อมูล default ที่สวยงาม
    const getDefaultChartData = (): DashboardSummaryItem[] => [
        { name: 'ร่าง', value: 1, color: '#989898' },
        { name: 'กำลังดำเนินการ', value: 1, color: '#17A2B8' },
        { name: 'ส่งกลับแก้ไข', value: 1, color: '#FF3B30' },
        { name: 'เสร็จสิ้น', value: 1, color: '#03BC77' }
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
        { label: translate('ภาคต้น', 'First Semester'), value: 'ภาคต้น' },
        { label: translate('ภาคปลาย', 'Second Semester'), value: 'ภาคปลาย' },
        { label: translate('ภาคฤดูร้อน', 'Summer Semester'), value: 'ภาคฤดูร้อน' }
    ];

    const requestTypeOptions = [
        { label: translate('คำร้องทั่วไป', 'General Request'), value: 'คำร้องทั่วไป' }
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{translate('ลำดับ', 'NO')}</span>
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{translate('วันที่เอกสาร', 'Document Date')}</span>
                    <UpOutlined style={{ fontSize: '12px' }} />
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{translate('เทอม', 'Semester')}</span>
                    <UpOutlined style={{ fontSize: '12px' }} />
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{translate('ปีการศึกษา', 'Academic Year')}</span>
                    <UpOutlined style={{ fontSize: '12px' }} />
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{translate('ประเภทคำร้อง', 'Request Type')}</span>
                    <UpOutlined style={{ fontSize: '12px' }} />
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{translate('สถานะคำร้อง', 'Status')}</span>
                    <UpOutlined style={{ fontSize: '12px' }} />
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{translate('ดำเนินการ', 'Action')}</span>
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
                    {translate('View', 'View')}
                    <DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
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
        <div className="min-h-screen bg-gray-100" style={{ paddingTop: '0px', paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
            <div className="max-w-7xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* First Card - Dashboard Content */}
                <Card className="shadow-sm p-8">
                    {/* Header inside Card */}
                    <Flex align="center" justify="space-between" style={{ marginBottom: '30px' }}>
                        <Flex align="center">
                            <div className="flex items-center mr-3">
                                <div className="flex flex-col mr-1.5">
                                    <div className="w-0.5 h-0.5 bg-black mb-0.5"></div>
                                    <div className="w-0.5 h-0.5 bg-black mb-0.5"></div>
                                    <div className="w-0.5 h-0.5 bg-black"></div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="w-2 h-0.5 bg-black mb-0.5"></div>
                                    <div className="w-2 h-0.5 bg-black mb-0.5"></div>
                                    <div className="w-2 h-0.5 bg-black"></div>
                                </div>
                            </div>
                            <span className="text-lg font-normal text-black" style={{ fontWeight: 'normal', fontSize: '18px' }}>{translate('แดชบอร์ด', 'Dashboard')}</span>
                        </Flex>
                    </Flex>
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
                            <div style={{ padding: '20px' }}>
                                <Flex vertical gap={20} style={{ width: '405px' }}>
                                    {renderIreCalendar(translate("เดือน", "Month"), "month", "MM", "MM")}
                                    <IreSelect
                                        label={translate("เทอม", "Term")}
                                        placeholder={translate("ภาคต้น, ภาคปลาย, ภาคฤดูร้อน", "First Semester, Second Semester, Summer Semester")}
                                        formContext={formContext}
                                        registerName={formContext.register('term')}
                                        options={termOptions}
                                        widthFull={true}
                                    />
                                    {renderIreCalendar(translate("ปีการศึกษา", "Academic Year"), "academicYear", "YYYY", "YYYY")}
                                    <IreSelect
                                        label={translate("ประเภทคำร้อง", "Request Type")}
                                        placeholder={translate("คำร้องทั่วไป", "General Request")}
                                        formContext={formContext}
                                        registerName={formContext.register('requestType')}
                                        options={requestTypeOptions}
                                        widthFull={true}
                                    />
                                </Flex>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* Second Card - Table Section */}
                <Card className="shadow-sm">
                    <div style={{ padding: '20px' }}>
                        {/* Create Request Button - Only for Students */}
                        {isStudent && (
                            <Flex justify="flex-end" style={{ marginBottom: '16px' }}>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<PlusOutlined />}
                                    style={{
                                        backgroundColor: '#339966',
                                        borderColor: '#339966',
                                        borderRadius: '6px',
                                        height: '40px',
                                        paddingLeft: '16px',
                                        paddingRight: '8px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    {translate('สร้างคำร้อง', 'Create Request')}
                                    <DownOutlined style={{ fontSize: '12px', marginLeft: '8px' }} />
                                </Button>
                            </Flex>
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