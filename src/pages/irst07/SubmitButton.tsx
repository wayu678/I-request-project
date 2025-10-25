import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../provider/hooks/translate.hook";
import { useState } from "react";
import type { PostponeTuitionFormData } from "../../services/api/postponeTuitionService";
import { processPostponeTuitionData, validateRequiredFields } from "../../utils/dataProcessor";

interface SubmitButtonProps {
  formData: Partial<PostponeTuitionFormData>;
}

const SubmitButton = ({ formData }: SubmitButtonProps) => {
  const navigate = useNavigate();
  const { translate } = useTranslate();
  const [loading, setLoading] = useState(false);

  // ✅ ฟังก์ชันบันทึกข้อมูลเป็นร่าง (ส่งไป backend)
  const handleSave = async () => {
    try {
      setLoading(true);
      console.log("Saving as draft:", formData);

      // โหลดข้อมูลจาก localStorage
      const savedStudentData = localStorage.getItem('studentData');
      let combinedData = { ...formData };

      if (savedStudentData) {
        const studentData = JSON.parse(savedStudentData);
        console.log('Loaded student data from localStorage:', studentData);
        combinedData = {
          ...formData,
          studentCode: formData.studentCode || studentData.studentId || '',
        };
      }

      console.log("Combined data:", combinedData);

      // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
      const missingFields = validateRequiredFields(combinedData);
      console.log("Missing fields:", missingFields);

      if (missingFields.length > 0) {
        message.error(translate(`กรุณากรอกข้อมูลให้ครบถ้วน: ${missingFields.join(', ')}`, "Please fill in all required fields"));
        return;
      }

      // ประมวลผลข้อมูลให้ตรงกับ TSOA schema
      const processedData = processPostponeTuitionData(combinedData);

      console.log("Processed data for API:", processedData);

      // ส่งข้อมูลไปยัง API เพื่อบันทึกลงฐานข้อมูล
      const response = await fetch('/api/irst07/create-request-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // ส่ง cookies อัตโนมัติ
        body: JSON.stringify({
          postponeTuitionFee: processedData
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Request saved successfully:', result);
        message.success(translate("บันทึกคำร้องสำเร็จ", "Saved successfully"));
      } else {
        const error = await response.json();
        console.error('Error saving request:', error);
        message.error(translate(`บันทึกคำร้องไม่สำเร็จ: ${error.message || 'Unknown error'}`, "Save failed"));
      }
    } catch (error) {
      console.error('Error saving request:', error);
      message.error(translate("เกิดข้อผิดพลาดในการบันทึกคำร้อง", "Save error"));
    } finally {
      setLoading(false);
    }
  };

  // ✅ ฟังก์ชันส่งข้อมูลไป backend
  const onSubmit = async () => {
    try {
      setLoading(true);
      console.log("Submitting form data:", formData);

      // โหลดข้อมูลจาก localStorage
      const savedStudentData = localStorage.getItem('studentData');
      let combinedData = { ...formData };

      if (savedStudentData) {
        const studentData = JSON.parse(savedStudentData);
        console.log('Loaded student data from localStorage:', studentData);
        combinedData = {
          ...formData,
          studentCode: formData.studentCode || studentData.studentId || '',
        };
      }

      console.log("Combined data:", combinedData);

      // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
      const missingFields = validateRequiredFields(combinedData);
      console.log("Missing fields:", missingFields);

      if (missingFields.length > 0) {
        message.error(translate(`กรุณากรอกข้อมูลให้ครบถ้วน: ${missingFields.join(', ')}`, "Please fill in all required fields"));
        return;
      }

      // ประมวลผลข้อมูลให้ตรงกับ TSOA schema
      const processedData = processPostponeTuitionData(combinedData);

      console.log("Processed data for API:", processedData);

      // ส่งข้อมูลไปยัง API เพื่อบันทึกลงฐานข้อมูล
      const response = await fetch('/api/irst07/create-request-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // ส่ง cookies อัตโนมัติ
        body: JSON.stringify({
          postponeTuitionFee: processedData
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Request submitted successfully:', result);
        message.success(translate("ส่งข้อมูลเรียบร้อย", "Submit successfully"));
      } else {
        const error = await response.json();
        console.error('Error submitting request:', error);
        message.error(translate(`ส่งข้อมูลไม่สำเร็จ: ${error.message || 'Unknown error'}`, "Submit failed"));
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      message.error(translate("เกิดข้อผิดพลาดในการส่งข้อมูล", "Submit error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl flex justify-end gap-3 pr-5">
      {/* ปุ่มบันทึก */}
      <Button
        type="default"
        size="large"
        onClick={handleSave}
        loading={loading}
        className="rounded-lg"
        style={{
          width: 106,
          height: 38,
          borderColor: "#339966",
          color: "#339966",
        }}
      >
        {translate("บันทึก", "Save")}
      </Button>

      {/* ปุ่มส่ง */}
      <Button
        type="primary"
        size="large"
        onClick={onSubmit}
        loading={loading}
        className="rounded-lg"
        style={{
          width: 106,
          height: 38,
          backgroundColor: "#339966",
          borderColor: "#339966",
          boxShadow: "none",
        }}
      >
        {translate("ส่ง", "Submit")}
      </Button>
    </div>
  );
};

export default SubmitButton;