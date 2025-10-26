import { RequestTypeManagementApi, type GetRequestTypesRequest, type GetRequestTypeByUuidRequest } from '../generated-api/apis/RequestTypeManagementApi';
import type { RequestTypeResponse, GetRequestTypesResponse } from '../generated-api/models';
import { Configuration } from '../generated-api/runtime';

// สร้าง configuration สำหรับ API
const configuration = new Configuration({
    basePath: '/api', // ใช้ proxy แทนการระบุ URL เต็ม
    credentials: 'include' // ✅ เพิ่ม credentials เพื่อส่ง cookies
});

// สร้าง API instance
const requestTypeApi = new RequestTypeManagementApi(configuration);

// Interface สำหรับ table row (ใช้ใน component)
export interface RequestTypeRow {
    key: string;
    no: number;
    requestCode: string;
    requestName: string;
    status: string;
    statusColor?: string;
    uuid?: string;
}

// Interface สำหรับ request parameters
export interface GetRequestTypesParams {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
}

export const requestTypeService = {
    /**
     * ดึงรายการ Request Type ทั้งหมด
     */
    async getRequestTypes(params: GetRequestTypesParams = {}): Promise<GetRequestTypesResponse> {
        try {
            console.log('[start][getRequestTypes] params: ', params);

            const requestParams: GetRequestTypesRequest = {
                page: params.page || 1,
                pageSize: params.pageSize || 10,
                search: params.search,
                status: params.status
            };

            const response = await requestTypeApi.getRequestTypes(requestParams);
            console.log('[end][getRequestTypes] response: ', response);

            return response;
        } catch (error: any) {
            console.error('[error][getRequestTypes]', error);
            throw error;
        }
    },

    /**
     * ดึงข้อมูล Request Type ตาม UUID
     */
    async getRequestTypeByUuid(uuid: string): Promise<RequestTypeResponse | null> {
        try {
            console.log('[start][getRequestTypeByUuid] uuid: ', uuid);

            const requestParams: GetRequestTypeByUuidRequest = {
                uuid: uuid
            };

            const response = await requestTypeApi.getRequestTypeByUuid(requestParams);
            console.log('[end][getRequestTypeByUuid] response: ', response);

            return response;
        } catch (error: any) {
            console.error('[error][getRequestTypeByUuid]', error);
            throw error;
        }
    }
};
