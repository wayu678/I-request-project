import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { tokenService, profileService } from '../services/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
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
            const authenticated = tokenService.isAuthenticated();
            setIsAuthenticated(authenticated);
            return authenticated;
        } catch (error) {
            console.error('Auth check failed:', error);
            setIsAuthenticated(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            setIsLoading(true);

            // สร้าง Token
            const tokenData = await tokenService.generateToken(username, password);
            if (!tokenData) {
                return false;
            }

            // บันทึก Token
            tokenService.setToken(tokenData);

            // ตรวจสอบการเข้าสู่ระบบ
            const authenticated = await checkAuth();
            return authenticated;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        try {
            // ลบ Token
            tokenService.clearToken();

            // ลบข้อมูล Profile
            profileService.clearProfileData();

            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout failed:', error);
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
