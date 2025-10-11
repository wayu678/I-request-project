import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ChangeProgramAndMajorEntity } from "../entities/ChangeProgramAndMajorEntity";

export const ChangeProgramAndMajorRepository = AppDataSource.getRepository(ChangeProgramAndMajorEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ ChangeProgramAndMajor Repository ได้ที่นี่
});
