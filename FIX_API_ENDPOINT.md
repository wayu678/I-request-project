# การแก้ไขปัญหา "Cannot POST /irst07/create-request-post"

## ปัญหาที่พบ (Issue Found)

**Error**: `Cannot POST /irst07/create-request-post`

**สาเหตุ**: API endpoint ใน frontend ไม่ตรงกับ backend routes

## การวิเคราะห์ปัญหา (Problem Analysis)

### Frontend Configuration (เดิม)

```typescript
const configuration = new Configuration({
  basePath: "http://localhost:8080", // ❌ ขาด /api prefix
});
```

### Backend Routes (จริง)

จาก `project-irequest-service/src/routes/routes.ts` บรรทัดที่ 1266:

```typescript
app.post('/api/irst07/create-request-post', ...) // ✅ มี /api prefix
```

## การแก้ไข (Solution)

### 1. แก้ไข basePath ใน postponeTuitionService.ts

```typescript
// สร้าง configuration สำหรับ API
const configuration = new Configuration({
  basePath: "http://localhost:8080/api", // ✅ เพิ่ม /api prefix
});
```

### 2. ตรวจสอบ Backend Server

- Backend server ต้องรันอยู่ที่ `http://localhost:8080`
- API endpoint: `POST /api/irst07/create-request-post`

## การทดสอบ (Testing)

### 1. ทดสอบ Backend API โดยตรง

```bash
curl -X POST http://localhost:8080/api/irst07/create-request-post \
  -H "Content-Type: application/json" \
  -d '{
    "semesterCode": "1",
    "academicYear": 2024,
    "feeAmount": 1000,
    "hasOutstandingDept": "no",
    "cause": "test",
    "expectedPayDate": "2024-12-31T00:00:00.000Z",
    "studentCode": "64000001",
    "parentPhone": "0999999999"
  }'
```

**ผลลัพธ์**: ✅ สำเร็จ - ได้รับ response พร้อม UUID

### 2. ทดสอบจาก Frontend

1. รัน frontend: `npm run dev`
2. ไปที่หน้า IRST07
3. กรอกข้อมูลในฟอร์ม
4. กดปุ่ม "ส่ง"

## ข้อมูลที่จำเป็น (Required Fields)

จาก backend validation:

- `semesterCode`: string
- `academicYear`: number
- `feeAmount`: number
- `hasOutstandingDept`: string
- `cause`: string
- `expectedPayDate`: Date (ISO string)
- `studentCode`: string
- `parentPhone`: string

## ผลลัพธ์ (Results)

✅ **API Endpoint ทำงานได้แล้ว**

- Frontend สามารถเชื่อมต่อกับ backend ได้
- ข้อมูลถูกส่งไปยังฐานข้อมูลสำเร็จ
- ได้รับ response พร้อม UUID สำหรับ tracking

## หมายเหตุ (Notes)

- Backend server ต้องรันอยู่ที่ port 8080
- API base path คือ `/api` ตาม TSOA configuration
- ข้อมูลจะถูกบันทึกลงฐานข้อมูลและได้รับ UUID สำหรับ tracking
