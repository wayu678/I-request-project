import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RequestTypeEntity } from "../entities/RequestTypeEntity";

export const RequestTypeRepository = AppDataSource.getRepository(RequestTypeEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ RequestType Repository ได้ที่นี่
});
