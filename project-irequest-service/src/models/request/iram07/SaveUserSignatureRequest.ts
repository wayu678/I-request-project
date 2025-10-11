export interface SaveUserSignatureRequest {
    id?: number;
    userId?: number;
    signatureUrl?: string;
    fileType?: string;
    fileSize?: number;
    sequence?: number;
}