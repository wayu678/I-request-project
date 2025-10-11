import { GeneralRequestEntity } from "../../entities/GeneralRequestEntity";
import { RequestHeaderEntity } from "../../entities/RequestHeaderEntity";
import { GeneralRequestRequest } from "../../models/request/GeneralRequestRequest";
import { GeneralRequestResponse } from "../../models/response/GeneralRequestResponse";
import { GeneralRequestRepository } from "../../repositories/GeneralRequestRepository";
import { RequestHeaderRepository } from "../../repositories/RequestHeaderRepository";
import { StudentRepository } from "../../repositories/StudentRepository";
import { GeneralRequestService } from "../GeneralRequestService";
import { AppDataSource } from "../../data-source";
import CONSTANTS from "../../constants/commons.constants";

export class GeneralRequestServiceImpl implements GeneralRequestService {
    private generalRequestRepository: typeof GeneralRequestRepository;
    private requestHeaderRepository: typeof RequestHeaderRepository;
    private studentRepository: typeof StudentRepository;

    constructor() {
        this.generalRequestRepository = GeneralRequestRepository;
        this.requestHeaderRepository = RequestHeaderRepository;
        this.studentRepository = StudentRepository;
    }

    private async validateRequiredFields(data: GeneralRequestRequest): Promise<void> {
        try {
            console.log('[start][validateRequiredFields] data: ', data);
            if (!data.studentCode) {
                throw new Error('Student ID is required');
            }
            if (!data.topic) {
                throw new Error('Topic is required');
            }
            if (!data.cause) {
                throw new Error('Cause is required');
            }
        } catch (error: any) {
            console.error('[error][validateRequiredFields] Error: ', error);
            throw new Error(error.message);
        }
    }

    private async generalRequestRequestMapper(data: GeneralRequestRequest): Promise<GeneralRequestEntity> {
        try {
            console.log('[start][generalRequestRequestMapper] data: ', data);
            const generalRequestEntity = new GeneralRequestEntity();

            generalRequestEntity.topic = data.topic;
            generalRequestEntity.cause = data.cause;

            console.log('[end][generalRequestRequestMapper] generalRequestEntity: ', generalRequestEntity);

            return generalRequestEntity;
        } catch (error: any) {
            console.error('[error][generalRequestRequestMapper] Error: ', error);
            throw new Error(error.message);
        }
    }

    private async requestHeaderRequestMapper(data: GeneralRequestRequest, requestId?: number): Promise<RequestHeaderEntity> {
        try {
            console.log('[start][requestHeaderRequestMapper] data: ', data);

            // Validate required fields
            if (!requestId) {
                throw new Error('Request ID is required');
            }
            if (!data.studentCode) {
                throw new Error('Student is required');
            }

            // create requestHeaderEntity
            const requestHeaderEntity = new RequestHeaderEntity();

            // set requestHeaderEntity Data
            requestHeaderEntity.requestTypeCode = CONSTANTS.REQUEST_TYPE_CODE.GENERAL_REQUEST; // General Request
            requestHeaderEntity.documentStatus = CONSTANTS.DOCUMENT_STATUS.DRAFT; // Draft
            requestHeaderEntity.requestId = requestId;

            // set student
            const studentEntity = await this.studentRepository.findOne({ where: { studentCode: data.studentCode } });
            // if (!studentEntity) {
            //     throw new Error('Student not found');
            // }
            // requestHeaderEntity.student = studentEntity;

            console.log('[end][requestHeaderRequestMapper] requestHeaderEntity: ', requestHeaderEntity);
            return requestHeaderEntity;
        } catch (error: any) {
            console.error('[error][requestHeaderRequestMapper] Error: ', error);
            throw new Error(error.message);
        }
    }

    public async createRequestPost(data: GeneralRequestRequest): Promise<GeneralRequestResponse> {
        return await AppDataSource.transaction(async transactionalEntityManager => {
            try {
                console.log('[start][createRequest] data: ', data);

                // validate required fields
                await this.validateRequiredFields(data);

                // create general request entity
                const generalRequestEntity: GeneralRequestEntity = await this.generalRequestRequestMapper(data);

                // Example: save generalRequestEntity without transaction
                // await this.generalRequestRepository.save(generalRequestEntity);

                // save generalRequestEntity with transaction
                const savedGeneralRequestEntity: GeneralRequestEntity = await transactionalEntityManager.save(generalRequestEntity).catch((error: any) => {
                    console.error('[error][createRequest] Error: ', error);
                    throw new Error(error.message);
                });
                if (!savedGeneralRequestEntity) {
                    throw new Error('Failed to create general request');
                }
                console.log('[createRequest] savedGeneralRequestEntity: ', savedGeneralRequestEntity);

                // create RequestHeaderEntity
                const requestHeaderEntity = await this.requestHeaderRequestMapper(data, savedGeneralRequestEntity.id);

                // save requestHeaderEntity
                const savedRequestHeaderEntity = await transactionalEntityManager.save(requestHeaderEntity).catch((error: any) => {
                    console.error('[error][createRequest] Error: ', error);
                    throw new Error(error.message);
                });
                console.log('[createRequest] savedRequestHeaderEntity: ', savedRequestHeaderEntity);

                // create response
                const response: GeneralRequestResponse = {
                    id: savedGeneralRequestEntity.id,
                    uuid: savedGeneralRequestEntity.uuid,
                    topic: savedGeneralRequestEntity.topic,
                    cause: savedGeneralRequestEntity.cause
                };

                console.log('[end][createRequest] response: ', response);
                // return response
                return response;
            } catch (error: any) {
                console.error('[error][createRequest] Error: ', error);
                throw new Error(error.message);
            }
        });
    }
};