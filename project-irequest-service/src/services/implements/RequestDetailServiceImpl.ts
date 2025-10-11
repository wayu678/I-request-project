import { RequestDetailService } from "../RequestDetailService";
import { SaveRequestDetailRequest } from "../../models/request/iram07/SaveRequestDetailRequest";
import { RequestDetailResponse } from "../../models/response/iram07/RequestDetailResponse";
import { RequestDetailRepository, RequestHeaderRepository } from "../../repositories";
import { RequestDetailEntity } from "../../entities/RequestDetailEntity";

export class RequestDetailServiceImpl implements RequestDetailService {
    private requestDetailRepository: typeof RequestDetailRepository;
    private requestHeaderRepository: typeof RequestHeaderRepository;

    constructor() {
        this.requestDetailRepository = RequestDetailRepository as any;
        this.requestHeaderRepository = RequestHeaderRepository as any;
    }

    private async toEntity(data: SaveRequestDetailRequest): Promise<RequestDetailEntity> {
        const entity = new RequestDetailEntity();
        entity.studentName = data.studentName;
        entity.studentYear = data.studentYear;
        entity.facultyCode = data.facultyCode;
        entity.majorCode = data.majorCode;
        entity.phone = data.phone;
        entity.email = data.email;
        entity.academicYear = data.academicYear;
        entity.semesterCode = data.semesterCode;
        if (data.requestHeaderId) {
            const header = await this.requestHeaderRepository.findOne({ where: { id: data.requestHeaderId } });
            if (header) entity.requestHeader = header;
        }
        if (data.id) {
            const current = await this.requestDetailRepository.findOne({ where: { id: data.id }, relations: ["requestHeader"] as any });
            if (current) {
                current.studentName = entity.studentName;
                current.studentYear = entity.studentYear;
                current.facultyCode = entity.facultyCode;
                current.majorCode = entity.majorCode;
                current.phone = entity.phone;
                current.email = entity.email;
                current.academicYear = entity.academicYear;
                current.semesterCode = entity.semesterCode;
                if (entity.requestHeader) current.requestHeader = entity.requestHeader;
                return current;
            }
        }
        return entity;
    }

    private async toResponse(entity: RequestDetailEntity): Promise<RequestDetailResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            requestHeaderId: entity.requestHeader?.id,
            studentName: entity.studentName,
            studentYear: entity.studentYear,
            facultyCode: entity.facultyCode,
            majorCode: entity.majorCode,
            phone: entity.phone,
            email: entity.email,
            academicYear: entity.academicYear,
            semesterCode: entity.semesterCode,
        };
    }

    async saveRequestDetailPost(req: SaveRequestDetailRequest): Promise<RequestDetailResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.requestDetailRepository.save(entity);
        return this.toResponse(saved);
    }

    async findRequestDetailByHeaderGet(requestHeaderId: number): Promise<RequestDetailResponse> {
        const entity = await this.requestDetailRepository.findOne({ where: { requestHeader: { id: requestHeaderId } } as any, relations: ["requestHeader"] as any });
        if (!entity) throw new Error("RequestDetail not found");
        return this.toResponse(entity);
    }
}