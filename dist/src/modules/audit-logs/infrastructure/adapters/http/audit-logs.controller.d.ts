import { GetAuditLogsQueryDto } from './dto/get-audit-logs-query.dto';
import { AuditLogsService } from '../../../application/services/audit-logs.service';
export declare class AuditLogsController {
    private readonly service;
    constructor(service: AuditLogsService);
    list(query: GetAuditLogsQueryDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        meta?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
        meta: {
            page: number;
            limit: number;
            totalItems: any;
            totalPages: number;
        };
    }>;
}
