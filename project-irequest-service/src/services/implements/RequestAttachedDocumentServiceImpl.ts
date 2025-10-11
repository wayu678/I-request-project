import { RequestAttachedDocumentService } from "../RequestAttachedDocumentService";
import { SaveRequestAttachedDocumentRequest } from "../../models/request/iram07/SaveRequestAttachedDocumentRequest";
import { RequestAttachedDocumentResponse } from "../../models/response/iram07/RequestAttachedDocumentResponse";
import { RequestAttachedDocumentRepository, RequestHeaderRepository } from "../../repositories";
import { RequestAttachedDocumentEntity } from "../../entities/RequestAttachedDocumentEntity";

export class RequestAttachedDocumentServiceImpl implements RequestAttachedDocumentService {
    private requestAttachedDocumentRepository: typeof RequestAttachedDocumentRepository;
    private requestHeaderRepository: typeof RequestHeaderRepository;

    constructor() {
        this.requestAttachedDocumentRepository = RequestAttachedDocumentRepository as any;
        this.requestHeaderRepository = RequestHeaderRepository as any;
    }

    private async toEntity(data: SaveRequestAttachedDocumentRequest): Promise<RequestAttachedDocumentEntity> {
        const entity = new RequestAttachedDocumentEntity();
        entity.documentName = data.documentName;
        entity.documentUrl = data.documentUrl;
        entity.fileType = data.fileType;
        entity.fileSize = data.fileSize;
        if (data.requestHeaderId) {
            const header = await this.requestHeaderRepository.findOne({ where: { id: data.requestHeaderId } });
            if (header) entity.requestHeader = header;
        }
        if (data.id) {
            const current = await this.requestAttachedDocumentRepository.findOne({ where: { id: data.id }, relations: ["requestHeader"] as any } as any);
            if (current) {
                current.documentName = entity.documentName;
                current.documentUrl = entity.documentUrl;
                current.fileType = entity.fileType;
                current.fileSize = entity.fileSize;
                if (entity.requestHeader) current.requestHeader = entity.requestHeader;
                return current as any;
            }
        }
        return entity;
    }

    private async toResponse(entity: RequestAttachedDocumentEntity): Promise<RequestAttachedDocumentResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            requestHeaderId: entity.requestHeader?.id,
            documentName: entity.documentName,
            documentUrl: entity.documentUrl,
            fileType: entity.fileType,
            fileSize: entity.fileSize,
        };
    }

    async saveRequestAttachedDocumentPost(req: SaveRequestAttachedDocumentRequest): Promise<RequestAttachedDocumentResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.requestAttachedDocumentRepository.save(entity);
        return this.toResponse(saved);
    }

    async findRequestAttachedDocumentsByHeaderGet(requestHeaderId: number): Promise<RequestAttachedDocumentResponse[]> {
        const list = await this.requestAttachedDocumentRepository.find({ where: { requestHeader: { id: requestHeaderId } } as any, relations: ["requestHeader"] as any } as any);
        return Promise.all(list.map(e => this.toResponse(e as any)));
    }
}