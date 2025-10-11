import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { UserSignatureEntity } from "../entities/UserSignatureEntity";

export const UserSignatureRepository = AppDataSource.getRepository(UserSignatureEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ UserSignature Repository ได้ที่นี่
});
