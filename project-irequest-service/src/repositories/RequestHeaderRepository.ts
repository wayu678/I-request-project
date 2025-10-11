import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RequestHeaderEntity } from "../entities/RequestHeaderEntity";

export const RequestHeaderRepository = AppDataSource.getRepository(RequestHeaderEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ RequestHeader Repository ได้ที่นี่
});
