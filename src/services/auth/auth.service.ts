import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { mockAuthService, type LoginRequest, type LoginResponse } from './mock-auth.service';

// Encryption key (ควรเก็บใน environment variables)
const ENCRYPTION_KEY = 'your-secret-encryption-key-here';

export interface User {
  id: string;
  username: string;
  role: string;
  loginType: 'admin' | 'user';
}

// Re-export types for external use
export type { LoginRequest, LoginResponse };

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user_data';
  private readonly USE_MOCK = true; // ตั้งเป็น true สำหรับทดสอบ

  // เข้ารหัส password
  encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
  }

  // ถอดรหัส password (สำหรับการเปรียบเทียบ)
  decryptPassword(encryptedPassword: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // การ login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      if (this.USE_MOCK) {
        // ใช้ mock service สำหรับทดสอบ
        console.log('🔐 Testing login with credentials:', {
          username: credentials.username,
          loginType: credentials.loginType,
          passwordLength: credentials.password.length
        });

        const response = await mockAuthService.mockLogin(credentials);
        
        // เก็บ token และ user data
        this.setToken(response.token);
        this.setRefreshToken(response.refreshToken);
        this.setUser(response.user);
        
        console.log('✅ Login successful:', response.user);
        return response;
      } else {
        // ใช้ API จริง
        const encryptedPassword = this.encryptPassword(credentials.password);
        
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials.username,
            password: encryptedPassword,
            loginType: credentials.loginType,
          }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data: LoginResponse = await response.json();
        
        this.setToken(data.token);
        this.setRefreshToken(data.refreshToken);
        this.setUser(data.user);
        
        return data;
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  }

  // เก็บ JWT token
  setToken(token: string): void {
    Cookies.set(this.TOKEN_KEY, token, { expires: 1 }); // หมดอายุใน 1 วัน
    console.log('💾 Token saved to cookies');
  }

  // ดึง JWT token
  getToken(): string | null {
    const token = Cookies.get(this.TOKEN_KEY) || null;
    console.log('🔍 Token retrieved:', token ? 'exists' : 'not found');
    return token;
  }

  // เก็บ refresh token
  setRefreshToken(refreshToken: string): void {
    Cookies.set(this.REFRESH_TOKEN_KEY, refreshToken, { expires: 7 }); // หมดอายุใน 7 วัน
    console.log('💾 Refresh token saved to cookies');
  }

  // ดึง refresh token
  getRefreshToken(): string | null {
    return Cookies.get(this.REFRESH_TOKEN_KEY) || null;
  }

  // เก็บ user data
  setUser(user: User): void {
    Cookies.set(this.USER_KEY, JSON.stringify(user), { expires: 1 });
    console.log('💾 User data saved:', user);
  }

  // ดึง user data
  getUser(): User | null {
    const userData = Cookies.get(this.USER_KEY);
    const user = userData ? JSON.parse(userData) : null;
    console.log('🔍 User data retrieved:', user);
    return user;
  }

  // ตรวจสอบว่า user login แล้วหรือยัง
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      console.log('❌ No token found');
      return false;
    }

    try {
      // ตรวจสอบว่า token ยังไม่หมดอายุ
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      const isValid = payload.exp > currentTime;
      console.log('🔍 Token validation:', isValid ? 'valid' : 'expired');
      return isValid;
    } catch (error) {
      console.log('❌ Token validation error:', error);
      return false;
    }
  }

  // Logout
  logout(): void {
    console.log('🚪 Logging out...');
    Cookies.remove(this.TOKEN_KEY);
    Cookies.remove(this.REFRESH_TOKEN_KEY);
    Cookies.remove(this.USER_KEY);
    console.log('✅ Logout completed');
  }

  // Refresh token
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return null;

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) return null;

      const data = await response.json();
      this.setToken(data.token);
      return data.token;
    } catch (error) {
      console.error('Refresh token error:', error);
      return null;
    }
  }
}

export const authService = new AuthService();