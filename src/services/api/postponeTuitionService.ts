import { Irst07PostponeTuitionFeePaymentRequestApi, type CreatePostponeTuitionRequestPostOperationRequest, type GetPostponeTuitionFeePdfRequest, type GetRequestByUuidRequest } from '../generated-api/apis/IRST07POSTPONETUITIONFEEPAYMENTREQUESTApi';
import type { PostponeTuitionFee } from '../generated-api/models';
import { apiConfigurations } from '../ApiConfigurations';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const postponeTuitionRequestApi = new Irst07PostponeTuitionFeePaymentRequestApi(apiConfigurations);

// Helper function สำหรับแปลง expectedPayDate
const parseExpectedPayDate = (value: any): Date | undefined => {
    if (!value) return undefined;

    let date: Date | null = null;

    if (typeof value.toDate === 'function') {
        // Dayjs object
        date = value.toDate();
    }
    else if (value instanceof Date) {
        date = value;
    }
    else if (typeof value === 'string') {
        // Parse string format "DD/MM/YYYY" using dayjs
        const parsed = dayjs(value, 'DD/MM/YYYY', true); // strict mode
        if (parsed.isValid()) {
            date = parsed.toDate();
        } else {
            // ลอง parse ด้วย format อื่นๆ (เช่น ISO format)
            const fallback = dayjs(value);
            if (fallback.isValid()) {
                date = fallback.toDate();
            } else {
                console.warn('[parseExpectedPayDate] Invalid date value:', value);
                date = null;
            }
        }
    }

    if (date && !isNaN(date.getTime())) {
        return date;
    }

    console.warn('[parseExpectedPayDate] Invalid date value:', value);
    return undefined;
};


const formatParentPhone = (value: string | undefined): string | undefined => {
    if (!value) return undefined;

    const numbers = value.replace(/\D/g, '');

    return numbers.length > 10 ? numbers.slice(0, 10) : numbers;
};

export interface PostponeTuitionFormData {
    semesterCode: string;
    academicYear: string;
    feeAmount: string;
    hasOutstandingDept: string;
    deptSemesterCode: string;
    deptAcademicYear: string;
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
    async createPostponeTuitionRequest(formData: PostponeTuitionFormData): Promise<any> {
        try {
            console.log('[start][createPostponeTuitionRequest] formData:', formData);


            const postponeTuitionFee: PostponeTuitionFee & {
                studentName?: string;
                studentYear?: number;
                facultyCode?: string;
                majorCode?: string;
                email?: string;
                phone?: string;
            } = {
                semesterCode: formData.semesterCode,
                academicYear: formData.academicYear ? parseInt(formData.academicYear) : undefined,
                feeAmount: formData.feeAmount ? parseFloat(formData.feeAmount) : undefined,
                hasOutstandingDept: formData.hasOutstandingDept,
                deptSemesterCode: formData.deptSemesterCode,
                deptAcademicYear: formData.deptAcademicYear ? parseInt(formData.deptAcademicYear) : undefined,
                deptAmount: formData.deptAmount ? parseFloat(formData.deptAmount) : undefined,
                cause: formData.cause,
                expectedPayDate: parseExpectedPayDate(formData.expectedPayDate),
                studentCode: formData.studentCode,
                parentPhone: formatParentPhone(formData.parentPhone),

                // Student data for RequestDetailEntity
                studentName: formData.studentName,
                studentYear: formData.studentYear ? parseInt(formData.studentYear) : undefined,
                facultyCode: formData.faculty,
                majorCode: formData.major,
                email: formData.email,
                phone: formData.phoneNumber,
            };

            const request: CreatePostponeTuitionRequestPostOperationRequest = {
                createPostponeTuitionRequestPostRequest: {
                    postponeTuitionFee: postponeTuitionFee
                }
            };

            const response = await postponeTuitionRequestApi.createPostponeTuitionRequestPost(request);
            console.log('[end][createPostponeTuitionRequest] response:', response);

            return response;
        } catch (error: any) {
            console.error('[error][createPostponeTuitionRequest]', error);
            throw error;
        }
    },

    /**
     * ดึงข้อมูล request จาก UUID
     */
    async getRequestByUuid(uuid: string): Promise<any> {
        try {
            console.log('[start][getRequestByUuid] uuid:', uuid);

            const request: GetRequestByUuidRequest = {
                uuid: uuid
            };

            const response = await postponeTuitionRequestApi.getRequestByUuid(request);
            console.log('[end][getRequestByUuid] response:', response);
            return response;
        } catch (error: any) {
            console.error('[error][getRequestByUuid]', error);
            throw error;
        }
    },

    /**
     * ดึง PDF จาก server โดยใช้ UUID
     */
    async getPostponeTuitionFeePdf(uuid: string): Promise<Blob> {
        try {
            console.log('[start][getPostponeTuitionFeePdf] uuid:', uuid);

            if (!uuid) {
                throw new Error('UUID is required');
            }

            const request: GetPostponeTuitionFeePdfRequest = {
                uuid: uuid
            };

            // ใช้ getPostponeTuitionFeePdfRaw เพื่อรับ ApiResponse ที่มี raw Response
            const response = await postponeTuitionRequestApi.getPostponeTuitionFeePdfRaw(request);

            // ดึง blob จาก raw response
            const blob = await response.raw.blob();

            // ตรวจสอบว่า blob มีข้อมูลหรือไม่
            if (!blob || blob.size === 0) {
                throw new Error('PDF file is empty');
            }

            // ตรวจสอบ content type
            const contentType = blob.type || response.raw.headers.get('content-type') || '';
            if (!contentType.includes('application/pdf') && blob.size > 0) {
                console.warn('[getPostponeTuitionFeePdf] Unexpected content type:', contentType);
            }

            console.log('[end][getPostponeTuitionFeePdf] blob size:', blob.size);
            return blob;
        } catch (error: any) {
            console.error('[error][getPostponeTuitionFeePdf]', error);
            throw error;
        }
    },
};