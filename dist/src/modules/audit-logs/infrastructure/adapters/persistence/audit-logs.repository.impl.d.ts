import { SupabaseClient } from '@supabase/supabase-js';
export declare class AuditLogsRepositoryImpl {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    listAuditLogs(params: {
        page: number;
        limit: number;
        user_id?: string;
        entity_type?: string;
        entity_id?: string;
        action?: string;
        from?: string;
        to?: string;
        sort: 'asc' | 'desc';
    }): Promise<{
        items: Array<any>;
        total: number;
    }>;
    getUsersByIds(userIds: string[]): Promise<{
        id: string;
        email: string;
    }[]>;
}
