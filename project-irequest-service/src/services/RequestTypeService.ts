import { SaveRequestTypeRequest } from "../models/request/iram04/SaveRequestTypeRequest";
import { RequestTypeResponse } from "../models/response/iram04/RequestTypeResponse";

export interface RequestTypeService {
    saveRequestTypePost: (req: SaveRequestTypeRequest) => Promise<RequestTypeResponse>;
    findRequestTypeByCodeGet: (code: string) => Promise<RequestTypeResponse>;
    findAllRequestTypesGet: () => Promise<RequestTypeResponse[]>;
}