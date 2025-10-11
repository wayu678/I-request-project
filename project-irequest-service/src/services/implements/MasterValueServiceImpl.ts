import { MasterValueService } from "../MasterValueService";
import { MasterValueHeaderRepository } from "../../repositories/MasterValueHeaderRepository";
import { MasterValueDetailRepository } from "../../repositories/MasterValueDetailRepository";
import { MasterValueHeaderEntity } from "../../entities/MasterValueHeaderEntity";
import { MasterValueDetailEntity } from "../../entities/MasterValueDetailEntity";
import { SaveMasterValueHeaderRequest } from "../../models/request/iram06/SaveMasterValueHeaderRequest";
import { MasterValueHeaderResponse } from "../../models/response/iram06/MasterValueHeaderResponse";
import { SaveMasterValueDetailRequest } from "../../models/request/iram06/SaveMasterValueDetailRequest";
import { MasterValueDetailResponse } from "../../models/response/iram06/MasterValueDetailResponse";
import { AppDataSource } from "../../data-source";

export class MasterValueServiceImpl implements MasterValueService {
    private masterValueHeaderRepository: typeof MasterValueHeaderRepository;
    private masterValueDetailRepository: typeof MasterValueDetailRepository;

    constructor() {
        this.masterValueHeaderRepository = MasterValueHeaderRepository;
        this.masterValueDetailRepository = MasterValueDetailRepository;
    }

    private async validateHeaderRequiredFields(data: SaveMasterValueHeaderRequest): Promise<void> {
        try {
            console.log('[start][validateHeaderRequiredFields] data: ', data);
            if (!data.masterValueCode) {
                throw new Error('Master Value Code is required');
            }
            if (!data.masterValueName) {
                throw new Error('Master Value Name is required');
            }
        } catch (error: any) {
            console.error('[error][validateHeaderRequiredFields] Error: ', error);
            throw new Error(error.message);
        }
    }

    private async validateDetailRequiredFields(data: SaveMasterValueDetailRequest): Promise<void> {
        try {
            console.log('[start][validateDetailRequiredFields] data: ', data);
            if (!data.masterValueDetailCode) {
                throw new Error('Master Value Detail Code is required');
            }
            if (!data.masterValueHeaderId) {
                throw new Error('Master Value Header ID is required');
            }
        } catch (error: any) {
            console.error('[error][validateDetailRequiredFields] Error: ', error);
            throw new Error(error.message);
        }
    }

    private async headerRequestMapper(data: SaveMasterValueHeaderRequest): Promise<MasterValueHeaderEntity> {
        try {
            console.log('[start][headerRequestMapper] data: ', data);
            const headerEntity = new MasterValueHeaderEntity();

            headerEntity.masterValueCode = data.masterValueCode;
            headerEntity.masterValueName = data.masterValueName;

            console.log('[end][headerRequestMapper] headerEntity: ', headerEntity);
            return headerEntity;
        } catch (error: any) {
            console.error('[error][headerRequestMapper] Error: ', error);
            throw new Error(error.message);
        }
    }

    private async detailRequestMapper(data: SaveMasterValueDetailRequest): Promise<MasterValueDetailEntity> {
        try {
            console.log('[start][detailRequestMapper] data: ', data);
            const detailEntity = new MasterValueDetailEntity();

            detailEntity.masterValueDetailCode = data.masterValueDetailCode;
            detailEntity.descriptionTh = data.descriptionTh;
            detailEntity.descriptionEn = data.descriptionEn;
            detailEntity.sequence = data.sequence;

            // Set header relation
            if (data.masterValueHeaderId) {
                const headerEntity = await this.masterValueHeaderRepository.findOne({
                    where: { id: data.masterValueHeaderId }
                });
                if (headerEntity) {
                    detailEntity.masterValueHeaderEntity = headerEntity;
                } else {
                    throw new Error(`Master Value Header with id ${data.masterValueHeaderId} not found`);
                }
            }

            console.log('[end][detailRequestMapper] detailEntity: ', detailEntity);
            return detailEntity;
        } catch (error: any) {
            console.error('[error][detailRequestMapper] Error: ', error);
            throw new Error(error.message);
        }
    }

