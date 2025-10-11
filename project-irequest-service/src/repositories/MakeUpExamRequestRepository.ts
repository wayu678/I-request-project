import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { MakeUpExamRequestEntity } from "../entities/MakeUpExamRequestEntity";

export const MakeUpExamRequestRepository = AppDataSource.getRepository(MakeUpExamRequestEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ MakeUpExamRequest Repository ได้ที่นี่
});
