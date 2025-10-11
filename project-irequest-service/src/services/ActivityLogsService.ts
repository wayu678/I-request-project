import { SaveActivityLogRequest } from "../models/request/iram07/SaveActivityLogRequest";
import { ActivityLogResponse } from "../models/response/iram07/ActivityLogResponse";

export interface ActivityLogsService {
    saveActivityLogPost: (req: SaveActivityLogRequest) => Promise<ActivityLogResponse>;
}