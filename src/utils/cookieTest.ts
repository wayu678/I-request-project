
import {
    getCookie,
    setCookie,
    deleteCookie,
    hasAccessToken,
    hasRefreshToken,
    isLoggedIn,
    getAccessToken,
    getRefreshToken,
    clearAuthCookies,
    debugCookies
} from '../utils/cookieUtils';


export const testCookieUtils = () => {
    console.log("=== Testing Cookie Utilities ===");

    // ทดสอบการตั้งค่า cookie
    console.log("1. Testing setCookie...");
    setCookie('testCookie', 'testValue', 1);

    // ทดสอบการอ่าน cookie
    console.log("2. Testing getCookie...");
    const testValue = getCookie('testCookie');
    console.log('Test cookie value:', testValue);

    // ทดสอบการตรวจสอบ authentication cookies
    console.log("3. Testing authentication cookies...");
    console.log('Has access token:', hasAccessToken());
    console.log('Has refresh token:', hasRefreshToken());
    console.log('Is logged in:', isLoggedIn());

    // ทดสอบการอ่าน tokens
    console.log("4. Testing token reading...");
    console.log('Access token:', getAccessToken());
    console.log('Refresh token:', getRefreshToken());

    // แสดงข้อมูล cookies ทั้งหมด
    console.log("5. All cookies debug info:");
    debugCookies();

    // ลบ test cookie
    console.log("6. Cleaning up test cookie...");
    deleteCookie('testCookie');

    console.log("=== Cookie Utilities Test Complete ===");
};

/**
 * ทดสอบการทำงานของ cookies หลังจาก login
 * Test cookie functionality after login
 */
export const testAfterLogin = () => {
    console.log("=== Post-Login Cookie Test ===");

    // ตรวจสอบสถานะการ login
    if (isLoggedIn()) {
        console.log("✅ User is logged in");
        console.log("Access token:", getAccessToken());
        console.log("Refresh token:", getRefreshToken());
    } else {
        console.log("❌ User is not logged in");
    }

    // แสดงข้อมูล cookies ทั้งหมด
    debugCookies();

    console.log("=== Post-Login Test Complete ===");
};

/**
 * ทดสอบการลบ cookies (สำหรับ logout)
 * Test cookie deletion (for logout)
 */
export const testLogout = () => {
    console.log("=== Testing Logout (Cookie Deletion) ===");

    console.log("Before logout:");
    debugCookies();

    // ลบ authentication cookies
    clearAuthCookies();

    console.log("After logout:");
    debugCookies();

    console.log("=== Logout Test Complete ===");
};

// Export functions สำหรับใช้ใน console
(window as any).testCookieUtils = testCookieUtils;
(window as any).testAfterLogin = testAfterLogin;
(window as any).testLogout = testLogout;
(window as any).debugCookies = debugCookies;

console.log("Cookie testing functions loaded!");
console.log("Available functions:");
console.log("- testCookieUtils() - Test all cookie utilities");
console.log("- testAfterLogin() - Test cookies after login");
console.log("- testLogout() - Test cookie deletion");
console.log("- debugCookies() - Show all cookie debug info");
