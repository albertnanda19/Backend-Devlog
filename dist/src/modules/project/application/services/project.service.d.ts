import { CreateProjectDto } from '../../infrastructure/adapters/http/dto/create-project.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { GetProjectsQueryDto } from '../../infrastructure/adapters/http/dto/get-projects-query.dto';
import { UpdateProjectDto } from '../../infrastructure/adapters/http/dto/update-project.dto';
import { GetProjectDetailQueryDto } from '../../infrastructure/adapters/http/dto/get-project-detail-query.dto';
import { AuditLoggerService } from '../../../../infrastructure/logger/audit-logger.service';
import { CreateWorklogDto } from '../../infrastructure/adapters/http/dto/create-worklog.dto';
import { GetWorklogsQueryDto } from '../../infrastructure/adapters/http/dto/get-worklogs-query.dto';
import { UpdateWorklogDto } from '../../infrastructure/adapters/http/dto/update-worklog.dto';
import { GetAdminProjectsQueryDto } from '../../infrastructure/adapters/http/dto/get-admin-projects-query.dto';
export declare class ProjectService {
    private readonly supabase;
    private readonly repo;
    private readonly auditLogger;
    constructor(supabase: SupabaseClient, repo: any, auditLogger: AuditLoggerService);
    createProject(userId: string, dto: CreateProjectDto): Promise<any>;
    adminArchiveProject(actorUserId: string, projectId: string, reason?: string): Promise<{
        id: any;
        status: any;
        archivedAt: any;
    }>;
    adminListProjects(query: GetAdminProjectsQueryDto): Promise<{
        items: any;
        meta: {
            page: number;
            limit: number;
            totalItems: any;
            totalPages: number;
        };
    }>;
    adminRestoreProject(actorUserId: string, projectId: string): Promise<{
        id: any;
        status: any;
        restoredAt: any;
    }>;
    listProjects(userId: string, query: GetProjectsQueryDto): Promise<{
        items: any;
        meta: {
            page: number;
            limit: number;
            totalItems: any;
            totalPages: number;
        };
    }>;
    updateProject(userId: string, projectId: string, dto: UpdateProjectDto): Promise<any>;
    getProjectDetail(userId: string, projectId: string, query: GetProjectDetailQueryDto): Promise<{
        id: any;
        title: any;
        description: any;
        techStack: any;
        status: any;
        createdAt: any;
        updatedAt: any;
        worklogs: any[] | undefined;
    }>;
    deleteProject(userId: string, projectId: string): Promise<void>;
    createWorklog(userId: string, projectId: string, dto: CreateWorklogDto): Promise<any>;
    listWorklogs(userId: string, projectId: string, query: GetWorklogsQueryDto): Promise<{
        items: any;
        meta: {
            page: number;
            limit: number;
            totalItems: any;
            totalPages: number;
        };
    }>;
    getWorklogDetail(userId: string, projectId: string, worklogId: string): Promise<{
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
    updateWorklog(userId: string, projectId: string, worklogId: string, dto: UpdateWorklogDto): Promise<any>;
    deleteWorklog(userId: string, projectId: string, worklogId: string): Promise<void>;
}
