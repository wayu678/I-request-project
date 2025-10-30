import { IRST05GeneralRequestApi, type ApproveGeneralRequestByHeaderUuidPutRequest, type CancelGeneralRequestByHeaderUuidPutRequest, type CreateGeneralRequestPostRequest, type FindGeneralRequestByHeaderUuidGetRequest, type RejectGeneralRequestByHeaderUuidPutRequest, type SendApproveGeneralRequestByHeaderUuidPutRequest, type UpdateGeneralRequestDetailByUuidPutRequest } from '../generated-api/apis/IRST05GeneralRequestApi';
import type { GeneralRequestDetailRequest, GeneralRequestDetailResponse, GeneralRequestRequest, GeneralRequestResponse, PostponeTuitionFee } from '../generated-api/models';
import { Configuration } from '../generated-api/runtime';

const configuration = new Configuration({
    credentials: 'include'
});

const generalRequestApi = new IRST05GeneralRequestApi(configuration);

export const generalRequestService = {
    async createGeneralRequestPost(generalRequestRequest: GeneralRequestRequest): Promise<GeneralRequestResponse> {
        try {
            console.log('[start][createGeneralRequestPost] request: ', generalRequestRequest);
            const response = await generalRequestApi.createGeneralRequestPost({ generalRequestRequest });
            console.log('[end][createGeneralRequestPost] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][createGeneralRequestPost]', error);
            throw error;
        }
    },
    async findGeneralRequestDetailByHeaderUuidGet(headerUuid: string): Promise<GeneralRequestDetailResponse> {
        try {
            console.log('[start][findGeneralRequestDetailByHeaderUuidGet] headerUuid: ', headerUuid);
            const response = await generalRequestApi.findGeneralRequestDetailByHeaderUuidGet({ headerUuid });
            console.log('[end][findGeneralRequestDetailByHeaderUuidGet] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][findGeneralRequestDetailByHeaderUuidGet]', error);
            throw error;
        }
    },
    async findGeneralRequestByHeaderUuidGet(headerUuid: FindGeneralRequestByHeaderUuidGetRequest): Promise<GeneralRequestResponse> {
        try {
            console.log('[start][findGeneralRequestByHeaderUuidGet] headerUuid: ', headerUuid);
            const response = await generalRequestApi.findGeneralRequestByHeaderUuidGet(headerUuid);
            console.log('[end][findGeneralRequestByHeaderUuidGet] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][findGeneralRequestByHeaderUuidGet]', error);
            throw error;
        }
    },
    async updateGeneralRequestDetailByUuidPut(generalRequestDetailRequest: GeneralRequestDetailRequest): Promise<GeneralRequestDetailResponse> {
        try {
            console.log('[start][updateGeneralRequestDetailByUuidPut] request: ', generalRequestDetailRequest);
            const response = await generalRequestApi.updateGeneralRequestDetailByUuidPut({ generalRequestDetailRequest });
            console.log('[end][updateGeneralRequestDetailByUuidPut] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][updateGeneralRequestDetailByUuidPut]', error);
            throw error;
        }
    },
    async sendApproveGeneralRequestByHeaderUuidPut(headerUuid: string): Promise<GeneralRequestResponse> {
        try {
            console.log('[start][sendApproveGeneralRequestByHeaderUuidPut] headerUuid: ', headerUuid);
            const request: SendApproveGeneralRequestByHeaderUuidPutRequest = {
                headerUuid
            };
            const response = await generalRequestApi.sendApproveGeneralRequestByHeaderUuidPut(request);
            console.log('[end][sendApproveGeneralRequestByHeaderUuidPut] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][sendApproveGeneralRequestByHeaderUuidPut]', error);
            throw error;
        }
    },
    async approveGeneralRequestByHeaderUuidPut(headerUuid: string): Promise<GeneralRequestResponse> {
        try {
            console.log('[start][approveGeneralRequestByHeaderUuidPut] headerUuid: ', headerUuid);
            const request: ApproveGeneralRequestByHeaderUuidPutRequest = {
                headerUuid
            };
            const response = await generalRequestApi.approveGeneralRequestByHeaderUuidPut(request);
            console.log('[end][approveGeneralRequestByHeaderUuidPut] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][approveGeneralRequestByHeaderUuidPut]', error);
            throw error;
        }
    },
    async rejectGeneralRequestByHeaderUuidPut(headerUuid: string): Promise<GeneralRequestResponse> {
        try {
            console.log('[start][rejectGeneralRequestByHeaderUuidPut] headerUuid: ', headerUuid);
            const request: RejectGeneralRequestByHeaderUuidPutRequest = {
                headerUuid
            };
            const response = await generalRequestApi.rejectGeneralRequestByHeaderUuidPut(request);
            console.log('[end][rejectGeneralRequestByHeaderUuidPut] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][rejectGeneralRequestByHeaderUuidPut]', error);
            throw error;
        }
    },
    async cancelGeneralRequestByHeaderUuidPut(headerUuid: string): Promise<GeneralRequestResponse> {
        try {
            console.log('[start][cancelGeneralRequestByHeaderUuidPut] headerUuid: ', headerUuid);
            const request: CancelGeneralRequestByHeaderUuidPutRequest = {
                headerUuid
            };
            const response = await generalRequestApi.cancelGeneralRequestByHeaderUuidPut(request);
            console.log('[end][cancelGeneralRequestByHeaderUuidPut] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][cancelGeneralRequestByHeaderUuidPut]', error);
            throw error;
        }
    }

}