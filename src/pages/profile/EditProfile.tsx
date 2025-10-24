import { Button, Card, message, Flex, Col } from "antd";
import { LogoutOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { profileService, type ProfileData } from "../../services/auth";
import { IreTextbox, IreDisplayField } from "../../components/utils";
import { useTranslate } from "../../provider/hooks/translate.hook";


const EditProfile = () => {
    const navigate = useNavigate();
    const { translate } = useTranslate();
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
            message.error(translate('ไม่สามารถโหลดข้อมูล Profile ได้', 'Unable to load Profile data'));
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
                message.success(translate('บันทึกข้อมูล Profile สำเร็จ', 'Profile data saved successfully'));
                navigate('/profile');
            } else {
                message.error(translate('ไม่สามารถบันทึกข้อมูลได้', 'Unable to save data'));
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            message.error(translate('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'Error occurred while saving data'));
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
                            <span className="text-lg font-normal text-black">{translate('โปรไฟล์', 'Profile')}</span>
                        </Flex>
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            onClick={() => navigate('/login')}
                            className="profile-logout-btn"
                        >
                            {translate('ออกจากระบบ', 'Logout')}
                        </Button>
                    </Flex>
                    <div className="profile-grid">
                        {/* Left Column - Personal and Academic Information */}
                        <Col xs={24} lg={12}>
                            <div className="space-y-6">
                                {/* Row 1 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label={translate("คำนำหน้าชื่อ (TH)", "Title (TH)")}
                                            value={form.watch("titleTH")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label={translate("ชื่อ-นามสกุล (TH)", "Full Name (TH)")}
                                            value={form.watch("fullNameTH")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label={translate("คำนำหน้าชื่อ (EN)", "Title (EN)")}
                                            value={form.watch("titleEN")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label={translate("ชื่อ-นามสกุล (EN)", "Full Name (EN)")}
                                            value={form.watch("fullNameEN")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label={translate("วิทยาเขตสังกัด", "Campus Affiliation")}
                                            value={form.watch("campusAffiliation")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label={translate("ชื่อคณะสังกัด (TH)", "Faculty Name (TH)")}
                                            value={form.watch("facultyTH")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label={translate("ภาควิชา", "Department")}
                                            value={form.watch("department")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label={translate("วิทยาเขต", "Campus")}
                                            value={form.watch("campus")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <IreDisplayField
                                            label={translate("อาจารย์ที่ปรึกษา", "Advisor")}
                                            value={form.watch("advisor")}
                                            showEditIcon={false}
                                        />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <IreDisplayField
                                            label={translate("คณะ", "Faculty")}
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
                                            label={translate("สาขา", "Major")}
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
                                            label={translate("E-mail", "E-mail")}
                                            placeholder="email"
                                            formContext={form}
                                            registerName={form.register("email")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("เบอร์โทรศัพท์", "Phone Number")}
                                            placeholder={translate("Phone number", "Phone number")}
                                            formContext={form}
                                            registerName={form.register("phone")}
                                        />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("บ้านเลขที่", "House Number")}
                                            placeholder={translate("บ้านเลขที่", "House Number")}
                                            formContext={form}
                                            registerName={form.register("houseNo")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("หมู่ที่", "Village Number")}
                                            placeholder={translate("หมู่ที่", "Village Number")}
                                            formContext={form}
                                            registerName={form.register("villageNo")}
                                        />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("อาคาร", "Building")}
                                            placeholder={translate("อาคาร", "Building")}
                                            formContext={form}
                                            registerName={form.register("building")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("ชั้น", "Floor")}
                                            placeholder={translate("ชั้น", "Floor")}
                                            formContext={form}
                                            registerName={form.register("floor")}
                                        />
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("ตรอก/ซอย", "Alley")}
                                            placeholder={translate("ตรอก/ซอย", "Alley")}
                                            formContext={form}
                                            registerName={form.register("alley")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("ถนน", "Street")}
                                            placeholder={translate("ถนน", "Street")}
                                            formContext={form}
                                            registerName={form.register("street")}
                                        />
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("ตำบล/แขวง", "Sub-district")}
                                            placeholder={translate("ตำบล/แขวง", "Sub-district")}
                                            formContext={form}
                                            registerName={form.register("subDistrict")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("อำเภอ/เขต", "District")}
                                            placeholder={translate("อำเภอ/เขต", "District")}
                                            formContext={form}
                                            registerName={form.register("district")}
                                        />
                                    </div>
                                </div>

                                {/* Row 6 */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("จังหวัด", "Province")}
                                            placeholder={translate("จังหวัด", "Province")}
                                            formContext={form}
                                            registerName={form.register("province")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("ประเทศ", "Country")}
                                            placeholder={translate("ประเทศ", "Country")}
                                            formContext={form}
                                            registerName={form.register("country")}
                                        />
                                    </div>
                                </div>

                                {/* Row 7 - Postal Code */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <IreTextbox
                                            label={translate("รหัสไปรษณีย์", "Postal Code")}
                                            placeholder={translate("รหัสไปรษณีย์", "Postal Code")}
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
                    </div>

                </Card >

                {/* Action Buttons outside Card */}
                < div className="profile-actions" >
                    <Button
                        size="large"
                        onClick={handleCancel}
                        className="profile-btn profile-btn-cancel"
                    >
                        {translate('Cancel', 'Cancel')}
                    </Button>
                    <Button
                        size="large"
                        loading={isLoading}
                        onClick={handleSave}
                        className="profile-btn profile-btn-save"
                    >
                        {translate('Save', 'Save')}
                    </Button>
                </div >
            </div >
        </div >
    );
};

export default EditProfile;

