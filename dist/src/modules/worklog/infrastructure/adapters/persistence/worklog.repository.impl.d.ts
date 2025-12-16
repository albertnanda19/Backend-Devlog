import { SupabaseClient } from '@supabase/supabase-js';
export declare class WorklogRepositoryImpl {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    getWorklogById(id: string): Promise<any>;
    getProjectForWorklog(project_id: string): Promise<any>;
}
