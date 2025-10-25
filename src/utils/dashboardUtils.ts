// Translation functions for dashboard data
export const createTranslationFunctions = (translate: (th: string, en: string) => string) => ({
    translateStatus: (status: string) => {
        switch (status) {
            case 'ร่าง': return translate('ร่าง', 'Draft');
            case 'กำลังดำเนินการ': return translate('กำลังดำเนินการ', 'In Progress');
            case 'ส่งกลับแก้ไข': return translate('ส่งกลับแก้ไข', 'Returned for Revision');
            case 'เสร็จสิ้น': return translate('เสร็จสิ้น', 'Completed');
            case 'ยกเลิก': return translate('ยกเลิก', 'Cancelled');
            default: return status;
        }
    },

    translateSemester: (semester: string) => {
        switch (semester) {
            case 'ภาคต้น': return translate('ภาคต้น', 'First Semester');
            case 'ภาคปลาย': return translate('ภาคปลาย', 'Second Semester');
            case 'ภาคฤดูร้อน': return translate('ภาคฤดูร้อน', 'Summer Semester');
            default: return semester;
        }
    },

    translateRequestType: (requestType: string) => {
        switch (requestType) {
            case 'คำร้องทั่วไป': return translate('คำร้องทั่วไป', 'General Request');
            case 'คำร้องขอสอบชดเชย': return translate('คำร้องขอสอบชดเชย', 'Make-up Exam Request');
            case 'คำร้องขอย้ายคณะ': return translate('คำร้องขอย้ายคณะ', 'Faculty Transfer Request');
            case 'คำร้องขอเทียบโอนรายวิชา': return translate('คำร้องขอเทียบโอนรายวิชา', 'Credit Transfer Request');
            case 'คำร้องขอลงทะเบียนเรียน': return translate('คำร้องขอลงทะเบียนเรียน', 'Registration Request');
            default: return requestType;
        }
    }
});

// Mock data generators
export const createMockChartData = (translate: (th: string, en: string) => string) => [
    { name: translate('ร่าง', 'Draft'), value: 45, color: '#8C8C8C' },
    { name: translate('กำลังดำเนินการ', 'In Progress'), value: 30, color: '#13C2C2' },
    { name: translate('ส่งกลับแก้ไข', 'Returned for Revision'), value: 15, color: '#FF4D4F' },
    { name: translate('เสร็จสิ้น', 'Completed'), value: 10, color: '#03BC77' }
];

export const createDefaultChartData = (translate: (th: string, en: string) => string) => [
    { name: translate('ร่าง', 'Draft'), value: 1, color: '#989898' },
    { name: translate('กำลังดำเนินการ', 'In Progress'), value: 1, color: '#17A2B8' },
    { name: translate('ส่งกลับแก้ไข', 'Returned for Revision'), value: 1, color: '#FF3B30' },
    { name: translate('เสร็จสิ้น', 'Completed'), value: 1, color: '#03BC77' }
];

export const createMockTableData = (translate: (th: string, en: string) => string) => [
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
        requestType: 'คำร้องขอสอบชดเชย',
        status: 'กำลังดำเนินการ',
        statusColor: '#13C2C2'
    },
    {
        key: '3',
        no: 3,
        documentDate: '12/07/2568',
        term: 'ภาคต้น',
        academicYear: '2568',
        requestType: 'คำร้องขอย้ายคณะ',
        status: 'ส่งกลับแก้ไข',
        statusColor: '#FF4D4F'
    },
    {
        key: '4',
        no: 4,
        documentDate: '13/07/2568',
        term: 'ภาคปลาย',
        academicYear: '2568',
        requestType: 'คำร้องขอเทียบโอนรายวิชา',
        status: 'ยกเลิก',
        statusColor: '#FA8C16'
    },
    {
        key: '5',
        no: 5,
        documentDate: '14/07/2568',
        term: 'ภาคต้น',
        academicYear: '2568',
        requestType: 'คำร้องขอลงทะเบียนเรียน',
        status: 'เสร็จสิ้น',
        statusColor: '#03BC77'
    }
];

// Options generators
export const createSemesterOptions = (translate: (th: string, en: string) => string) => [
    { label: translate('ภาคต้น', 'First Semester'), value: 'ภาคต้น' },
    { label: translate('ภาคปลาย', 'Second Semester'), value: 'ภาคปลาย' },
    { label: translate('ภาคฤดูร้อน', 'Summer Semester'), value: 'ภาคฤดูร้อน' }
];

export const createRequestTypeOptions = (translate: (th: string, en: string) => string) => [
    { label: translate('คำร้องทั่วไป', 'General Request'), value: 'คำร้องทั่วไป' }
];

// Status color mapping
export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'ร่าง': return '#989898';
        case 'กำลังดำเนินการ': return '#17A2B8';
        case 'ส่งกลับแก้ไข': return '#FF3B30';
        case 'ยกเลิก': return '#FF9D00';
        case 'เสร็จสิ้น': return '#03BC77';
        default: return '#989898';
    }
};
