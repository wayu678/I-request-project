import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { RequestHeaderEntity } from "./RequestHeaderEntity";

@Entity("ire_request_attached_documents")
export class RequestAttachedDocumentEntity extends AuditEntity {
    @Column({ name: "document_name", type: "varchar", nullable: true })
    documentName?: string;

    @Column({ name: "document_url", type: "varchar", length: 1000, nullable: true })
    documentUrl?: string;

    @Column({ name: "file_type", type: "varchar", length: 100, nullable: true })
    fileType?: string;

    @Column({ name: "file_size", type: "bigint", nullable: true })
    fileSize?: number;

    // Relations
    @ManyToOne(() => RequestHeaderEntity, header => header.attachedDocuments)
    @JoinColumn({ name: "request_header_id" })
    requestHeader?: RequestHeaderEntity;
}
