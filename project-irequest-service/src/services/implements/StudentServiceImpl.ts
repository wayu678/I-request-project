import { StudentService } from "../StudentService";
import { SaveStudentRequest } from "../../models/request/iram07/SaveStudentRequest";
import { StudentResponse } from "../../models/response/iram07/StudentResponse";
import { SaveStudentAddressRequest } from "../../models/request/iram07/SaveStudentAddressRequest";
import { StudentAddressResponse } from "../../models/response/iram07/StudentAddressResponse";
import { StudentRepository, StudentAddressRepository } from "../../repositories";
import { StudentEntity } from "../../entities/StudentEntity";
import { StudentAddressEntity } from "../../entities/StudentAddressEntity";

export class StudentServiceImpl implements StudentService {
    private studentRepository: typeof StudentRepository;
    private studentAddressRepository: typeof StudentAddressRepository;

    constructor() {
        this.studentRepository = StudentRepository as any;
        this.studentAddressRepository = StudentAddressRepository as any;
    }

    private async toEntity(data: SaveStudentRequest): Promise<StudentEntity> {
        const entity = new StudentEntity();
        entity.studentCode = data.studentCode;
        entity.campusCode = data.campusCode;
        entity.facultyCode = data.facultyCode;
        entity.majorCode = data.majorCode;
        entity.departmentCode = data.departmentCode;
        entity.phone = data.phone;
        entity.email = data.email;
        entity.section = data.section;
        entity.advisorCode = data.advisorCode;
        entity.studentStatusId = data.studentStatusId;

        if (data.id) {
            const exists = await this.studentRepository.findOne({ where: { id: data.id } });
            if (exists) {
                exists.studentCode = entity.studentCode;
                exists.campusCode = entity.campusCode;
                exists.facultyCode = entity.facultyCode;
                exists.majorCode = entity.majorCode;
                exists.departmentCode = entity.departmentCode;
                exists.phone = entity.phone;
                exists.email = entity.email;
                exists.section = entity.section;
                exists.advisorCode = entity.advisorCode;
                exists.studentStatusId = entity.studentStatusId;
                return exists;
            }
        }
        return entity;
    }

    private async toResponse(entity: StudentEntity): Promise<StudentResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            studentCode: entity.studentCode,
            campusCode: entity.campusCode,
            facultyCode: entity.facultyCode,
            majorCode: entity.majorCode,
            departmentCode: entity.departmentCode,
            phone: entity.phone,
            email: entity.email,
            section: entity.section,
            advisorCode: entity.advisorCode,
            studentStatusId: entity.studentStatusId,
        };
    }

    async saveStudentPost(req: SaveStudentRequest): Promise<StudentResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.studentRepository.save(entity);
        return this.toResponse(saved);
    }

    async findStudentByCodeGet(studentCode: string): Promise<StudentResponse> {
        const entity = await this.studentRepository.findOne({ where: { studentCode } });
        if (!entity) throw new Error("Student not found");
        return this.toResponse(entity);
    }

    // StudentAddress methods
    private async toAddressEntity(data: SaveStudentAddressRequest): Promise<StudentAddressEntity> {
        const entity = new StudentAddressEntity();
        entity.houseNo = data.houseNo;
        entity.moo = data.moo;
        entity.building = data.building;
        entity.floor = data.floor;
        entity.soi = data.soi;
        entity.street = data.street;
        entity.district = data.district;
        entity.subDistrict = data.subDistrict;
        entity.province = data.province;
        entity.country = data.country;
        entity.postalCode = data.postalCode;
        if (data.studentId) {
            const student = await this.studentRepository.findOne({ where: { id: data.studentId } });
            if (student) entity.student = student;
        }
        if (data.id) {
            const current = await this.studentAddressRepository.findOne({ where: { id: data.id }, relations: ["student"] as any } as any);
            if (current) {
                current.houseNo = entity.houseNo;
                current.moo = entity.moo;
                current.building = entity.building;
                current.floor = entity.floor;
                current.soi = entity.soi;
                current.street = entity.street;
                current.district = entity.district;
                current.subDistrict = entity.subDistrict;
                current.province = entity.province;
                current.country = entity.country;
                current.postalCode = entity.postalCode;
                if (entity.student) current.student = entity.student;
                return current as any;
            }
        }
        return entity;
    }

    private async toAddressResponse(entity: StudentAddressEntity): Promise<StudentAddressResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            studentId: entity.student?.id,
            houseNo: entity.houseNo,
            moo: entity.moo,
            building: entity.building,
            floor: entity.floor,
            soi: entity.soi,
            street: entity.street,
            district: entity.district,
            subDistrict: entity.subDistrict,
            province: entity.province,
            country: entity.country,
            postalCode: entity.postalCode,
        };
    }

    async saveStudentAddressPost(req: SaveStudentAddressRequest): Promise<StudentAddressResponse> {
        const entity = await this.toAddressEntity(req);
        const saved = await this.studentAddressRepository.save(entity);
        return this.toAddressResponse(saved);
    }

    async findStudentAddressesByStudentIdGet(studentId: number): Promise<StudentAddressResponse[]> {
        const list = await this.studentAddressRepository.find({ where: { student: { id: studentId } } as any, relations: ["student"] as any } as any);
        return Promise.all(list.map(e => this.toAddressResponse(e as any)));
    }

    async findStudentAddressByIdGet(id: number): Promise<StudentAddressResponse> {
        const entity = await this.studentAddressRepository.findOne({ where: { id }, relations: ["student"] as any } as any);
        if (!entity) throw new Error("StudentAddress not found");
        return this.toAddressResponse(entity as any);
    }
}