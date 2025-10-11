export interface RequestHeaderResponse {
    id?: number;
    uuid?: string;
    requestTypeCode?: string;
    requestId?: number;
    studentId?: number;
    approvedBy?: string;
    rejectedBy?: string;
    nextStep?: number;
    documentStatus?: string;
}