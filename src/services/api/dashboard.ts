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
        // Mock data for development
        const mockData: DashboardSummaryItem[] = [
            { name: 'ร่าง', value: 45, color: '#8C8C8C' },
            { name: 'กำลังดำเนินการ', value: 30, color: '#13C2C2' },
            { name: 'ส่งกลับแก้ไข', value: 15, color: '#FF4D4F' },
            { name: 'เสร็จสิ้น', value: 10, color: '#52C41A' }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return mockData;
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
        // Mock data for development
        const mockData: DashboardRow[] = [
            {
                key: '1',
                no: 1,
                documentDate: '10/07/2568',
                term: 'ภาคต้น',
                academicYear: '2568',
                requestType: 'คำร้องทั่วไป',
                status: 'ร่าง',
                statusColor: '#8C8C8C'
            },
            {
                key: '2',
                no: 2,
                documentDate: '11/07/2568',
                term: 'ภาคปลาย',
                academicYear: '2568',
                requestType: 'คำร้องทั่วไป',
                status: 'กำลังดำเนินการ',
                statusColor: '#13C2C2'
            },
            {
                key: '3',
                no: 3,
                documentDate: '12/07/2568',
                term: 'ภาคต้น',
                academicYear: '2568',
                requestType: 'คำร้องทั่วไป',
                status: 'ส่งกลับแก้ไข',
                statusColor: '#FF4D4F'
            },
            {
                key: '4',
                no: 4,
                documentDate: '13/07/2568',
                term: 'ภาคปลาย',
                academicYear: '2568',
                requestType: 'คำร้องทั่วไป',
                status: 'เสร็จสิ้น',
                statusColor: '#52C41A'
            },
            {
                key: '5',
                no: 5,
                documentDate: '14/07/2568',
                term: 'ภาคต้น',
                academicYear: '2568',
                requestType: 'คำร้องทั่วไป',
                status: 'ร่าง',
                statusColor: '#8C8C8C'
            }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
            items: mockData,
            total: mockData.length
        };
    } catch (error) {
        console.error('Error fetching dashboard table:', error);
        throw error;
    }
}


