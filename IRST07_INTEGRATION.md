# IRST07 Postpone Tuition Fee Payment Integration

## ภาพรวม (Overview)

ระบบนี้ได้ถูกเชื่อมต่อกับ IRST07PostponeTuitionFeePaymentRequestApi เพื่อส่งข้อมูลคำร้องขอผ่อนผันค่าธรรมเนียมการศึกษาไปยังฐานข้อมูล

## การเปลี่ยนแปลงที่สำคัญ (Key Changes)

### 1. สร้าง Service Layer

- **ไฟล์**: `src/services/api/postponeTuitionService.ts`
- **หน้าที่**: จัดการการเรียกใช้ API และแปลงข้อมูลให้ตรงกับ interface ที่ต้องการ

### 2. อัปเดต Components

#### StudentForm

- เพิ่ม props `onFormChange` เพื่อส่งข้อมูลไปยัง parent component
- เพิ่ม `useEffect` เพื่อส่งข้อมูลทุกครั้งที่มีการเปลี่ยนแปลง

#### PostponeTuitionFormPage

- เพิ่ม props `studentData` เพื่อรับข้อมูลจาก StudentForm
- เพิ่ม props `onFormChange` เพื่อส่งข้อมูลไปยัง parent component

#### RequestForPostponeTuitionandFeePayments

- เพิ่ม state management สำหรับเก็บข้อมูลจากฟอร์มต่างๆ
- เชื่อมต่อ StudentForm และ PostponeTuitionFormPage เข้าด้วยกัน
- ส่งข้อมูลรวมไปยัง SubmitButton

#### SubmitButton

- เปลี่ยนจากการใช้ axios เป็นการใช้ postponeTuitionService
- ใช้ TypeScript interface สำหรับ type safety

## การใช้งาน (Usage)

### 1. กรอกข้อมูลในฟอร์ม

- กรอกข้อมูลนิสิตใน StudentForm
- กรอกข้อมูลคำร้องใน PostponeTuitionFormPage

### 2. ส่งข้อมูล

- กดปุ่ม "บันทึก" เพื่อบันทึกข้อมูลใน local storage
- กดปุ่ม "ส่ง" เพื่อส่งข้อมูลไปยังฐานข้อมูลผ่าน API

## API Endpoint

- **URL**: `http://localhost:8080/irst07/create-request-post`
- **Method**: POST
- **Content-Type**: application/json

## ข้อมูลที่ส่ง (Data Structure)

```typescript
interface PostponeTuitionFormData {
  // ข้อมูลจาก StudentForm
  studentName: string;
  studentYear: string;
  major: string;
  email: string;
  studentId: string;
  faculty: string;
  phoneNumber: string;

  // ข้อมูลจาก PostponeTuitionFormPage
  semesterCode: string;
  academicYear: any;
  feeAmount: string;
  hasOutstandingDept: string;
  deptSemesterCode: string;
  deptAcademicYear: any;
  deptAmount: string;
  cause: string;
  expectedPayDate: any;
  studentCode: string;
  parentPhone: string;
}
```

## การทดสอบ (Testing)

1. รันแอปพลิเคชัน: `npm run dev`
2. ไปที่หน้า IRST07
3. กรอกข้อมูลในฟอร์ม
4. กดปุ่ม "ส่ง" เพื่อทดสอบการเชื่อมต่อ API

## หมายเหตุ (Notes)

- ระบบจะแสดงข้อความสำเร็จเมื่อส่งข้อมูลสำเร็จ
- หากเกิดข้อผิดพลาด จะแสดงข้อความ error และ log ใน console
- ข้อมูลจะถูกแปลงให้ตรงกับ PostponeTuitionFee interface ก่อนส่งไปยัง API
