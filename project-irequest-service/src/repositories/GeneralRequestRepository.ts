import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { GeneralRequestEntity } from "../entities/GeneralRequestEntity";

export const GeneralRequestRepository = AppDataSource.getRepository(GeneralRequestEntity).extend({
    // เพิ่มเมธอดเฉพาะสำหรับ GeneralRequest Repository ได้ที่นี่
    async findByStudentCode(studentCode: string): Promise<GeneralRequestEntity | null> {
        const result = await this.query(`
            SELECT gr.*
            FROM ire_general_request gr
            JOIN ire_request_header rh ON gr.id = rh.request_id
            JOIN ire_students s ON s.student_code = $1
            WHERE rh.request_type_code = 'GENERAL_REQUEST'
            LIMIT 1
        `, [studentCode]);

        return result.length > 0 ? result[0] : null;
    },
    async findById(id: number): Promise<GeneralRequestEntity | null> {
        try {
            return await this.findOne({
                where: { id }
            });
        } catch (error) {
            console.error('[error][findById] Error: ', error);
            return null;
        }
    }
});
