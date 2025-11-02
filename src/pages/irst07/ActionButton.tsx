import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../provider/hooks/translate.hook";
import { useState } from "react";
import type { PostponeTuitionFormData } from "../../services/api/postponeTuitionService";
import { validateRequiredFields } from "../../utils/dataProcessor";
import { postponeTuitionService } from "../../services/api/postponeTuitionService";

interface ActionButtonProps {
    formData?: Partial<PostponeTuitionFormData>;
    studentData?: any;
    mode: "save" | "submit";
}

const ActionButton = ({ formData, studentData, mode }: ActionButtonProps) => {
    const navigate = useNavigate();
    const { translate } = useTranslate();
    const [loading, setLoading] = useState(false);


    // ฟังก์ชันบันทึกข้อมูลนิสิต (หน้าแรก)
    const handleSaveStudentData = async () => {
        try {
            setLoading(true);
            console.log("Save student data:", studentData);

            if (!studentData) {
                message.error("กรุณากรอกข้อมูลให้ครบถ้วน");
                return;
            }

            const requiredFields = ['studentName', 'studentId', 'faculty', 'major', 'phoneNumber', 'email'];
            const missingFields = requiredFields.filter(field => !studentData[field]);

            if (missingFields.length > 0) {
                message.error(`กรุณากรอกข้อมูลให้ครบถ้วน: ${missingFields.join(', ')}`);
                return;
            }

            localStorage.setItem('studentData', JSON.stringify(studentData));
            console.log('Student data saved to localStorage:', studentData);

            message.success("บันทึกข้อมูลนิสิตเรียบร้อย");
            navigate("/irst07/postpone-tuition-and-fee-payments/detail");
        } catch (error) {
            console.error('Error saving data:', error);
            message.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        } finally {
            setLoading(false);
        }
    };

    // ฟังก์ชันร่วมสำหรับบันทึกและส่งคำร้อง
    const handleRequest = async (action: 'save' | 'submit') => {
        try {
            setLoading(true);
            console.log(`${action === 'save' ? 'Saving' : 'Submitting'} form data:`, formData);

            // โหลดข้อมูลจาก localStorage
            const savedStudentData = localStorage.getItem('studentData');
            let combinedData = { ...formData };

            if (savedStudentData) {
                const studentData = JSON.parse(savedStudentData);
                console.log('Loaded student data from localStorage:', studentData);
                combinedData = {
                    ...formData,
                    studentCode: formData?.studentCode || studentData.studentId || '',
                    studentName: formData?.studentName || studentData.studentName || '',
                    studentYear: formData?.studentYear || studentData.studentYear || '',
                    faculty: formData?.faculty || studentData.faculty || '',
                    major: formData?.major || studentData.major || '',
                    email: formData?.email || studentData.email || '',
                    phoneNumber: formData?.phoneNumber || studentData.phoneNumber || '',
                };
            }

            console.log("Combined data:", combinedData);

            // ตรวจสอบข้อมูล
            const missingFields = validateRequiredFields(combinedData);
            console.log("Missing fields:", missingFields);

            if (missingFields.length > 0) {
                message.error(translate(`กรุณากรอกข้อมูลให้ครบถ้วน: ${missingFields.join(', ')}`, "Please fill in all required fields"));
                return;
            }

            // เรียก API service
            const response = await postponeTuitionService.createPostponeTuitionRequest(combinedData as PostponeTuitionFormData);
            console.log("API Response:", response);

            // ตรวจสอบ response และแสดงข้อความสำเร็จ
            message.success(
                translate(
                    action === 'save' ? "บันทึกคำร้องเรียบร้อย" : "ส่งคำร้องเรียบร้อย",
                    action === 'save' ? "Request saved successfully" : "Request submitted successfully"
                )
            );

            // อาจจะต้องการ navigate ไปหน้าอื่นหรือ refresh หลังจากส่งสำเร็จ
            // navigate("/irst07/postpone-tuition-and-fee-payments/list");
        } catch (error: any) {
            console.error(`Error ${action}ing request:`, error);

            const errorMessage = action === 'save'
                ? translate(`บันทึกคำร้องไม่สำเร็จ: ${error?.message || 'Unknown error'}`, "Save failed")
                : translate(`ส่งข้อมูลไม่สำเร็จ: ${error?.message || 'Unknown error'}`, "Submit failed");
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // กำหนดการทำงานตามโหมด
    const handleAction = () => {
        if (mode === "save") {
            if (studentData) {
                handleSaveStudentData();
            } else if (formData) {
                handleRequest('save');
            }
        } else if (mode === "submit") {
            handleRequest('submit');
        }
    };

    // สร้างปุ่มตามโหมด
    const renderButton = (buttonMode: 'save' | 'submit', onClick: () => void, variant: 'primary' | 'outline') => {
        const isPrimary = variant === 'primary';
        const buttonClass = isPrimary
            ? "h-[38px] w-[106px] rounded-lg bg-[#339966] border border-[#339966] text-white font-medium hover:bg-[#2d8555] transition-colors flex items-center justify-center"
            : "h-[38px] w-[106px] rounded-lg border border-[#339966] text-[#339966] bg-white font-medium hover:bg-[#f0f9f4] transition-colors flex items-center justify-center";

        return (
            <button
                onClick={onClick}
                disabled={loading}
                className={buttonClass}
            >
                {loading ? "Loading..." : translate(
                    buttonMode === 'save' ? "บันทึก" : "ส่ง",
                    buttonMode === 'save' ? "Save" : "Submit"
                )}
            </button>
        );
    };

    // แสดงปุ่มตามโหมด
    if (mode === "save") {
        return (
            <div className="flex justify-end">
                {renderButton('save', handleAction, 'primary')}
            </div>
        );
    }

    // โหมด submit แสดงปุ่ม 2 ปุ่ม
    return (
        <div className="flex justify-end gap-3">
            {renderButton('save', () => handleRequest('save'), 'outline')}
            {renderButton('submit', () => handleRequest('submit'), 'primary')}
        </div>
    );
};

export default ActionButton;
