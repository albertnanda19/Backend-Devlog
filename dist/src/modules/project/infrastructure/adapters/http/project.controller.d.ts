import type { Request } from 'express';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from '../../../application/services/project.service';
import { GetProjectsQueryDto } from './dto/get-projects-query.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectDetailQueryDto } from './dto/get-project-detail-query.dto';
import { CreateWorklogDto } from './dto/create-worklog.dto';
import { GetWorklogsQueryDto } from './dto/get-worklogs-query.dto';
import { UpdateWorklogDto } from './dto/update-worklog.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(req: Request, body: CreateProjectDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: any;
            title: any;
            description: any;
            techStack: any;
            status: any;
            createdAt: any;
        };
    }>;
    deleteWorklog(req: Request, projectId: string, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    list(req: Request, query: GetProjectsQueryDto): Promise<{
        success: boolean;
        message: string;
        data: any;
        meta: {
            page: number;
            limit: number;
            totalItems: any;
            totalPages: number;
        };
    }>;
    update(req: Request, id: string, body: UpdateProjectDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: any;
            title: any;
            description: any;
            techStack: any;
            status: any;
            updatedAt: any;
        };
    }>;
    getOne(req: Request, id: string, query: GetProjectDetailQueryDto): Promise<{
        success: boolean;
        data: {
            id: any;
            title: any;
            description: any;
            techStack: any;
            status: any;
            createdAt: any;
            updatedAt: any;
        } | {
            worklogs: any[];
            id: any;
            title: any;
            description: any;
            techStack: any;
            status: any;
            createdAt: any;
            updatedAt: any;
        };
    }>;
    remove(req: Request, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    createWorklog(req: Request, projectId: string, body: CreateWorklogDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: any;
            logDate: any;
            activityType: any;
            summary: any;
            timeSpent: any;
            blockers: any;
            createdAt: any;
        };
    }>;
    listWorklogs(req: Request, projectId: string, query: GetWorklogsQueryDto): Promise<{
        success: boolean;
        message: string;
        data: any;
        meta: {
            page: number;
            limit: number;
            totalItems: any;
            totalPages: number;
        };
    }>;
    getWorklogDetail(req: Request, projectId: string, id: string): Promise<{
        success: boolean;
        message: string;
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
    updateWorklog(req: Request, projectId: string, id: string, body: UpdateWorklogDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: any;
            logDate: any;
            activityType: any;
            summary: any;
            timeSpent: any;
            blockers: any;
            updatedAt: any;
        };
    }>;
}
