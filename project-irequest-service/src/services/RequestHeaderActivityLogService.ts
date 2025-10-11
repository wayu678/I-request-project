import { SaveRequestHeaderActivityLogRequest } from "../models/request/iram07/SaveRequestHeaderActivityLogRequest";
import { RequestHeaderActivityLogResponse } from "../models/response/iram07/RequestHeaderActivityLogResponse";

export interface RequestHeaderActivityLogService {
    saveRequestHeaderActivityLogPost: (req: SaveRequestHeaderActivityLogRequest) => Promise<RequestHeaderActivityLogResponse>;
}