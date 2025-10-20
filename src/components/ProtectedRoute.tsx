import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            console.log('🔍 ProtectedRoute: Checking authentication via localStorage...');

            // ตรวจสอบจาก localStorage แทนการเรียก API
            const token = localStorage.getItem('accessToken');
            const authenticated = !!token;

            console.log('🔍 ProtectedRoute: Authentication result:', authenticated);
            setIsAuthenticated(authenticated);
        } catch (error) {
            console.error('❌ ProtectedRoute: Auth check failed:', error);
            setIsAuthenticated(false);
        } finally {
            console.log('🔍 ProtectedRoute: Setting isLoading to false');
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login page with return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
