import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslate } from '../provider/hooks/translate.hook';
import { useAuth } from '../contexts/AuthContext';
import { Card, Flex, Button } from 'antd';
import { HomeOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { LANGUAGE } from '../constants/common';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { language, setLanguage, translate } = useTranslate();
    const { logout } = useAuth();

    // ฟังก์ชันสำหรับสร้าง breadcrumb จาก path ปัจจุบัน
    const getBreadcrumbItems = () => {
        const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

        if (pathSegments.length === 0) {
            return [{ label: translate('แดชบอร์ด', 'Dashboard'), path: '/' }];
        }

        const breadcrumbs: Array<{ label: string; path: string }> = [];

        let currentPath = '';
        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`;

            // แปลง segment เป็นชื่อที่อ่านได้
            let label = segment;
            switch (segment) {
                case 'dashboard':
                    label = translate('แดชบอร์ด', 'Dashboard');
                    break;
                case 'profile':
                    label = translate('โปรไฟล์', 'Profile');
                    break;
                case 'irst07':
                    // เพิ่ม Create Request ก่อนหน้า irst07
                    breadcrumbs.push({
                        label: translate('สร้างคำร้อง', 'Create Request'),
                        path: '/demo/createRequest'
                    });
                    label = translate('คําร้องขอผ่อนผันค่าธรรมเนียมการศึกษา', 'Request for Postpone Tuition Fee Payment');
                    break;
                case 'demo':
                    // ตรวจสอบว่าเป็น master data หรือไม่
                    if (pathSegments[index + 1] === 'master-account' || pathSegments[index + 1] === 'master-request-type' || pathSegments[index + 1] === 'master-value') {
                        label = translate('ข้อมูลหลัก', 'Master Data');
                    } else {
                        label = translate('สร้างคำร้อง', 'Create Request');
                    }
                    break;
                case 'createRequest':
                    label = translate('คำร้องทั่วไป', 'General Request');
                    break;
                case 'master-request-type':
                    label = translate('จัดการประเภทคำร้อง', 'Manage Request Type');
                    break;
                case 'master-account':
                    label = translate('กำหนดผู้ใช้งาน', 'Manage Account');
                    break;
                default:
                    label = segment.charAt(0).toUpperCase() + segment.slice(1);
            }

            breadcrumbs.push({
                label,
                path: currentPath
            });
        });

        return breadcrumbs;
    };

    const breadcrumbItems = getBreadcrumbItems();

    // ฟังก์ชันสำหรับ logout
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="px-2 lg:px-4 pt-2 lg:pt-4 pb-0">
            <div className="max-w-7xl mx-auto">
                <Card
                    style={{
                        height: '60px',
                        borderRadius: '8px'
                    }}
                    styles={{
                        body: {
                            padding: '12px 16px',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center'
                        }
                    }}
                >
                    <Flex align="center" justify="space-between" style={{ width: '100%' }}>
                        {/* Left Side - Mobile Menu Button + Breadcrumb */}
                        <div className="flex items-center space-x-2 lg:space-x-4">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={onMenuClick}
                                className="lg:hidden text-black hover:text-gray-800 transition-colors p-1"
                            >
                                <MenuOutlined className="w-5 h-5" />
                            </button>

                            {/* Breadcrumb Navigation */}
                            <nav className="flex items-center space-x-1 lg:space-x-2 overflow-hidden">
                                {/* Home Icon */}
                                <button
                                    onClick={() => navigate('/')}
                                    className="text-black hover:text-gray-800 transition-colors flex-shrink-0"
                                >
                                    <HomeOutlined className="w-4 h-4 lg:w-5 lg:h-5" />
                                </button>

                                {/* Breadcrumb Items */}
                                {breadcrumbItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {/* Separator */}
                                        <span className="text-black mx-1 lg:mx-2 text-xs lg:text-sm">&gt;</span>

                                        {/* Breadcrumb Item */}
                                        <button
                                            onClick={() => navigate(item.path)}
                                            className={`text-xs lg:text-sm transition-colors truncate max-w-20 lg:max-w-none ${index === breadcrumbItems.length - 1
                                                ? 'text-black font-medium'
                                                : 'text-black hover:text-gray-800'
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    </React.Fragment>
                                ))}
                            </nav>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-2 lg:space-x-4">
                            {/* Language Switcher */}
                            <div className="flex items-center">
                                <Button
                                    type={language === LANGUAGE.TH ? "link" : "text"}
                                    onClick={() => setLanguage(LANGUAGE.TH)}
                                    style={{ color: language === LANGUAGE.TH ? '#339966' : '#000000' }}
                                    size="small"
                                >
                                    <span className="text-xs lg:text-sm">
                                        {LANGUAGE.TH}
                                    </span>
                                </Button>
                                <span className="text-xs lg:text-sm">/</span>
                                <Button
                                    type={language === LANGUAGE.EN ? "link" : "text"}
                                    onClick={() => setLanguage(LANGUAGE.EN)}
                                    style={{ color: language === LANGUAGE.EN ? '#339966' : '#000000' }}
                                    size="small"
                                >
                                    <span className="text-xs lg:text-sm">
                                        {LANGUAGE.EN}
                                    </span>
                                </Button>
                            </div>

                            {/* Logout Icon */}
                            <button
                                onClick={handleLogout}
                                className="text-black hover:text-gray-800 transition-colors p-1"
                                title={translate('ออกจากระบบ', 'Logout')}
                            >
                                <LogoutOutlined className="w-4 h-4 lg:w-5 lg:h-5" />
                            </button>
                        </div>
                    </Flex>
                </Card>
            </div>
        </div>
    );
};

export default Header;
