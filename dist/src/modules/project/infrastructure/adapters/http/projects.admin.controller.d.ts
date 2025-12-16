import { GetAdminProjectsQueryDto } from './dto/get-admin-projects-query.dto';
import { ProjectService } from '../../../application/services/project.service';
import { ArchiveProjectDto } from './dto/archive-project.dto';
import type { Request } from 'express';
export declare class ProjectsAdminController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    list(query: GetAdminProjectsQueryDto): Promise<{
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
    archive(req: Request, id: string, body: ArchiveProjectDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: any;
            status: any;
            archivedAt: any;
        };
    }>;
    restore(req: Request, id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: any;
            status: any;
            restoredAt: any;
        };
    }>;
}
