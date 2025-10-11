import { GeneralRequestRequest } from "../models/request/GeneralRequestRequest";
import { GeneralRequestResponse } from "../models/response/GeneralRequestResponse";

export interface GeneralRequestService {
    createRequestPost(data: GeneralRequestRequest): Promise<GeneralRequestResponse>;
}