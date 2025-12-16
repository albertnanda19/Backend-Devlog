export declare class GetAuditLogsQueryDto {
    page?: number;
    limit?: number;
    userId?: string;
    entityType?: 'USER' | 'PROJECT' | 'WORKLOG';
    entityId?: string;
    action?: string;
    from?: string;
    to?: string;
    sort?: 'asc' | 'desc';
}
