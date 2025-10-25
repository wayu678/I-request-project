import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Spin } from 'antd';
import {
    PieChartOutlined,
    FileTextOutlined,
    UserOutlined,
    UpOutlined
} from '@ant-design/icons';
import { useTranslate } from '../provider/hooks/translate.hook';
import { useAuth } from '../contexts/AuthContext';

interface MenuItem {
    key: string;
    label: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
    path?: string;
}

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { translate, language } = useTranslate();
    const { user, isLoading, error } = useAuth();
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['create-request']);

    const menuItems: MenuItem[] = [
        {
            key: 'dashboard',
            label: translate('แดชบอร์ด', 'Dashboard'),
            icon: <PieChartOutlined className="text-base" />,
            path: '/dashboard'
        },
        {
            key: 'create-request',
            label: translate('สร้างคำร้อง', 'Create Request'),
            icon: <FileTextOutlined className="text-base" />,
            children: [
                { key: 'general-request', label: translate('คำร้องทั่วไป', 'General Request'), path: '/demo/createRequest' },
                { key: 'registration-request', label: translate('คำร้องขอลงทะเบียนเรียน', 'Request for Registration'), path: '/demo/createRequest' },
                { key: 'postpone-tuition', label: translate('คําร้องขอผ่อนผันค่าธรรมเนียมการศึกษา', 'Request for Postpone Tuition and Fee Payments'), path: '/irst07' },
                { key: 'leave-absence', label: translate('คำร้องขอลาพักการศึกษา', 'Request for Leave of Absence'), path: '/demo/createRequest' },
                { key: 'resignation', label: translate('คำร้องขอลาออก', 'Request for Resignation'), path: '/demo/createRequest' },
                { key: 'makeup-exam', label: translate('คำร้องขอสอบชดเชย', 'Request for a Make-up Exam'), path: '/make-up-exam' },
                { key: 'change-faculty', label: translate('คำร้องขอย้ายคณะ', 'Request for Change of Faculty'), path: '/demo/createRequest' },
                { key: 'change-program', label: translate('คําร้องขอย้ายหลักสูตรและสาขาวิชาเอกภายในคณะ', 'Request for Change of Program and Major within the same Faculty'), path: '/demo/createRequest' },
                { key: 'transfer-credits', label: translate('คำร้องขอเทียบโอนรายวิชา', 'Request for Transfer Credits'), path: '/demo/createRequest' }
            ]
        },
        {
            key: 'profile',
            label: translate('โปรไฟล์', 'Profile'),
            icon: <UserOutlined className="text-base" />,
            path: '/profile'
        }
    ];

    const toggleMenu = (key: string) => {
        setExpandedMenus(prev =>
            prev.includes(key)
                ? prev.filter(k => k !== key)
                : [...prev, key]
        );
    };

    const handleMenuClick = (path?: string) => {
        if (path) {
            navigate(path);
        }
    };

    const isMenuActive = (path?: string) => {
        if (!path) return false;
        // สำหรับ irst07 ให้ตรวจสอบทั้ง /irst07 และ /irst07/detail
        if (path === '/irst07') {
            return location.pathname === '/irst07' || location.pathname === '/irst07/detail';
        }
        return location.pathname === path;
    };

    const isSubMenuActive = (children?: MenuItem[]) => {
        if (!children) return false;
        return children.some(child => isMenuActive(child.path));
    };

    // Helper functions สำหรับการแสดงชื่อและ role
    const getUserDisplayName = (): string => {
        if (!user) {
            return translate('นายสมมติ นามสกุล', 'Mr. Sample Lastname');
        }

        // ใช้ชื่อจริงจาก API หรือ fallback เป็น username
        const displayName = language === 'TH'
            ? (user.fullNameTH || user.username)
            : (user.fullNameEN || user.username);

        return displayName || translate('นายสมมติ นามสกุล', 'Mr. Sample Lastname');
    };

    const getUserRoleDescription = (): string => {
        if (!user) {
            return translate('นิสิตปัจจุบัน', 'Current Student');
        }

        // ใช้ role description จาก API หรือ fallback เป็น default
        const roleDescription = language === 'TH'
            ? (user.roleDescriptionTH || getDefaultRoleDescription(user.roleCode, 'TH'))
            : (user.roleDescriptionEN || getDefaultRoleDescription(user.roleCode, 'EN'));

        return roleDescription || translate('นิสิตปัจจุบัน', 'Current Student');
    };

    const getDefaultRoleDescription = (roleCode: string, lang: 'TH' | 'EN'): string => {
        const roleMap = {
            'STUDENT': {
                TH: 'นิสิตปัจจุบัน',
                EN: 'Current Student'
            },
            'ADMIN': {
                TH: 'ผู้ดูแลระบบ',
                EN: 'Administrator'
            },
            'STAFF': {
                TH: 'เจ้าหน้าที่',
                EN: 'Staff'
            },
            'FACULTY': {
                TH: 'อาจารย์',
                EN: 'Faculty'
            },
            'APPROVER': {
                TH: 'ผู้อนุมัติ',
                EN: 'Approver'
            }
        };

        const role = roleMap[roleCode as keyof typeof roleMap];
        return role ? role[lang] : roleCode;
    };

    return (
        <div className="h-screen text-white flex flex-col fixed left-0 top-0 z-50 shadow-lg font-sans w-70" style={{ backgroundColor: '#2F3337' }}>
            {/* User Profile Section */}
            <div className="w-75 h-18 p-5 flex items-center gap-4">
                <Avatar
                    size={44}
                    src="/profile.jpg"
                    className="flex-shrink-0"
                />
                <div className="flex-1">
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Spin size="small" />
                            <span className="text-xs text-gray-400">
                                {translate('กำลังโหลด...', 'Loading...')}
                            </span>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col">
                            <div className="text-xs text-red-400 mb-1">
                                {translate('เกิดข้อผิดพลาด', 'Error occurred')}
                            </div>
                            <div className="text-xs text-gray-400">
                                {translate('ไม่สามารถโหลดข้อมูลผู้ใช้ได้', 'Cannot load user data')}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="font-normal leading-tight mb-1 text-sm" style={{ color: '#22C488', fontSize: '14px' }}>
                                {getUserDisplayName()}
                            </div>
                            <div className="leading-tight font-normal text-xs" style={{ color: '#FFFFFF', fontSize: '10px' }}>
                                {getUserRoleDescription()}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Divider */}
            <div className="w-60 h-px mx-auto" style={{ backgroundColor: '#22C488' }}></div>

            {/* Menu Items */}
            <div className="flex-1 pt-5 overflow-y-auto">
                {menuItems.map((item) => (
                    <div key={item.key} className="mb-0.5">
                        {item.children ? (
                            <>
                                <div
                                    className={`flex items-center px-5 py-3 cursor-pointer transition-colors duration-200 text-white text-base font-normal ${isSubMenuActive(item.children) ? 'text-white' : ''
                                        }`}
                                    onClick={() => toggleMenu(item.key)}
                                    style={isSubMenuActive(item.children) ? { backgroundColor: '#339966' } : {}}
                                    onMouseEnter={(e) => {
                                        if (!isSubMenuActive(item.children)) {
                                            e.currentTarget.style.backgroundColor = '#404040';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSubMenuActive(item.children)) {
                                            e.currentTarget.style.backgroundColor = '';
                                        }
                                    }}
                                >
                                    <div className="mr-3 flex items-center justify-center w-6 h-6">
                                        {item.icon}
                                    </div>
                                    <span className="flex-1 font-normal">{item.label}</span>
                                    <UpOutlined
                                        className={`text-xs transition-transform duration-200 text-gray-400 ${expandedMenus.includes(item.key) ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>
                                {expandedMenus.includes(item.key) && (
                                    <div style={{ backgroundColor: '#2F3337' }}>
                                        {item.children.map((child) => (
                                            <div
                                                key={child.key}
                                                className={`px-5 py-2.5 pl-13 cursor-pointer transition-colors duration-200 text-white text-base leading-relaxed break-words font-normal relative ${isMenuActive(child.path) ? 'text-white' : ''
                                                    }`}
                                                onClick={() => handleMenuClick(child.path)}
                                                style={isMenuActive(child.path) ? { backgroundColor: '#339966' } : {}}
                                                onMouseEnter={(e) => {
                                                    if (!isMenuActive(child.path)) {
                                                        e.currentTarget.style.backgroundColor = '#404040';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isMenuActive(child.path)) {
                                                        e.currentTarget.style.backgroundColor = '';
                                                    }
                                                }}
                                            >
                                                {isMenuActive(child.path) && (
                                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white"></div>
                                                )}
                                                {child.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div
                                className={`flex items-center px-5 py-3 cursor-pointer transition-colors duration-200 text-white text-base font-normal ${isMenuActive(item.path) ? 'text-white' : ''
                                    }`}
                                onClick={() => handleMenuClick(item.path)}
                                style={isMenuActive(item.path) ? { backgroundColor: '#339966' } : {}}
                                onMouseEnter={(e) => {
                                    if (!isMenuActive(item.path)) {
                                        e.currentTarget.style.backgroundColor = '#404040';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMenuActive(item.path)) {
                                        e.currentTarget.style.backgroundColor = '';
                                    }
                                }}
                            >
                                <div className="mr-3 flex items-center justify-center w-6 h-6">
                                    {item.icon}
                                </div>
                                <span className="flex-1 font-normal">{item.label}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;