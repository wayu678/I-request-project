import React, { useState, useEffect } from 'react';
import { useTranslate } from '../../provider/hooks/translate.hook';
import { message } from 'antd';
import ManageAccountTable from './ManageAccountTable';
import ManageAccountForm from './ManageAccountForm';
import ManageAccountFilters from './ManageAccountFilters';
import { userManagementService } from '../../services/api/userManagementService';
import type { UserResponse } from '../../services/generated-api/models';

interface UserRow {
    key: string;
    no: number;
    id: number;
    username: string;
    roleCode: string;
    roleDescription: string;
    status: string;
    statusColor?: string;
}

const ManageAccount: React.FC = () => {
    const { translate } = useTranslate();

    const [usernameFilter, setUsernameFilter] = useState<string>('');
    const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserRow | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState<UserRow[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;

    // ฟังก์ชันดึงข้อมูลจาก API
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await userManagementService.getAllUsers({
                page: currentPage,
                pageSize: pageSize
            });

            // แปลงข้อมูลจาก API เป็นรูปแบบที่ใช้ใน component
            const transformedData: UserRow[] = response.users.map((user: UserResponse, index: number) => ({
                key: user.id?.toString() || '',
                no: (currentPage - 1) * pageSize + index + 1,
                id: user.id || 0,
                username: user.username || '',
                roleCode: user.roleCode || '',
                roleDescription: user.roleDescriptionTH || user.roleDescriptionEN || (user.roleCode === 'ADMIN' ? translate('ผู้ดูแลระบบ', 'Administrator') : user.roleCode === 'STAFF' ? translate('เจ้าหน้าที่', 'Staff') : user.roleCode || ''),
                status: 'ACTIVE', // TODO: ดึงจาก API จริง
                statusColor: '#28a745'
            }));

            setUsersData(transformedData);
            setTotalCount(response.totalCount);
        } catch (error) {
            console.error('Error fetching users:', error);
            message.error(translate('ไม่สามารถโหลดข้อมูลได้', 'Cannot load data'));
        } finally {
            setLoading(false);
        }
    };

    // เรียกข้อมูลเมื่อ component mount และเมื่อ page เปลี่ยน
    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const filteredData = usersData.filter(user => {
        const matchesUsername = !usernameFilter ||
            user.username.toLowerCase().includes(usernameFilter.toLowerCase());
        const matchesRole = !roleFilter || user.roleCode === roleFilter;
        const matchesStatus = !statusFilter || user.status === statusFilter;

        return matchesUsername && matchesRole && matchesStatus;
    });

    const handleUsernameChange = (value: string) => {
        setUsernameFilter(value);
        setCurrentPage(1);
    };

    const handleRoleChange = (value: string | undefined) => {
        setRoleFilter(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (value: string | undefined) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleAddClick = () => {
        setEditingUser(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (user: UserRow) => {
        setEditingUser(user);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingUser(null);
    };

    const handleFormSuccess = async () => {
        setIsFormOpen(false);
        setEditingUser(null);
        await fetchUsers(); // รีโหลดข้อมูลหลังจากบันทึก
        message.success(translate('บันทึกข้อมูลสำเร็จ', 'Data saved successfully'));
    };

    return (
        <div className="bg-gray-100 pt-0 pb-3 px-3">
            <div className="max-w-7xl mx-auto flex flex-col gap-3">
                <div className="bg-white rounded-lg p-5">
                    <ManageAccountFilters
                        usernameFilter={usernameFilter}
                        roleFilter={roleFilter}
                        statusFilter={statusFilter}
                        onUsernameChange={handleUsernameChange}
                        onRoleChange={handleRoleChange}
                        onStatusChange={handleStatusChange}
                        onAddClick={handleAddClick}
                    />

                    <ManageAccountTable
                        tableData={filteredData}
                        loading={loading}
                        currentPage={currentPage}
                        total={totalCount}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onEdit={handleEditClick}
                    />
                </div>

                <ManageAccountForm
                    open={isFormOpen}
                    user={editingUser}
                    onClose={handleFormClose}
                    onSuccess={handleFormSuccess}
                />
            </div>
        </div>
    );
};

export default ManageAccount;

