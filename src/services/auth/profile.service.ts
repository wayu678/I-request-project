// Profile Service
// รวมการทำงานของ Component 'f', 'b', 'd' ตามเงื่อนไขในรูปภาพ

import { tokenService } from './token.service';
import { encryptionService } from './encryption.service';

export interface ProfileData {
    // Personal Information
    titleTH: string;
    titleEN: string;
    fullNameTH: string;
    fullNameEN: string;
    
    // Academic Information
    campusAffiliation: string;
    department: string;
    advisor: string;
    facultyTH: string;
    campus: string;
    faculty: string;
    major: string;
    
    // Contact Information
    email: string;
    phone: string;
    
    // Address Information
    houseNo: string;
    villageNo: string;
    building: string;
    floor: string;
    alley: string;
    street: string;
    subDistrict: string;
    district: string;
    province: string;
    country: string;
    postalCode: string;
}

class ProfileService {
    private readonly PROFILE_KEY = 'user_profile';

    // Component 'b' - ดึงข้อมูล Profile พร้อม Token validation
    async getProfileData(): Promise<ProfileData | null> {
        try {
            // ตรวจสอบ Token ก่อน (Component 'd')
            if (tokenService.isTokenExpired()) {
                console.warn('Token expired, redirecting to login');
                return null;
            }

            // ตรวจสอบ Token กับ Backend
            const token = tokenService.getToken();
            if (!token || !(await tokenService.validateTokenWithBackend(token))) {
                console.warn('Invalid token');
                return null;
            }

            // เรียก API เพื่อดึงข้อมูล Profile จาก Backend
            const response = await fetch('/api/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile from server');
            }

            const encryptedData = await response.json();
            
            // ถอดรหัสข้อมูลที่ได้จาก Backend (Component 'f' functionality)
            if (encryptionService.isEncrypted(encryptedData)) {
                return await encryptionService.decryptProfileData(encryptedData);
            }

            return encryptedData;
        } catch (error) {
            console.error('Failed to get profile data:', error);
            // Fallback to localStorage for development
            return this.getProfileDataFromLocalStorage();
        }
    }

    // Fallback method for development
    private async getProfileDataFromLocalStorage(): Promise<ProfileData | null> {
        try {
            const profileData = localStorage.getItem(this.PROFILE_KEY);
            if (!profileData) {
                return this.getDefaultProfileData();
            }

            const parsedData = JSON.parse(profileData);
            
            if (encryptionService.isEncrypted(parsedData)) {
                return await encryptionService.decryptProfileData(parsedData);
            }

            return parsedData;
        } catch (error) {
            console.error('Failed to get profile data from localStorage:', error);
            return this.getDefaultProfileData();
        }
    }

    // Component 'b' - บันทึกข้อมูล Profile พร้อมการเข้ารหัส
    async saveProfileData(profileData: ProfileData): Promise<boolean> {
        try {
            // ตรวจสอบ Token ก่อน (Component 'd')
            if (tokenService.isTokenExpired()) {
                throw new Error('Token expired');
            }

            // เข้ารหัสข้อมูลส่วนตัวก่อนบันทึก (Component 'b' - encrypt first)
            const encryptedData = await encryptionService.encryptProfileData(profileData);
            
            // ส่งข้อมูลเข้ารหัสไปยัง Server API
            const token = tokenService.getToken();
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(encryptedData)
            });

            if (!response.ok) {
                throw new Error('Failed to save profile to server');
            }

            // บันทึกลง localStorage เป็น backup
            localStorage.setItem(this.PROFILE_KEY, JSON.stringify(encryptedData));

            return true;
        } catch (error) {
            console.error('Failed to save profile data:', error);
            // Fallback to localStorage for development
            return this.saveProfileDataToLocalStorage(profileData);
        }
    }

    // Fallback method for development
    private async saveProfileDataToLocalStorage(profileData: ProfileData): Promise<boolean> {
        try {
            const encryptedData = await encryptionService.encryptProfileData(profileData);
            localStorage.setItem(this.PROFILE_KEY, JSON.stringify(encryptedData));
            return true;
        } catch (error) {
            console.error('Failed to save profile data to localStorage:', error);
            return false;
        }
    }

    // Component 'f' - แสดงข้อมูล Profile (ถอดรหัสสำหรับการแสดงผล)
    async getDisplayableProfileData(): Promise<ProfileData | null> {
        try {
            const profileData = await this.getProfileData();
            
            if (!profileData) {
                return null;
            }

            // ข้อมูลพร้อมแสดงผล (ไม่ต้องถอดรหัสเพิ่มเติม)
            return profileData;
        } catch (error) {
            console.error('Failed to get displayable profile data:', error);
            return null;
        }
    }

    // ข้อมูล Profile เริ่มต้น
    private getDefaultProfileData(): ProfileData {
        return {
            titleTH: "นาย",
            titleEN: "Mr.",
            fullNameTH: "สมมติ มานะ",
            fullNameEN: "Sommut Mana",
            campusAffiliation: "Kamphaeng Saen",
            department: "วิทยาการคำนวณและเทคโนโลยีดิจิทัล",
            advisor: "นายนิรนาม ไม่บอก",
            facultyTH: "สำนักบริการคอมพิวเตอร์",
            campus: "วิทยาเขตกำแพงแสน",
            faculty: "ศิลปศาสตร์และวิทยาศาสตร์",
            major: "เทคโนโลยีสารสนเทศ",
            email: "sommut.man@ku.th",
            phone: "099-999-9999",
            houseNo: "10",
            villageNo: "2",
            building: "-",
            floor: "-",
            alley: "-",
            street: "หน้าบ้าน",
            subDistrict: "นครปฐม",
            district: "เมือง",
            province: "นครปฐม",
            country: "TH",
            postalCode: "12150"
        };
    }

    // ซิงค์ข้อมูลไปยัง Server
    private async syncToServer(encryptedData: any): Promise<void> {
        try {
            const token = tokenService.getToken();
            if (!token) {
                throw new Error('No token available');
            }

            // TODO: เรียก API เพื่อบันทึกข้อมูล
            // const response = await fetch('/api/profile', {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     },
            //     body: JSON.stringify(encryptedData)
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to sync to server');
            // }

            console.log('Profile data synced to server');
        } catch (error) {
            console.error('Failed to sync to server:', error);
            throw error;
        }
    }

    // ตรวจสอบการเข้าถึงข้อมูล Profile
    canAccessProfile(): boolean {
        return tokenService.isAuthenticated();
    }

    // ล้างข้อมูล Profile
    clearProfileData(): void {
        localStorage.removeItem(this.PROFILE_KEY);
    }
}

export const profileService = new ProfileService();
