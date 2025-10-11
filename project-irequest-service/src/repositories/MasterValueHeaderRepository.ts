import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { MasterValueHeaderEntity } from "../entities/MasterValueHeaderEntity";

export const MasterValueHeaderRepository = AppDataSource.getRepository(MasterValueHeaderEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ MasterValueHeader Repository ได้ที่นี่
});
