import { SaveRequestDownloadLogRequest } from "../models/request/iram07/SaveRequestDownloadLogRequest";
import { RequestDownloadLogResponse } from "../models/response/iram07/RequestDownloadLogResponse";

export interface RequestDownloadLogService {
    saveRequestDownloadLogPost: (req: SaveRequestDownloadLogRequest) => Promise<RequestDownloadLogResponse>;
    findRequestDownloadLogByIdGet: (id: number) => Promise<RequestDownloadLogResponse>;
    findRequestDownloadLogsByRequestGet: (requestId: number) => Promise<RequestDownloadLogResponse[]>;
}