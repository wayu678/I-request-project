import { SaveRequestAttachedDocumentRequest } from "../models/request/iram07/SaveRequestAttachedDocumentRequest";
import { RequestAttachedDocumentResponse } from "../models/response/iram07/RequestAttachedDocumentResponse";

export interface RequestAttachedDocumentService {
    saveRequestAttachedDocumentPost: (req: SaveRequestAttachedDocumentRequest) => Promise<RequestAttachedDocumentResponse>;
    findRequestAttachedDocumentsByHeaderGet: (requestHeaderId: number) => Promise<RequestAttachedDocumentResponse[]>;
}