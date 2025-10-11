export interface UserResponse {
    id?: number;
    uuid?: string;
    username?: string;
    passwordHashed?: string;
    roleCode?: string;
    campusCode?: string;
    facultyCode?: string;
    majorCode?: string;
    departmentCode?: string;
    advisorCode?: string;
    phone?: string;
    email?: string;
}