import { Button, Card, Spin, Flex, Col } from "antd";
import { LogoutOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IreDisplayField } from "../../components/utils";
import { useTranslate } from "../../provider/hooks/translate.hook";
import { useAuth } from "../../contexts/AuthContext";

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
    const { logout } = useAuth();
    const { translate } = useTranslate();
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
            <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
                <Card className="shadow-sm">
                    <div className="text-center">
                        <div className="text-lg text-gray-700 mb-4">{translate('ไม่สามารถโหลดข้อมูล Profile ได้', 'Unable to load Profile data')}</div>
                        <Button
                            type="primary"
                            onClick={loadProfileData}
                            className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                        >
                            {translate('ลองใหม่', 'Try Again')}
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Profile Content */}
                <Card className="shadow-sm mb-6">
                    {/* Header inside Card */}
                    <Flex align="center" justify="space-between" className="mb-8">
                        <Flex align="center">
                            <div className="flex items-center mr-3">
                                <div className="flex flex-col mr-1.5">
                                    <div className="w-0.5 h-0.5 bg-black mb-0.5"></div>
                                    <div className="w-0.5 h-0.5 bg-black mb-0.5"></div>
                                    <div className="w-0.5 h-0.5 bg-black"></div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="w-2 h-0.5 bg-black mb-0.5"></div>
                                    <div className="w-2 h-0.5 bg-black mb-0.5"></div>
                                    <div className="w-2 h-0.5 bg-black"></div>
                                </div>
                            </div>
                            <span className="text-lg font-normal text-black">{translate('โปรไฟล์', 'Profile')}</span>
                        </Flex>
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700"
                        >
                            {translate('ออกจากระบบ', 'Logout')}
                        </Button>
                    </Flex>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column - Personal and Academic Information */}
                        <Col xs={24} lg={12}>
                            <div className="space-y-6">
                                {/* Row 1 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label={translate("คำนำหน้าชื่อ (TH)", "Title (TH)")}
                                            value={profileData.titleTH}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label={translate("ชื่อ-นามสกุล (TH)", "Full Name (TH)")}
                                            value={profileData.fullNameTH}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label={translate("คำนำหน้าชื่อ (EN)", "Title (EN)")}
                                            value={profileData.titleEN}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label={translate("ชื่อ-นามสกุล (EN)", "Full Name (EN)")}
                                            value={profileData.fullNameEN}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label={translate("วิทยาเขตสังกัด", "Campus Affiliation")}
                                            value={profileData.campusAffiliation}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label={translate("ชื่อคณะสังกัด (TH)", "Faculty Name (TH)")}
                                            value={profileData.facultyTH}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label={translate("ภาควิชา", "Department")}
                                            value={profileData.department}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label={translate("วิทยาเขต", "Campus")}
                                            value={profileData.campus}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label={translate("อาจารย์ที่ปรึกษา", "Advisor")}
                                            value={profileData.advisor}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label={translate("คณะ", "Faculty")}
                                            value={profileData.faculty}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 6 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        {/* Empty space */}
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label={translate("สาขา", "Major")}
                                            value={profileData.major}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Right Column - Contact and Address Information */}
                        <Col xs={24} lg={12}>
                            <div className="space-y-6">
                                {/* Row 1 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("E-mail", "E-mail")}
                                            value={profileData.email}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("เบอร์โทรศัพท์", "Phone Number")}
                                            value={profileData.phone}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("บ้านเลขที่", "House Number")}
                                            value={profileData.houseNo}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("หมู่ที่", "Village Number")}
                                            value={profileData.villageNo}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("อาคาร", "Building")}
                                            value={profileData.building}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("ชั้น", "Floor")}
                                            value={profileData.floor}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("ตรอก/ซอย", "Alley")}
                                            value={profileData.alley}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("ถนน", "Street")}
                                            value={profileData.street}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("ตำบล/แขวง", "Sub-district")}
                                            value={profileData.subDistrict}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("อำเภอ/เขต", "District")}
                                            value={profileData.district}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 6 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("จังหวัด", "Province")}
                                            value={profileData.province}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("ประเทศ", "Country")}
                                            value={profileData.country}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 7 - Postal Code */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label={translate("รหัสไปรษณีย์", "Postal Code")}
                                            value={profileData.postalCode}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        {/* Empty space to match layout */}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </div>

                </Card>

                {/* Edit Button outside Card */}
                <div className="flex justify-end">
                    <Button
                        size="large"
                        onClick={handleEditAll}
                        className="bg-white text-cyan-600 border-cyan-600 hover:bg-cyan-50 hover:border-cyan-700 rounded-lg px-8 py-2 font-medium transition-all duration-200"
                    >
                        {translate('แก้ไขทั้งหมด', 'Edit All')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

