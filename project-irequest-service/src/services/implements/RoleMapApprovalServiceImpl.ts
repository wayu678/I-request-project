import { RoleMapApprovalService } from "../RoleMapApprovalService";
import { RoleMapApprovalHeaderRepository } from "../../repositories/RoleMapApprovalHeaderRepository";
import { RoleMapApprovalDetailRepository } from "../../repositories/RoleMapApprovalDetailRepository";
import { RequestTypeRepository } from "../../repositories/RequestTypeRepository";
import { RoleMapApprovalHeaderEntity } from "../../entities/RoleMapApprovalHeaderEntity";
import { RoleMapApprovalDetailEntity } from "../../entities/RoleMapApprovalDetailEntity";
import { RequestTypeEntity } from "../../entities/RequestTypeEntity";
import { SaveRoleMapApprovalHeaderRequest } from "../../models/request/iram07/SaveRoleMapApprovalHeaderRequest";
import { SaveRoleMapApprovalDetailRequest } from "../../models/request/iram07/SaveRoleMapApprovalDetailRequest";
import { SaveRequestTypeRequest } from "../../models/request/iram04/SaveRequestTypeRequest";
import { RoleMapApprovalHeaderResponse } from "../../models/response/iram07/RoleMapApprovalHeaderResponse";
import { RoleMapApprovalDetailResponse } from "../../models/response/iram07/RoleMapApprovalDetailResponse";
import { RequestTypeResponse } from "../../models/response/iram04/RequestTypeResponse";

export class RoleMapApprovalServiceImpl implements RoleMapApprovalService {
    private roleMapApprovalHeaderRepository: typeof RoleMapApprovalHeaderRepository;
    private roleMapApprovalDetailRepository: typeof RoleMapApprovalDetailRepository;
    private requestTypeRepository: typeof RequestTypeRepository;

    constructor() {
        this.roleMapApprovalHeaderRepository = RoleMapApprovalHeaderRepository;
        this.roleMapApprovalDetailRepository = RoleMapApprovalDetailRepository;
        this.requestTypeRepository = RequestTypeRepository;
    }

    private async headerRequestMapper(data: SaveRoleMapApprovalHeaderRequest): Promise<RoleMapApprovalHeaderEntity> {
        const entity = new RoleMapApprovalHeaderEntity();
        entity.requestTypeCode = data.requestTypeCode;
        entity.campusCode = data.campusCode;
        entity.facultyCode = data.facultyCode;
        entity.majorCode = data.majorCode;
        entity.section = data.section;
        return entity;
    }

    private async headerResponseMapper(entity: RoleMapApprovalHeaderEntity): Promise<RoleMapApprovalHeaderResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            requestTypeCode: entity.requestTypeCode,
            campusCode: entity.campusCode,
            facultyCode: entity.facultyCode,
            majorCode: entity.majorCode,
            section: entity.section,
        };
    }

    private async detailRequestMapper(data: SaveRoleMapApprovalDetailRequest): Promise<RoleMapApprovalDetailEntity> {
        const entity = new RoleMapApprovalDetailEntity();
        entity.roleCode = data.roleCode;
        entity.sequence = data.sequence;
        entity.approveStep = data.approveStep;
        entity.nextStep = data.nextStep;
        if (data.roleMapApprovalHeaderId) {
            const header = await this.roleMapApprovalHeaderRepository.findOne({ where: { id: data.roleMapApprovalHeaderId } });
            if (!header) throw new Error(`RoleMapApprovalHeader id ${data.roleMapApprovalHeaderId} not found`);
            entity.roleMapApprovalHeader = header;
        }
        return entity;
    }

    private async detailResponseMapper(entity: RoleMapApprovalDetailEntity): Promise<RoleMapApprovalDetailResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            roleCode: entity.roleCode,
            sequence: entity.sequence,
            approveStep: entity.approveStep,
            nextStep: entity.nextStep,
            roleMapApprovalHeaderId: entity.roleMapApprovalHeader?.id,
        };
    }

    private async requestTypeRequestMapper(data: SaveRequestTypeRequest): Promise<RequestTypeEntity> {
        const entity = new RequestTypeEntity();
        entity.code = data.code;
        entity.nameTh = data.nameTh;
        entity.nameEn = data.nameEn;
        return entity;
    }

    private async requestTypeResponseMapper(entity: RequestTypeEntity): Promise<RequestTypeResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            code: entity.code,
            nameTh: entity.nameTh,
            nameEn: entity.nameEn,
        };
    }

    async saveRoleMapApprovalHeaderPost(header: SaveRoleMapApprovalHeaderRequest): Promise<RoleMapApprovalHeaderResponse> {
        const entity = await this.headerRequestMapper(header);
        const saved = await this.roleMapApprovalHeaderRepository.save(entity);
        return this.headerResponseMapper(saved);
    }

    async saveRoleMapApprovalDetailPost(detail: SaveRoleMapApprovalDetailRequest): Promise<RoleMapApprovalDetailResponse> {
        const entity = await this.detailRequestMapper(detail);
        const saved = await this.roleMapApprovalDetailRepository.save(entity);
        return this.detailResponseMapper(saved);
    }

    async saveRequestTypePost(requestType: SaveRequestTypeRequest): Promise<RequestTypeResponse> {
        const entity = await this.requestTypeRequestMapper(requestType);
        const saved = await this.requestTypeRepository.save(entity);
        return this.requestTypeResponseMapper(saved);
    }

    async findRoleMapApprovalHeaderGet(requestTypeCode: string, campusCode?: string, facultyCode?: string, majorCode?: string, section?: string): Promise<RoleMapApprovalHeaderResponse> {
        const header = await this.roleMapApprovalHeaderRepository.findOne({ where: { requestTypeCode, campusCode, facultyCode, majorCode, section } });
        if (!header) throw new Error("RoleMapApprovalHeader not found");
        return this.headerResponseMapper(header);
    }

    async findRoleMapApprovalDetailGet(id: number): Promise<RoleMapApprovalDetailResponse> {
        const detail = await this.roleMapApprovalDetailRepository.findOne({ where: { id } });
        if (!detail) throw new Error("RoleMapApprovalDetail not found");
        return this.detailResponseMapper(detail);
    }

    async findRoleMapApprovalDetailsByHeaderGet(headerId: number): Promise<RoleMapApprovalDetailResponse[]> {
        const details = await this.roleMapApprovalDetailRepository.find({ where: { roleMapApprovalHeader: { id: headerId } }, order: { sequence: 'ASC' } as any });
        return Promise.all(details.map((d) => this.detailResponseMapper(d)));
    }

    async findRequestTypeByCodeGet(code: string): Promise<RequestTypeResponse> {
        const rt = await this.requestTypeRepository.findOne({ where: { code } });
        if (!rt) throw new Error("RequestType not found");
        return this.requestTypeResponseMapper(rt);
    }
}