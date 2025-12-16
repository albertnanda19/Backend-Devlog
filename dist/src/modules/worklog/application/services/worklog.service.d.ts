import { SupabaseClient } from '@supabase/supabase-js';
export declare class WorklogService {
    private readonly supabase;
    private readonly repo;
    constructor(supabase: SupabaseClient, repo: any);
    getWorklogDetail(userId: string, worklogId: string): Promise<{
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
    }>;
}
