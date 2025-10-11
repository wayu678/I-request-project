import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { StudentAddressEntity } from "../entities/StudentAddressEntity";

export const StudentAddressRepository = AppDataSource.getRepository(StudentAddressEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ StudentAddress Repository ได้ที่นี่
});
