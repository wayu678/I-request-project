import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { RequestTypeEntity } from "./RequestTypeEntity";
import { RoleMapApprovalDetailEntity } from "./RoleMapApprovalDetailEntity";

@Entity("ire_role_map_approval_header")
export class RoleMapApprovalHeaderEntity extends AuditEntity {
    @Column({ name: "request_type_code", type: "varchar", length: 20, nullable: true })
    requestTypeCode?: string;

    @Column({ name: "campus_code", type: "varchar", nullable: true, comment: "วิทยาเขต" })
    campusCode?: string;

    @Column({ name: "faculty_code", type: "varchar", nullable: true, comment: "คณะ" })
    facultyCode?: string;

    @Column({ name: "major_code", type: "varchar", nullable: true, comment: "สาขา" })
    majorCode?: string;

    @Column({ name: "section", type: "varchar", length: 10, nullable: true, comment: "ภาคปกติ ภาคพิเศษ ภาคอื่นๆ (หาจาก master value)" })
    section?: string;

    // Relations
    @ManyToOne(() => RequestTypeEntity, requestType => requestType.roleMapApprovalHeaders)
    @JoinColumn({ name: "request_type_code", referencedColumnName: "code" })
    requestType?: RequestTypeEntity;

    @OneToMany(() => RoleMapApprovalDetailEntity, detail => detail.roleMapApprovalHeader)
    details?: RoleMapApprovalDetailEntity[];
}
