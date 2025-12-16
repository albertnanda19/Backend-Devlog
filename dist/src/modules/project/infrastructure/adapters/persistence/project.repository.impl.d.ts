import { SupabaseClient } from '@supabase/supabase-js';
type CreateProjectInput = {
    user_id: string;
    title: string;
    description?: string | null;
    tech_stack?: string | null;
    status: 'ACTIVE' | 'ARCHIVED';
};
export declare class ProjectRepositoryImpl {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    createProject(input: CreateProjectInput): Promise<{
        id: string;
        title: string;
        description: string | null;
        tech_stack: string | null;
        status: "ACTIVE" | "ARCHIVED";
        created_at: string;
    }>;
    adminListProjects(params: {
        page: number;
        limit: number;
        user_id?: string;
        status?: 'ACTIVE' | 'ARCHIVED';
        search?: string;
        include_deleted?: boolean;
        sort: 'asc' | 'desc';
    }): Promise<{
        items: Array<{
            id: string;
            title: string;
            status: 'ACTIVE' | 'ARCHIVED';
            tech_stack: string | null;
            user_id: string;
            created_at: string;
        }>;
        total: number;
    }>;
    getUsersByIds(userIds: string[]): Promise<{
        id: string;
        email: string;
    }[]>;
    getProjectById(project_id: string): Promise<any>;
    adminUpdateProjectStatus(project_id: string, status: 'ACTIVE' | 'ARCHIVED'): Promise<{
        id: string;
        status: "ACTIVE" | "ARCHIVED";
        updated_at: string;
    }>;
    getByIdForUser(user_id: string, project_id: string): Promise<any>;
    updateProject(project_id: string, user_id: string, updates: {
        title?: string;
        description?: string | null;
        tech_stack?: string | null;
        status?: 'ACTIVE' | 'ARCHIVED';
    }): Promise<{
        id: string;
        title: string;
        description: string | null;
        tech_stack: string | null;
        status: "ACTIVE" | "ARCHIVED";
        updated_at: string;
    }>;
    getWorklogsForProject(project_id: string, limit: number, order: 'asc' | 'desc'): Promise<{
        id: string;
        log_date: string;
        activity_type: string;
        summary: string;
        time_spent: number | null;
    }[]>;
    softDeleteProject(project_id: string, user_id: string): Promise<{
        id: string;
        deleted_at: string;
    }>;
    existsWorklogOnDate(project_id: string, log_date: string): Promise<boolean>;
    createWorklog(input: {
        project_id: string;
        log_date: string;
        activity_type: string;
        summary: string;
        time_spent?: number | null;
        blockers?: string | null;
    }): Promise<{
        id: string;
        log_date: string;
        activity_type: string;
        summary: string;
        time_spent: number | null;
        blockers: string | null;
        created_at: string;
    }>;
    listWorklogs(params: {
        project_id: string;
        page: number;
        limit: number;
        from_date?: string;
        to_date?: string;
        sort: 'asc' | 'desc';
    }): Promise<{
        items: Array<{
            id: string;
            log_date: string;
            activity_type: string;
            summary: string;
            time_spent: number | null;
            blockers: string | null;
            created_at: string;
        }>;
        total: number;
    }>;
    getWorklogByIdForProject(project_id: string, worklog_id: string): Promise<any>;
    existsOtherWorklogOnDate(project_id: string, log_date: string, exclude_worklog_id: string): Promise<boolean>;
    updateWorklog(project_id: string, worklog_id: string, updates: {
        log_date?: string;
        activity_type?: string;
        summary?: string;
        time_spent?: number | null;
        blockers?: string | null;
    }): Promise<{
        id: string;
        log_date: string;
        activity_type: string;
        summary: string;
        time_spent: number | null;
        blockers: string | null;
        updated_at: string;
    }>;
    softDeleteWorklog(project_id: string, worklog_id: string): Promise<{
        id: string;
        deleted_at: string;
    }>;
    listProjects(params: {
        user_id: string;
        status?: 'ACTIVE' | 'ARCHIVED';
        search?: string;
        sort_by: string;
        order: 'asc' | 'desc';
        page: number;
        limit: number;
    }): Promise<{
        items: Array<{
            id: string;
            title: string;
            description: string | null;
            tech_stack: string | null;
            status: 'ACTIVE' | 'ARCHIVED';
            created_at: string;
        }>;
        total: number;
    }>;
}
export {};
