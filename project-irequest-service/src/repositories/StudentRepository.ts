import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { StudentEntity } from "../entities/StudentEntity";

export const StudentRepository = AppDataSource.getRepository(StudentEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ Student Repository ได้ที่นี่
});
