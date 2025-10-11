import { Entity, Column, OneToMany } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { StudentAddressEntity } from "./StudentAddressEntity";

@Entity("ire_students")
export class StudentEntity extends AuditEntity {
    @Column({ name: "student_code", type: "varchar", length: 10, nullable: true, unique: true, comment: "6321600296" })
    studentCode?: string;

    @Column({ name: "campus_code", type: "varchar", nullable: true, comment: "วิทยาเขต" })
    campusCode?: string;

    @Column({ name: "faculty_code", type: "varchar", nullable: true, comment: "คณะ" })
    facultyCode?: string;

    @Column({ name: "major_code", type: "varchar", nullable: true, comment: "สาขา" })
    majorCode?: string;

    @Column({ name: "department_code", type: "varchar", nullable: true, comment: "ภาควิชา" })
    departmentCode?: string;

    @Column({ name: "phone", type: "varchar", nullable: true })
    phone?: string;

    @Column({ name: "email", type: "varchar", nullable: true })
    email?: string;

    @Column({ name: "section", type: "varchar", length: 10, nullable: true, comment: "ภาคปกติ ภาคพิเศษ ภาคอื่นๆ (หาจาก master value)" })
    section?: string;

    @Column({ name: "advisor_code", type: "varchar", nullable: true, comment: "Q0000" })
    advisorCode?: string;

    @Column({ name: "student_status_id", type: "bigint", nullable: false, comment: "27107" })
    studentStatusId?: number;

    // Relations
    @OneToMany(() => StudentAddressEntity, address => address.student)
    addresses?: StudentAddressEntity[];
}
