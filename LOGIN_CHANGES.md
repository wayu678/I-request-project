# การเปลี่ยน Login.tsx ให้ใช้ useAuth()

## การเปลี่ยนแปลงที่ทำ

### 1. เปลี่ยน Import

```typescript
// เดิม
import { useAuthService } from "../../services/api/auth";
import { debugCookies } from "../../utils/cookieUtils";

// ใหม่
import { useAuth } from "../../contexts/AuthContext";
```

### 2. เปลี่ยน Hook Usage

```typescript
// เดิม
const [loading, setLoading] = useState(false);
const { login } = useAuthService();

// ใหม่
const { login, isLoading } = useAuth();
```

### 3. เปลี่ยน Login Function

```typescript
// เดิม
const loginResponse = await login({
    username,
    password
});

if (loginResponse.success) {
    // เก็บข้อมูลใน localStorage
    localStorage.setItem('userInfo', JSON.stringify({...}));
    navigate("/dashboard");
}

// ใหม่
const loginSuccess = await login(username, password);

if (loginSuccess) {
    navigate(from, { replace: true });
}
```

### 4. เปลี่ยน Loading State

```typescript
// เดิม
loading = { loading };

// ใหม่
loading = { isLoading };
```

## ประโยชน์ของการเปลี่ยนแปลง

### 1. **ความสอดคล้องกัน**

- Login และ ProtectedRoute ใช้ AuthContext เดียวกัน
- ไม่มีปัญหา authentication state ไม่ตรงกัน

### 2. **การจัดการ Token**

- Token ถูกจัดการโดย tokenService ใน AuthContext
- ไม่ต้องจัดการ localStorage แยกต่างหาก

### 3. **การ Navigation**

- รองรับ return URL จาก ProtectedRoute
- ใช้ `navigate(from, { replace: true })` เพื่อป้องกัน back button issues

### 4. **Error Handling**

- ใช้ error handling จาก AuthContext
- ไม่ต้องจัดการ response format เอง

## การทำงานใหม่

1. **Login Process:**

   - เรียก `login(username, password)` จาก AuthContext
   - AuthContext เรียก `tokenService.generateToken()`
   - tokenService ส่ง request ไปยัง `/api/auth/login`
   - หากสำเร็จ จะเก็บ token ใน localStorage
   - AuthContext อัปเดต `isAuthenticated` เป็น `true`

2. **Navigation:**

   - หาก login สำเร็จ จะ navigate ไปยัง return URL หรือ `/dashboard`
   - ProtectedRoute จะตรวจสอบ `isAuthenticated` และอนุญาตให้เข้าได้

3. **Loading State:**
   - ใช้ `isLoading` จาก AuthContext
   - แสดง loading state ขณะที่กำลัง login

## การทดสอบ

1. เริ่มต้น backend service
2. เริ่มต้น frontend application
3. ทดสอบการ login
4. ตรวจสอบว่าสามารถเข้า Profile ได้
5. ตรวจสอบว่า ProtectedRoute ทำงานถูกต้อง
