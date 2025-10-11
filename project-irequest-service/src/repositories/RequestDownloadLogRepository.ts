import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RequestDownloadLogEntity } from "../entities/RequestDownloadLogEntity";

export const RequestDownloadLogRepository = AppDataSource.getRepository(RequestDownloadLogEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ RequestDownloadLog Repository ได้ที่นี่
});
