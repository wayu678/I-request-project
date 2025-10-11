import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RequestAttachedDocumentEntity } from "../entities/RequestAttachedDocumentEntity";

export const RequestAttachedDocumentRepository = AppDataSource.getRepository(RequestAttachedDocumentEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ RequestAttachedDocument Repository ได้ที่นี่
});
