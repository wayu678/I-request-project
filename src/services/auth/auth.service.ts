// Auth Service for token management
export interface AuthService {
    getToken(): string | null;
    setToken(token: string): void;
    removeToken(): void;
    refreshToken(): Promise<string | null>;
    logout(): void;
}

class AuthServiceImpl implements AuthService {
    private readonly TOKEN_KEY = 'accessToken';
    private readonly REFRESH_TOKEN_KEY = 'refreshToken';

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }

    async refreshToken(): Promise<string | null> {
        try {
            const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
            if (!refreshToken) {
                return null;
            }

            // Import here to avoid circular dependency
            const { useAuthService } = await import('../api/auth');
            const authService = useAuthService();

            const response = await authService.refreshToken(refreshToken);

            if (response.success) {
                this.setToken(response.accessToken);
                localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
                return response.accessToken;
            }

            return null;
        } catch (error) {
            console.error('Token refresh failed:', error);
            this.logout();
            return null;
        }
    }

    logout(): void {
        this.removeToken();
        // Redirect to login page
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }
}

export const authService = new AuthServiceImpl();
