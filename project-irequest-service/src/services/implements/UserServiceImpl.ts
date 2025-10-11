import { UserService } from "../UserService";
import { SaveUserRequest } from "../../models/request/iram07/SaveUserRequest";
import { UserResponse } from "../../models/response/iram07/UserResponse";
import { UserRepository } from "../../repositories/UserRepository";
import { UserEntity } from "../../entities/UserEntity";
import * as crypto from "crypto";

export class UserServiceImpl implements UserService {
    private userRepository: typeof UserRepository;

    constructor() {
        this.userRepository = UserRepository;
    }

    private async toEntity(data: SaveUserRequest): Promise<UserEntity> {
        const entity = new UserEntity();
        entity.username = data.username;
        // 1) decrypt passwordEncrypted
        const decrypted = this.decryptFromFrontend(data.passwordEncrypted);
        // 2) hash with salt (one-way) ก่อนบันทึก
        entity.passwordHashed = this.hashPassword(decrypted);
        entity.roleCode = data.roleCode;
        entity.campusCode = data.campusCode;
        entity.facultyCode = data.facultyCode;
        entity.majorCode = data.majorCode;
        entity.departmentCode = data.departmentCode;
        entity.advisorCode = data.advisorCode;
        entity.phone = data.phone;
        entity.email = data.email;

        if (data.id) {
            const exists = await this.userRepository.findOne({ where: { id: data.id } });
            if (exists) {
                exists.username = entity.username;
                // อัปเดตรหัสผ่านเมื่อมีการส่ง passwordEncrypted ใหม่มา
                if (data.passwordEncrypted) {
                    exists.passwordHashed = entity.passwordHashed;
                }
                exists.roleCode = entity.roleCode;
                exists.campusCode = entity.campusCode;
                exists.facultyCode = entity.facultyCode;
                exists.majorCode = entity.majorCode;
                exists.departmentCode = entity.departmentCode;
                exists.advisorCode = entity.advisorCode;
                exists.phone = entity.phone;
                exists.email = entity.email;
                return exists;
            }
        }
        return entity;
    }

    // หมายเหตุ: ตัวอย่างนี้ใช้ AES-256-GCM โดยต้องซิงก์ค่า key/iv ระหว่าง FE/BE
    // ในโปรดักชันควรจัดเก็บคีย์ใน Secret Manager และ rotate ได้
    private decryptFromFrontend(ciphertextBase64: string): string {
        const key = Buffer.from(process.env.AUTH_AES_KEY ?? "", "base64"); // 32 bytes
        if (key.length !== 32) throw new Error("AUTH_AES_KEY invalid length");
        const payload = Buffer.from(ciphertextBase64, "base64");
        // payload = iv(12) + cipher + tag(16)
        const iv = payload.subarray(0, 12);
        const tag = payload.subarray(payload.length - 16);
        const cipher = payload.subarray(12, payload.length - 16);
        const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
        decipher.setAuthTag(tag);
        const decrypted = Buffer.concat([decipher.update(cipher), decipher.final()]).toString("utf8");
        return decrypted;
    }

    private hashPassword(plain: string): string {
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto.pbkdf2Sync(plain, salt, 120000, 64, "sha512").toString("hex");
        return `pbkdf2$sha512$120000$${salt}$${hash}`;
    }

    private async toResponse(entity: UserEntity): Promise<UserResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            username: entity.username,
            passwordHashed: entity.passwordHashed,
            roleCode: entity.roleCode,
            campusCode: entity.campusCode,
            facultyCode: entity.facultyCode,
            majorCode: entity.majorCode,
            departmentCode: entity.departmentCode,
            advisorCode: entity.advisorCode,
            phone: entity.phone,
            email: entity.email,
        };
    }

    async saveUserPost(req: SaveUserRequest): Promise<UserResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.userRepository.save(entity);
        return this.toResponse(saved);
    }

    async findUserByUsernameGet(username: string): Promise<UserResponse> {
        const entity = await this.userRepository.findOne({ where: { username } });
        if (!entity) throw new Error("User not found");
        return this.toResponse(entity);
    }
}