# Backend Integration Configuration

## การแก้ไขเพื่อใช้ Backend Endpoint

### 1. Vite Configuration (vite.config.ts)

เพิ่ม proxy configuration เพื่อ redirect API calls ไปยัง backend:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

### 2. Authentication Service (auth.service.ts)

- ปิดการใช้งาน mock service (`USE_MOCK = false`)
- แก้ไข response format ให้ตรงกับ backend
- ใช้ endpoint `/api/auth/login` และ `/api/auth/refresh-token`

### 3. Token Service (token.service.ts)

- แก้ไข response format ให้รองรับ `accessToken` และ `token`
- ใช้ `/api/user/profile` สำหรับ token validation
- ปรับปรุง error handling

### 4. Profile Service (profile.service.ts)

- เปลี่ยน endpoint จาก `/api/profile` เป็น `/api/user/profile`
- รองรับ response format จาก backend

## API Endpoints ที่ใช้

### Authentication

- `POST /api/auth/login` - เข้าสู่ระบบ
- `POST /api/auth/refresh-token` - ต่ออายุ token

### User Management

- `GET /api/user/profile` - ดึงข้อมูล profile
- `PUT /api/user/profile` - บันทึกข้อมูล profile

## การทดสอบ

1. เริ่มต้น backend service:

   ```bash
   cd project-irequest-service
   npm run dev
   ```

2. เริ่มต้น frontend application:

   ```bash
   cd project-irequest-application
   npm run dev
   ```

3. ทดสอบการ login และการเข้าถึงหน้า Profile

## หมายเหตุ

- Backend ต้องรันอยู่ที่ port 8080
- Frontend จะรันที่ port 5173 (default Vite port)
- Proxy จะ redirect `/api/*` requests ไปยัง backend
