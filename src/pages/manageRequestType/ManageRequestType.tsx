import React, { useState, useEffect } from 'react';
import {
    Card,
    Spin,
    message,
} from 'antd';
import { useTranslate } from '../../provider/hooks/translate.hook';
import ManageRequestTypeTable from './ManageRequestTypeTable';
import { requestTypeService } from '../../services/api/requestTypeService';

interface RequestTypeRow {
    key: string;
    no: number;
    requestCode: string;
    requestName: string;
    status: string;
    statusColor?: string;
    uuid?: string;
}

const ManageRequestType: React.FC = () => {
    const { translate } = useTranslate();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [tableData, setTableData] = useState<RequestTypeRow[]>([]);
    const [total, setTotal] = useState(0);

    // ตั้งค่า initial data
    useEffect(() => {
        loadRequestTypeData();
    }, [currentPage]);

    const loadRequestTypeData = async () => {
        try {
            setLoading(true);

            const result = await requestTypeService.getRequestTypes({
                page: currentPage,
                pageSize: pageSize
            });

            // Transform data to match table format
            const transformedData: RequestTypeRow[] = result.data.map((item: any, index: number) => ({
                key: item.uuid || item.id?.toString() || '',
                no: (currentPage - 1) * pageSize + index + 1,
                requestCode: item.code || '',
                requestName: item.nameTh || '',
                status: item.status === 'Y' ? 'ACTIVE' : 'INACTIVE',
                statusColor: item.status === 'Y' ? '#28a745' : '#dc3545',
                uuid: item.uuid
            }));

            setTableData(transformedData);
            setTotal(result.total);

        } catch (error) {
            console.error('Error loading request type data:', error);
            message.error('ไม่สามารถโหลดข้อมูลได้');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-100 px-4 pt-[10px] pb-4 lg:px-6 lg:pt-[10px] lg:pb-6 min-h-screen">
                <div className="max-w-7xl mx-auto flex flex-col">
                    <div className="bg-white rounded-lg p-5">
                        <div className="text-center py-12">
                            <Spin size="large" />
                            <div className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 px-4 pt-[10px] pb-4 lg:px-6 lg:pt-[10px] lg:pb-6 min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col">
                <div className="bg-white rounded-lg p-5">
                    {/* Table Section */}
                    <ManageRequestTypeTable
                        tableData={tableData}
                        loading={loading}
                        currentPage={currentPage}
                        total={total}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageRequestType;
