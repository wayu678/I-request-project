import { Entity, Column, OneToMany } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { RequestHeaderEntity } from "./RequestHeaderEntity";
import { RequestDownloadLogEntity } from "./RequestDownloadLogEntity";
import { RoleMapApprovalHeaderEntity } from "./RoleMapApprovalHeaderEntity";

@Entity("ire_request_type")
export class RequestTypeEntity extends AuditEntity {
    @Column({ name: "code", type: "varchar", length: 20, nullable: false, unique: true })
    code?: string;

    @Column({ name: "name_th", type: "varchar", nullable: true })
    nameTh?: string;

    @Column({ name: "name_en", type: "varchar", nullable: true })
    nameEn?: string;

    // Relations
    @OneToMany(() => RequestHeaderEntity, header => header.requestType)
    requestHeaders?: RequestHeaderEntity[];

    @OneToMany(() => RequestDownloadLogEntity, log => log.requestType)
    downloadLogs?: RequestDownloadLogEntity[];

    @OneToMany(() => RoleMapApprovalHeaderEntity, header => header.requestType)
    roleMapApprovalHeaders?: RoleMapApprovalHeaderEntity[];
}
