import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../provider/hooks/translate.hook";
import { useState } from "react";

interface SaveButtonProps {
  studentData?: any;
}

const SaveButton = ({ studentData }: SaveButtonProps) => {
  const navigate = useNavigate();
  const { translate } = useTranslate();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      console.log("Save button clicked", studentData);

      if (!studentData) {
        message.error("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }

      // ตรวจสอบข้อมูลที่จำเป็นสำหรับหน้าแรก
      const requiredFields = ['studentName', 'studentId', 'studentYear', 'faculty', 'major', 'phoneNumber', 'email'];
      const missingFields = requiredFields.filter(field => !studentData[field]);

      if (missingFields.length > 0) {
        message.error(`กรุณากรอกข้อมูลให้ครบถ้วน: ${missingFields.join(', ')}`);
        return;
      }

      // เก็บข้อมูลใน localStorage เท่านั้น (ไม่ส่งไป API)
      localStorage.setItem('studentData', JSON.stringify(studentData));
      console.log('Student data saved to localStorage:', studentData);

      message.success("บันทึกข้อมูลนิสิตเรียบร้อย");
      navigate("/irst07/detail");
    } catch (error) {
      console.error('Error saving data:', error);
      message.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl flex justify-end pr-5">
      <Button
        type="primary"
        size="large"
        onClick={handleSave}
        loading={loading}
        className="rounded-lg"
        style={{
          width: "106px",
          height: "38px",
          backgroundColor: "#339966",
          borderColor: "#339966",
          boxShadow: "none",
        }}
      >
        {translate("บันทึก", "Save")}
      </Button>
    </div>
  );
};

export default SaveButton;
