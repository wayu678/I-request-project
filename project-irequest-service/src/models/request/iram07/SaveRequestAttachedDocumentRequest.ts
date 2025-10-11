export interface SaveRequestAttachedDocumentRequest {
  id?: number;
  requestHeaderId?: number;
  documentName?: string;
  documentUrl?: string;
  fileType?: string;
  fileSize?: number;
}