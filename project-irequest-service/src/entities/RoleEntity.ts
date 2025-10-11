import { Entity, Column } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";

@Entity("ire_roles")
export class RoleEntity extends AuditEntity {
    @Column({ name: "code", type: "varchar", length: 20, nullable: false, unique: true })
    code?: string;

    @Column({ name: "name_th", type: "varchar", nullable: true })
    nameTh?: string;

    @Column({ name: "name_en", type: "varchar", nullable: true })
    nameEn?: string;
}
