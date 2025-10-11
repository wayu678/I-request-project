export interface RequestHeaderActivityLogResponse {
    id?: number;
    uuid?: string;
    requestHeaderId?: number;
    actionDescription?: string;
    actionUser?: string;
    oldDocumentStatus?: string;
    newDocumentStatus?: string;
}