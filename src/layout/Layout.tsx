import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSidebarTrigger = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex-1 ml-70 flex flex-col">
                <Header isOpen={isSidebarOpen} onSidebarTrigger={handleSidebarTrigger} />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;