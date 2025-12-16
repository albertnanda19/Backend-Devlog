import { GetAuditLogsQueryDto } from '../../infrastructure/adapters/http/dto/get-audit-logs-query.dto';
export declare class AuditLogsService {
    private readonly repo;
    constructor(repo: any);
    list(query: GetAuditLogsQueryDto): Promise<{
        items: any;
        meta: {
            page: number;
            limit: number;
            totalItems: any;
            totalPages: number;
        };
    }>;
}
