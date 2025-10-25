import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleMenuClick = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
            <div className="flex-1 ml-70 flex flex-col">
                <Header onMenuClick={handleMenuClick} />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;