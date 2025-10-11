export interface SaveRequestHeaderRequest {
    id?: number;
    requestTypeCode: string;
    requestId: number;
    studentId?: number;
    approvedBy?: string;
    rejectedBy?: string;
    nextStep?: number;
    documentStatus: string;
}