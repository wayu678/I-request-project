import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { RequestTypeEntity } from "./RequestTypeEntity";
import { RequestDownloadApprovalLogEntity } from "./RequestDownloadApprovalLogEntity";

@Entity("ire_request_download_logs")
export class RequestDownloadLogEntity extends AuditEntity {
    @Column({ name: "request_id", type: "bigint", nullable: false })
    requestId?: number;

    @Column({ name: "request_type_code", type: "varchar", length: 20, nullable: false })
    requestTypeCode?: string;

    @Column({ name: "downloaded_by", type: "varchar", length: 40, nullable: true, comment: "username or student_code" })
    downloadedBy?: string;

    // Relations
    @ManyToOne(() => RequestTypeEntity, requestType => requestType.downloadLogs)
    @JoinColumn({ name: "request_type_code", referencedColumnName: "code" })
    requestType?: RequestTypeEntity;

    @OneToMany(() => RequestDownloadApprovalLogEntity, approvalLog => approvalLog.requestDownloadLog)
    approvalLogs?: RequestDownloadApprovalLogEntity[];
}
