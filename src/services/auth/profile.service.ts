// Profile Service
// ใช้ API โดยตรงแทนการพึ่งพา tokenService และ encryptionService

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
    // ดึงข้อมูล Profile จาก Backend API
    async getProfileData(): Promise<ProfileData | null> {
        try {
            console.log('📋 ProfileService: Loading profile data via API...');

            const response = await fetch('/api/user/profile', {
                method: 'GET',
                credentials: 'include' // ส่ง cookies อัตโนมัติ
            });

            if (!response.ok) {
                console.error('📋 ProfileService: Failed to fetch profile from server');
                return null;
            }

            const data = await response.json();
            console.log('📋 ProfileService: Profile data loaded:', data);
            return data;
        } catch (error) {
            console.error('📋 ProfileService: Failed to get profile data:', error);
            return null;
        }
    }

    // บันทึกข้อมูล Profile ไปยัง Backend API
    async saveProfileData(profileData: ProfileData): Promise<boolean> {
        try {
            console.log('💾 ProfileService: Saving profile data via API...');

            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // ส่ง cookies อัตโนมัติ
                body: JSON.stringify(profileData)
            });

            const success = response.ok;
            console.log('💾 ProfileService: Save result:', success);
            return success;
        } catch (error) {
            console.error('💾 ProfileService: Failed to save profile data:', error);
            return false;
        }
    }

    // แสดงข้อมูล Profile (ใช้ข้อมูลจาก API โดยตรง)
    async getDisplayableProfileData(): Promise<ProfileData | null> {
        try {
            const profileData = await this.getProfileData();
            return profileData;
        } catch (error) {
            console.error('📋 ProfileService: Failed to get displayable profile data:', error);
            return null;
        }
    }
}

export const profileService = new ProfileService();
