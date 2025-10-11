import { SaveRequestDetailRequest } from "../models/request/iram07/SaveRequestDetailRequest";
import { RequestDetailResponse } from "../models/response/iram07/RequestDetailResponse";

export interface RequestDetailService {
    saveRequestDetailPost: (req: SaveRequestDetailRequest) => Promise<RequestDetailResponse>;
    findRequestDetailByHeaderGet: (requestHeaderId: number) => Promise<RequestDetailResponse>;
}