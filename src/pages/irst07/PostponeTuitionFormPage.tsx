import { useEffect, useState } from "react";
import { useTranslate } from "../../provider/hooks/translate.hook";
import { Row, Col } from "antd";
import { useForm } from "react-hook-form";
import { IreTextbox, IreTextarea, IreRadioButton, IreCalendar, IreUpload } from "../../components/utils";

interface PostponeTuitionFormPageProps {
  onFormChange: (data: any) => void;
  studentData?: any; // ข้อมูลจาก StudentForm
}

const PostponeTuitionFormPage = ({ onFormChange, studentData }: PostponeTuitionFormPageProps) => {
  const { translate } = useTranslate();
  const [hasOutstandingDebt, setHasOutstandingDebt] = useState("no");

  const formContext = useForm({
    defaultValues: {
      semesterCode: "1", // ต้น
      academicYear: null,
      feeAmount: "",
      hasOutstandingDept: "no", // ไม่มีหนี้ค้างชำระในภาคการศึกษาที่แล้ว
      cause: "",
      expectedPayDate: null,
      studentCode: "",
      parentPhone: "",
      guardianConsentFile: null,
      // ฟิลด์เพิ่มเติมสำหรับหนี้ค้างชำระ
      deptSemesterCode: "1", // ภาคสำหรับหนี้ค้างชำระ
      deptAmount: "", // จำนวนเงินหนี้ค้างชำระ
      deptAcademicYear: null // ปีการศึกษาสำหรับหนี้ค้างชำระ
    }
  });

  // ดึงข้อมูล user จาก JWT token และ localStorage เมื่อ component mount
  useEffect(() => {
    // โหลดข้อมูลจาก localStorage ก่อน
    const savedStudentData = localStorage.getItem('studentData');
    if (savedStudentData) {
      const studentData = JSON.parse(savedStudentData);
      console.log('Loaded student data from localStorage:', studentData);

      // เติมข้อมูลจากหน้าแรก
      formContext.setValue('studentCode', studentData.studentId || '');
    }

    // ดึงข้อมูล user จาก JWT token
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/auth/current-user', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('Current user data:', userData);

          // เติมข้อมูล student จาก JWT token (ถ้ามี)
          const currentStudentCode = formContext.getValues('studentCode');
          if (!currentStudentCode) {
            formContext.setValue('studentCode', userData.studentCode || userData.username || '');
          }
        } else {
          console.log('Failed to fetch current user data');
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  // ติดตามการเปลี่ยนแปลงของฟิลด์หนี้ค้างชำระ
  useEffect(() => {
    const subscription = formContext.watch((value) => {
      if (value.hasOutstandingDept !== hasOutstandingDebt) {
        setHasOutstandingDebt(value.hasOutstandingDept);
      }
    });
    return () => subscription.unsubscribe();
  }, [formContext.watch, hasOutstandingDebt]);

  // ส่ง formData ขึ้น parent ทุกครั้งที่เปลี่ยน
  useEffect(() => {
    const subscription = formContext.watch((value) => {
      onFormChange(value);
    });
    return () => subscription.unsubscribe();
  }, [formContext.watch, onFormChange]);

  return (
    <div className="bg-white rounded-lg">
      <div className="p-5">
        <Row gutter={[24, 16]}>
          {/* หัวข้อหลัก */}
          <Col span={24}>
            <div className="text-sm font-medium text-black mb-1">
              {translate("มีความประสงค์ขอผ่อนผันค่าธรรมเนียมการศึกษา", "Request for postpone tuition and fee payments")}
            </div>
          </Col>

          {/* แถวที่ 1: ภาค และ ปีการศึกษา */}
          <Col span={12}>
            <IreRadioButton
              label={translate("ภาค", "Semester")}
              formContext={formContext}
              registerName={formContext.register('semesterCode')}
              options={[
                { label: translate("ต้น", "First"), value: "1" },
                { label: translate("ปลาย", "Second"), value: "2" },
                { label: translate("ฤดูร้อน", "Summer"), value: "3" },
              ]}
              isRequired={true}
            />
          </Col>
          <Col span={12}>
            <IreCalendar
              label={translate("ปีการศึกษา", "Academic Year")}
              formContext={formContext}
              registerName={formContext.register('academicYear')}
              placeholder="YYYY"
              format="YYYY"
              picker="year"
              widthFull={true}
              isRequired={true}
            />
          </Col>

          {/* แถวที่ 2: จำนวนเงิน */}
          <Col span={12}>
            <IreTextbox
              label={translate("จำนวนเงิน", "Amount")}
              formContext={formContext}
              registerName={formContext.register('feeAmount')}
              placeholder={translate("จำนวนเงิน", "Amount")}
              isRequired={true}
              formatType="currency"
            />
          </Col>
          <Col span={12}>
            <div></div>
          </Col>

          {/* แถวที่ 3: หนี้ค้างชำระ */}
          <Col span={12}>
            <IreRadioButton
              label={translate("หนี้ค้างชำระ", "Outstanding Debt")}
              formContext={formContext}
              registerName={formContext.register('hasOutstandingDept')}
              options={[
                { label: translate("ไม่มีหนี้ค้างชำระในภาคการศึกษาที่แล้ว", "No outstanding debt from the previous semester"), value: "no" },
                { label: translate("มีหนี้ค้างชำระในภาคการศึกษาที่แล้ว", "Has outstanding debt from the previous semester"), value: "yes" },
              ]}
              direction="vertical"
              isRequired={true}
            />
          </Col>
          <Col span={12}>
            <div></div>
          </Col>

          {/* ฟิลด์เพิ่มเติมสำหรับหนี้ค้างชำระ - แสดงเฉพาะเมื่อเลือก "มีหนี้ค้างชำระ" */}
          {hasOutstandingDebt === "yes" && (
            <>
              {/* แถวที่ 4: ภาค และ ปีการศึกษาสำหรับหนี้ค้างชำระ */}
              <Col span={12}>
                <IreRadioButton
                  label={translate("ภาค", "Term")}
                  formContext={formContext}
                  registerName={formContext.register('deptSemesterCode')}
                  options={[
                    { label: translate("ต้น", "First"), value: "1" },
                    { label: translate("ปลาย", "Second"), value: "2" },
                    { label: translate("ฤดูร้อน", "Summer"), value: "3" },
                  ]}
                  isRequired={true}
                />
              </Col>
              <Col span={12}>
                <IreCalendar
                  label={translate("ปีการศึกษา", "Academic Year")}
                  formContext={formContext}
                  registerName={formContext.register('deptAcademicYear')}
                  placeholder="YYYY"
                  format="YYYY"
                  picker="year"
                  widthFull={true}
                  isRequired={true}
                />
              </Col>

              {/* แถวที่ 5: จำนวนเงินสำหรับหนี้ค้างชำระ และ ว่าง */}
              <Col span={12}>
                <IreTextbox
                  label={translate("จำนวนเงิน", "Amount")}
                  formContext={formContext}
                  registerName={formContext.register('deptAmount')}
                  placeholder={translate("จำนวน", "Amount")}
                  isRequired={true}
                  formatType="currency"
                />
              </Col>
              <Col span={12}>
                <div></div>
              </Col>
            </>
          )}

          {/* แถวที่ 4: เนื่องจาก และ วันที่คาดว่าจะชำระ */}
          <Col span={12}>
            <IreTextbox
              label={translate("เนื่องจาก", "Reason")}
              formContext={formContext}
              registerName={formContext.register('cause')}
              placeholder={translate("เนื่องจาก", "Reason")}
              isRequired={true}
            />
          </Col>
          <Col span={12}>
            <IreCalendar
              label={translate("โดยคาดว่าจะชำระเงินได้ในวันที่", "Expected Payment Date")}
              formContext={formContext}
              registerName={formContext.register('expectedPayDate')}
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              widthFull={true}
              isRequired={true}
            />
          </Col>

          {/* แถวที่ 5: หมายเลขโทรศัพท์ผู้ปกครอง */}
          <Col span={12}>
            <IreTextbox
              label={translate("หมายเลขโทรศัพท์ผู้ปกครอง", "Guardian's Phone Number")}
              formContext={formContext}
              registerName={formContext.register('parentPhone')}
              placeholder="099-999-9999"
              isRequired={false}
              formatType="phone"
            />
          </Col>
          <Col span={12}>
            <div></div>
          </Col>

          {/* แถวที่ 6: แนบหนังสือคำยินยอมผู้ปกครอง */}
          <Col span={12}>
            <IreUpload
              label={translate("แนบหนังสือคำยินยอมผู้ปกครอง", "Attach Guardian's Consent Letter")}
              formContext={formContext}
              registerName={formContext.register('guardianConsentFile')}
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize={5}
              isRequired={false}
            />
          </Col>
          <Col span={12}>
            <div></div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PostponeTuitionFormPage;