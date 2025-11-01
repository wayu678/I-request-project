import { Irst07PostponeTuitionFeePaymentRequestApi, type CreatePostponeTuitionRequestPostOperationRequest } from '../generated-api/apis/Irst07PostponeTuitionFeePaymentRequestApi';
import type { PostponeTuitionFee } from '../generated-api/models';
import { Configuration } from '../generated-api/runtime';

// สร้าง configuration สำหรับ API
const configuration = new Configuration({
    basePath: '/api', // ใช้ proxy แทนการระบุ URL เต็ม
    credentials: 'include' // ✅ เพิ่ม credentials เพื่อส่ง cookies
});

// สร้าง API instance
const postponeTuitionApi = new Irst07PostponeTuitionFeePaymentRequestApi(configuration);

export interface PostponeTuitionFormData {
    // ข้อมูลจาก PostponeTuitionFormPage
    semesterCode: string;
    academicYear: any;
    feeAmount: string;
    hasOutstandingDept: string;
    deptSemesterCode: string;
    deptAcademicYear: any;
    deptAmount: string;
    cause: string;
    expectedPayDate: any;
    studentCode: string;
    parentPhone: string;

    // ข้อมูลจาก StudentForm
    studentName: string;
    studentYear: string;
    major: string;
    email: string;
    studentId: string;
    faculty: string;
    phoneNumber: string;
}

export const postponeTuitionService = {
    /**
     * ส่งข้อมูลคำร้องขอผ่อนผันค่าธรรมเนียมการศึกษา
     */
    async createPostponeTuitionRequest(formData: PostponeTuitionFormData): Promise<any> {
        try {
            // แปลงข้อมูลให้ตรงกับ PostponeTuitionFee interface
            const postponeTuitionFee: PostponeTuitionFee = {
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

            console.log('Sending postpone tuition request:', postponeTuitionFee);

            const response = await postponeTuitionApi.createPostponeTuitionRequestPost({
                createPostponeTuitionRequestPostRequest: {
                    postponeTuitionFee: postponeTuitionFee
                }
            });

            return response;
        } catch (error) {
            console.error('Error creating postpone tuition request:', error);
            throw error;
        }
    }
};
