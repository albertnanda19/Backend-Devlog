import { SupabaseClient } from '@supabase/supabase-js';
export type AuditLogInput = {
    userId: string;
    action: string;
    entityType?: string | null;
    entityId?: string | null;
};
export declare class AuditLoggerService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    log(input: AuditLogInput): Promise<void>;
}
