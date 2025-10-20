import { Button, Card, Spin } from "antd";
import { LogoutOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IreDisplayField } from "../../components/utils";

interface ProfileData {
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



const Profile = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        try {
            setLoading(true);
            console.log('📋 Profile: Loading profile data via API...');

            const response = await fetch('/api/user/profile', {
                method: 'GET',
                credentials: 'include' // ส่ง cookies อัตโนมัติ
            });

            if (response.ok) {
                const data = await response.json();
                console.log('📋 Profile: Profile data loaded:', data);
                setProfileData(data);
            } else {
                console.error('📋 Profile: Failed to load profile data');
                setProfileData(null);
            }
        } catch (error) {
            console.error('📋 Profile: Failed to load profile data:', error);
            setProfileData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleEditAll = () => {
        navigate('/profile/edit');
    };

    const handleLogout = async () => {
        try {
            console.log('🚪 Profile: Starting logout...');

            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include' // ส่ง cookies อัตโนมัติ
            });

            console.log('🚪 Profile: Logout successful');
            navigate('/login');
        } catch (error) {
            console.error('🚪 Profile: Logout failed:', error);
            navigate('/login');
        }
    };


    if (loading) {
        return (
            <div className="profile-loading-container">
                <Spin size="large" />
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="profile-error-container">
                <Card className="profile-error-card">
                    <div className="profile-error-content">
                        <div className="profile-error-text">ไม่สามารถโหลดข้อมูล Profile ได้</div>
                        <Button
                            type="primary"
                            onClick={loadProfileData}
                            className="profile-btn profile-btn-primary profile-retry-btn"
                        >
                            ลองใหม่
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-content-wrapper">
                {/* Profile Content */}
                <Card className="profile-card">
                    {/* Header inside Card */}
                    <div className="profile-header">
                        <div className="profile-title-section">
                            <UnorderedListOutlined className="profile-title-icon" />
                            <span className="profile-title-text">Profile</span>
                        </div>
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            className="profile-logout-btn"
                        >
                            ออกจากระบบ
                        </Button>
                    </div>
                    <div className="profile-grid">
                        {/* Left Column - Personal and Academic Information */}
                        <div className="profile-section">
                            {/* Row 1 */}
                            <div className="profile-field-row-half">
                                <div className="profile-field-half profile-field-half-left">
                                    <IreDisplayField
                                        label="คำนำหน้าชื่อ (TH)"
                                        value={profileData.titleTH}
                                        showEditIcon={false}
                                    />
                                </div>
                                <div className="profile-field-half profile-field-half-right">
                                    <IreDisplayField
                                        label="ชื่อ-นามสกุล (TH)"
                                        value={profileData.fullNameTH}
                                        showEditIcon={false}
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="profile-field-row-half">
                                <div className="profile-field-half profile-field-half-left">
                                    <IreDisplayField
                                        label="คำนำหน้าชื่อ (EN)"
                                        value={profileData.titleEN}
                                        showEditIcon={false}
                                    />
                                </div>
                                <div className="profile-field-half profile-field-half-right">
                                    <IreDisplayField
                                        label="ชื่อ-นามสกุล (EN)"
                                        value={profileData.fullNameEN}
                                        showEditIcon={false}
                                    />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="profile-field-row-half">
                                <div className="profile-field-half profile-field-half-left">
                                    <IreDisplayField
                                        label="วิทยาเขตสังกัด"
                                        value={profileData.campusAffiliation}
                                        showEditIcon={false}
                                    />
                                </div>
                                <div className="profile-field-half profile-field-half-right">
                                    <IreDisplayField
                                        label="ชื่อคณะสังกัด (TH)"
                                        value={profileData.facultyTH}
                                        showEditIcon={false}
                                    />
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="profile-field-row-half">
                                <div className="profile-field-half profile-field-half-left">
                                    <IreDisplayField
                                        label="ภาควิชา"
                                        value={profileData.department}
                                        showEditIcon={false}
                                    />
                                </div>
                                <div className="profile-field-half profile-field-half-right">
                                    <IreDisplayField
                                        label="วิทยาเขต"
                                        value={profileData.campus}
                                        showEditIcon={false}
                                    />
                                </div>
                            </div>

                            {/* Row 5 */}
                            <div className="profile-field-row-half">
                                <div className="profile-field-half profile-field-half-left">
                                    <IreDisplayField
                                        label="อาจารย์ที่ปรึกษา"
                                        value={profileData.advisor}
                                        showEditIcon={false}
                                    />
                                </div>
                                <div className="profile-field-half profile-field-half-right">
                                    <IreDisplayField
                                        label="คณะ"
                                        value={profileData.faculty}
                                        showEditIcon={false}
                                    />
                                </div>
                            </div>

                            {/* Row 6 */}
                            <div className="profile-field-row-half">
                                <div className="profile-field-half profile-field-half-left">
                                    {/* Empty space */}
                                </div>
                                <div className="profile-field-half profile-field-half-right">
                                    <IreDisplayField
                                        label="สาขา"
                                        value={profileData.major}
                                        showEditIcon={false}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Contact and Address Information */}
                        <div className="profile-section">
                            {/* Row 1 */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="E-mail"
                                        value={profileData.email}
                                        showEditIcon={true}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="เบอร์โทรศัพท์"
                                        value={profileData.phone}
                                        showEditIcon={true}
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="บ้านเลขที่"
                                        value={profileData.houseNo}
                                        showEditIcon={true}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="หมู่ที่"
                                        value={profileData.villageNo}
                                        showEditIcon={true}
                                    />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="อาคาร"
                                        value={profileData.building}
                                        showEditIcon={true}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="ชั้น"
                                        value={profileData.floor}
                                        showEditIcon={true}
                                    />
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="ตรอก/ซอย"
                                        value={profileData.alley}
                                        showEditIcon={true}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="ถนน"
                                        value={profileData.street}
                                        showEditIcon={true}
                                    />
                                </div>
                            </div>

                            {/* Row 5 */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="ตำบล/แขวง"
                                        value={profileData.subDistrict}
                                        showEditIcon={true}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="อำเภอ/เขต"
                                        value={profileData.district}
                                        showEditIcon={true}
                                    />
                                </div>
                            </div>

                            {/* Row 6 */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="จังหวัด"
                                        value={profileData.province}
                                        showEditIcon={true}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="ประเทศ"
                                        value={profileData.country}
                                        showEditIcon={true}
                                    />
                                </div>
                            </div>

                            {/* Row 7 - Postal Code */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreDisplayField
                                        label="รหัสไปรษณีย์"
                                        value={profileData.postalCode}
                                        showEditIcon={true}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    {/* Empty space to match layout */}
                                </div>
                            </div>
                        </div>
                    </div>

                </Card>

                {/* Edit Button outside Card */}
                <div className="profile-actions">
                    <Button
                        size="large"
                        onClick={handleEditAll}
                        className="profile-btn profile-btn-edit"
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

