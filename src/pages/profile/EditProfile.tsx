import { Button, Card, Flex, Row, Col, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { profileService, type ProfileData } from "../../services/auth";
import { IreTextbox, IreDisplayField } from "../../components/utils";


const EditProfile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ProfileData>({
        defaultValues: {
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
            email: "",
            phone: "",
            houseNo: "",
            villageNo: "",
            building: "",
            floor: "",
            alley: "",
            street: "",
            subDistrict: "",
            district: "",
            province: "",
            country: "",
            postalCode: ""
        }
    });

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        try {
            const data = await profileService.getDisplayableProfileData();
            if (data) {
                form.reset(data);
            }
        } catch (error) {
            console.error('Failed to load profile data:', error);
            message.error('ไม่สามารถโหลดข้อมูล Profile ได้');
        }
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const formData = form.getValues();

            // บันทึกข้อมูลผ่าน ProfileService (จะมีการเข้ารหัสอัตโนมัติ)
            const success = await profileService.saveProfileData(formData);

            if (success) {
                message.success('บันทึกข้อมูล Profile สำเร็จ');
                navigate('/profile');
            } else {
                message.error('ไม่สามารถบันทึกข้อมูลได้');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            message.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Edit Form */}
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
                            <span className="text-lg font-normal text-black">Profile</span>
                        </Flex>
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            onClick={() => navigate('/login')}
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
                                            value={form.watch("titleTH")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label="ชื่อ-นามสกุล (TH)"
                                            value={form.watch("fullNameTH")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label="คำนำหน้าชื่อ (EN)"
                                            value={form.watch("titleEN")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label="ชื่อ-นามสกุล (EN)"
                                            value={form.watch("fullNameEN")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label="วิทยาเขตสังกัด"
                                            value={form.watch("campusAffiliation")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label="ชื่อคณะสังกัด (TH)"
                                            value={form.watch("facultyTH")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label="ภาควิชา"
                                            value={form.watch("department")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label="วิทยาเขต"
                                            value={form.watch("campus")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label="อาจารย์ที่ปรึกษา"
                                            value={form.watch("advisor")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label="คณะ"
                                            value={form.watch("faculty")}
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
                                            value={form.watch("major")}
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
                                        <IreTextbox
                                            label="E-mail"
                                            placeholder="email"
                                            formContext={form}
                                            registerName={form.register("email")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="เบอร์โทรศัพท์"
                                            placeholder="Phone number"
                                            formContext={form}
                                            registerName={form.register("phone")}
                                        />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="บ้านเลขที่"
                                            placeholder="บ้านเลขที่"
                                            formContext={form}
                                            registerName={form.register("houseNo")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="หมู่ที่"
                                            placeholder="หมู่ที่"
                                            formContext={form}
                                            registerName={form.register("villageNo")}
                                        />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="อาคาร"
                                            placeholder="อาคาร"
                                            formContext={form}
                                            registerName={form.register("building")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="ชั้น"
                                            placeholder="ชั้น"
                                            formContext={form}
                                            registerName={form.register("floor")}
                                        />
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="ตรอก/ซอย"
                                            placeholder="ตรอก/ซอย"
                                            formContext={form}
                                            registerName={form.register("alley")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="ถนน"
                                            placeholder="ถนน"
                                            formContext={form}
                                            registerName={form.register("street")}
                                        />
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="ตำบล/แขวง"
                                            placeholder="ตำบล/แขวง"
                                            formContext={form}
                                            registerName={form.register("subDistrict")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="อำเภอ/เขต"
                                            placeholder="อำเภอ/เขต"
                                            formContext={form}
                                            registerName={form.register("district")}
                                        />
                                    </div>
                                </div>

                                {/* Row 6 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="จังหวัด"
                                            placeholder="จังหวัด"
                                            formContext={form}
                                            registerName={form.register("province")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="ประเทศ"
                                            placeholder="ประเทศ"
                                            formContext={form}
                                            registerName={form.register("country")}
                                        />
                                    </div>
                                </div>

                                {/* Row 7 - Postal Code */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label="รหัสไปรษณีย์"
                                            placeholder="รหัสไปรษณีย์"
                                            formContext={form}
                                            registerName={form.register("postalCode")}
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

                {/* Action Buttons outside Card */}
                <Flex justify="end" gap={12} style={{ marginTop: '20px' }}>
                    <Button
                        size="large"
                        onClick={handleCancel}
                        className="px-8 py-2 h-auto rounded-lg min-w-[100px]"
                        style={{
                            color: '#339966',
                            backgroundColor: 'white',
                            borderColor: '#339966',
                            borderWidth: '1px'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="large"
                        loading={isLoading}
                        onClick={handleSave}
                        className="px-8 py-2 h-auto rounded-lg min-w-[100px]"
                        style={{
                            color: 'white',
                            backgroundColor: '#339966',
                            borderColor: '#339966'
                        }}
                    >
                        Save
                    </Button>
                </Flex>
            </div>
        </div>
    );
};

export default EditProfile;
