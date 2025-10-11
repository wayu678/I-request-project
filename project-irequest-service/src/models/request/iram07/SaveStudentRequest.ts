export interface SaveStudentRequest {
    id?: number;
    studentCode?: string;
    campusCode?: string;
    facultyCode?: string;
    majorCode?: string;
    departmentCode?: string;
    phone?: string;
    email?: string;
    section?: string;
    advisorCode?: string;
    studentStatusId: number;
}