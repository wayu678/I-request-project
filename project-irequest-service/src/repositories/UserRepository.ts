import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { UserEntity } from "../entities/UserEntity";

export const UserRepository = AppDataSource.getRepository(UserEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ User Repository ได้ที่นี่
});
