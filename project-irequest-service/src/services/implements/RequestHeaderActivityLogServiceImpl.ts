import { RequestHeaderActivityLogService } from "../RequestHeaderActivityLogService";
import { SaveRequestHeaderActivityLogRequest } from "../../models/request/iram07/SaveRequestHeaderActivityLogRequest";
import { RequestHeaderActivityLogResponse } from "../../models/response/iram07/RequestHeaderActivityLogResponse";
import { RequestHeaderActivityLogRepository, RequestHeaderRepository } from "../../repositories";
import { RequestHeaderActivityLogEntity } from "../../entities/RequestHeaderActivityLogEntity";

export class RequestHeaderActivityLogServiceImpl implements RequestHeaderActivityLogService {
    private requestHeaderActivityLogRepository: typeof RequestHeaderActivityLogRepository;
    private requestHeaderRepository: typeof RequestHeaderRepository;

    constructor() {
        this.requestHeaderActivityLogRepository = RequestHeaderActivityLogRepository as any;
        this.requestHeaderRepository = RequestHeaderRepository as any;
    }

    private async toEntity(data: SaveRequestHeaderActivityLogRequest): Promise<RequestHeaderActivityLogEntity> {
        const entity = new RequestHeaderActivityLogEntity();
        entity.actionDescription = data.actionDescription;
        entity.actionUser = data.actionUser;
        entity.oldDocumentStatus = data.oldDocumentStatus;
        entity.newDocumentStatus = data.newDocumentStatus;
        if (data.requestHeaderId) {
            const header = await this.requestHeaderRepository.findOne({ where: { id: data.requestHeaderId } });
            if (header) entity.requestHeader = header;
        }
        if (data.id) {
            const current = await this.requestHeaderActivityLogRepository.findOne({ where: { id: data.id }, relations: ["requestHeader"] as any });
            if (current) {
                current.actionDescription = entity.actionDescription;
                current.actionUser = entity.actionUser;
                current.oldDocumentStatus = entity.oldDocumentStatus;
                current.newDocumentStatus = entity.newDocumentStatus;
                if (entity.requestHeader) current.requestHeader = entity.requestHeader;
                return current;
            }
        }
        return entity;
    }

    private async toResponse(entity: RequestHeaderActivityLogEntity): Promise<RequestHeaderActivityLogResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            requestHeaderId: entity.requestHeader?.id,
            actionDescription: entity.actionDescription,
            actionUser: entity.actionUser,
            oldDocumentStatus: entity.oldDocumentStatus,
            newDocumentStatus: entity.newDocumentStatus,
        };
    }

    async saveRequestHeaderActivityLogPost(req: SaveRequestHeaderActivityLogRequest): Promise<RequestHeaderActivityLogResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.requestHeaderActivityLogRepository.save(entity);
        return this.toResponse(saved);
    }
}