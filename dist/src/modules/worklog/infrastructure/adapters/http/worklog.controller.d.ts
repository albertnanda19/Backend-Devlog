import type { Request } from 'express';
import { WorklogService } from '../../../application/services/worklog.service';
export declare class WorklogController {
    private readonly worklogService;
    constructor(worklogService: WorklogService);
    getOne(req: Request, id: string): Promise<{
        success: boolean;
        data: {
            id: any;
            project: {
                id: any;
                title: any;
            };
            logDate: any;
            activityType: any;
            summary: any;
            timeSpent: any;
            blockers: any;
            createdAt: any;
            updatedAt: any;
        };
    }>;
}
