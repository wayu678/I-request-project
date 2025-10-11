import { SaveRequestHeaderRequest } from "../models/request/iram07/SaveRequestHeaderRequest";
import { RequestHeaderResponse } from "../models/response/iram07/RequestHeaderResponse";

export interface RequestHeaderService {
    saveRequestHeaderPost: (req: SaveRequestHeaderRequest) => Promise<RequestHeaderResponse>;
    findRequestHeaderByIdGet: (id: number) => Promise<RequestHeaderResponse>;
}