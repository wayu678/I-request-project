import { RequestTypeService } from "../RequestTypeService";
import { SaveRequestTypeRequest } from "../../models/request/iram04/SaveRequestTypeRequest";
import { RequestTypeResponse } from "../../models/response/iram04/RequestTypeResponse";
import { RequestTypeRepository } from "../../repositories/RequestTypeRepository";
import { RequestTypeEntity } from "../../entities/RequestTypeEntity";

export class RequestTypeServiceImpl implements RequestTypeService {
    private requestTypeRepository: typeof RequestTypeRepository;

    constructor() {
        this.requestTypeRepository = RequestTypeRepository as any;
    }

    private async toEntity(data: SaveRequestTypeRequest): Promise<RequestTypeEntity> {
        const entity = new RequestTypeEntity();
        entity.code = data.code;
        entity.nameTh = data.nameTh;
        entity.nameEn = data.nameEn;
        if (data.id) {
            const current = await this.requestTypeRepository.findOne({ where: { id: data.id } as any });
            if (current) {
                current.code = entity.code;
                current.nameTh = entity.nameTh;
                current.nameEn = entity.nameEn;
                return current as any;
            }
        }
        return entity;
    }

    private async toResponse(entity: RequestTypeEntity): Promise<RequestTypeResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            code: entity.code,
            nameTh: entity.nameTh,
            nameEn: entity.nameEn,
        };
    }

    async saveRequestTypePost(req: SaveRequestTypeRequest): Promise<RequestTypeResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.requestTypeRepository.save(entity);
        return this.toResponse(saved);
    }

    async findRequestTypeByCodeGet(code: string): Promise<RequestTypeResponse> {
        const entity = await this.requestTypeRepository.findOne({ where: { code } as any });
        if (!entity) throw new Error("RequestType not found");
        return this.toResponse(entity as any);
    }

    async findAllRequestTypesGet(): Promise<RequestTypeResponse[]> {
        const list = await this.requestTypeRepository.find({} as any);
        return Promise.all(list.map(e => this.toResponse(e as any)));
    }
}