import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RoleMapApprovalDetailEntity } from "../entities/RoleMapApprovalDetailEntity";

export const RoleMapApprovalDetailRepository = AppDataSource.getRepository(RoleMapApprovalDetailEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ RoleMapApprovalDetail Repository ได้ที่นี่
});
