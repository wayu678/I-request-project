import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Card,
    Row,
    Col,
    Table,
    Button,
    Pagination,
    Select,
    Flex,
    DatePicker
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DownOutlined,
    UpOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { IreSelect } from '../../components/utils';

const { Option } = Select;

// Mock data for donut chart
const chartData = [
    { name: 'ร่าง', value: 45, color: '#8C8C8C' },
    { name: 'กำลังดำเนินการ', value: 30, color: '#13C2C2' },
    { name: 'ส่งกลับแก้ไข', value: 15, color: '#FF4D4F' },
    { name: 'เสร็จสิ้น', value: 10, color: '#52C41A' }
];

// Mock data for table
const tableData = [
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
        term: 'ภาคต้น',
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
        term: 'ภาคต้น',
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
        statusColor: '#52C41A'
    }
];

const Dashboard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

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

    const renderDatePickerField = (label: string, field: "month" | "academicYear", placeholder: string, format: string, picker?: "month" | "year") => (
        <Flex vertical gap={6} className="w-full">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <DatePicker
                placeholder={placeholder}
                format={format}
                picker={picker}
                suffixIcon={<CalendarOutlined />}
                size="large"
                value={formContext.getValues(field)}
                onChange={(date) => {
                    formContext.setValue(field, date);
                    formContext.trigger(field);
                }}
                style={{
                    borderColor: '#99CCB3',
                    backgroundColor: '#fff'
                }}
            />
        </Flex>
    );

    const columns = [
        {
            title: (
                <Flex align="center" justify="center">
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>ลำดับ</span>
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>วันที่เอกสาร</span>
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>เทอม</span>
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>ปีการศึกษา</span>
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>ประเภทคำร้อง</span>
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>สถานะคำร้อง</span>
                    <UpOutlined style={{ fontSize: '12px' }} />
                </Flex>
            ),
            dataIndex: 'status',
            key: 'status',
            width: 150,
            align: 'center' as const,
            render: (status: string, record: any) => (
                <Button
                    style={{
                        backgroundColor: record.statusColor,
                        borderColor: record.statusColor,
                        color: '#fff',
                        borderRadius: '16px',
                        width: '106px',
                        height: '28px',
                        fontSize: '12px',
                        fontWeight: 'normal',
                        padding: '0 12px',
                        cursor: 'default'
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
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>ดำเนินการ</span>
                </Flex>
            ),
            key: 'action',
            width: 120,
            align: 'center' as const,
            render: () => (
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    style={{
                        backgroundColor: '#17A2B8',
                        borderColor: '#17A2B8',
                        borderRadius: '4px',
                        width: '106px',
                        height: '38px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    View
                    <DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
                </Button>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
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
                            <span className="text-lg font-normal text-black" style={{ fontWeight: 'normal', fontSize: '18px' }}>Dashboard</span>
                        </Flex>
                    </Flex>
                    <Row gutter={[24, 24]}>
                        {/* Left Side - Chart */}
                        <Col xs={24} lg={12}>
                            <div style={{ padding: '20px' }}>
                                {/* Legend */}
                                <Flex justify="center" wrap="wrap" gap={16} style={{ marginBottom: '20px' }}>
                                    {chartData.map((item) => (
                                        <Flex key={item.name} align="center" gap={8}>
                                            <div
                                                style={{
                                                    width: '12px',
                                                    height: '12px',
                                                    backgroundColor: item.color,
                                                    borderRadius: '50%'
                                                }}
                                            />
                                            <span style={{ fontSize: '14px' }}>{item.name}</span>
                                        </Flex>
                                    ))}
                                </Flex>

                                {/* Donut Chart */}
                                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={120}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {chartData.map((entry, index) => (
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
                                    {renderDatePickerField("เดือน", "month", "MM", "MM", "month")}
                                    <IreSelect
                                        label="เทอม"
                                        placeholder="ภาคต้น, ภาคปลาย, ภาคฤดูร้อน"
                                        formContext={formContext}
                                        registerName={formContext.register('term')}
                                        options={termOptions}
                                        widthFull={true}
                                    />
                                    {renderDatePickerField("ปีการศึกษา", "academicYear", "YYYY", "YYYY", "year")}
                                    <IreSelect
                                        label="ประเภทคำร้อง"
                                        placeholder="คำร้องทั่วไป"
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
                        {/* Create Request Button */}
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
                                สร้างคำร้อง
                                <DownOutlined style={{ fontSize: '12px', marginLeft: '8px' }} />
                            </Button>
                        </Flex>

                        {/* Table */}
                        <div style={{
                            border: 'none',
                            borderCollapse: 'separate',
                            borderSpacing: 0
                        }}>
                            <style>
                                {`
                                    .dashboard-table .ant-table-thead > tr > th {
                                        border: none !important;
                                        border-right: none !important;
                                        border-left: none !important;
                                        border-top: none !important;
                                        border-bottom: none !important;
                                    }
                                    .dashboard-table .ant-table-thead > tr > th:not(:last-child) {
                                        border-right: none !important;
                                    }
                                    .dashboard-table .ant-table-tbody > tr > td:not(:last-child) {
                                        border-right: none !important;
                                    }
                                    .dashboard-table .ant-table {
                                        border: none !important;
                                    }
                                    .dashboard-table .ant-table table {
                                        border: none !important;
                                    }
                                    .dashboard-table .ant-table-thead > tr > th::before,
                                    .dashboard-table .ant-table-thead > tr > th::after {
                                        display: none !important;
                                    }
                                    .dashboard-table .ant-table-thead > tr > th * {
                                        border: none !important;
                                    }
                                    .dashboard-table .ant-table-thead > tr > th .ant-table-column-sorters {
                                        border: none !important;
                                    }
                                    .dashboard-table .ant-table-thead > tr > th .ant-table-column-sorters::before,
                                    .dashboard-table .ant-table-thead > tr > th .ant-table-column-sorters::after {
                                        display: none !important;
                                    }
                                `}
                            </style>
                            <Table
                                className="dashboard-table"
                                columns={columns}
                                dataSource={tableData}
                                pagination={false}
                                size="middle"
                                style={{
                                    backgroundColor: '#fff',
                                    border: 'none'
                                }}
                                rowClassName={(_, index) =>
                                    index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                                }
                                components={{
                                    header: {
                                        cell: (props: any) => (
                                            <th
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    backgroundColor: '#BAE2CF',
                                                    color: '#006C68',
                                                    border: 'none !important',
                                                    borderRight: 'none !important',
                                                    borderLeft: 'none !important',
                                                    borderTop: 'none !important',
                                                    borderBottom: 'none !important',
                                                    outline: 'none'
                                                }}
                                            />
                                        ),
                                    },
                                }}
                            />
                        </div>

                        {/* Pagination */}
                        <Flex justify="center" align="center" style={{ marginTop: '16px' }}>
                            <Pagination
                                current={currentPage}
                                total={25}
                                pageSize={pageSize}
                                showSizeChanger={false}
                                showQuickJumper={false}
                                showTotal={() => null}
                                onChange={(page) => {
                                    setCurrentPage(page);
                                }}
                                itemRender={(_, type, originalElement) => {
                                    if (type === 'prev') {
                                        return <Button
                                            size="small"
                                            icon={<UpOutlined style={{ transform: 'rotate(-90deg)', color: '#999' }} />}
                                            style={{
                                                border: '1px solid #d9d9d9',
                                                backgroundColor: '#fff',
                                                color: '#999'
                                            }}
                                        />;
                                    }
                                    if (type === 'next') {
                                        return <Button
                                            size="small"
                                            icon={<UpOutlined style={{ transform: 'rotate(90deg)', color: '#999' }} />}
                                            style={{
                                                border: '1px solid #d9d9d9',
                                                backgroundColor: '#fff',
                                                color: '#999'
                                            }}
                                        />;
                                    }
                                    if (type === 'jump-prev') {
                                        return <Button
                                            size="small"
                                            style={{
                                                border: '1px solid #d9d9d9',
                                                backgroundColor: '#fff',
                                                color: '#999'
                                            }}
                                        >«</Button>;
                                    }
                                    if (type === 'jump-next') {
                                        return <Button
                                            size="small"
                                            style={{
                                                border: '1px solid #d9d9d9',
                                                backgroundColor: '#fff',
                                                color: '#999'
                                            }}
                                        >»</Button>;
                                    }
                                    return originalElement;
                                }}
                            />
                        </Flex>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;