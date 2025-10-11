import { ActivityLogsService } from "../ActivityLogsService";
import { SaveActivityLogRequest } from "../../models/request/iram07/SaveActivityLogRequest";
import { ActivityLogResponse } from "../../models/response/iram07/ActivityLogResponse";
import { ActivityLogsRepository } from "../../repositories/ActivityLogsRepository";
import { ActivityLogs } from "../../entities/ActivityLogs";

export class ActivityLogsServiceImpl implements ActivityLogsService {
    private activityLogsRepository: typeof ActivityLogsRepository;

    constructor() {
        this.activityLogsRepository = ActivityLogsRepository as any;
    }

    private async toEntity(data: SaveActivityLogRequest): Promise<ActivityLogs> {
        const entity = new ActivityLogs();
        entity.action = data.action;
        entity.description1 = data.description1;
        entity.description2 = data.description2;
        entity.programCode = data.programCode;
        entity.username = data.username;
        entity.studentCode = data.studentCode;
        entity.userAgent = data.userAgent;
        if (data.id) {
            const current = await this.activityLogsRepository.findOne({ where: { id: data.id } });
            if (current) {
                current.action = entity.action;
                current.description1 = entity.description1;
                current.description2 = entity.description2;
                current.programCode = entity.programCode;
                current.username = entity.username;
                current.studentCode = entity.studentCode;
                current.userAgent = entity.userAgent;
                return current;
            }
        }
        return entity;
    }

    private async toResponse(entity: ActivityLogs): Promise<ActivityLogResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            action: entity.action,
            description1: entity.description1,
            description2: entity.description2,
            programCode: entity.programCode,
            username: entity.username,
            studentCode: entity.studentCode,
            userAgent: entity.userAgent,
        };
    }

    async saveActivityLogPost(req: SaveActivityLogRequest): Promise<ActivityLogResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.activityLogsRepository.save(entity);
        return this.toResponse(saved);
    }
}