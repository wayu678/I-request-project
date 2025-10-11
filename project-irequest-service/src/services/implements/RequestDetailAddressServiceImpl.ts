import { RequestDetailAddressService } from "../RequestDetailAddressService";
import { SaveRequestDetailAddressRequest } from "../../models/request/iram07/SaveRequestDetailAddressRequest";
import { RequestDetailAddressResponse } from "../../models/response/iram07/RequestDetailAddressResponse";
import { RequestDetailAddressRepository, RequestHeaderRepository } from "../../repositories";
import { RequestDetailAddressEntity } from "../../entities/RequestDetailAddressEntity";

export class RequestDetailAddressServiceImpl implements RequestDetailAddressService {
    private requestDetailAddressRepository: typeof RequestDetailAddressRepository;
    private requestHeaderRepository: typeof RequestHeaderRepository;

    constructor() {
        this.requestDetailAddressRepository = RequestDetailAddressRepository as any;
        this.requestHeaderRepository = RequestHeaderRepository as any;
    }

    private async toEntity(data: SaveRequestDetailAddressRequest): Promise<RequestDetailAddressEntity> {
        const entity = new RequestDetailAddressEntity();
        entity.houseNo = data.houseNo;
        entity.moo = data.moo;
        entity.building = data.building;
        entity.floor = data.floor;
        entity.soi = data.soi;
        entity.street = data.street;
        entity.district = data.district;
        entity.subDistrict = data.subDistrict;
        entity.province = data.province;
        entity.country = data.country;
        entity.postalCode = data.postalCode;
        if (data.requestHeaderId) {
            const header = await this.requestHeaderRepository.findOne({ where: { id: data.requestHeaderId } });
            if (header) entity.requestHeader = header;
        }
        if (data.id) {
            const current = await this.requestDetailAddressRepository.findOne({ where: { id: data.id }, relations: ["requestHeader"] as any } as any);
            if (current) {
                current.houseNo = entity.houseNo;
                current.moo = entity.moo;
                current.building = entity.building;
                current.floor = entity.floor;
                current.soi = entity.soi;
                current.street = entity.street;
                current.district = entity.district;
                current.subDistrict = entity.subDistrict;
                current.province = entity.province;
                current.country = entity.country;
                current.postalCode = entity.postalCode;
                if (entity.requestHeader) current.requestHeader = entity.requestHeader;
                return current as any;
            }
        }
        return entity;
    }

    private async toResponse(entity: RequestDetailAddressEntity): Promise<RequestDetailAddressResponse> {
        return {
            id: entity.id,
            uuid: entity.uuid,
            requestHeaderId: entity.requestHeader?.id,
            houseNo: entity.houseNo,
            moo: entity.moo,
            building: entity.building,
            floor: entity.floor,
            soi: entity.soi,
            street: entity.street,
            district: entity.district,
            subDistrict: entity.subDistrict,
            province: entity.province,
            country: entity.country,
            postalCode: entity.postalCode,
        };
    }

    async saveRequestDetailAddressPost(req: SaveRequestDetailAddressRequest): Promise<RequestDetailAddressResponse> {
        const entity = await this.toEntity(req);
        const saved = await this.requestDetailAddressRepository.save(entity);
        return this.toResponse(saved);
    }

    async findRequestDetailAddressByHeaderGet(requestHeaderId: number): Promise<RequestDetailAddressResponse> {
        const entity = await this.requestDetailAddressRepository.findOne({
            where: { requestHeader: { id: requestHeaderId } } as any,
            relations: ["requestHeader"] as any
        } as any);
        if (!entity) {
            throw new Error("ไม่พบข้อมูล RequestDetailAddress");
        }
        return await this.toResponse(entity as any);
    }
}