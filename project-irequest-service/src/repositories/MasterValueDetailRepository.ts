import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { MasterValueDetailEntity } from "../entities/MasterValueDetailEntity";

export const MasterValueDetailRepository = AppDataSource.getRepository(MasterValueDetailEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ MasterValueDetail Repository ได้ที่นี่
});
