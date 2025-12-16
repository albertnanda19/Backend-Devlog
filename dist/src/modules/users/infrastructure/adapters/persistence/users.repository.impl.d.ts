import { SupabaseClient } from '@supabase/supabase-js';
export declare class UsersRepositoryImpl {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    listUsers(params: {
        page: number;
        limit: number;
        role_id?: string;
        is_active?: boolean;
        search?: string;
        sort_by: string;
        order: 'asc' | 'desc';
    }): Promise<{
        items: Array<any>;
        total: number;
    }>;
    getUserById(userId: string): Promise<any>;
    getRoleById(roleId: string): Promise<any>;
    getUserStats(userId: string): Promise<{
        totalProjects: number;
        totalWorklogs: number;
        totalTimeSpent: number;
    }>;
    listUserProjects(userId: string, limit: number): Promise<{
        id: string;
        title: string;
        status: string;
        created_at: string;
    }[]>;
    updateUserStatus(userId: string, isActive: boolean): Promise<{
        id: string;
        email: string;
        is_active: boolean;
        updated_at: string;
    }>;
    updateUserRole(userId: string, roleId: string): Promise<{
        id: string;
        email: string;
        role_id: string;
        updated_at: string;
    }>;
}
