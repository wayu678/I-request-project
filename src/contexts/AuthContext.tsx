import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authenticationService } from '../services/api/auth';

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

            // ✅ 4.3 เรียกใช้ service แทน fetch
            const userData = await authenticationService.getCurrentUser();
            console.log('✅ Current user data received:', userData);

            // แปลงข้อมูลจาก API response เป็น User interface
            // ✅ Type assertion: UserResponse fields อาจเป็น optional แต่ในทางปฏิบัติ required fields จะมีค่าเสมอ
            const user: User = {
                id: userData.id ?? 0,
                username: userData.username ?? '',
                roleCode: userData.roleCode ?? '',
                campusCode: userData.campusCode ?? '',
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
        } catch (error: any) {
            console.error('❌ Error getting current user:', error);
            // ✅ จัดการ 401 error
            if (error?.status === 401 || error?.response?.status === 401) {
                console.log('🔒 User not authenticated');
                return null;
            }
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

            // ✅ 4.3 เรียกใช้ service โดยตรง
            const response = await authenticationService.login({ username, password });

            if (response.success) {
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
                // ✅ response เป็น UserLoginResponse object (มี success, message, accessToken, etc.)
                console.log('❌ Login failed:', response.message);
                setError(response.message || 'Login failed');
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
            
            // ✅ 4.3 ถ้ามี userId ใน user state ให้ใช้ service
            if (user?.id) {
                await authenticationService.logout(user.id);
            } else {
                // ✅ ถ้าไม่มี userId ให้ใช้ fetch (fallback)
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    credentials: 'include'
                });
            }

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
