import { Entity, Column, ManyToOne } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";

@Entity("ire_general_request")
export class GeneralRequestEntity extends AuditEntity {
    @Column({ name: "topic", type: "varchar", nullable: false })
    topic?: string;

    @Column({ name: "cause", type: "varchar", length: 4000, nullable: false })
    cause?: string;
}
