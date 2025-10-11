import { SaveRoleMapApprovalHeaderRequest } from "../models/request/iram07/SaveRoleMapApprovalHeaderRequest";
import { SaveRoleMapApprovalDetailRequest } from "../models/request/iram07/SaveRoleMapApprovalDetailRequest";
import { SaveRequestTypeRequest } from "../models/request/iram04/SaveRequestTypeRequest";
import { RoleMapApprovalHeaderResponse } from "../models/response/iram07/RoleMapApprovalHeaderResponse";
import { RoleMapApprovalDetailResponse } from "../models/response/iram07/RoleMapApprovalDetailResponse";
import { RequestTypeResponse } from "../models/response/iram04/RequestTypeResponse";

export interface RoleMapApprovalService {
    saveRoleMapApprovalHeaderPost: (header: SaveRoleMapApprovalHeaderRequest) => Promise<RoleMapApprovalHeaderResponse>;
    saveRoleMapApprovalDetailPost: (detail: SaveRoleMapApprovalDetailRequest) => Promise<RoleMapApprovalDetailResponse>;
    saveRequestTypePost: (requestType: SaveRequestTypeRequest) => Promise<RequestTypeResponse>;

    findRoleMapApprovalHeaderGet: (requestTypeCode: string, campusCode?: string, facultyCode?: string, majorCode?: string, section?: string) => Promise<RoleMapApprovalHeaderResponse>;
    findRoleMapApprovalDetailGet: (id: number) => Promise<RoleMapApprovalDetailResponse>;
    findRoleMapApprovalDetailsByHeaderGet: (headerId: number) => Promise<RoleMapApprovalDetailResponse[]>;
    findRequestTypeByCodeGet: (code: string) => Promise<RequestTypeResponse>;
}