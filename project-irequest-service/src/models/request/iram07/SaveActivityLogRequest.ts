export interface SaveActivityLogRequest {
    id?: number;
    action: string;
    description1?: string;
    description2?: string;
    programCode?: string;
    username?: string;
    studentCode?: string;
    userAgent?: string;
}