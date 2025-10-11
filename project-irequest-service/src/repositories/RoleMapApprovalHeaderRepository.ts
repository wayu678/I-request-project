import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RoleMapApprovalHeaderEntity } from "../entities/RoleMapApprovalHeaderEntity";

export const RoleMapApprovalHeaderRepository = AppDataSource.getRepository(RoleMapApprovalHeaderEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ RoleMapApprovalHeader Repository ได้ที่นี่
});
