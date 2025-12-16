import { SupabaseClient } from '@supabase/supabase-js';
export declare class RolesController {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    list(): Promise<{
        success: boolean;
        message: string;
        data: {
            id: any;
            name: any;
        }[];
    }>;
}
