export declare class GetProjectsQueryDto {
    page?: number;
    limit?: number;
    status?: 'ACTIVE' | 'ARCHIVED';
    search?: string;
    sortBy?: 'createdAt' | 'title' | 'status';
    order?: 'asc' | 'desc';
}
