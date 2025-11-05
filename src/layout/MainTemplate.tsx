import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface MainTemplateProps {
    children: React.ReactNode;
}

/**
 * MainTemplate component ที่รวม Sidebar และ Header ไว้ในหน้าเดียวกัน
 * ใช้สำหรับทุกหน้ายกเว้นหน้า login
 * รองรับ responsive design สำหรับทุกขนาดหน้าจอ
**/
const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - ด้านซ้าย */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content Area - ด้านขวา */}
            <div className="flex-1 lg:ml-70 flex flex-col min-w-0">
                {/* Header - ด้านบน */}
                <Header 
                    isOpen={sidebarOpen}
                    onSidebarTrigger={() => setSidebarOpen(true)} 
                />

                {/* Page Content - เนื้อหาหลัก */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainTemplate;
