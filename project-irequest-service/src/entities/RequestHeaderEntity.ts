import { Entity, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { StudentEntity } from "./StudentEntity";
import { RequestTypeEntity } from "./RequestTypeEntity";
import { RequestHeaderActivityLogEntity } from "./RequestHeaderActivityLogEntity";
import { RequestDetailEntity } from "./RequestDetailEntity";
import { RequestDetailAddressEntity } from "./RequestDetailAddressEntity";
import { RequestAttachedDocumentEntity } from "./RequestAttachedDocumentEntity";

@Entity("ire_request_header")
export class RequestHeaderEntity extends AuditEntity {
    @Column({ name: "request_type_code", type: "varchar", nullable: false })
    requestTypeCode?: string;

    @Column({ name: "request_id", type: "bigint", nullable: false, comment: "reference to id of every request, no join" })
    requestId?: number;

    @Column({ name: "approved_by", type: "varchar", length: 40, nullable: true, comment: "username of last approver" })
    approvedBy?: string;

    @Column({ name: "rejected_by", type: "varchar", length: 40, nullable: true, comment: "username of rejecter" })
    rejectedBy?: string;

    @Column({ name: "next_step", type: "bigint", nullable: true, comment: "approve step" })
    nextStep?: number;

    @Column({
        name: "document_status",
        type: "varchar",
        nullable: false,
        comment: "D: Draft, P: Processing, R: Rejected, F: Finished, C: Cancelled"
    })
    documentStatus?: string;

    // Relations
    @ManyToOne(() => StudentEntity)
    @JoinColumn({ name: "student_id" })
    student?: StudentEntity;

    @ManyToOne(() => RequestTypeEntity, requestType => requestType.requestHeaders)
    @JoinColumn({ name: "request_type_code", referencedColumnName: "code" })
    requestType?: RequestTypeEntity;

    @OneToMany(() => RequestHeaderActivityLogEntity, log => log.requestHeader)
    activityLogs?: RequestHeaderActivityLogEntity[];

    @OneToOne(() => RequestDetailEntity, detail => detail.requestHeader)
    detail?: RequestDetailEntity;

    @OneToOne(() => RequestDetailAddressEntity, address => address.requestHeader)
    detailAddress?: RequestDetailAddressEntity;

    @OneToMany(() => RequestAttachedDocumentEntity, document => document.requestHeader)
    attachedDocuments?: RequestAttachedDocumentEntity[];
}
