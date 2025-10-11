import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RequestHeaderActivityLogEntity } from "../entities/RequestHeaderActivityLogEntity";

export const RequestHeaderActivityLogRepository = AppDataSource.getRepository(RequestHeaderActivityLogEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ RequestHeaderActivityLog Repository ได้ที่นี่
});
