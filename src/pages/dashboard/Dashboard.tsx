import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Card,
    Row,
    Col,
    Table,
    Button,
    Pagination,
    Flex,


} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DownOutlined,
    UpOutlined,
    UnorderedListOutlined,

} from '@ant-design/icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
    IreSelect,
    IreCalendar,
} from '../../components/utils';

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
                    <span className="dashboard-table-header-text">ลำดับ</span>
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
                    <span className="dashboard-table-header-text">วันที่เอกสาร</span>
                    <UpOutlined className="dashboard-table-header-icon" />
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
                                    {chartData.map((item) => (
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
                        {/* Create Request Button */}
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

                        {/* Table */}
                        <div className="dashboard-table">
                            <Table
                                className="dashboard-table"
                                columns={columns}
                                dataSource={tableData}
                                pagination={false}
                                size="middle"
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
                                total={25}
                                pageSize={5}
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