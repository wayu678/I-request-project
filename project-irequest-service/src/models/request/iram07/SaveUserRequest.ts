export interface SaveUserRequest {
    id?: number;
    username: string;
    // ข้อมูลรหัสผ่านที่ถูกเข้ารหัสมาจากฝั่ง frontend
    passwordEncrypted: string;
    roleCode: string;
    campusCode: string;
    facultyCode?: string;
    majorCode?: string;
    departmentCode?: string;
    advisorCode?: string;
    phone?: string;
    email?: string;
}