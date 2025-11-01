import { Irst07PostponeTuitionFeePaymentRequestApi, type CreatePostponeTuitionRequestPostOperationRequest } from '../generated-api/apis/Irst07PostponeTuitionFeePaymentRequestApi';
import type { PostponeTuitionFee } from '../generated-api/models';
import { Configuration } from '../generated-api/runtime';

// สร้าง configuration สำหรับ API
const configuration = new Configuration({
    basePath: '/api', // ใช้ proxy แทนการระบุ URL เต็ม
    credentials: 'include'
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
    },

    /**
     * ดึงข้อมูล request จาก UUID
     */
    async getRequestByUuid(uuid: string): Promise<any> {
        try {
            console.log('[postponeTuitionService] getRequestByUuid - UUID:', uuid);

            const response = await fetch(`/api/irst07/get-request-by-uuid/${uuid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch request: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('[postponeTuitionService] Request data received:', data);
            return data;
        } catch (error: any) {
            console.error('[postponeTuitionService] Error fetching request:', error);
            throw error;
        }
    },

    /**
     * ดึง PDF จาก server โดยใช้ UUID
     */
    async getPostponeTuitionFeePdf(uuid: string): Promise<Blob> {
        try {
            console.log('[postponeTuitionService] getPostponeTuitionFeePdf - UUID:', uuid);

            if (!uuid) {
                throw new Error('UUID is required');
            }

            // ใช้ API client เพื่อดึง PDF
            const response = await postponeTuitionApi.getPostponeTuitionFeePdfRaw({ uuid });

            // ตรวจสอบว่า response มีข้อมูลหรือไม่
            if (!response || !response.raw) {
                throw new Error('Invalid response from server');
            }

            // ดึง blob จาก response โดยใช้ .value() method
            const blob = await response.value();

            // ตรวจสอบว่า blob มีข้อมูลหรือไม่
            if (!blob || blob.size === 0) {
                throw new Error('PDF file is empty');
            }

            // ตรวจสอบ content type
            const contentType = blob.type || response.raw.headers.get('content-type') || '';
            if (!contentType.includes('application/pdf') && blob.size > 0) {
                console.warn('[postponeTuitionService] Unexpected content type:', contentType);
                // ไม่ throw error เพราะอาจจะเป็น PDF แม้ content-type ไม่ถูกต้อง
            }

            console.log('[postponeTuitionService] PDF blob received, size:', blob.size);
            return blob;
        } catch (error: any) {
            console.error('[postponeTuitionService] Error getting PDF:', error);
            throw error;
        }
    },

    /**
     * สร้าง PDF จาก request UUID
     * @deprecated ใช้ getPostponeTuitionFeePdf แทน (ดึง PDF จาก server)
     * function นี้ต้องการ pdfFiller module ที่ไม่มีอยู่
     */
    // async generatePDFFromRequest(uuid: string): Promise<Uint8Array> {
    //     try {
    //         console.log('[postponeTuitionService] generatePDFFromRequest - UUID:', uuid);

    //         // 1. ดึงข้อมูล request
    //         console.log('[postponeTuitionService] Fetching request data...');
    //         const requestData = await this.getRequestByUuid(uuid);
    //         console.log('[postponeTuitionService] Request data received:', requestData);

    //         if (!requestData || !requestData.request) {
    //             throw new Error('Request data not found');
    //         }

    //         // Student data อาจเป็น null หรือ empty object ได้
    //         const studentData = requestData.student || {
    //             studentCode: '',
    //             firstName: '',
    //             lastName: '',
    //             firstNameEn: '',
    //             lastNameEn: '',
    //             faculty: '',
    //             major: '',
    //             academicLevel: '',
    //             email: '',
    //             phoneNumber: '',
    //         };

    //         console.log('[postponeTuitionService] Student data (after fallback):', studentData);

    //         // 2. โหลด template PDF
    //         console.log('[postponeTuitionService] Loading template PDF...');
    //         const templateBytes = await loadTemplatePDF();
    //         console.log('[postponeTuitionService] Template loaded, size:', templateBytes.length);

    //         // 3. เตรียมข้อมูลสำหรับ PDF
    //         const pdfFormData: PDFFormData = {
    //             // Student info
    //             studentName: studentData.studentName
    //                 || (studentData.firstName && studentData.lastName
    //                     ? `${studentData.firstName} ${studentData.lastName}`
    //                     : studentData.studentCode || requestData.student?.studentCode || 'ไม่ระบุชื่อ'),
    //             studentCode: studentData.studentCode || requestData.student?.studentCode || '',
    //             academicLevel: studentData.academicLevel || '',
    //             faculty: studentData.faculty || '',
    //             major: studentData.major || '',
    //             phoneNumber: studentData.phoneNumber || '',
    //             email: studentData.email || '',

    //             // Request data
    //             semesterCode: requestData.request.semesterCode,
    //             academicYear: requestData.request.academicYear,
    //             feeAmount: requestData.request.feeAmount,
    //             hasOutstandingDept: requestData.request.hasOutstandingDept,
    //             hasOutstandingDebt: requestData.request.hasOutstandingDept === 'Y' ? 'yes' : 'no',
    //             deptSemesterCode: requestData.request.deptSemesterCode,
    //             deptAcademicYear: requestData.request.deptAcademicYear,
    //             deptAmount: requestData.request.deptAmount,
    //             cause: requestData.request.cause || '',
    //             expectedPayDate: requestData.request.expectedPayDate
    //                 ? (typeof requestData.request.expectedPayDate === 'string'
    //                     ? requestData.request.expectedPayDate
    //                     : new Date(requestData.request.expectedPayDate).toISOString().split('T')[0])
    //                 : undefined,
    //             parentPhone: requestData.request.parentPhone || '',

    //             // Extra fields for new template sections
    //             guardianConsentText: (requestData.request.parentName
    //                 ? `ข้าพเจ้า ${requestData.request.parentName} ผู้ปกครอง ยินยอมและรับทราบ โทร ${requestData.request.parentPhone || studentData.phoneNumber || '-'}`
    //                 : `ผู้ปกครอง ยินยอมและรับทราบ โทร ${requestData.request.parentPhone || studentData.phoneNumber || '-'}`)
    //                 || requestData.request.cause || '',
    //             contactAddress: requestData.request.contactAddress
    //                 || `Tel: ${requestData.request.parentPhone || studentData.phoneNumber || '-'}  Email: ${studentData.email || '-'}`
    //                 || requestData.request.cause || '',
    //         };

    //         console.log('[postponeTuitionService] ========== PDF Form Data ==========');
    //         console.log('[postponeTuitionService] Student:', {
    //             name: pdfFormData.studentName,
    //             code: pdfFormData.studentCode,
    //             level: pdfFormData.academicLevel,
    //             faculty: pdfFormData.faculty,
    //             major: pdfFormData.major,
    //             phone: pdfFormData.phoneNumber,
    //             email: pdfFormData.email
    //         });
    //         console.log('[postponeTuitionService] Request:', {
    //             semester: pdfFormData.semesterCode,
    //             academicYear: pdfFormData.academicYear,
    //             feeAmount: pdfFormData.feeAmount,
    //             cause: pdfFormData.cause,
    //             expectedPayDate: pdfFormData.expectedPayDate,
    //             parentPhone: pdfFormData.parentPhone
    //         });
    //         console.log('[postponeTuitionService] ===================================');

    //         // 4. เติมข้อมูลลงใน PDF
    //         console.log('[postponeTuitionService] Filling PDF form...');
    //         let filledPDF: Uint8Array;
    //         try {
    //             console.log('[postponeTuitionService] Calling fillPDFForm...');
    //             filledPDF = await fillPDFForm(templateBytes, pdfFormData);
    //             console.log('[postponeTuitionService] ✅ PDF filled successfully, size:', filledPDF.length);
    //             console.log('[postponeTuitionService] PDF type check:', filledPDF instanceof Uint8Array);

    //             if (!filledPDF || filledPDF.length === 0) {
    //                 console.error('[postponeTuitionService] ⚠️ Filled PDF is empty!');
    //                 throw new Error('Generated PDF is empty');
    //             }
    //         } catch (fillError: any) {
    //             console.error('[postponeTuitionService] ❌ Error in fillPDFForm:', fillError);
    //             console.error('[postponeTuitionService] Error details:', {
    //                 message: fillError.message,
    //                 stack: fillError.stack,
    //                 name: fillError.name
    //             });
    //             throw fillError;
    //         }

    //         console.log('[postponeTuitionService] ✅ Returning filled PDF, size:', filledPDF.length);
    //         return filledPDF;
    //     } catch (error: any) {
    //         console.error('[postponeTuitionService] Error generating PDF:', error);
    //         console.error('[postponeTuitionService] Error stack:', error.stack);
    //         throw error;
    //     }
    // }
};
