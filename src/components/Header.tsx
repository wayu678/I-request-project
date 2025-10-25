import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslate } from '../provider/hooks/translate.hook';
import { useAuth } from '../contexts/AuthContext';
import { Card, Flex } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { language, setLanguage, translate } = useTranslate();
    const { logout } = useAuth();

    // ฟังก์ชันสำหรับสร้าง breadcrumb จาก path ปัจจุบัน
    const getBreadcrumbItems = () => {
        const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

        if (pathSegments.length === 0) {
            return [{ label: translate('หน้าแรก', 'Dashboard'), path: '/' }];
        }

        const breadcrumbs = [
            { label: translate('หน้าแรก', 'Dashboard'), path: '/' }
        ];

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
                    label = translate('ขอผ่อนชำระค่าธรรมเนียมการศึกษา', 'Request for Postpone Tuition Fee Payment');
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

    // ฟังก์ชันสำหรับสลับภาษา
    const handleLanguageSwitch = () => {
        const newLanguage = language === 'TH' ? 'EN' : 'TH';
        setLanguage(newLanguage);
    };

    // ฟังก์ชันสำหรับ logout
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="bg-gray-100" style={{ marginTop: '10px', marginBottom: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
            <div className="max-w-7xl mx-auto">
                <Card
                    style={{
                        height: '60px',
                        borderRadius: '8px'
                    }}
                    styles={{
                        body: {
                            padding: '12px 24px',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center'
                        }
                    }}
                >
                    <Flex align="center" justify="space-between" style={{ width: '100%' }}>
                        {/* Breadcrumb Navigation - ด้านซ้าย */}
                        <nav className="flex items-center space-x-2">
                            {/* Home Icon */}
                            <button
                                onClick={() => navigate('/')}
                                className="text-black hover:text-gray-800 transition-colors"
                            >
                                <HomeOutlined className="w-5 h-5" />
                            </button>

                            {/* Breadcrumb Items */}
                            {breadcrumbItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    {/* Separator */}
                                    {index > 0 && (
                                        <span className="text-black mx-2">&gt;</span>
                                    )}

                                    {/* Breadcrumb Item */}
                                    <button
                                        onClick={() => navigate(item.path)}
                                        className={`text-sm transition-colors ${index === breadcrumbItems.length - 1
                                            ? 'text-black font-medium'
                                            : 'text-black hover:text-gray-800'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                </React.Fragment>
                            ))}
                        </nav>

                        {/* Right Side Actions - ด้านขวา */}
                        <div className="flex items-center space-x-4">
                            {/* Language Switcher */}
                            <button
                                onClick={handleLanguageSwitch}
                                className="flex items-center space-x-1 text-sm font-medium transition-colors"
                            >
                                <span className={language === 'TH' ? 'text-black' : 'text-black'} style={{ color: language === 'TH' ? '#339966' : '#000000' }}>
                                    TH
                                </span>
                                <span className="text-black">/</span>
                                <span className={language === 'EN' ? 'text-black' : 'text-black'} style={{ color: language === 'EN' ? '#339966' : '#000000' }}>
                                    EN
                                </span>
                            </button>

                            {/* Logout Icon */}
                            <button
                                onClick={handleLogout}
                                className="text-black hover:text-gray-800 transition-colors"
                                title={translate('ออกจากระบบ', 'Logout')}
                            >
                                <LogoutOutlined className="w-5 h-5" />
                            </button>
                        </div>
                    </Flex>
                </Card>
            </div>
        </div>
    );
};

export default Header;
