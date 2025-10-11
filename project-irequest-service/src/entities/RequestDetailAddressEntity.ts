import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { AuditEntity } from "./base/AuditEntity";
import { RequestHeaderEntity } from "./RequestHeaderEntity";

@Entity("ire_request_detail_address")
export class RequestDetailAddressEntity extends AuditEntity {
    @Column({ name: "house_no", type: "varchar", nullable: true, comment: "บ้านเลขที่" })
    houseNo?: string;

    @Column({ name: "moo", type: "varchar", nullable: true, comment: "หมู่ที่" })
    moo?: string;

    @Column({ name: "building", type: "varchar", nullable: true, comment: "อาคาร" })
    building?: string;

    @Column({ name: "floor", type: "varchar", nullable: true, comment: "ชั้น" })
    floor?: string;

    @Column({ name: "soi", type: "varchar", nullable: true, comment: "ซอย" })
    soi?: string;

    @Column({ name: "street", type: "varchar", nullable: true, comment: "ถนน" })
    street?: string;

    @Column({ name: "district", type: "varchar", nullable: true, comment: "อำเภอ/เขต" })
    district?: string;

    @Column({ name: "sub_district", type: "varchar", nullable: true, comment: "ตำบล/แขวง" })
    subDistrict?: string;

    @Column({ name: "province", type: "varchar", nullable: true, comment: "จังหวัด" })
    province?: string;

    @Column({ name: "country", type: "varchar", nullable: true, comment: "ประเทศ" })
    country?: string;

    @Column({ name: "postal_code", type: "varchar", nullable: true, comment: "รหัสไปรษณีย์" })
    postalCode?: string;

    // Relations
    @OneToOne(() => RequestHeaderEntity, header => header.detailAddress)
    @JoinColumn({ name: "request_header_id" })
    requestHeader?: RequestHeaderEntity;
}
