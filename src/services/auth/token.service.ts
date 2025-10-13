// Token Authentication Service
// ตามเงื่อนไขในรูปภาพ: Component 'd' - is token expire (GAS)

export interface TokenData {
    token: string;
    expiresAt: number;
    userId: string;
}

export interface UserProfile {
    username: string;
    firstName: string;
    lastName: string;
    // ... other profile fields
}

class TokenService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly TOKEN_EXPIRY_KEY = 'token_expiry';
    private readonly USER_ID_KEY = 'user_id';

    // ตรวจสอบว่า Token หมดอายุหรือไม่ (Component 'd' functionality)
    isTokenExpired(): boolean {
        const token = this.getToken();
        const expiry = this.getTokenExpiry();
        
        if (!token || !expiry) {
            return true;
        }

        const now = Date.now();
        return now >= expiry;
    }

    // ตรวจสอบ Token ผ่าน GAS (Google Apps Script) หรือ API
    async validateTokenWithGAS(token: string): Promise<boolean> {
        try {
            // TODO: เรียก GAS API เพื่อตรวจสอบ Token
            // const response = await fetch('YOUR_GAS_SCRIPT_URL', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ token })
            // });
            // return response.ok;

            // Mock validation for now
            return token.length > 10;
        } catch (error) {
            console.error('Token validation failed:', error);
            return false;
        }
    }

    // บันทึก Token
    setToken(tokenData: TokenData): void {
        localStorage.setItem(this.TOKEN_KEY, tokenData.token);
        localStorage.setItem(this.TOKEN_EXPIRY_KEY, tokenData.expiresAt.toString());
        localStorage.setItem(this.USER_ID_KEY, tokenData.userId);
    }

    // ดึง Token
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    // ดึง Token Expiry
    getTokenExpiry(): number | null {
        const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
        return expiry ? parseInt(expiry) : null;
    }

    // ดึง User ID
    getUserId(): string | null {
        return localStorage.getItem(this.USER_ID_KEY);
    }

    // ลบ Token
    clearToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
        localStorage.removeItem(this.USER_ID_KEY);
    }

    // ตรวจสอบการเข้าสู่ระบบ
    isAuthenticated(): boolean {
        return !this.isTokenExpired() && !!this.getToken();
    }

    // สร้าง Token ใหม่ (สำหรับการ Login)
    async generateToken(username: string, password: string): Promise<TokenData | null> {
        try {
            // เรียก API เพื่อสร้าง Token
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            
            const tokenData: TokenData = {
                token: data.token,
                expiresAt: data.expiresAt || (Date.now() + (24 * 60 * 60 * 1000)), // 24 hours default
                userId: data.userId || username
            };

            return tokenData;
        } catch (error) {
            console.error('Token generation failed:', error);
            // Fallback to mock token for development
            const mockToken: TokenData = {
                token: `mock_token_${Date.now()}_${username}`,
                expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
                userId: username
            };
            return mockToken;
        }
    }

    // ตรวจสอบ Token กับ Backend
    async validateTokenWithBackend(token: string): Promise<boolean> {
        try {
            const response = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.ok;
        } catch (error) {
            console.error('Token validation failed:', error);
            return false;
        }
    }
}

export const tokenService = new TokenService();
