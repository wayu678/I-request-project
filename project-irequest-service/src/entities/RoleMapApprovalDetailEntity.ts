import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { RoleMapApprovalHeaderEntity } from "./RoleMapApprovalHeaderEntity";

@Entity("ire_role_map_approval_detail")
export class RoleMapApprovalDetailEntity extends AuditEntity {
    @Column({ name: "role_code", type: "varchar", length: 20, nullable: false })
    roleCode?: string;

    @Column({ name: "sequence", type: "integer", nullable: false, comment: "for queuing approver line" })
    sequence?: number;

    @Column({ name: "approve_step", type: "integer", nullable: false, comment: "after approved replace irh.next_step with irmah.approve_step" })
    approveStep?: number;

    @Column({ name: "next_step", type: "integer", nullable: false, comment: "if need to skip process, jump value of next step (ex. 3 to 6)" })
    nextStep?: number;

    // Relations
    @ManyToOne(() => RoleMapApprovalHeaderEntity, header => header.details)
    @JoinColumn({ name: "role_map_approval_header_id" })
    roleMapApprovalHeader?: RoleMapApprovalHeaderEntity;
}
