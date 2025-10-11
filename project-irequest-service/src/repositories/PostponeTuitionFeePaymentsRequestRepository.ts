import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { PostponeTuitionFeePaymentsRequestEntity } from "../entities/PostponeTuitionFeePaymentsRequestEntity";

export const PostponeTuitionFeePaymentsRequestRepository = AppDataSource.getRepository(PostponeTuitionFeePaymentsRequestEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ PostponeTuitionFeePaymentsRequest Repository ได้ที่นี่
});
