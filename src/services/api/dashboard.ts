import { apiClient } from './http.interceptor';

export type DashboardSummaryItem = {
    name: string;
    value: number;
    color?: string;
};

export type DashboardRow = {
    key: string;
    no: number;
    documentDate: string;
    term: string;
    academicYear: string;
    requestType: string;
    status: string;
    statusColor?: string;
    headerUuid?: string;
};

// เรียกใช้ API จริงจาก backend แทน mock data
export async function fetchDashboardSummary(params?: {
    month?: number | null;
    term?: string | null;
    year?: number | null;
    requestType?: string | null;
}): Promise<DashboardSummaryItem[]> {
    try {
        console.log('[Dashboard API] Fetching summary with params:', params);

        // สร้าง query parameters
        const queryParams = new URLSearchParams();
        if (params?.month) queryParams.append('month', params.month.toString());
        if (params?.term) queryParams.append('term', params.term);
        if (params?.year) queryParams.append('year', params.year.toString());
        if (params?.requestType) queryParams.append('requestType', params.requestType);

        const queryString = queryParams.toString();
        const url = `/api/dashboard/summary${queryString ? `?${queryString}` : ''}`;

        console.log('[Dashboard API] Request URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // ส่ง cookies อัตโนมัติ
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('[Dashboard API] Summary response:', data);

        return data;
    } catch (error) {
        console.error('[Dashboard API] Error fetching summary:', error);
        throw error;
    }
}

export async function fetchDashboardTable(params: {
    page: number;
    pageSize: number;
    month?: number | null;
    term?: string | null;
    year?: number | null;
    requestType?: string | null;
}): Promise<{ items: DashboardRow[]; total: number }> {
    try {
        console.log('[Dashboard API] Fetching table with params:', params);

        // สร้าง query parameters
        const queryParams = new URLSearchParams();
        queryParams.append('page', params.page.toString());
        queryParams.append('pageSize', params.pageSize.toString());
        if (params.month) queryParams.append('month', params.month.toString());
        if (params.term) queryParams.append('term', params.term);
        if (params.year) queryParams.append('year', params.year.toString());
        if (params.requestType) queryParams.append('requestType', params.requestType);

        const queryString = queryParams.toString();
        const url = `/api/dashboard/requests?${queryString}`;

        console.log('[Dashboard API] Request URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // ส่ง cookies อัตโนมัติ
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('[Dashboard API] Table response:', data);

        return data;
    } catch (error) {
        console.error('[Dashboard API] Error fetching table:', error);
        throw error;
    }
}


