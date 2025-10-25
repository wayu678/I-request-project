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
    // ตรวจสอบสถานะ profile
    async getProfileStatus(): Promise<{ hasProfile: boolean; studentId?: number }> {
        try {
            console.log('📋 ProfileService: Checking profile status...');

            const response = await fetch('/api/student/profile/status', {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                console.error('📋 ProfileService: Failed to check profile status');
                return { hasProfile: false };
            }

            const data = await response.json();
            console.log('📋 ProfileService: Profile status:', data);

            return {
                hasProfile: data.hasProfile,
                studentId: data.studentId
            };
        } catch (error) {
            console.error('📋 ProfileService: Failed to get profile status:', error);
            return { hasProfile: false };
        }
    }

    // ดึงข้อมูล Profile จาก Backend API
    async getProfileData(): Promise<ProfileData | null> {
        try {
            console.log('📋 ProfileService: Loading profile data via API...');

            const response = await fetch('/api/student/profile', {
                method: 'GET',
                credentials: 'include' // ส่ง cookies อัตโนมัติ
            });

            if (!response.ok) {
                console.error('📋 ProfileService: Failed to fetch profile from server');
                return null;
            }

            const data = await response.json();
            console.log('📋 ProfileService: Profile data loaded:', data);

            // แปลงข้อมูลจาก StudentResponse เป็น ProfileData
            return {
                // Personal Information (ต้องดึงจาก master data)
                titleTH: 'นาย',
                titleEN: 'Mr.',
                fullNameTH: 'สมมติ มานะ',
                fullNameEN: 'Sommut Mana',

                // Academic Information
                campusAffiliation: data.campusCode || '',
                department: data.departmentCode || '',
                advisor: data.advisorCode || '',
                facultyTH: data.facultyCode || '',
                campus: data.campusCode || '',
                faculty: data.facultyCode || '',
                major: data.majorCode || '',

                // Contact Information
                email: data.email || '',
                phone: data.phone || '',

                // Address Information (ต้องดึงจาก address table)
                houseNo: '',
                villageNo: '',
                building: '',
                floor: '',
                alley: '',
                street: '',
                subDistrict: '',
                district: '',
                province: '',
                country: '',
                postalCode: ''
            };
        } catch (error) {
            console.error('📋 ProfileService: Failed to get profile data:', error);
            return null;
        }
    }

    // บันทึกข้อมูล Profile ไปยัง Backend API
    async saveProfileData(profileData: ProfileData): Promise<boolean> {
        try {
            console.log('💾 ProfileService: Saving profile data via API...');

            const response = await fetch('/api/student/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // ส่ง cookies อัตโนมัติ
                body: JSON.stringify({
                    phone: profileData.phone
                })
            });

            const success = response.ok;
            console.log('💾 ProfileService: Save result:', success);
            return success;
        } catch (error) {
            console.error('💾 ProfileService: Failed to save profile data:', error);
            return false;
        }
    }

    // สร้างข้อมูล Profile ใหม่
    async createProfileData(profileData: ProfileData): Promise<boolean> {
        try {
            console.log('💾 ProfileService: Creating profile data via API...');

            const response = await fetch('/api/student/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    studentCode: `STU${Date.now()}`,
                    campusCode: profileData.campusAffiliation,
                    facultyCode: profileData.faculty,
                    majorCode: profileData.major,
                    departmentCode: profileData.department,
                    phone: profileData.phone,
                    section: 'ภาคปกติ',
                    advisorCode: profileData.advisor,
                    studentStatusId: 1 // Default status
                })
            });

            const success = response.ok;
            console.log('💾 ProfileService: Create result:', success);
            return success;
        } catch (error) {
            console.error('💾 ProfileService: Failed to create profile data:', error);
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
