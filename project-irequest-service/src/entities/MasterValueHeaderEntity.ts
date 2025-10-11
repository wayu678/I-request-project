import { Entity, Column, OneToMany } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { MasterValueDetailEntity } from "./MasterValueDetailEntity";

@Entity("ire_master_value_header")
export class MasterValueHeaderEntity extends AuditEntity {
    @Column({ name: "master_value_code", type: "varchar", nullable: false, unique: true })
    masterValueCode?: string;

    @Column({ name: "master_value_name", type: "varchar", nullable: true })
    masterValueName?: string;

    // Relations
    @OneToMany(() => MasterValueDetailEntity, detail => detail.masterValueHeaderEntity)
    details?: MasterValueDetailEntity[];
}
