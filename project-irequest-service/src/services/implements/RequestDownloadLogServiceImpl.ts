import { RequestDownloadLogService } from "../RequestDownloadLogService";
import { SaveRequestDownloadLogRequest } from "../../models/request/iram07/SaveRequestDownloadLogRequest";
import { RequestDownloadLogResponse } from "../../models/response/iram07/RequestDownloadLogResponse";
import { RequestDownloadLogRepository } from "../../repositories/RequestDownloadLogRepository";
import { RequestDownloadLogEntity } from "../../entities/RequestDownloadLogEntity";

export class RequestDownloadLogServiceImpl implements RequestDownloadLogService {
    private requestDownloadLogRepository: typeof RequestDownloadLogRepository;

    constructor() {
        this.requestDownloadLogRepository = RequestDownloadLogRepository as any;
    }

    private async toEntity(data: SaveRequestDownloadLogRequest): Promise<RequestDownloadLogEntity> {
        const entity = new RequestDownloadLogEntity();
        entity.requestId = data.requestId;
        entity.requestTypeCode = data.requestTypeCode;
        entity.downloadedBy = data.downloadedBy;
        if (data.id) {
            const current = await this.requestDownloadLogRepository.findOne({ where: { id: data.id } as any });
            if (current) {
                current.requestId = entity.requestId;
                current.requestTypeCode = entity.requestTypeCode;
                current.downloadedBy = entity.downloadedBy;
                return current as any;
            }
        }
        return entity;
    }

    private async toResponse(entity: RequestDownloadLogEntity): Promise<RequestDownloadLogResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            requestId: entity.requestId,
            requestTypeCode: entity.requestTypeCode,
            downloadedBy: entity.downloadedBy,
        };
    }

    async saveRequestDownloadLogPost(req: SaveRequestDownloadLogRequest): Promise<RequestDownloadLogResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.requestDownloadLogRepository.save(entity);
        return this.toResponse(saved);
    }

    async findRequestDownloadLogByIdGet(id: number): Promise<RequestDownloadLogResponse> {
        const entity = await this.requestDownloadLogRepository.findOne({ where: { id } as any });
        if (!entity) throw new Error("RequestDownloadLog not found");
        return this.toResponse(entity as any);
    }

    async findRequestDownloadLogsByRequestGet(requestId: number): Promise<RequestDownloadLogResponse[]> {
        const list = await this.requestDownloadLogRepository.find({ where: { requestId } as any } as any);
        return Promise.all(list.map(e => this.toResponse(e as any)));
    }
}