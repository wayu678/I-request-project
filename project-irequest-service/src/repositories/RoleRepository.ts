import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RoleEntity } from "../entities/RoleEntity";

export const RoleRepository = AppDataSource.getRepository(RoleEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ Role Repository ได้ที่นี่
});
