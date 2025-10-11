import { Entity, Column } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";

@Entity("ire_postpone_tuition_fee_payments_request")
export class PostponeTuitionFeePaymentsRequestEntity extends AuditEntity {
    @Column({ name: "semester_code", type: "varchar", nullable: false, comment: "ภาคต้น, ภาคปลาย, ฤดูร้อน" })
    semesterCode?: string;

    @Column({ name: "academic_year", type: "integer", nullable: false })
    academicYear?: number;

    @Column({ name: "fee_amount", type: "float", nullable: false })
    feeAmount?: number;

    @Column({ name: "has_outstanding_dept", type: "varchar", nullable: false, comment: "Y: yes, N: no" })
    hasOutstandingDept?: string;

    @Column({ name: "dept_semester_code", type: "varchar", nullable: true })
    deptSemesterCode?: string;

    @Column({ name: "dept_academic_year", type: "integer", nullable: true })
    deptAcademicYear?: number;

    @Column({ name: "dept_amount", type: "float", nullable: true })
    deptAmount?: number;

    @Column({ name: "cause", type: "varchar", length: 1000, nullable: true })
    cause?: string;

    @Column({ name: "expected_pay_date", type: "timestamptz", nullable: true })
    expectedPayDate?: Date;

    @Column({ name: "parent_phone", type: "varchar", length: 10, nullable: true })
    parentPhone?: string;
}
