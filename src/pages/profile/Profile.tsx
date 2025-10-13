import { Button, Card, Flex, Row, Col, Spin } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileService, type ProfileData } from "../../services/auth";
import { useAuth } from "../../contexts/AuthContext";
import { IreDisplayField } from "../../components/utils";



const Profile = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        try {
            setLoading(true);
            const data = await profileService.getDisplayableProfileData();
            setProfileData(data);
        } catch (error) {
            console.error('Failed to load profile data:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleEditAll = () => {
        navigate('/profile/edit');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
                <Card>
                    <div className="text-center">
                        <div className="text-lg text-gray-700 mb-4">ไม่สามารถโหลดข้อมูล Profile ได้</div>
                        <Button
                            type="primary"
                            onClick={loadProfileData}
                            style={{ boxShadow: 'none' }}
                        >
                            ลองใหม่
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
                <Card className="shadow-sm p-8">
                    {/* Header inside Card */}
                    <Flex align="center" justify="space-between" style={{ marginBottom: '30px' }}>
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
                            <span className="text-lg font-normal text-black" style={{ fontWeight: 'normal', fontSize: '18px' }}>Profile</span>
                        </Flex>
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700"
                        >
                            ออกจากระบบ
                        </Button>
                    </Flex>
                    <Row gutter={[48, 32]}>
                        {/* Left Column - Personal and Academic Information */}
                        <Col xs={24} lg={12}>
                            <div className="space-y-6">
                                {/* Row 1 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label="คำนำหน้าชื่อ (TH)"
                                            value={profileData.titleTH}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label="ชื่อ-นามสกุล (TH)"
                                            value={profileData.fullNameTH}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label="คำนำหน้าชื่อ (EN)"
                                            value={profileData.titleEN}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label="ชื่อ-นามสกุล (EN)"
                                            value={profileData.fullNameEN}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label="วิทยาเขตสังกัด"
                                            value={profileData.campusAffiliation}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label="ชื่อคณะสังกัด (TH)"
                                            value={profileData.facultyTH}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label="ภาควิชา"
                                            value={profileData.department}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label="วิทยาเขต"
                                            value={profileData.campus}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label="อาจารย์ที่ปรึกษา"
                                            value={profileData.advisor}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label="คณะ"
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
                                            label="สาขา"
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
                                            label="E-mail"
                                            value={profileData.email}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="เบอร์โทรศัพท์"
                                            value={profileData.phone}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="บ้านเลขที่"
                                            value={profileData.houseNo}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="หมู่ที่"
                                            value={profileData.villageNo}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="อาคาร"
                                            value={profileData.building}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="ชั้น"
                                            value={profileData.floor}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="ตรอก/ซอย"
                                            value={profileData.alley}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="ถนน"
                                            value={profileData.street}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="ตำบล/แขวง"
                                            value={profileData.subDistrict}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="อำเภอ/เขต"
                                            value={profileData.district}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 6 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="จังหวัด"
                                            value={profileData.province}
                                            showEditIcon={true}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="ประเทศ"
                                            value={profileData.country}
                                            showEditIcon={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 7 - Postal Code */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreDisplayField
                                            label="รหัสไปรษณีย์"
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
                    </Row>

                </Card>

                {/* Edit Button outside Card */}
                <Flex justify="end" style={{ marginTop: '20px' }}>
                    <Button
                        size="large"
                        onClick={handleEditAll}
                        className="px-8 py-2 h-auto rounded-lg min-w-[100px]"
                        style={{
                            color: '#17A2B8',
                            backgroundColor: 'white',
                            borderColor: '#17A2B8',
                            borderWidth: '1px',
                            boxShadow: 'none'
                        }}
                    >
                        Edit
                    </Button>
                </Flex>
            </div>
        </div>
    );
};

export default Profile;
