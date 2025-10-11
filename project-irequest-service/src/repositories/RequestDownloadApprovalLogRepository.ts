import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RequestDownloadApprovalLogEntity } from "../entities/RequestDownloadApprovalLogEntity";

export const RequestDownloadApprovalLogRepository = AppDataSource.getRepository(RequestDownloadApprovalLogEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ RequestDownloadApprovalLog Repository ได้ที่นี่
});
