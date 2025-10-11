import { SaveRoleRequest } from "../models/request/iram07/SaveRoleRequest";
import { RoleResponse } from "../models/response/iram07/RoleResponse";

export interface RoleService {
    saveRolePost: (req: SaveRoleRequest) => Promise<RoleResponse>;
    findRoleByCodeGet: (code: string) => Promise<RoleResponse>;
}