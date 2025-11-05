import { DashboardApi } from '../generated-api/apis/DashboardApi';
import type { GetSummaryRequest, GetRequestsRequest } from '../generated-api/apis/DashboardApi';
import type {
    DashboardSummaryItem,
    DashboardRequestListResponse
} from '../generated-api/models';
import { Configuration } from '../generated-api/runtime';
import { apiConfigurations } from '../ApiConfigurations';

export type { DashboardSummaryItem } from '../generated-api/models/DashboardSummaryItem';
export type { DashboardTableItem as DashboardRow } from '../generated-api/models/DashboardTableItem';

const dashboardApi = new DashboardApi(apiConfigurations);

export const dashboardService = {
    
    async getSummary(params?: {
        month?: number | null;
        term?: string | null;
        year?: number | null;
        requestType?: string | null;
    }): Promise<DashboardSummaryItem[]> {
        try {
            console.log('[start][getSummary] params: ', params);

            const requestParams: GetSummaryRequest = {
                month: params?.month ?? undefined,
                term: params?.term ?? undefined,
                year: params?.year ?? undefined,
                requestType: params?.requestType ?? undefined
            };

            const response = await dashboardApi.getSummary(requestParams);
            console.log('[end][getSummary] response: ', response);

            return response;
        } catch (error: any) {
            console.error('[error][getSummary]', error);
            throw error;
        }
    },

    async getRequests(params: {
        page: number;
        pageSize: number;
        month?: number | null;
        term?: string | null;
        year?: number | null;
        requestType?: string | null;
    }): Promise<DashboardRequestListResponse> {
        try {
            console.log('[start][getRequests] params: ', params);

            const requestParams: GetRequestsRequest = {
                page: params.page,
                pageSize: params.pageSize,
                month: params.month ?? undefined,
                term: params.term ?? undefined,
                year: params.year ?? undefined,
                requestType: params.requestType ?? undefined
            };

            // ใช้ getRequestsRaw เพื่อรับ raw response ที่มี headerUuid
            const rawResponse = await dashboardApi.getRequestsRaw(requestParams);
            const rawData = await rawResponse.raw.json();
            
            console.log('[end][getRequests] raw response: ', rawData);
            
            // Map ข้อมูลด้วยตนเองเพื่อรวม headerUuid ที่อาจจะหายไปจาก generated model
            const response: DashboardRequestListResponse = {
                items: (rawData.items || []).map((item: any) => ({
                    ...item,
                    // รับ headerUuid จาก raw response (รองรับทั้ง camelCase และ snake_case)
                    headerUuid: item.headerUuid || item.header_uuid || undefined,
                })),
                total: rawData.total || 0
            };
            
            console.log('[end][getRequests] mapped response with headerUuid: ', response);
            console.log('[end][getRequests] sample items with headerUuid: ', response.items.slice(0, 3).map(i => ({ key: i.key, headerUuid: (i as any).headerUuid })));

            return response;
        } catch (error: any) {
            console.error('[error][getRequests]', error);
            throw error;
        }
    },

    async deleteRequest(headerUuid: string): Promise<{ success: boolean; message: string }> {
        try {
            console.log('[start][deleteRequest] headerUuid: ', headerUuid);

            // basePath already includes '/api', so we just need to append the path
            const baseUrl = apiConfigurations.basePath || '/api';
            // Remove trailing slash if exists to avoid double slashes
            const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
            const url = `${cleanBaseUrl}/dashboard/requests/${headerUuid}`;

            console.log('[deleteRequest] URL:', url);
            console.log('[deleteRequest] baseUrl:', baseUrl);

            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('[end][deleteRequest] response: ', data);

            return data;
        } catch (error: any) {
            console.error('[error][deleteRequest]', error);
            throw error;
        }
    }
};