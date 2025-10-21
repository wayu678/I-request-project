# Dashboard Filter Fix

## ปัญหาที่พบ (Issues Found)

1. **Pie Chart ไม่ได้รับผลกระทบจาก Filter** - `fetchDashboardSummary()` ไม่รับ filter parameters
2. **การจัดการ Form Values** - ไม่มีการกรองค่า null/undefined อย่างถูกต้อง
3. **Pagination ไม่ Reset** - เมื่อ filter เปลี่ยนไม่ reset กลับไปหน้าแรก

## การแก้ไข (Fixes Applied)

### 1. แก้ไข `fetchDashboardSummary()` ใน `src/services/api/dashboard.ts`

```typescript
export async function fetchDashboardSummary(params?: {
  month?: number | null;
  term?: string | null;
  year?: number | null;
  requestType?: string | null;
}): Promise<DashboardSummaryItem[]>;
```

- เพิ่ม optional parameters สำหรับ filter
- สร้าง query parameters เฉพาะค่าที่มีค่าเท่านั้น
- ส่ง parameters ไปยัง API endpoint

### 2. แก้ไข `loadDashboardData()` ใน `src/pages/dashboard/Dashboard.tsx`

```typescript
const filterParams = {
  month: formValues.month || null,
  term: formValues.term || null,
  year: formValues.academicYear || null,
  requestType: formValues.requestType || null,
};

// ส่ง filter parameters ไปยัง summary API
const summaryData = await fetchDashboardSummary(filterParams);
```

- สร้าง filterParams object ที่กรองค่า null/undefined
- ส่ง filter parameters ไปยังทั้ง summary และ table APIs
- เพิ่ม debug logging เพื่อตรวจสอบค่า

### 3. ปรับปรุง Pagination Handling

```typescript
useEffect(() => {
  const subscription = formContext.watch((value) => {
    setCurrentPage(1); // reset หน้าแรกเมื่อ filter เปลี่ยน
    loadDashboardData();
  });
  return () => subscription.unsubscribe();
}, [formContext.watch]);
```

- Reset currentPage เป็น 1 เมื่อ filter เปลี่ยน
- ป้องกันการแสดงข้อมูลผิดหน้า

## การทดสอบ (Testing)

1. **เปิด Developer Console** เพื่อดู debug logs
2. **เปลี่ยนค่า Filter** (เดือน, เทอม, ปีการศึกษา, ประเภทคำร้อง)
3. **ตรวจสอบ Console Logs** ว่า filter parameters ถูกส่งถูกต้อง
4. **ตรวจสอบ Network Tab** ว่า API calls มี query parameters
5. **ตรวจสอบ Pie Chart** ว่าข้อมูลเปลี่ยนตาม filter
6. **ตรวจสอบ Table** ว่าข้อมูลถูก filter และ pagination reset

## API Endpoints ที่ใช้

- `GET /api/dashboard/summary?month=10&term=ภาคต้น&year=2025&requestType=คำร้องทั่วไป`
- `GET /api/dashboard/requests?page=1&pageSize=5&month=10&term=ภาคต้น&year=2025&requestType=คำร้องทั่วไป`

## สิ่งที่ต้องตรวจสอบเพิ่มเติม

1. **Backend API** ต้องรองรับ filter parameters ใน summary endpoint
2. **Database Query** ต้อง filter ข้อมูลตาม parameters ที่ส่งมา
3. **Response Format** ต้องสอดคล้องกับ frontend expectations

## Debug Steps

1. เปิด Browser Developer Tools
2. ไปที่ Console tab
3. เปลี่ยนค่า filter ในหน้า Dashboard
4. ดู console.log('Dashboard filter params:', filterParams)
5. ไปที่ Network tab ตรวจสอบ API calls
6. ตรวจสอบ response data จาก API
