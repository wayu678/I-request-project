import React, { useEffect, useState } from 'react';
import { Card, Spin, message, Modal } from 'antd';
import { useTranslate } from '../../provider/hooks/translate.hook';
import ManageMasterValueTable from './ManageMasterValueTable';
import ManageMasterValueFilters from './ManageMasterValueFilters';

interface MasterValueRow {
    key: string;
    no: number;
    code: string;
    name: string;
    status: 'ACTIVE' | 'INACTIVE';
}

const ManageMasterValue: React.FC = () => {
    const { translate } = useTranslate();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [tableData, setTableData] = useState<MasterValueRow[]>([]);
    const [total, setTotal] = useState(0);

    const [code, setCode] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        loadData(code, status, currentPage);
    }, [currentPage]);

    const loadData = async (
        filterCode: string = code,
        filterStatus: string = status,
        page: number = currentPage
    ) => {
        try {
            setLoading(true);
            // Fixed mock dataset limited to IRST12
            const allItems: Omit<MasterValueRow, 'no'>[] = [
                { key: 'mv-1', code: '-', name: translate('ล็อคอิน', 'Login'), status: 'ACTIVE' },
                { key: 'mv-2', code: 'IRST02', name: translate('แดชบอร์ด', 'Dashboard'), status: 'INACTIVE' },
                { key: 'mv-3', code: 'IRST03', name: translate('โปรไฟล์', 'Profile'), status: 'ACTIVE' },
                { key: 'mv-4', code: 'IRST04', name: translate('คำร้องขอสอบชดเชย', 'Make-up exam request'), status: 'INACTIVE' },
                { key: 'mv-5', code: 'IRST05', name: translate('คำร้องทั่วไป', 'General request'), status: 'ACTIVE' },
                { key: 'mv-6', code: 'IRST06', name: translate('คำร้องของลงทะเบียมเรียน', 'Registration request'), status: 'INACTIVE' },
                { key: 'mv-7', code: 'IRST07', name: translate('คำร้องขอผ่อนผันค่าธรรมเนียมการศึกษา', 'Postpone tuition fee'), status: 'ACTIVE' },
                { key: 'mv-8', code: 'IRST08', name: translate('คำร้องขอลาพักการศึกษา', 'Leave of absence'), status: 'ACTIVE' },
                { key: 'mv-9', code: 'IRST09', name: translate('คำร้องขอลาออก', 'Resignation request'), status: 'ACTIVE' },
                { key: 'mv-10', code: 'IRST10', name: translate('คำร้องขอย้ายคณะ', 'Request to transfer faculty'), status: 'INACTIVE' },
                { key: 'mv-11', code: 'IRST11', name: translate('คำร้องขอย้ายหลักสูตรและสาขาวิชาเอกภายในคณะ', 'Request to change program/major within faculty'), status: 'ACTIVE' },
                { key: 'mv-12', code: 'IRST12', name: translate('คำร้องขอเทียบโอนรายวิชา', 'Request for course credit transfer'), status: 'ACTIVE' },
            ];

            // apply filters
            const filtered = allItems.filter((item) => {
                const matchCode = filterCode
                    ? item.code.toLowerCase().includes(filterCode.toLowerCase())
                    : true;
                const matchStatus = filterStatus
                    ? item.status.toLowerCase().includes(filterStatus.toLowerCase())
                    : true;
                return matchCode && matchStatus;
            });

            // paginate after filtering
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const pageSlice = filtered.slice(startIndex, endIndex);

            const paginated = pageSlice.map((item, i) => ({
                ...item,
                no: startIndex + i + 1,
            }));

            setTableData(paginated);
            setTotal(filtered.length);
        } catch (e) {
            console.error(e);
            message.error(translate('ไม่สามารถโหลดข้อมูลได้', 'Failed to load data'));
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    const handleFilterChange = (field: 'code' | 'status', value: string) => {
        if (field === 'code') setCode(value);
        if (field === 'status') setStatus(value);
    };

    const handleSearch = () => {
        const nextPage = 1;
        setCurrentPage(nextPage);
        loadData(code, status, nextPage);
    };

    const handleClear = () => {
        const nextCode = '';
        const nextStatus = '';
        const nextPage = 1;
        setCode(nextCode);
        setStatus(nextStatus);
        setCurrentPage(nextPage);
        loadData(nextCode, nextStatus, nextPage);
    };

    const handleAdd = () => {
        Modal.info({ title: translate('เพิ่มค่าหลัก', 'Add Master Value'), content: translate('โปรดยืนยันรูปแบบการเพิ่มในขั้นต่อไป', 'We will define the add flow later.') });
    };

    return (
        <div className="bg-gray-100 px-4 pt-[10px] pb-4 lg:px-6 lg:pt-[10px] lg:pb-6 min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col">
                <div className="bg-white rounded-lg p-5">
                    <ManageMasterValueFilters
                        code={code}
                        status={status}
                        onChange={handleFilterChange}
                        onSearch={handleSearch}
                        onClear={handleClear}
                    />
                    <div className="flex justify-end pr-5">
                        <button
                            onClick={handleAdd}
                            type="button"
                            className="flex items-center gap-2 justify-center rounded-lg font-medium shadow-sm text-white"
                            style={{ backgroundColor: '#339966', borderColor: '#339966', width: '80px', height: '40px' }}
                            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#287a4e')}
                            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#339966')}
                        >
                            <span style={{ fontSize: '1.25em' }}>+</span>
                            {translate('เพิ่ม', 'Add')}
                        </button>
                    </div>
                    {loading ? (
                        <div className="text-center py-12">
                            <Spin size="large" />
                            <div className="mt-4 text-gray-600">{translate('กำลังโหลดข้อมูล...', 'Loading...')}</div>
                        </div>
                    ) : (
                        <ManageMasterValueTable
                            tableData={tableData}
                            loading={loading}
                            currentPage={currentPage}
                            total={total}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            onDelete={(row) => {
                                Modal.confirm({
                                    title: translate('ยืนยันการลบ', 'Confirm delete'),
                                    content: translate('ต้องการลบรายการนี้หรือไม่?', 'Are you sure to delete this item?'),
                                    okText: translate('ลบ', 'Delete'),
                                    cancelText: translate('ยกเลิก', 'Cancel'),
                                    okButtonProps: { danger: true },
                                    onOk: () => {
                                        setTableData(prev => prev.filter(item => item.key !== row.key));
                                        message.success(translate('ลบสำเร็จ', 'Deleted successfully'));
                                    }
                                });
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageMasterValue;


