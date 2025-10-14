/**
 * Cookie utility functions สำหรับจัดการ cookies
 * Cookie utility functions for managing cookies
 */

/**
 * อ่านค่า cookie ตามชื่อ
 * Get cookie value by name
 * @param name ชื่อ cookie
 * @returns ค่า cookie หรือ null ถ้าไม่พบ
 */
export const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
};

/**
 * ตั้งค่า cookie
 * Set cookie value
 * @param name ชื่อ cookie
 * @param value ค่า cookie
 * @param days จำนวนวันที่ cookie จะหมดอายุ (default: 7 วัน)
 */
export const setCookie = (name: string, value: string, days: number = 7): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

/**
 * ลบ cookie
 * Delete cookie
 * @param name ชื่อ cookie ที่ต้องการลบ
 */
export const deleteCookie = (name: string): void => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/**
 * ตรวจสอบว่ามี access token ใน cookie หรือไม่
 * Check if access token exists in cookies
 * @returns true ถ้ามี access token, false ถ้าไม่มี
 */
export const hasAccessToken = (): boolean => {
    return getCookie('accessToken') !== null;
};

/**
 * ตรวจสอบว่ามี refresh token ใน cookie หรือไม่
 * Check if refresh token exists in cookies
 * @returns true ถ้ามี refresh token, false ถ้าไม่มี
 */
export const hasRefreshToken = (): boolean => {
    return getCookie('refreshToken') !== null;
};

/**
 * ตรวจสอบว่าผู้ใช้ login อยู่หรือไม่
 * Check if user is logged in
 * @returns true ถ้า login อยู่, false ถ้าไม่ได้ login
 */
export const isLoggedIn = (): boolean => {
    return hasAccessToken() && hasRefreshToken();
};

/**
 * อ่าน access token จาก cookie
 * Get access token from cookie
 * @returns access token หรือ null
 */
export const getAccessToken = (): string | null => {
    return getCookie('accessToken');
};

/**
 * อ่าน refresh token จาก cookie
 * Get refresh token from cookie
 * @returns refresh token หรือ null
 */
export const getRefreshToken = (): string | null => {
    return getCookie('refreshToken');
};

/**
 * ลบ cookies ทั้งหมดที่เกี่ยวข้องกับ authentication
 * Clear all authentication related cookies
 */
export const clearAuthCookies = (): void => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
};

/**
 * แสดงข้อมูล cookies ทั้งหมด (สำหรับ debugging)
 * Display all cookies (for debugging)
 */
export const debugCookies = (): void => {
    console.log('All cookies:', document.cookie);
    console.log('Access token:', getAccessToken());
    console.log('Refresh token:', getRefreshToken());
    console.log('Is logged in:', isLoggedIn());
};
