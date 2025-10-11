import { Entity, Column } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";

@Entity("ire_change_program_and_major")
export class ChangeProgramAndMajorEntity extends AuditEntity {
    @Column({ name: "topic", type: "varchar", nullable: false })
    topic?: string;

    @Column({ name: "semester_code", type: "varchar", nullable: false, comment: "ภาคต้น, ภาคปลาย, ฤดูร้อน" })
    semesterCode?: string;

    @Column({ name: "academic_year", type: "integer", nullable: false })
    academicYear?: number;

    @Column({ name: "old_course_name", type: "varchar", nullable: false })
    oldCourseName?: string;

    @Column({ name: "old_major_name", type: "varchar", nullable: false })
    oldMajorName?: string;

    @Column({ name: "old_semester_code", type: "varchar", nullable: false })
    oldSemesterCode?: string;

    @Column({ name: "new_course_name", type: "varchar", nullable: false })
    newCourseName?: string;

    @Column({ name: "new_major_name", type: "varchar", nullable: false })
    newMajorName?: string;

    @Column({ name: "cause", type: "varchar", length: 4000, nullable: false })
    cause?: string;
}
