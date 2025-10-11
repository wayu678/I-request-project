import { SaveRequestDetailAddressRequest } from "../models/request/iram07/SaveRequestDetailAddressRequest";
import { RequestDetailAddressResponse } from "../models/response/iram07/RequestDetailAddressResponse";

export interface RequestDetailAddressService {
    saveRequestDetailAddressPost: (req: SaveRequestDetailAddressRequest) => Promise<RequestDetailAddressResponse>;
    findRequestDetailAddressByHeaderGet: (requestHeaderId: number) => Promise<RequestDetailAddressResponse>;
}