import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslate } from '../provider/hooks/translate.hook';
import { useAuth } from '../contexts/AuthContext';
import { Card, Flex, Button, Breadcrumb } from 'antd';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { LANGUAGE } from '../constants/common';
import type { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';

interface HeaderProps {
    isOpen: boolean;
    onSidebarTrigger: () => void;
}

interface BreadcrumbHeader {
    [key: string]: BreadcrumbItemType[]
}

const Header = ({
    isOpen,
    onSidebarTrigger,
}: HeaderProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { language, setLanguage, translate } = useTranslate();
    const { logout } = useAuth();

    const breadcrumbHeaders: BreadcrumbHeader = useMemo(() => {
        const home = {
            '/': [
                { title: translate('หน้าหลัก', 'Home') }
            ]
        };
        const dashboard = {
            '/dashboard': [
                { title: translate('แดชบอร์ด', 'Dashboard') }
            ]
        };
        const irst05 = {
            '/irst05/general-request': [
                { title: translate('สร้างคำร้อง', 'Create Request') },
                { title: translate('คำร้องทั่วไป', 'General Request') }
            ]
        };
        const irst07 = {
            '/irst07/postpone-tuition-and-fee-payments': [
                { title: translate('สร้างคำร้อง', 'Create Request') },
                { title: translate('คำร้องขอผ่อนผันค่าธรรมเนียมการศึกษา', 'Request for Postpone Tuition and Fee Payments') }
            ],
            '/irst07/postpone-tuition-and-fee-payments/detail': [
                { title: translate('สร้างคำร้อง', 'Create Request') },
                { title: translate('คำร้องขอผ่อนผันค่าธรรมเนียมการศึกษา', 'Request for Postpone Tuition and Fee Payments') },
                { title: translate('แก้ไขข้อมูลคำร้อง', 'Edit Request Information') }
            ]
        };
        const profile = {
            '/profile': [
                { title: translate('โปรไฟล์', 'Profile') }
            ],
            '/profile/edit': [
                { title: translate('แก้ไขโปรไฟล์', 'Edit Profile') }
            ]
        }

        return {
            ...home,
            ...dashboard,
            ...irst05,
            ...irst07,
            ...profile,
        }
    }, [language]);

    const breadcrumbHeaderItems = useCallback((): BreadcrumbItemType[] => {
        try {
            const locationPath = location.pathname;

            const breadcrumbHeader: BreadcrumbItemType[] = breadcrumbHeaders[locationPath] || [];

            const breadcrumbHeaderItems: BreadcrumbItemType[] = breadcrumbHeader.map((item: BreadcrumbItemType, index: number) => {
                return {
                    ...item,
                    className: `${index === breadcrumbHeader.length - 1 ? 'text-green-700' : ''}`
                }
            });

            return breadcrumbHeaderItems;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error at getBreadcrumbHeader: Get breadcrumb header failed:', error.message);
            } else {
                console.error('Error at getBreadcrumbHeader: Get breadcrumb header failed:', error);
            }
            throw error;
        }
    }, [location.pathname, language]);

    // ฟังก์ชันสำหรับ logout
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Header: Logout failed:', error);
        }
    }

    return (
        <div className="px-4 pt-4">
            <Card className="bg-white rounded-lg">
                <Flex align="center" justify="space-between">
                    {/* Left Side - Mobile Menu Button + Breadcrumb */}
                    <div className="flex items-center space-x-6">
                        <MenuOutlined onClick={onSidebarTrigger} className={`cursor-pointer`} />
                        <Breadcrumb items={breadcrumbHeaderItems()} />
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-2 lg:space-x-4">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-1">
                            <Button
                                type={language === LANGUAGE.TH ? "link" : "text"}
                                onClick={() => setLanguage(LANGUAGE.TH)}
                                style={{ color: language === LANGUAGE.TH ? '#339966' : '#000000' }}
                                size="small"
                            >
                                {LANGUAGE.TH}
                            </Button>
                            <span>/</span>
                            <Button
                                type={language === LANGUAGE.EN ? "link" : "text"}
                                onClick={() => setLanguage(LANGUAGE.EN)}
                                style={{ color: language === LANGUAGE.EN ? '#339966' : '#000000' }}
                                size="small"
                            >
                                {LANGUAGE.EN}
                            </Button>
                        </div>

                        {/* Logout Icon */}
                        <Button
                            type="text"
                            onClick={handleLogout}
                            className="flex items-center justify-center hover:bg-gray-200 transition-colors rounded-md p-2"
                            title={translate('ออกจากระบบ', 'Logout')}
                        >
                            <LogoutOutlined className="pointer-cursor" />
                        </Button>
                    </div>
                </Flex>
            </Card>
        </div>
    );
};

export default Header;
