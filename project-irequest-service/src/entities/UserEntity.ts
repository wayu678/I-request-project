import { Entity, Column, OneToMany } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { UserSignatureEntity } from "./UserSignatureEntity";

@Entity("ire_users")
export class UserEntity extends AuditEntity {
    @Column({ name: "username", type: "varchar", length: 40, nullable: false, unique: true })
    username?: string;

    @Column({ name: "password_hashed", type: "varchar", nullable: false })
    passwordHashed?: string;

    @Column({ name: "role_code", type: "varchar", length: 20, nullable: false })
    roleCode?: string;

    @Column({ name: "campus_code", type: "varchar", nullable: false, comment: "วิทยาเขต" })
    campusCode?: string;

    @Column({ name: "faculty_code", type: "varchar", nullable: true, comment: "คณะ" })
    facultyCode?: string;

    @Column({ name: "major_code", type: "varchar", nullable: true, comment: "สาขา" })
    majorCode?: string;

    @Column({ name: "department_code", type: "varchar", nullable: true, comment: "ภาควิชา" })
    departmentCode?: string;

    @Column({ name: "advisor_code", type: "varchar", length: 5, nullable: true, comment: "Q0000" })
    advisorCode?: string;

    @Column({ name: "phone", type: "varchar", length: 10, nullable: true })
    phone?: string;

    @Column({ name: "email", type: "varchar", nullable: true })
    email?: string;

    // Relations
    @OneToMany(() => UserSignatureEntity, userSignature => userSignature.user)
    signatures?: UserSignatureEntity[];
}
