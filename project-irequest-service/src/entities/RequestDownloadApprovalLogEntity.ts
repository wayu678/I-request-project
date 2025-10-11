import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { RequestDownloadLogEntity } from "./RequestDownloadLogEntity";

@Entity("ire_request_download_approval_logs")
export class RequestDownloadApprovalLogEntity extends AuditEntity {
    @Column({ name: "approver", type: "varchar", length: 40, nullable: true, comment: "username of approver" })
    approver?: string;

    @Column({ name: "approve_step", type: "integer", nullable: true })
    approveStep?: number;

    // Relations
    @ManyToOne(() => RequestDownloadLogEntity, downloadLog => downloadLog.approvalLogs)
    @JoinColumn({ name: "request_download_log_id" })
    requestDownloadLog?: RequestDownloadLogEntity;
}
