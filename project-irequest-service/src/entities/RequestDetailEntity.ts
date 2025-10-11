import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { RequestHeaderEntity } from "./RequestHeaderEntity";

@Entity("ire_request_detail")
export class RequestDetailEntity extends AuditEntity {
    @Column({ name: "student_name", type: "varchar", nullable: false })
    studentName?: string;

    @Column({ name: "student_year", type: "integer", nullable: false })
    studentYear?: number;

    @Column({ name: "faculty_code", type: "varchar", nullable: true, comment: "คณะ" })
    facultyCode?: string;

    @Column({ name: "major_code", type: "varchar", nullable: true, comment: "สาขา" })
    majorCode?: string;

    @Column({ name: "phone", type: "varchar", nullable: true })
    phone?: string;

    @Column({ name: "email", type: "varchar", nullable: true })
    email?: string;

    @Column({ name: "academic_year", type: "integer", nullable: false })
    academicYear?: number;

    @Column({ name: "semester_code", type: "varchar", nullable: false, comment: "ภาคต้น, ภาคปลาย, ฤดูร้อน" })
    semesterCode?: string;

    // Relations
    @OneToOne(() => RequestHeaderEntity, header => header.detail)
    @JoinColumn({ name: "request_header_id" })
    requestHeader?: RequestHeaderEntity;
}