    private async headerResponseMapper(entity: MasterValueHeaderEntity): Promise<MasterValueHeaderResponse> {
        try {
            console.log('[start][headerResponseMapper] entity: ', entity);
            const response: MasterValueHeaderResponse = {
                id: entity.id,
                uuid: entity.uuid,
                masterValueCode: entity.masterValueCode,
                masterValueName: entity.masterValueName
            };
            console.log('[end][headerResponseMapper] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][headerResponseMapper] Error: ', error);
            throw new Error(error.message);
        }
    }

    private async detailResponseMapper(entity: MasterValueDetailEntity): Promise<MasterValueDetailResponse> {
        try {
            console.log('[start][detailResponseMapper] entity: ', entity);
            const response: MasterValueDetailResponse = {
                id: entity.id,
                uuid: entity.uuid,
                masterValueDetailCode: entity.masterValueDetailCode,
                descriptionTh: entity.descriptionTh,
                descriptionEn: entity.descriptionEn,
                sequence: entity.sequence,
                masterValueHeaderId: entity.masterValueHeaderEntity?.id
            };
            console.log('[end][detailResponseMapper] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][detailResponseMapper] Error: ', error);
            throw new Error(error.message);
        }
    }

    // บันทึก header
    async saveMasterValueHeaderPost(header: SaveMasterValueHeaderRequest): Promise<MasterValueHeaderResponse> {
        return await AppDataSource.transaction(async transactionalEntityManager => {
            try {
                console.log('[start][saveMasterValueHeaderPost] header: ', header);

                // Validate required fields
                await this.validateHeaderRequiredFields(header);

                let headerEntity: MasterValueHeaderEntity;

                if (header.id) {
                    // Update existing header
                    const existingHeader = await this.masterValueHeaderRepository.findOne({
                        where: { id: header.id }
                    });

                    if (!existingHeader) {
                        throw new Error(`Master Value Header with id ${header.id} not found`);
                    }

                    existingHeader.masterValueCode = header.masterValueCode;
                    existingHeader.masterValueName = header.masterValueName;
                    headerEntity = existingHeader;
                } else {
                    // Create new header
                    headerEntity = await this.headerRequestMapper(header);
                }

                // Save header entity with transaction
                const savedHeaderEntity = await transactionalEntityManager.save(headerEntity).catch((error: any) => {
                    console.error('[error][saveMasterValueHeaderPost] Error: ', error);
                    throw new Error(error.message);
                });

                if (!savedHeaderEntity) {
                    throw new Error('Failed to save master value header');
                }

                console.log('[saveMasterValueHeaderPost] savedHeaderEntity: ', savedHeaderEntity);

                // Create response
                const response = await this.headerResponseMapper(savedHeaderEntity);

                console.log('[end][saveMasterValueHeaderPost] response: ', response);
                return response;
            } catch (error: any) {
                console.error('[error][saveMasterValueHeaderPost] Error: ', error);
                throw new Error(error.message);
            }
        });
    }

    // บันทึก detail
    async saveMasterValueDetailPost(detail: SaveMasterValueDetailRequest): Promise<MasterValueDetailResponse> {
        return await AppDataSource.transaction(async transactionalEntityManager => {
            try {
                console.log('[start][saveMasterValueDetailPost] detail: ', detail);

                // Validate required fields
                await this.validateDetailRequiredFields(detail);

                let detailEntity: MasterValueDetailEntity;

                if (detail.id) {
                    // Update existing detail
                    const existingDetail = await this.masterValueDetailRepository.findOne({
                        where: { id: detail.id }
                    });

                    if (!existingDetail) {
                        throw new Error(`Master Value Detail with id ${detail.id} not found`);
                    }

                    existingDetail.masterValueDetailCode = detail.masterValueDetailCode;
                    existingDetail.descriptionTh = detail.descriptionTh;
                    existingDetail.descriptionEn = detail.descriptionEn;
                    existingDetail.sequence = detail.sequence;

                    if (detail.masterValueHeaderId) {
                        const headerEntity = await this.masterValueHeaderRepository.findOne({
                            where: { id: detail.masterValueHeaderId }
                        });
                        if (headerEntity) {
                            existingDetail.masterValueHeaderEntity = headerEntity;
                        }
                    }

                    detailEntity = existingDetail;
                } else {
                    // Create new detail
                    detailEntity = await this.detailRequestMapper(detail);
                }

                // Save detail entity with transaction
                const savedDetailEntity = await transactionalEntityManager.save(detailEntity).catch((error: any) => {
                    console.error('[error][saveMasterValueDetailPost] Error: ', error);
                    throw new Error(error.message);
                });

                if (!savedDetailEntity) {
                    throw new Error('Failed to save master value detail');
                }

                console.log('[saveMasterValueDetailPost] savedDetailEntity: ', savedDetailEntity);

                // Create response
                const response = await this.detailResponseMapper(savedDetailEntity);

                console.log('[end][saveMasterValueDetailPost] response: ', response);
                return response;
            } catch (error: any) {
                console.error('[error][saveMasterValueDetailPost] Error: ', error);
                throw new Error(error.message);
            }
        });
    }

