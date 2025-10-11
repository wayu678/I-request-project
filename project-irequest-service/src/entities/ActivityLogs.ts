import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { UserEntity } from "./UserEntity";
import { StudentEntity } from "./StudentEntity";

@Entity("ire_activity_logs")
export class ActivityLogs extends AuditEntity {
    @Column({ name: "action", type: 'varchar', nullable: false })
    action?: string;

    @Column({ name: "description1", type: 'varchar', length: 1000, nullable: true })
    description1?: string;

    @Column({ name: "description2", type: 'varchar', length: 1000, nullable: true })
    description2?: string;

    @Column({ name: "program_code", type: 'varchar', nullable: true })
    programCode?: string;

    @Column({ name: "username", type: 'varchar', length: 40, nullable: true })
    username?: string;

    @Column({ name: "student_code", type: 'varchar', length: 10, nullable: true })
    studentCode?: string;

    @Column({ name: "user_agent", type: 'varchar', length: 1000, nullable: true })
    userAgent?: string;

    // Relations
    @ManyToOne(() => UserEntity, { nullable: true })
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user?: UserEntity | null;

    @ManyToOne(() => StudentEntity, { nullable: true })
    @JoinColumn({ name: 'student_code', referencedColumnName: 'studentCode' })
    student?: StudentEntity | null;
}