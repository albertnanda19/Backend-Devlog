import { AppService } from './app.service';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class AppController {
    private readonly appService;
    private readonly supabase;
    constructor(appService: AppService, supabase: SupabaseClient);
    getHello(): string;
    testDbConnection(): Promise<{
        success: boolean;
        error: string;
        data?: undefined;
    } | {
        success: boolean;
        data: {
            id: any;
            email: any;
            full_name: any;
            role_name: any;
            created_at: any;
        }[];
        error?: undefined;
    }>;
}
