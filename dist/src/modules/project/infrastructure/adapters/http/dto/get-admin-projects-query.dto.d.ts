export declare class GetAdminProjectsQueryDto {
    page?: number;
    limit?: number;
    userId?: string;
    status?: 'ACTIVE' | 'ARCHIVED';
    search?: string;
    includeDeleted?: boolean;
    sort?: 'asc' | 'desc';
}
