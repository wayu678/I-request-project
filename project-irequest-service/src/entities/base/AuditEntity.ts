import CONSTANTS from "../../constants/commons.constants";
import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn,
    BaseEntity,
} from "typeorm";

export abstract class AuditEntity extends BaseEntity {

    @PrimaryGeneratedColumn("increment", { name: "id", type: "bigint", comment: "Primary Key" })
    id?: number;

    @Column({ name: "uuid", type: "uuid", default: () => "uuid_generate_v4()", unique: true, comment: "UUID Key" })
    uuid?: string;

    @Column({ name: "status", type: "varchar", default: CONSTANTS.STATUS.ACTIVE, nullable: true, comment: "Status [Y: Active, N: Inactive, D: Deleted]" })
    status?: string;

    @CreateDateColumn({ name: "created_date", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdDate?: Date;

    @Column({ name: "created_by", type: "varchar", nullable: true })
    createdBy?: string;

    @UpdateDateColumn({ name: "updated_date", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedDate?: Date;

    @Column({ name: "updated_by", type: "varchar", nullable: true })
    updatedBy?: string;

    @Column({ name: "created_program", type: "varchar", nullable: true })
    createdProgram?: string;

    @Column({ name: "updated_program", type: "varchar", nullable: true })
    updatedProgram?: string;

    @VersionColumn({ name: "version", type: "integer", default: 1, comment: "Version Number" })
    version?: number;
}
