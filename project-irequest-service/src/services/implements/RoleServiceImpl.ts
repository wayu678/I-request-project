import { RoleService } from "../RoleService";
import { SaveRoleRequest } from "../../models/request/iram07/SaveRoleRequest";
import { RoleResponse } from "../../models/response/iram07/RoleResponse";
import { RoleRepository } from "../../repositories/RoleRepository";
import { RoleEntity } from "../../entities/RoleEntity";

export class RoleServiceImpl implements RoleService {
    private roleRepository: typeof RoleRepository;

    constructor() {
        this.roleRepository = RoleRepository;
    }

    private async toEntity(data: SaveRoleRequest): Promise<RoleEntity> {
        const entity = new RoleEntity();
        entity.code = data.code;
        entity.nameTh = data.nameTh;
        entity.nameEn = data.nameEn;
        if (data.id) {
            const exists = await this.roleRepository.findOne({ where: { id: data.id } });
            if (exists) {
                exists.code = entity.code;
                exists.nameTh = entity.nameTh;
                exists.nameEn = entity.nameEn;
                return exists;
            }
        }
        return entity;
    }

    private async toResponse(entity: RoleEntity): Promise<RoleResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            code: entity.code,
            nameTh: entity.nameTh,
            nameEn: entity.nameEn,
        };
    }

    async saveRolePost(req: SaveRoleRequest): Promise<RoleResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.roleRepository.save(entity);
        return this.toResponse(saved);
    }

    async findRoleByCodeGet(code: string): Promise<RoleResponse> {
        const entity = await this.roleRepository.findOne({ where: { code } });
        if (!entity) throw new Error("Role not found");
        return this.toResponse(entity);
    }
}