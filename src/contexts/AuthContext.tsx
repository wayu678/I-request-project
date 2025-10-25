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
    // เพิ่มข้อมูลใหม่จาก API
    fullNameTH?: string;
    fullNameEN?: string;
    roleDescriptionTH?: string;
    roleDescriptionEN?: string;
    studentCode?: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    error: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<boolean>;
    getCurrentUser: () => Promise<User | null>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const getCurrentUser = async (): Promise<User | null> => {
        try {
            console.log('🔍 Fetching current user from API...');
            setError(null); // Clear previous errors

            const response = await fetch('/api/auth/current-user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // ส่ง cookies อัตโนมัติ
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.log('🔒 User not authenticated');
                    return null;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const userData = await response.json();
            console.log('✅ Current user data received:', userData);

            // แปลงข้อมูลจาก API response เป็น User interface
            const user: User = {
                id: userData.id,
                username: userData.username,
                roleCode: userData.roleCode,
                campusCode: userData.campusCode,
                facultyCode: userData.facultyCode,
                majorCode: userData.majorCode,
                departmentCode: userData.departmentCode,
                advisorCode: userData.advisorCode,
                phone: userData.phone,
                email: userData.email,
                fullNameTH: userData.fullNameTH,
                fullNameEN: userData.fullNameEN,
                roleDescriptionTH: userData.roleDescriptionTH,
                roleDescriptionEN: userData.roleDescriptionEN,
                studentCode: userData.studentCode
            };

            return user;
        } catch (error) {
            console.error('❌ Error getting current user:', error);
            setError(error instanceof Error ? error.message : 'Failed to get user data');
            return null;
        }
    };

    const checkAuth = async (): Promise<boolean> => {
        try {
            setIsLoading(true);
            setError(null);

            const userData = await getCurrentUser();
            const isAuthenticated = userData !== null;

            setIsAuthenticated(isAuthenticated);
            setUser(userData);
            return isAuthenticated;
        } catch (error) {
            console.error('❌ Check auth error:', error);
            setError(error instanceof Error ? error.message : 'Authentication check failed');
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
            setError(null);
            console.log('🔐 Attempting login...');

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // ส่ง cookies อัตโนมัติ
            });

            if (response.ok) {
                const loginData = await response.json();
                console.log('✅ Login successful, fetching user profile...');

                // หลังจาก login สำเร็จ ให้ดึงข้อมูล user profile ใหม่
                const userData = await getCurrentUser();

                if (userData) {
                    setIsAuthenticated(true);
                    setUser(userData);
                    console.log('✅ User profile loaded successfully');
                    return true;
                } else {
                    console.warn('⚠️ Login successful but failed to load user profile');
                    setError('Failed to load user profile after login');
                    return false;
                }
            } else {
                console.log('❌ Login failed:', response.status);
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.message || 'Login failed');
                return false;
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            setError(error instanceof Error ? error.message : 'Login failed');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            setError(null);
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include' // ส่ง cookies อัตโนมัติ
            });

            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error('❌ Logout error:', error);
            // แม้ว่า logout จะล้มเหลว ก็ให้ตั้งค่าเป็น false
            setIsAuthenticated(false);
            setUser(null);
            setError(error instanceof Error ? error.message : 'Logout failed');
        }
    };

    const clearError = (): void => {
        setError(null);
    };

    const value: AuthContextType = {
        isAuthenticated,
        isLoading,
        user,
        error,
        login,
        logout,
        checkAuth,
        getCurrentUser,
        clearError
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
