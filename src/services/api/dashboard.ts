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
};

// แทนที่การใช้ apiClient ให้ใช้ fetch โดยตรงเพื่อส่ง cookies
export async function fetchDashboardSummary(params?: {
    month?: number | null;
    term?: string | null;
    year?: number | null;
    requestType?: string | null;
}): Promise<DashboardSummaryItem[]> {
    try {
        const queryParams = new URLSearchParams();

        if (params?.month) queryParams.append('month', params.month.toString());
        if (params?.term) queryParams.append('term', params.term);
        if (params?.year) queryParams.append('year', params.year.toString());
        if (params?.requestType) queryParams.append('requestType', params.requestType);

        const url = params && Object.keys(params).length > 0
            ? `http://localhost:8080/api/dashboard/summary?${queryParams}`
            : 'http://localhost:8080/api/dashboard/summary';

        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include' // ส่ง cookies อัตโนมัติ
        });

        if (!response.ok) {
            throw new Error('Failed to fetch dashboard summary');
        }

        const data = await response.json();
        return data as DashboardSummaryItem[];
    } catch (error) {
        console.error('Error fetching dashboard summary:', error);
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
        const queryParams = new URLSearchParams();
        queryParams.append('page', params.page.toString());
        queryParams.append('pageSize', params.pageSize.toString());

        if (params.month) queryParams.append('month', params.month.toString());
        if (params.term) queryParams.append('term', params.term);
        if (params.year) queryParams.append('year', params.year.toString());
        if (params.requestType) queryParams.append('requestType', params.requestType);

        const response = await fetch(`http://localhost:8080/api/dashboard/requests?${queryParams}`, {
            method: 'GET',
            credentials: 'include' // ส่ง cookies อัตโนมัติ
        });

        if (!response.ok) {
            throw new Error('Failed to fetch dashboard table');
        }

        const data = await response.json();
        return data as { items: DashboardRow[]; total: number };
    } catch (error) {
        console.error('Error fetching dashboard table:', error);
        throw error;
    }
}


