# การเอา Container "มีความประสงค์ขอผ่อนผันค่าธรรมเนียมการศึกษา" ออกจากหน้าสร้างคำร้อง

## การเปลี่ยนแปลง (Changes Made)

### หน้าสร้างคำร้อง (RequestForPostponeTuitionandFeePayments.tsx)

**เอา PostponeTuitionFormPage ออก** จากหน้าสร้างคำร้อง (ขั้นตอนที่ 1)

#### เดิม:

```typescript
{
  /* StudentForm */
}
<StudentForm onFormChange={setStudentData} />;

{
  /* PostponeTuitionFormPage */
}
<PostponeTuitionFormPage
  onFormChange={setPostponeData}
  studentData={studentData}
/>;

{
  /* SubmitButton */
}
<SubmitButton
  formData={{
    ...studentData,
    ...postponeData,
  }}
/>;
```

#### ใหม่:

```typescript
{
  /* StudentForm */
}
<StudentForm onFormChange={setStudentData} />;

{
  /* SaveButton */
}
<SaveButton studentData={studentData} />;
```

### SaveButton.tsx

**อัปเดต SaveButton** เพื่อรับข้อมูลจาก StudentForm และนำไปยังหน้า detail

```typescript
interface SaveButtonProps {
  studentData?: any;
}

const SaveButton = ({ studentData }: SaveButtonProps) => {
  const handleSave = () => {
    console.log("Save button clicked", studentData);
    // ส่งข้อมูลไปยังหน้า detail ผ่าน localStorage
    if (studentData) {
      localStorage.setItem("studentData", JSON.stringify(studentData));
    }
    navigate("/irst07/detail");
  };
  // ...
};
```

## โครงสร้างใหม่ (New Structure)

### ขั้นตอนที่ 1: สร้างคำร้อง

- **แสดงเฉพาะ**: ฟอร์มข้อมูลนิสิต (StudentForm)
- **ปุ่ม**: บันทึก (SaveButton)
- **การทำงาน**: บันทึกข้อมูลนิสิตและนำไปยังขั้นตอนที่ 2

### ขั้นตอนที่ 2: แก้ไขข้อมูลคำร้อง

- **แสดง**: ฟอร์มคำร้องขอผ่อนผันค่าธรรมเนียมการศึกษา (PostponeTuitionFormPage)
- **ปุ่ม**: ส่ง (SubmitButton)
- **การทำงาน**: กรอกข้อมูลคำร้องและส่งไปยัง API

## ผลลัพธ์ (Results)

✅ **หน้าสร้างคำร้องสะอาดขึ้น**

- แสดงเฉพาะข้อมูลนิสิต
- ไม่มีฟอร์มคำร้องขอผ่อนผันค่าธรรมเนียมการศึกษา
- การทำงานชัดเจนขึ้นตามขั้นตอน

✅ **การไหลของข้อมูลดีขึ้น**

- ขั้นตอนที่ 1: กรอกข้อมูลนิสิต → บันทึก
- ขั้นตอนที่ 2: กรอกข้อมูลคำร้อง → ส่ง

## การทดสอบ (Testing)

1. รันแอปพลิเคชัน: `npm run dev`
2. ไปที่หน้า IRST07 (ขั้นตอนที่ 1)
3. กรอกข้อมูลนิสิต
4. กดปุ่ม "บันทึก" → ไปยังหน้า detail (ขั้นตอนที่ 2)
5. กรอกข้อมูลคำร้องขอผ่อนผันค่าธรรมเนียมการศึกษา
6. กดปุ่ม "ส่ง" → ส่งข้อมูลไปยัง API

## หมายเหตุ (Notes)

- Container "มีความประสงค์ขอผ่อนผันค่าธรรมเนียมการศึกษา" ยังคงอยู่ในหน้า detail (ขั้นตอนที่ 2)
- ข้อมูลนิสิตจะถูกส่งผ่าน localStorage จากขั้นตอนที่ 1 ไปยังขั้นตอนที่ 2
- การทำงานของ API ยังคงเหมือนเดิม
