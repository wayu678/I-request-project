import { UserSignatureService } from "../UserSignatureService";
import { SaveUserSignatureRequest } from "../../models/request/iram07/SaveUserSignatureRequest";
import { UserSignatureResponse } from "../../models/response/iram07/UserSignatureResponse";
import { UserSignatureRepository, UserRepository } from "../../repositories";
import { UserSignatureEntity } from "../../entities/UserSignatureEntity";

export class UserSignatureServiceImpl implements UserSignatureService {
    private userSignatureRepository: typeof UserSignatureRepository;
    private userRepository: typeof UserRepository;

    constructor() {
        this.userSignatureRepository = UserSignatureRepository as any;
        this.userRepository = UserRepository as any;
    }

    private async toEntity(data: SaveUserSignatureRequest): Promise<UserSignatureEntity> {
        const entity = new UserSignatureEntity();
        entity.signatureUrl = data.signatureUrl;
        entity.fileType = data.fileType;
        entity.fileSize = data.fileSize;
        entity.sequence = data.sequence ?? 1;
        if (data.userId) {
            const user = await this.userRepository.findOne({ where: { id: data.userId } });
            if (user) entity.user = user;
        }
        if (data.id) {
            const current = await this.userSignatureRepository.findOne({ where: { id: data.id }, relations: ["user"] as any });
            if (current) {
                current.signatureUrl = entity.signatureUrl;
                current.fileType = entity.fileType;
                current.fileSize = entity.fileSize;
                current.sequence = entity.sequence;
                if (entity.user) current.user = entity.user;
                return current;
            }
        }
        return entity;
    }

    private async toResponse(entity: UserSignatureEntity): Promise<UserSignatureResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            userId: entity.user?.id,
            signatureUrl: entity.signatureUrl,
            fileType: entity.fileType,
            fileSize: entity.fileSize,
            sequence: entity.sequence,
        };
    }

    async saveUserSignaturePost(req: SaveUserSignatureRequest): Promise<UserSignatureResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.userSignatureRepository.save(entity);
        return this.toResponse(saved);
    }
}