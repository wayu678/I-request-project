import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
    AppstoreOutlined,
    BarsOutlined,
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
    { name: translate('เสร็จสิ้น', 'Completed'), value: 10, color: '#03BC77' }
];

// Mock data for table - will be translated in component
const getTableData = (translate: (th: string, en: string) => string) => [
    {
        key: '1',
        no: 1,
        documentDate: '10/07/2568',
        term: 'ภาคต้น',
        academicYear: '2568',
        requestType: 'คำร้องทั่วไป',
        status: 'ร่าง',
        statusColor: '#8C8C8C'
    },
    {
        key: '2',
        no: 2,
        documentDate: '11/07/2568',
        term: 'ภาคปลาย',
        academicYear: '2568',
        requestType: 'คำร้องขอสอบชดเชย',
        status: 'กำลังดำเนินการ',
        statusColor: '#13C2C2'
    },
    {
        key: '3',
        no: 3,
        documentDate: '12/07/2568',
        term: 'ภาคต้น',
        academicYear: '2568',
        requestType: 'คำร้องขอย้ายคณะ',
        status: 'ส่งกลับแก้ไข',
        statusColor: '#FF4D4F'
    },
    {
        key: '4',
        no: 4,
        documentDate: '13/07/2568',
        term: 'ภาคปลาย',
        academicYear: '2568',
        requestType: 'คำร้องขอเทียบโอนรายวิชา',
        status: 'ยกเลิก',
        statusColor: '#FA8C16'
    },
    {
        key: '5',
        no: 5,
        documentDate: '14/07/2568',
        term: 'ภาคต้น',
        academicYear: '2568',
        requestType: 'คำร้องขอลงทะเบียนเรียน',
        status: 'เสร็จสิ้น',
        statusColor: '#03BC77'
    }
];

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { translate } = useTranslate();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [loading, setLoading] = useState(true);

    // สร้างฟังก์ชันสำหรับข้อมูล default 
    const getDefaultChartData = (translate: (th: string, en: string) => string): DashboardSummaryItem[] => [
        { name: translate('ร่าง', 'Draft'), value: 1, color: '#989898' },
        { name: translate('กำลังดำเนินการ', 'In Progress'), value: 1, color: '#17A2B8' },
        { name: translate('ส่งกลับแก้ไข', 'Returned for Revision'), value: 1, color: '#FF3B30' },
        { name: translate('เสร็จสิ้น', 'Completed'), value: 1, color: '#03BC77' }
    ];

    const [chartData, setChartData] = useState<DashboardSummaryItem[]>([]);
    const [tableData, setTableData] = useState<DashboardRow[]>([]);
    const [total, setTotal] = useState(0);

    // ตั้งค่า initial data
    useEffect(() => {
        setChartData(getDefaultChartData(translate));
    }, [translate]);

    // ตรวจสอบประเภทผู้ใช้
    const isStudent = user?.roleCode === 'STUDENT';
    const isApprover = user?.roleCode === 'ADMIN' || user?.roleCode === 'APPROVER';

    const formContext = useForm({
        defaultValues: {
            month: null,
            semester: null,
            academicYear: null,
            requestType: null
        }
    });

    // Translation functions for table data
    const translateStatus = (status: string) => {
        switch (status) {
            case 'ร่าง': return translate('ร่าง', 'Draft');
            case 'กำลังดำเนินการ': return translate('กำลังดำเนินการ', 'In Progress');
            case 'ส่งกลับแก้ไข': return translate('ส่งกลับแก้ไข', 'Returned for Revision');
            case 'เสร็จสิ้น': return translate('เสร็จสิ้น', 'Completed');
            case 'ยกเลิก': return translate('ยกเลิก', 'Cancelled');
            default: return status;
        }
    };

    const translateSemester = (semester: string) => {
        switch (semester) {
            case 'ภาคต้น': return translate('ภาคต้น', 'First Semester');
            case 'ภาคปลาย': return translate('ภาคปลาย', 'Second Semester');
            case 'ภาคฤดูร้อน': return translate('ภาคฤดูร้อน', 'Summer Semester');
            default: return semester;
        }
    };

    const translateRequestType = (requestType: string) => {
        switch (requestType) {
            case 'คำร้องทั่วไป': return translate('คำร้องทั่วไป', 'General Request');
            case 'คำร้องขอสอบชดเชย': return translate('คำร้องขอสอบชดเชย', 'Make-up Exam Request');
            case 'คำร้องขอย้ายคณะ': return translate('คำร้องขอย้ายคณะ', 'Faculty Transfer Request');
            case 'คำร้องขอเทียบโอนรายวิชา': return translate('คำร้องขอเทียบโอนรายวิชา', 'Credit Transfer Request');
            case 'คำร้องขอลงทะเบียนเรียน': return translate('คำร้องขอลงทะเบียนเรียน', 'Registration Request');
            default: return requestType;
        }
    };

    const semesterOptions = [
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
                term: formValues.semester || null,
                year: formValues.academicYear || null,
                requestType: formValues.requestType || null
            };

            // ดึงข้อมูล chart summary พร้อม filter
            const summaryData = await fetchDashboardSummary(filterParams);

            // ใช้ข้อมูลจริงหรือข้อมูล default ที่สวยงาม
            setChartData(summaryData && summaryData.length > 0 ? summaryData : getDefaultChartData(translate));

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
            setChartData(getDefaultChartData(translate));
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
            render: (status: string, record: any) => {
                let statusColor = '#989898'; // Default gray
                switch (status) {
                    case 'ร่าง':
                        statusColor = '#989898';
                        break;
                    case 'กำลังดำเนินการ':
                        statusColor = '#17A2B8';
                        break;
                    case 'ส่งกลับแก้ไข':
                        statusColor = '#FF3B30';
                        break;
                    case 'ยกเลิก':
                        statusColor = '#FF9D00';
                        break;
                    case 'เสร็จสิ้น':
                        statusColor = '#03BC77';
                        break;
                }

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        loadDashboardData();
    };

    if (loading) {
        return (
            <div className="bg-gray-100 pt-0 pb-3 px-3">
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
        <div className="bg-gray-100 pt-0 pb-3 px-3">
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
                            <div className="p-5">
                                {/* Legend */}
                                <div className="flex justify-center flex-wrap gap-4 mb-5">
                                    {(chartData || []).map((item) => (
                                        <div key={item.name} className="flex items-center gap-2">
                                            <div
                                                className="w-5 h-2 rounded-sm"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span className="text-sm">{item.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Donut Chart */}
                                <div className="h-80 flex items-center justify-center">
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
                            <div className="p-5">
                                <Flex vertical gap={4} className="w-full max-w-md">
                                    {renderIreCalendar(translate("เดือน", "Month"), "month", "MM", "MM")}
                                    <IreSelect
                                        label={translate("เทอม", "Semester")}
                                        placeholder={translate("ภาคต้น, ภาคปลาย, ภาคฤดูร้อน", "First Semester, Second Semester, Summer Semester")}
                                        formContext={formContext}
                                        registerName={formContext.register('semester')}
                                        options={semesterOptions}
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
                </div>

                {/* Second Section - Table Section */}
                <div className="bg-white rounded-lg">
                    <div className="p-5">
                        {/* Create Request Button - Only for Students */}
                        {isStudent && (
                            <div className="mb-3">
                                <Flex justify="flex-end">
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        className="rounded-md w-40"
                                        style={{ backgroundColor: '#339966', borderColor: '#339966', boxShadow: 'none' }}
                                        onClick={() => navigate('/irst07')}
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
                                onChange={handlePageChange}
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
            </div>
        </div>
    );
};

export default Dashboard;