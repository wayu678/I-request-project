import type { PostponeTuitionFormData } from '../services/api/postponeTuitionService';

/**
 * ประมวลผลข้อมูลจาก form ให้ตรงกับ TSOA schema
 * @param formData ข้อมูลจาก form
 * @returns ข้อมูลที่ประมวลผลแล้วพร้อมส่งไป API
 */
export const processPostponeTuitionData = (formData: Partial<PostponeTuitionFormData>) => {
    return {
        semesterCode: formData.semesterCode,
        academicYear: formData.academicYear ? parseInt(formData.academicYear.format("YYYY")) : undefined,
        feeAmount: formData.feeAmount ? parseFloat(formData.feeAmount) : undefined,
        hasOutstandingDept: formData.hasOutstandingDept,
        deptSemesterCode: formData.deptSemesterCode,
        deptAcademicYear: formData.deptAcademicYear ? parseInt(formData.deptAcademicYear.format("YYYY")) : undefined,
        deptAmount: formData.deptAmount ? parseFloat(formData.deptAmount) : undefined,
        cause: formData.cause,
        expectedPayDate: formData.expectedPayDate ? formData.expectedPayDate.toDate() : undefined,
        studentCode: formData.studentCode,
        parentPhone: formData.parentPhone,
    };
};

/**
 * ตรวจสอบข้อมูลที่จำเป็น
 * @param formData ข้อมูลจาก form
 * @returns รายการฟิลด์ที่ขาดหายไป
 */
export const validateRequiredFields = (formData: Partial<PostponeTuitionFormData>): string[] => {
    const requiredFields = ['semesterCode', 'academicYear', 'feeAmount', 'hasOutstandingDept', 'cause', 'expectedPayDate', 'studentCode', 'parentPhone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof PostponeTuitionFormData]);
    
    // ถ้าเลือก "มีหนี้ค้างชำระ" ให้ตรวจสอบฟิลด์เพิ่มเติม
    if (formData.hasOutstandingDept === "yes") {
        const debtRequiredFields = ['deptSemesterCode', 'deptAmount', 'deptAcademicYear'];
        const debtMissingFields = debtRequiredFields.filter(field => !formData[field as keyof PostponeTuitionFormData]);
        missingFields.push(...debtMissingFields);
    }
    
    return missingFields;
};
