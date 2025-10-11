import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RequestDetailEntity } from "../entities/RequestDetailEntity";

export const RequestDetailRepository = AppDataSource.getRepository(RequestDetailEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ RequestDetail Repository ได้ที่นี่
});
