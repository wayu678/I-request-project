import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../provider/hooks/translate.hook";
import { postponeTuitionService, type PostponeTuitionFormData } from "../../services/api/postponeTuitionService";

interface SubmitButtonProps {
  formData: Partial<PostponeTuitionFormData>;
}

const SubmitButton = ({ formData }: SubmitButtonProps) => {
  const navigate = useNavigate();
  const { translate } = useTranslate();

  // ✅ ฟังก์ชันบันทึกข้อมูลไว้ใน local (ไม่ส่งไป backend)
  const handleSave = () => {
    try {
      console.log("Local save:", formData);
      message.success(translate("บันทึกเรียบร้อย", "Saved successfully"));
    } catch (error: any) {
      console.error(error);
      message.error(translate("เกิดข้อผิดพลาดในการบันทึก", "Save error"));
    }
  };

  // ✅ ฟังก์ชันส่งข้อมูลไป backend
  const onSubmit = async () => {
    try {
      console.log("Submitting form data:", formData);

      // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
      const requiredFields = ['semesterCode', 'academicYear', 'feeAmount', 'hasOutstandingDept', 'cause', 'expectedPayDate', 'studentCode', 'parentPhone'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof PostponeTuitionFormData]);

      if (missingFields.length > 0) {
        message.error(translate("กรุณากรอกข้อมูลให้ครบถ้วน", "Please fill in all required fields"));
        return;
      }

      const response = await postponeTuitionService.createPostponeTuitionRequest(formData as PostponeTuitionFormData);

      console.log("Server response:", response);
      message.success(translate("ส่งข้อมูลเรียบร้อย", "Submit successfully"));
      navigate("/irst07/detail");
    } catch (error: any) {
      console.error("Submit error:", error.response || error);
      message.error(translate("เกิดข้อผิดพลาดในการส่งข้อมูล", "Submit error"));
    }
  };

  return (
    <div className="w-full max-w-6xl flex justify-end gap-3 pr-5">
      {/* ปุ่มบันทึก */}
      <Button
        type="default"
        size="large"
        onClick={handleSave}
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