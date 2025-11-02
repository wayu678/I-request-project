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

            const response = await dashboardApi.getRequests(requestParams);
            console.log('[end][getRequests] response: ', response);

            return response;
        } catch (error: any) {
            console.error('[error][getRequests]', error);
            throw error;
        }
    }
};