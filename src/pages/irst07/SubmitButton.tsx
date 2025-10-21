import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../provider/hooks/translate.hook";
import axios from "axios";

interface SubmitButtonProps {
  formData: any;
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
      const payload = {
        semester_code: formData.semesterCode,
        academic_year: formData.academicYear ? formData.academicYear.format("YYYY") : null,
        fee_amount: parseFloat(formData.feeAmount),
        has_outstanding_dept: formData.hasOutstandingDept,
        dept_semester_code: formData.deptSemesterCode,
        dept_academic_year: formData.deptAcademicYear ? formData.deptAcademicYear.format("YYYY") : null,
        dept_amount: parseFloat(formData.deptAmount),
        cause: formData.cause,
        expected_pay_date: formData.expectedPayDate
          ? formData.expectedPayDate.format("YYYY-MM-DD")
          : null,
        student_code: formData.studentCode,
        parent_phone: formData.parentPhone,
      };

      console.log("Submitting payload to backend:", payload);

      const response = await axios.post("http://localhost:8080/postpone", payload);

      console.log("Server response:", response.data);
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