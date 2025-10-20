# การแก้ไขให้ใช้ระบบ Authentication ของ Backend เท่านั้น

## สรุปการเปลี่ยนแปลง

### **ไฟล์ที่ลบออก:**

- `src/services/auth/token.service.ts` - ลบทั้งหมด
- `src/services/auth/auth.service.ts` - ลบทั้งหมด
- `src/services/auth/mock-auth.service.ts` - ลบทั้งหมด
- `src/services/auth/encryption.service.ts` - ลบทั้งหมด

### **ไฟล์ที่แก้ไข:**

#### **1. `src/services/auth/index.ts`**

```typescript
// เดิม
export { tokenService } from "./token.service";
export { encryptionService } from "./encryption.service";
export { profileService } from "./profile.service";

// ใหม่
export { profileService } from "./profile.service";
```

#### **2. `src/contexts/AuthContext.tsx`**

- ลบการ import `tokenService` และ `profileService`
- เปลี่ยน `checkAuth()` ให้ใช้ API call แทน localStorage
- เปลี่ยน `login()` ให้ใช้ API call แทน token management
- เปลี่ยน `logout()` ให้ใช้ API call แทน localStorage

```typescript
// ตรวจสอบ authentication ผ่าน API
const checkAuth = async (): Promise<boolean> => {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include", // ส่ง cookies อัตโนมัติ
  });
  return response.ok;
};

// Login ผ่าน API
const login = async (username: string, password: string): Promise<boolean> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include", // ส่ง cookies อัตโนมัติ
  });
  return response.ok;
};

// Logout ผ่าน API
const logout = async (): Promise<void> => {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};
```

#### **3. `src/pages/login/Login.tsx`**

- เปลี่ยนจาก `useAuth()` เป็น `useAuthService()`
- เพิ่ม local `loading` state
- แก้ไข `onLogin()` และ `onKuAllLogin()` ให้ใช้ `useAuthService()`

```typescript
// เดิม
import { useAuth } from "../../contexts/AuthContext";
const { login, isLoading } = useAuth();

// ใหม่
import { useAuthService } from "../../services/api/auth";
const { login } = useAuthService();
const [loading, setLoading] = useState(false);
```

#### **4. `src/components/ProtectedRoute.tsx`**

- ลบการใช้ `useAuth()` จาก AuthContext
- เพิ่ม local state management
- ตรวจสอบ authentication ผ่าน API call

```typescript
const checkAuth = async () => {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include", // ส่ง cookies อัตโนมัติ
  });
  setIsAuthenticated(response.ok);
};
```

#### **5. `src/pages/profile/Profile.tsx`**

- ลบการใช้ `profileService` และ `useAuth()`
- เพิ่ม interface `ProfileData` ในไฟล์
- ใช้ API calls โดยตรงสำหรับ profile data และ logout

```typescript
// โหลดข้อมูล profile ผ่าน API
const loadProfileData = async () => {
  const response = await fetch("/api/user/profile", {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    setProfileData(data);
  }
};

// Logout ผ่าน API
const handleLogout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  navigate("/login");
};
```

## **ประโยชน์ของการเปลี่ยนแปลง:**

### **1. ความปลอดภัยสูงขึ้น**

- ใช้ httpOnly cookies แทน localStorage
- ป้องกัน XSS attacks
- Backend จัดการ token security

### **2. โค้ดง่ายขึ้น**

- ไม่ต้องจัดการ token state ใน frontend
- ไม่ต้องจัดการ localStorage/sessionStorage
- ลดความซับซ้อนของ authentication logic

### **3. ความสอดคล้องกัน**

- ใช้ระบบเดียวกับ backend
- ไม่มี duplicate authentication logic
- Single source of truth

### **4. การบำรุงรักษาง่าย**

- ลดจำนวนไฟล์ที่ต้องดูแล
- ลด dependencies
- Easier debugging

## **การทำงานใหม่:**

### **1. Login Process:**

1. User กรอก username/password
2. Frontend ส่ง request ไปยัง `/api/auth/login`
3. Backend ตรวจสอบ credentials
4. Backend สร้าง JWT token และตั้งค่า cookies
5. Frontend ได้รับ response และ navigate ไปยัง target page

### **2. Authentication Check:**

1. Frontend ส่ง request ไปยัง `/api/auth/me`
2. Backend ตรวจสอบ cookies
3. หาก valid จะส่ง user data กลับ
4. หาก invalid จะส่ง 401 status

### **3. Logout Process:**

1. Frontend ส่ง request ไปยัง `/api/auth/logout`
2. Backend ลบ cookies
3. Frontend navigate ไปยัง login page

## **API Endpoints ที่ใช้:**

- `POST /api/auth/login` - เข้าสู่ระบบ
- `GET /api/auth/me` - ตรวจสอบ authentication
- `POST /api/auth/logout` - ออกจากระบบ
- `GET /api/user/profile` - ดึงข้อมูล profile
- `PUT /api/user/profile` - บันทึกข้อมูล profile

## **การทดสอบ:**

1. **เริ่มต้น Backend Service:**

   ```bash
   cd project-irequest-service
   npm run dev
   ```

2. **เริ่มต้น Frontend Application:**

   ```bash
   cd project-irequest-application
   npm run dev
   ```

3. **ทดสอบการ Login:**

   - ไปที่ `/login`
   - กรอก username/password
   - ตรวจสอบ console logs
   - ตรวจสอบ cookies ใน Developer Tools

4. **ทดสอบการเข้า Profile:**

   - หลังจาก login สำเร็จ
   - ไปที่ `/profile`
   - ตรวจสอบว่าโหลดข้อมูลได้

5. **ทดสอบการ Logout:**
   - กดปุ่ม logout
   - ตรวจสอบว่า cookies ถูกลบ
   - ตรวจสอบว่า redirect ไป login

## **หมายเหตุ:**

- Backend ต้องรันอยู่ที่ port 8080
- Frontend จะรันที่ port 5173 (default Vite)
- Proxy configuration ใน vite.config.ts จะ redirect `/api/*` ไปยัง backend
- Cookies จะถูกส่งอัตโนมัติด้วย `credentials: 'include'`
