import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RequestDetailAddressEntity } from "../entities/RequestDetailAddressEntity";

export const RequestDetailAddressRepository = AppDataSource.getRepository(RequestDetailAddressEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ RequestDetailAddress Repository ได้ที่นี่
});
