export interface SaveRequestHeaderActivityLogRequest {
    id?: number;
    requestHeaderId: number;
    actionDescription: string;
    actionUser?: string;
    oldDocumentStatus: string;
    newDocumentStatus: string;
}