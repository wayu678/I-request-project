import { RequestDownloadApprovalLogService } from "../RequestDownloadApprovalLogService";
import { SaveRequestDownloadApprovalLogRequest } from "../../models/request/iram07/SaveRequestDownloadApprovalLogRequest";
import { RequestDownloadApprovalLogResponse } from "../../models/response/iram07/RequestDownloadApprovalLogResponse";
import { RequestDownloadApprovalLogRepository, RequestDownloadLogRepository } from "../../repositories";
import { RequestDownloadApprovalLogEntity } from "../../entities/RequestDownloadApprovalLogEntity";

export class RequestDownloadApprovalLogServiceImpl implements RequestDownloadApprovalLogService {
    private requestDownloadApprovalLogRepository: typeof RequestDownloadApprovalLogRepository;
    private requestDownloadLogRepository: typeof RequestDownloadLogRepository;

    constructor() {
        this.requestDownloadApprovalLogRepository = RequestDownloadApprovalLogRepository as any;
        this.requestDownloadLogRepository = RequestDownloadLogRepository as any;
    }

    private async toEntity(data: SaveRequestDownloadApprovalLogRequest): Promise<RequestDownloadApprovalLogEntity> {
        const entity = new RequestDownloadApprovalLogEntity();
        entity.approver = data.approver;
        entity.approveStep = data.approveStep;
        if (data.requestDownloadLogId) {
            const log = await this.requestDownloadLogRepository.findOne({ where: { id: data.requestDownloadLogId } as any });
            if (log) entity.requestDownloadLog = log as any;
        }
        if (data.id) {
            const current = await this.requestDownloadApprovalLogRepository.findOne({ where: { id: data.id }, relations: ["requestDownloadLog"] as any } as any);
            if (current) {
                current.approver = entity.approver;
                current.approveStep = entity.approveStep;
                if (entity.requestDownloadLog) current.requestDownloadLog = entity.requestDownloadLog;
                return current as any;
            }
        }
        return entity;
    }

    private async toResponse(entity: RequestDownloadApprovalLogEntity): Promise<RequestDownloadApprovalLogResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            requestDownloadLogId: entity.requestDownloadLog?.id,
            approver: entity.approver,
            approveStep: entity.approveStep,
        };
    }

    async saveRequestDownloadApprovalLogPost(req: SaveRequestDownloadApprovalLogRequest): Promise<RequestDownloadApprovalLogResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.requestDownloadApprovalLogRepository.save(entity);
        return this.toResponse(saved);
    }

    async findRequestDownloadApprovalLogByIdGet(id: number): Promise<RequestDownloadApprovalLogResponse> {
        const entity = await this.requestDownloadApprovalLogRepository.findOne({ where: { id }, relations: ["requestDownloadLog"] as any } as any);
        if (!entity) throw new Error("RequestDownloadApprovalLog not found");
        return this.toResponse(entity as any);
    }

    async findRequestDownloadApprovalLogsByDownloadLogGet(requestDownloadLogId: number): Promise<RequestDownloadApprovalLogResponse[]> {
        const list = await this.requestDownloadApprovalLogRepository.find({ where: { requestDownloadLog: { id: requestDownloadLogId } } as any, relations: ["requestDownloadLog"] as any } as any);
        return Promise.all(list.map(e => this.toResponse(e as any)));
    }
}