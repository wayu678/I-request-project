import { useState, useEffect } from "react";
import { useTranslate } from "../../provider/hooks/translate.hook";
import { Row, Col, Input, Card, Radio, DatePicker, Flex } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface PostponeTuitionFormPageProps {
  onFormChange: (data: any) => void;
}

const PostponeTuitionFormPage = ({ onFormChange }: PostponeTuitionFormPageProps) => {
  const { translate } = useTranslate();

  const [formData, setFormData] = useState({
    semesterCode: "",
    academicYear: null as any,
    feeAmount: "",
    hasOutstandingDept: "",
    deptSemesterCode: "",
    deptAcademicYear: null as any,
    deptAmount: "",
    cause: "",
    expectedPayDate: null as any,
    studentCode: "",
    parentPhone: ""
  });

  // ส่ง formData ขึ้น parent ทุกครั้งที่เปลี่ยน
  useEffect(() => {
    onFormChange(formData);
  }, [formData, onFormChange]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderInputField = (label: string, field: string, placeholder: string) => (
    <Flex vertical gap="middle" className="w-full">
      <span className="text-sm font-medium text-gray-700">{label} <span className="text-red-500">*</span></span>
      <Input
        placeholder={placeholder}
        size="large"
        value={(formData as any)[field]}
        onChange={e => handleChange(field, e.target.value)}
      />
    </Flex>
  );

  const renderTextAreaField = (label: string, field: string, placeholder: string) => (
    <Flex vertical gap="middle" className="w-full">
      <span className="text-sm font-medium text-gray-700">{label} <span className="text-red-500">*</span></span>
      <TextArea
        placeholder={placeholder}
        rows={3}
        size="large"
        value={(formData as any)[field]}
        onChange={e => handleChange(field, e.target.value)}
      />
    </Flex>
  );

  const renderRadioField = (label: string, field: string, options: { value: string; text: string }[], vertical = false) => (
    <Flex vertical gap="middle" className="w-full">
      <span className="text-sm font-medium text-gray-700">{label} <span className="text-red-500">*</span></span>
      <Radio.Group
        className={vertical ? "flex flex-col gap-2" : "flex gap-6"}
        size="large"
        value={(formData as any)[field]}
        onChange={e => handleChange(field, e.target.value)}
      >
        {options.map(opt => (
          <Radio key={opt.value} value={opt.value}>{opt.text}</Radio>
        ))}
      </Radio.Group>
    </Flex>
  );

  const renderDatePickerField = (label: string, field: string, placeholder: string, format: string, picker?: "year") => (
    <Flex vertical gap="middle" className="w-full">
      <span className="text-sm font-medium text-gray-700">{label} <span className="text-red-500">*</span></span>
      <DatePicker
        placeholder={placeholder}
        format={format}
        picker={picker}
        suffixIcon={<CalendarOutlined />}
        size="large"
        value={(formData as any)[field]}
        onChange={date => handleChange(field, date)}
      />
    </Flex>
  );

  return (
    <Flex justify="center" align="start" className="w-full mb-6">
      <Card className="w-full max-w-6xl">
        <Row gutter={[24, 12]}>
          <Col span={12}>
            <div className="text-sm font-medium text-gray-700">
              {translate("มีความประสงค์ขอผ่อนผันค่าธรรมเนียมการศึกษา", "Request for postpone tuition and fee payments")}
            </div>
          </Col>

          <Col span={12}></Col>

          <Col span={12}>
            {renderRadioField(translate("ภาค", "Semester"), "semesterCode", [
              { value: "1", text: translate("ต้น", "First") },
              { value: "2", text: translate("ปลาย", "Second") },
              { value: "3", text: translate("ฤดูร้อน", "Summer") },
            ])}
          </Col>
          <Col span={12}>
            {renderDatePickerField(translate("ปีการศึกษา", "Academic Year"), "academicYear", "YYYY", "YYYY", "year")}
          </Col>

          <Col span={12}>
            {renderInputField(translate("จำนวนเงิน", "Amount"), "feeAmount", translate("จำนวนเงิน", "Amount"))}
          </Col>

          <Col span={12}></Col>

          <Col span={12}>
            {renderRadioField(translate("หนี้ค้างชำระ", "Payment Proof"), "hasOutstandingDept", [
              { value: "no", text: translate("ไม่มีหนี้ค้างชำระในภาคการศึกษาที่แล้ว", "No proof") },
              { value: "yes", text: translate("มีหนี้ค้างชำระในภาคการศึกษาที่แล้ว", "Has proof") },
            ], true)}
          </Col>

          <Col span={12}></Col>

          <Col span={12}>
            {renderRadioField(translate("ภาค", "Semester"), "deptSemesterCode", [
              { value: "1", text: translate("ต้น", "First") },
              { value: "2", text: translate("ปลาย", "Second") },
              { value: "3", text: translate("ฤดูร้อน", "Summer") },
            ])}
          </Col>
          <Col span={12}>
            {renderDatePickerField(translate("ปีการศึกษา", "Academic Year"), "deptAcademicYear", "YYYY", "YYYY", "year")}
          </Col>

          <Col span={12}>
            {renderInputField(translate("จำนวนเงิน", "Amount"), "deptAmount", translate("จำนวนเงิน", "Amount"))}
          </Col>

          <Col span={12}></Col>

          <Col span={12}>
            {renderTextAreaField(translate("เนื่องจาก", "Reason"), "cause", translate("เนื่องจาก", "Reason"))}
          </Col>
          <Col span={12}>
            {renderDatePickerField(translate("โดยคาดว่าจะชำระเงินได้ในวันที่", "Expected Payment Date"), "expectedPayDate", "DD/MM/YYYY", "DD/MM/YYYY")}
          </Col>

          <Col span={12}>
            {renderInputField(translate("รหัสนิสิต", "Student Code"), "studentCode", "64XXXXXXXX")}
          </Col>
          <Col span={12}>
            {renderInputField(translate("หมายเลขโทรศัพท์ผู้ปกครอง", "Parent Phone Number"), "parentPhone", "099-999-9999")}
          </Col>
        </Row>
      </Card>
    </Flex>
  );
};

export default PostponeTuitionFormPage;