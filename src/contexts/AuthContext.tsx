import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
    id: number;
    username: string;
    roleCode: string;
    campusCode: string;
    facultyCode?: string;
    majorCode?: string;
    departmentCode?: string;
    advisorCode?: string;
    phone?: string;
    email?: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<boolean>;
    getCurrentUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const getCurrentUser = async (): Promise<User | null> => {
        try {
            // Mock data for development
            const mockUser: User = {
                id: 1,
                username: 'testuser',
                email: 'test@example.com',
                roleCode: 'STUDENT',
                campusCode: 'BANGKOK'
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));

            return mockUser;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    };

    const checkAuth = async (): Promise<boolean> => {
        try {
            setIsLoading(true);

            const userData = await getCurrentUser();
            const isAuthenticated = userData !== null;

            setIsAuthenticated(isAuthenticated);
            setUser(userData);
            return isAuthenticated;
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
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
                setIsAuthenticated(true);
                setUser(data);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
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

            setIsAuthenticated(false);
        } catch (error) {
            // แม้ว่า logout จะล้มเหลว ก็ให้ตั้งค่าเป็น false
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const value: AuthContextType = {
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        checkAuth,
        getCurrentUser
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
