import { RequestHeaderService } from "../RequestHeaderService";
import { SaveRequestHeaderRequest } from "../../models/request/iram07/SaveRequestHeaderRequest";
import { RequestHeaderResponse } from "../../models/response/iram07/RequestHeaderResponse";
import { RequestHeaderRepository } from "../../repositories/RequestHeaderRepository";
import { RequestHeaderEntity } from "../../entities/RequestHeaderEntity";
import { StudentRepository } from "../../repositories/StudentRepository";

export class RequestHeaderServiceImpl implements RequestHeaderService {
    private requestHeaderRepository: typeof RequestHeaderRepository;
    private studentRepository: typeof StudentRepository;

    constructor() {
        this.requestHeaderRepository = RequestHeaderRepository;
        this.studentRepository = StudentRepository as any;
    }

    private async toEntity(data: SaveRequestHeaderRequest): Promise<RequestHeaderEntity> {
        const entity = new RequestHeaderEntity();
        entity.requestTypeCode = data.requestTypeCode;
        entity.requestId = data.requestId;
        entity.approvedBy = data.approvedBy;
        entity.rejectedBy = data.rejectedBy;
        entity.nextStep = data.nextStep;
        entity.documentStatus = data.documentStatus;
        if (data.studentId) {
            const student = await this.studentRepository.findOne({ where: { id: data.studentId } });
            if (student) entity.student = student;
        }
        if (data.id) {
            const current = await this.requestHeaderRepository.findOne({ where: { id: data.id }, relations: ["student"] as any });
            if (current) {
                current.requestTypeCode = entity.requestTypeCode;
                current.requestId = entity.requestId;
                current.approvedBy = entity.approvedBy;
                current.rejectedBy = entity.rejectedBy;
                current.nextStep = entity.nextStep;
                current.documentStatus = entity.documentStatus;
                if (entity.student) current.student = entity.student;
                return current;
            }
        }
        return entity;
    }

    private async toResponse(entity: RequestHeaderEntity): Promise<RequestHeaderResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            requestTypeCode: entity.requestTypeCode,
            requestId: entity.requestId,
            studentId: entity.student?.id,
            approvedBy: entity.approvedBy,
            rejectedBy: entity.rejectedBy,
            nextStep: entity.nextStep,
            documentStatus: entity.documentStatus,
        };
    }

    async saveRequestHeaderPost(req: SaveRequestHeaderRequest): Promise<RequestHeaderResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.requestHeaderRepository.save(entity);
        return this.toResponse(saved);
    }

    async findRequestHeaderByIdGet(id: number): Promise<RequestHeaderResponse> {
        const entity = await this.requestHeaderRepository.findOne({ where: { id }, relations: ["student"] as any });
        if (!entity) throw new Error("RequestHeader not found");
        return this.toResponse(entity);
    }
}