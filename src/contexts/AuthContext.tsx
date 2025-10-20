import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async (): Promise<boolean> => {
        try {
            setIsLoading(true);

            // ตรวจสอบจาก localStorage แทนการเรียก API
            const token = localStorage.getItem('accessToken');
            const isAuthenticated = !!token;

            setIsAuthenticated(isAuthenticated);
            return isAuthenticated;
        } catch (error) {
            setIsAuthenticated(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            setIsLoading(true);

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // ส่ง cookies อัตโนมัติ
            });

            if (response.ok) {
                const data = await response.json();

                // บันทึก token ลง localStorage สำหรับการตรวจสอบ
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                }

                setIsAuthenticated(true);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include' // ส่ง cookies อัตโนมัติ
            });

            // ลบ token จาก localStorage
            localStorage.removeItem('accessToken');
            setIsAuthenticated(false);
        } catch (error) {
            // แม้ว่า logout จะล้มเหลว ก็ให้ตั้งค่าเป็น false
            localStorage.removeItem('accessToken');
            setIsAuthenticated(false);
        }
    };

    const value: AuthContextType = {
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
