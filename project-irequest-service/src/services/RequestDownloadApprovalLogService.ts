import { SaveRequestDownloadApprovalLogRequest } from "../models/request/iram07/SaveRequestDownloadApprovalLogRequest";
import { RequestDownloadApprovalLogResponse } from "../models/response/iram07/RequestDownloadApprovalLogResponse";

export interface RequestDownloadApprovalLogService {
    saveRequestDownloadApprovalLogPost: (req: SaveRequestDownloadApprovalLogRequest) => Promise<RequestDownloadApprovalLogResponse>;
    findRequestDownloadApprovalLogByIdGet: (id: number) => Promise<RequestDownloadApprovalLogResponse>;
    findRequestDownloadApprovalLogsByDownloadLogGet: (requestDownloadLogId: number) => Promise<RequestDownloadApprovalLogResponse[]>;
}