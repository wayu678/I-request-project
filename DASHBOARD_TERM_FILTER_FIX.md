# Dashboard Term Filter Fix

## ปัญหาที่พบ (Issues Found)

**ปัญหาหลัก: Filter เทอมไม่ทำงาน**

1. **Frontend ส่ง filter parameters** แต่ **Backend ไม่รับ**
2. **`/api/dashboard/summary` endpoint** ไม่มี query parameters สำหรับ filter
3. **`DashboardService.getSummary()`** ไม่รับ filter parameters
4. **`DashboardServiceImpl.getSummary()`** ไม่มี filter logic

## การแก้ไข (Fixes Applied)

### 1. แก้ไข Frontend (`project-irequest-application`)

#### `src/services/api/dashboard.ts`

```typescript
export async function fetchDashboardSummary(params?: {
  month?: number | null;
  term?: string | null;
  year?: number | null;
  requestType?: string | null;
}): Promise<DashboardSummaryItem[]>;
```

#### `src/pages/dashboard/Dashboard.tsx`

```typescript
// เพิ่ม debug logging
console.log("Dashboard form values:", formValues);
console.log("Dashboard filter params:", filterParams);
console.log("Term value specifically:", formValues.term);

// ส่ง filter parameters ไปยัง summary API
const summaryData = await fetchDashboardSummary(filterParams);
```

### 2. แก้ไข Backend (`project-irequest-service`)

#### `src/controllers/DashboardController.ts`

```typescript
@Get("/summary")
@Security("cookieAuth")
public async getSummary(
    @Request() request: any,
    @Query() month?: number,
    @Query() term?: string,
    @Query() year?: number,
    @Query() requestType?: string,
): Promise<DashboardSummaryItem[]>
```

#### `src/services/DashboardService.ts`

```typescript
export interface DashboardService {
  getSummary(
    userId: number,
    params?: {
      month?: number;
      term?: string;
      year?: number;
      requestType?: string;
    }
  ): Promise<DashboardSummaryItem[]>;
}
```

#### `src/services/implements/DashboardServiceImpl.ts`

```typescript
async getSummary(userId: number, params?: {
    month?: number;
    term?: string;
    year?: number;
    requestType?: string;
}): Promise<DashboardSummaryItem[]> {
    // เพิ่ม filter logic
    if (params?.year) {
        qb.andWhere('p.academicYear = :year', { year: params.year });
    }
    if (params?.term) {
        qb.andWhere('p.semesterCode = :term', { term: params.term });
    }
    if (params?.requestType) {
        qb.andWhere('h.requestTypeCode = :requestType', { requestType: params.requestType });
    }
    if (params?.month) {
        qb.andWhere('EXTRACT(MONTH FROM h.createdDate) = :month', { month: params.month });
    }
}
```

## การทดสอบ (Testing)

### 1. Frontend Testing

1. เปิด Browser Developer Tools (F12)
2. ไปที่ Console tab
3. เปลี่ยนค่า filter เทอมในหน้า Dashboard
4. ตรวจสอบ console logs:
   - `Dashboard form values:`
   - `Dashboard filter params:`
   - `Term value specifically:`

### 2. Backend Testing

1. ตรวจสอบ Network tab ใน Developer Tools
2. ดู API calls:
   - `GET /api/dashboard/summary?term=ภาคต้น`
   - `GET /api/dashboard/requests?term=ภาคต้น`
3. ตรวจสอบ response data

### 3. Database Testing

ตรวจสอบ SQL query ที่ถูกสร้าง:

```sql
SELECT h.documentStatus, COUNT(*) as count
FROM request_header h
LEFT JOIN postpone_tuition_fee_payments_request p ON p.id = h.requestId
WHERE h.student_id = 2
  AND p.semesterCode = 'ภาคต้น'  -- filter เทอม
GROUP BY h.documentStatus
```

## API Endpoints ที่อัปเดต

### Summary Endpoint

- **Before:** `GET /api/dashboard/summary`
- **After:** `GET /api/dashboard/summary?month=10&term=ภาคต้น&year=2025&requestType=คำร้องทั่วไป`

### Requests Endpoint

- **Before:** `GET /api/dashboard/requests?page=1&pageSize=5`
- **After:** `GET /api/dashboard/requests?page=1&pageSize=5&month=10&term=ภาคต้น&year=2025&requestType=คำร้องทั่วไป`

## สิ่งที่ต้องตรวจสอบเพิ่มเติม

1. **Database Schema** - ตรวจสอบว่า `semesterCode` field มีข้อมูลถูกต้อง
2. **Data Mapping** - ตรวจสอบการ map ระหว่าง frontend values และ database values
3. **Error Handling** - เพิ่ม error handling สำหรับกรณีที่ไม่มีข้อมูล

## Debug Commands

### Frontend

```bash
cd project-irequest-application
npm run dev
```

### Backend

```bash
cd project-irequest-service
npm run build
npm start
```

## Expected Results

หลังจากการแก้ไข:

1. **Pie Chart** จะแสดงข้อมูลตาม filter เทอมที่เลือก
2. **Table** จะแสดงข้อมูลที่ถูก filter ตามเทอม
3. **Console Logs** จะแสดงค่า filter parameters ที่ถูกส่ง
4. **Network Requests** จะมี query parameters สำหรับเทอม

## Troubleshooting

หากยังมีปัญหา:

1. ตรวจสอบ console logs ใน frontend
2. ตรวจสอบ server logs ใน backend
3. ตรวจสอบ database data ใน `semesterCode` field
4. ตรวจสอบ network requests ใน Developer Tools
