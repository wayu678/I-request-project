import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { UserEntity } from "./UserEntity";

@Entity("ire_user_signatures")
export class UserSignatureEntity extends AuditEntity {
    @Column({ name: "signature_url", type: "varchar", length: 1000, nullable: true })
    signatureUrl?: string;

    @Column({ name: "file_type", type: "varchar", length: 100, nullable: true })
    fileType?: string;

    @Column({ name: "file_size", type: "bigint", nullable: true })
    fileSize?: number;

    @Column({
        name: "sequence",
        type: "integer",
        nullable: false,
        default: 1,
        comment: "if user add new signature, plus 1 sequence"
    })
    sequence?: number;

    // Relations
    @ManyToOne(() => UserEntity, user => user.signatures)
    @JoinColumn({ name: "user_id" })
    user?: UserEntity;
}
