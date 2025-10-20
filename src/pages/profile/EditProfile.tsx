import { Button, Card, message } from "antd";
import { LogoutOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { profileService, type ProfileData } from "../../services/auth";
import { IreTextbox, IreDisplayField } from "../../components/utils";
import "./profile.css";


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
        <div className="profile-container">
            <div className="profile-content-wrapper">
                {/* Edit Form */}
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
                            onClick={() => navigate('/login')}
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
                                        value={form.watch("titleTH")}
                                        showEditIcon={false}
                                    />
                                </div>
                                <div className="profile-field-half profile-field-half-right">
                                    <IreDisplayField
                                        label="ชื่อ-นามสกุล (TH)"
                                        value={form.watch("fullNameTH")}
                                        showEditIcon={false}
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="profile-field-row-half">
                                <div className="profile-field-half profile-field-half-left">
                                    <IreDisplayField
                                        label="คำนำหน้าชื่อ (EN)"
                                        value={form.watch("titleEN")}
                                        showEditIcon={false}
                                    />
                                </div>
                                <div className="profile-field-half profile-field-half-right">
                                    <IreDisplayField
                                        label="ชื่อ-นามสกุล (EN)"
                                        value={form.watch("fullNameEN")}
                                        showEditIcon={false}
                                    />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="profile-field-row-half">
                                <div className="profile-field-half profile-field-half-left">
                                    <IreDisplayField
                                        label="วิทยาเขตสังกัด"
                                        value={form.watch("campusAffiliation")}
                                        showEditIcon={false}
                                    />
                                </div>
                                <div className="profile-field-half profile-field-half-right">
                                    <IreDisplayField
                                        label="ชื่อคณะสังกัด (TH)"
                                        value={form.watch("facultyTH")}
                                        showEditIcon={false}
                                    />
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="profile-field-row-half">
                                <div className="profile-field-half profile-field-half-left">
                                    <IreDisplayField
                                        label="ภาควิชา"
                                        value={form.watch("department")}
                                        showEditIcon={false}
                                    />
                                </div>
                                <div className="profile-field-half profile-field-half-right">
                                    <IreDisplayField
                                        label="วิทยาเขต"
                                        value={form.watch("campus")}
                                        showEditIcon={false}
                                    />
                                </div>
                            </div>

                            {/* Row 5 */}
                            <div className="profile-field-row-half">
                                <div className="profile-field-half profile-field-half-left">
                                    <IreDisplayField
                                        label="อาจารย์ที่ปรึกษา"
                                        value={form.watch("advisor")}
                                        showEditIcon={false}
                                    />
                                </div>
                                <div className="profile-field-half profile-field-half-right">
                                    <IreDisplayField
                                        label="คณะ"
                                        value={form.watch("faculty")}
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
                                        value={form.watch("major")}
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
                                    <IreTextbox
                                        label="E-mail"
                                        placeholder="email"
                                        formContext={form}
                                        registerName={form.register("email")}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="เบอร์โทรศัพท์"
                                        placeholder="Phone number"
                                        formContext={form}
                                        registerName={form.register("phone")}
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="บ้านเลขที่"
                                        placeholder="บ้านเลขที่"
                                        formContext={form}
                                        registerName={form.register("houseNo")}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="หมู่ที่"
                                        placeholder="หมู่ที่"
                                        formContext={form}
                                        registerName={form.register("villageNo")}
                                    />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="อาคาร"
                                        placeholder="อาคาร"
                                        formContext={form}
                                        registerName={form.register("building")}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="ชั้น"
                                        placeholder="ชั้น"
                                        formContext={form}
                                        registerName={form.register("floor")}
                                    />
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="ตรอก/ซอย"
                                        placeholder="ตรอก/ซอย"
                                        formContext={form}
                                        registerName={form.register("alley")}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="ถนน"
                                        placeholder="ถนน"
                                        formContext={form}
                                        registerName={form.register("street")}
                                    />
                                </div>
                            </div>

                            {/* Row 5 */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="ตำบล/แขวง"
                                        placeholder="ตำบล/แขวง"
                                        formContext={form}
                                        registerName={form.register("subDistrict")}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="อำเภอ/เขต"
                                        placeholder="อำเภอ/เขต"
                                        formContext={form}
                                        registerName={form.register("district")}
                                    />
                                </div>
                            </div>

                            {/* Row 6 */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="จังหวัด"
                                        placeholder="จังหวัด"
                                        formContext={form}
                                        registerName={form.register("province")}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="ประเทศ"
                                        placeholder="ประเทศ"
                                        formContext={form}
                                        registerName={form.register("country")}
                                    />
                                </div>
                            </div>

                            {/* Row 7 - Postal Code */}
                            <div className="profile-field-row">
                                <div className="profile-field-full">
                                    <IreTextbox
                                        label="รหัสไปรษณีย์"
                                        placeholder="รหัสไปรษณีย์"
                                        formContext={form}
                                        registerName={form.register("postalCode")}
                                    />
                                </div>
                                <div className="profile-field-full">
                                    {/* Empty space to match layout */}
                                </div>
                            </div>
                        </div>
                    </div>

                </Card>

                {/* Action Buttons outside Card */}
                <div className="profile-actions">
                    <Button
                        size="large"
                        onClick={handleCancel}
                        className="profile-btn profile-btn-cancel"
                    >
                        Cancel
                    </Button>
                    <Button
                        size="large"
                        loading={isLoading}
                        onClick={handleSave}
                        className="profile-btn profile-btn-save"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

