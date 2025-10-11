import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { MasterValueHeaderEntity } from "./MasterValueHeaderEntity";

@Entity("ire_master_value_detail")
export class MasterValueDetailEntity extends AuditEntity {
    @Column({ name: "master_value_detail_code", type: "varchar", length: 20, nullable: false })
    masterValueDetailCode?: string;

    @Column({ name: "description_th", type: "varchar", nullable: true })
    descriptionTh?: string;

    @Column({ name: "description_en", type: "varchar", nullable: true })
    descriptionEn?: string;

    @Column({ name: "sequence", type: "bigint", default: 1 })
    sequence?: number;

    // Relations
    @ManyToOne(() => MasterValueHeaderEntity, header => header.details)
    @JoinColumn({ name: "master_value_header_id" })
    masterValueHeaderEntity?: MasterValueHeaderEntity;
}