    // ค้นหา header ตาม code
    async findMasterValueHeaderGet(masterValueHeaderCode: string): Promise<MasterValueHeaderResponse> {
        try {
            console.log('[start][findMasterValueHeaderGet] masterValueHeaderCode: ', masterValueHeaderCode);

            const headerEntity = await this.masterValueHeaderRepository.findOne({
                where: { masterValueCode: masterValueHeaderCode }
            });

            if (!headerEntity) {
                throw new Error(`Master Value Header with code ${masterValueHeaderCode} not found`);
            }

            console.log('[findMasterValueHeaderGet] headerEntity: ', headerEntity);

            // Create response
            const response = await this.headerResponseMapper(headerEntity);

            console.log('[end][findMasterValueHeaderGet] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][findMasterValueHeaderGet] Error: ', error);
            throw new Error(error.message);
        }
    }

    // ค้นหา detail ตาม code
    async findMasterValueDetailGet(masterValueDetailCode: string): Promise<MasterValueDetailResponse> {
        try {
            console.log('[start][findMasterValueDetailGet] masterValueDetailCode: ', masterValueDetailCode);

            const detailEntity = await this.masterValueDetailRepository.findOne({
                where: { masterValueDetailCode: masterValueDetailCode },
                relations: ['masterValueHeaderEntity']
            });

            if (!detailEntity) {
                throw new Error(`Master Value Detail with code ${masterValueDetailCode} not found`);
            }

            console.log('[findMasterValueDetailGet] detailEntity: ', detailEntity);

            // Create response
            const response = await this.detailResponseMapper(detailEntity);

            console.log('[end][findMasterValueDetailGet] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][findMasterValueDetailGet] Error: ', error);
            throw new Error(error.message);
        }
    }

    // ค้นหา details ตาม header code เรียงตาม sequence
    async findMasterValueDetailsByHeaderGet(headerCode: string): Promise<MasterValueDetailResponse[]> {
        try {
            console.log('[start][findMasterValueDetailsByHeaderGet] headerCode: ', headerCode);

            // ค้นหา header ก่อน
            const headerEntity = await this.masterValueHeaderRepository.findOne({
                where: { masterValueCode: headerCode }
            });

            if (!headerEntity) {
                throw new Error(`Master Value Header with code ${headerCode} not found`);
            }

            console.log('[findMasterValueDetailsByHeaderGet] headerEntity: ', headerEntity);

            // ค้นหา details ตาม header id และเรียงตาม sequence
            const detailEntities = await this.masterValueDetailRepository.find({
                where: { masterValueHeaderEntity: { id: headerEntity.id } },
                order: { sequence: 'ASC' }
            });

            console.log('[findMasterValueDetailsByHeaderGet] detailEntities: ', detailEntities);

            // Create response array
            const responses: MasterValueDetailResponse[] = [];
            for (const detailEntity of detailEntities) {
                const response = await this.detailResponseMapper(detailEntity);
                responses.push(response);
            }

            console.log('[end][findMasterValueDetailsByHeaderGet] responses: ', responses);
            return responses;
        } catch (error: any) {
            console.error('[error][findMasterValueDetailsByHeaderGet] Error: ', error);
            throw new Error(error.message);
        }
    }
}