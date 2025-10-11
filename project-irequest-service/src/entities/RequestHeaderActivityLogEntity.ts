import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { RequestHeaderEntity } from "./RequestHeaderEntity";

@Entity("ire_request_header_activity_logs")
export class RequestHeaderActivityLogEntity extends AuditEntity {
    @Column({ name: "action_description", type: "varchar", length: 1000, nullable: false })
    actionDescription?: string;

    @Column({ name: "action_user", type: "varchar", length: 40, nullable: true })
    actionUser?: string;

    @Column({ name: "old_document_status", type: "varchar", nullable: false })
    oldDocumentStatus?: string;

    @Column({ name: "new_document_status", type: "varchar", nullable: false })
    newDocumentStatus?: string;

    // Relations
    @ManyToOne(() => RequestHeaderEntity, header => header.activityLogs)
    @JoinColumn({ name: "request_header_id" })
    requestHeader?: RequestHeaderEntity;
}
