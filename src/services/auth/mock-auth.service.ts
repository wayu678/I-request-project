// Types สำหรับ Mock Auth Service
export interface LoginRequest {
  username: string;
  password: string;
  loginType: 'admin' | 'user';
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    role: string;
    loginType: 'admin' | 'user';
  };
}

// Mock API สำหรับทดสอบ
export class MockAuthService {
  // จำลองการ login
  async mockLogin(credentials: LoginRequest): Promise<LoginResponse> {
    // จำลองการตรวจสอบ credentials
    if (credentials.username === 'admin' && credentials.password === 'password') {
      // สร้าง mock JWT token
      const mockToken = this.createMockJWT({
        id: '1',
        username: credentials.username,
        role: credentials.loginType === 'admin' ? 'admin' : 'user',
        loginType: credentials.loginType
      });

      const mockRefreshToken = this.createMockJWT({
        id: '1',
        type: 'refresh'
      });

      const user = {
        id: '1',
        username: credentials.username,
        role: credentials.loginType === 'admin' ? 'admin' : 'user',
        loginType: credentials.loginType
      };

      return {
        token: mockToken,
        refreshToken: mockRefreshToken,
        user
      };
    } else if (credentials.username === 'user' && credentials.password === 'user123') {
      // Mock สำหรับ user login
      const mockToken = this.createMockJWT({
        id: '2',
        username: credentials.username,
        role: 'user',
        loginType: credentials.loginType
      });

      const mockRefreshToken = this.createMockJWT({
        id: '2',
        type: 'refresh'
      });

      const user = {
        id: '2',
        username: credentials.username,
        role: 'user',
        loginType: credentials.loginType
      };

      return {
        token: mockToken,
        refreshToken: mockRefreshToken,
        user
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  // สร้าง mock JWT token
  private createMockJWT(payload: any): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const tokenPayload = {
      ...payload,
      iat: now,
      exp: now + (24 * 60 * 60) // หมดอายุใน 24 ชั่วโมง
    };

    // Encode header และ payload
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(tokenPayload));
    
    // สร้าง signature (mock)
    const signature = btoa('mock-signature');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
}

export const mockAuthService = new MockAuthService();
