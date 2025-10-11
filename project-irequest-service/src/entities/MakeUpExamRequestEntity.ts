import { Entity, Column } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";

@Entity("ire_make_up_exam_request")
export class MakeUpExamRequestEntity extends AuditEntity {
    @Column({ name: "topic", type: "varchar", nullable: false })
    topic?: string;

    @Column({ name: "objective", type: "varchar", nullable: false, comment: "กลางภาค, สอบไล่" })
    objective?: string;

    @Column({ name: "semester_code", type: "varchar", nullable: true, comment: "ภาคต้น, ภาคปลาย, ฤดูร้อน" })
    semesterCode?: string;

    @Column({ name: "academic_year", type: "integer", nullable: false })
    academicYear?: number;

    @Column({ name: "course_code", type: "varchar", nullable: false })
    courseCode?: string;

    @Column({ name: "course_name", type: "varchar", nullable: false })
    courseName?: string;

    @Column({ name: "study_group", type: "varchar", length: 10, nullable: false })
    studyGroup?: string;

    @Column({ name: "original_schedule", type: "timestamptz", nullable: false })
    originalSchedule?: Date;

    @Column({ name: "new_schedule", type: "timestamptz", nullable: false })
    newSchedule?: Date;

    @Column({ name: "cause", type: "varchar", length: 4000, nullable: false })
    cause?: string;
}
