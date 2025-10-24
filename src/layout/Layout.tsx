import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-70 flex flex-col">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;