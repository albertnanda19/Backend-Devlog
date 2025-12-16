"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const create_project_dto_1 = require("./dto/create-project.dto");
const project_service_1 = require("../../../application/services/project.service");
const get_projects_query_dto_1 = require("./dto/get-projects-query.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const get_project_detail_query_dto_1 = require("./dto/get-project-detail-query.dto");
const create_worklog_dto_1 = require("./dto/create-worklog.dto");
const get_worklogs_query_dto_1 = require("./dto/get-worklogs-query.dto");
const update_worklog_dto_1 = require("./dto/update-worklog.dto");
let ProjectController = class ProjectController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    async create(req, body) {
        const auth = req.user;
        const project = await this.projectService.createProject(auth.id, body);
        return {
            success: true,
            message: 'Berhasil membuat project',
            data: {
                id: project.id,
                title: project.title,
                description: project.description ?? null,
                techStack: project.tech_stack ?? null,
                status: project.status,
                createdAt: project.created_at,
            },
        };
    }
    async deleteWorklog(req, projectId, id) {
        const auth = req.user;
        await this.projectService.deleteWorklog(auth.id, projectId, id);
        return {
            success: true,
            message: 'Berhasil menghapus worklog',
        };
    }
    async list(req, query) {
        const auth = req.user;
        const result = await this.projectService.listProjects(auth.id, query);
        return {
            success: true,
            message: 'Berhasil mengambil project',
            data: result.items.map((p) => ({
                id: p.id,
                title: p.title,
                description: p.description ?? null,
                techStack: p.tech_stack ?? null,
                status: p.status,
                createdAt: p.created_at,
            })),
            meta: result.meta,
        };
    }
    async update(req, id, body) {
        const auth = req.user;
        const updated = await this.projectService.updateProject(auth.id, id, body);
        return {
            success: true,
            message: 'Berhasil memperbarui project',
            data: {
                id: updated.id,
                title: updated.title,
                description: updated.description ?? null,
                techStack: updated.tech_stack ?? null,
                status: updated.status,
                updatedAt: updated.updated_at,
            },
        };
    }
    async getOne(req, id, query) {
        const auth = req.user;
        const detail = await this.projectService.getProjectDetail(auth.id, id, query);
        const { worklogs, ...rest } = detail;
        return {
            success: true,
            data: worklogs
                ? { ...rest, worklogs }
                : rest,
        };
    }
    async remove(req, id) {
        const auth = req.user;
        await this.projectService.deleteProject(auth.id, id);
        return {
            success: true,
            message: 'Berhasil menghapus project',
        };
    }
    async createWorklog(req, projectId, body) {
        const auth = req.user;
        const wl = await this.projectService.createWorklog(auth.id, projectId, body);
        return {
            success: true,
            message: 'Worklog created successfully',
            data: {
                id: wl.id,
                logDate: wl.log_date,
                activityType: wl.activity_type,
                summary: wl.summary,
                timeSpent: wl.time_spent,
                blockers: wl.blockers,
                createdAt: wl.created_at,
            },
        };
    }
    async listWorklogs(req, projectId, query) {
        const auth = req.user;
        const result = await this.projectService.listWorklogs(auth.id, projectId, query);
        return {
            success: true,
            message: 'Berhasil mengambil worklog',
            data: result.items.map((w) => ({
                id: w.id,
                logDate: w.log_date,
                activityType: w.activity_type,
                summary: w.summary,
                timeSpent: w.time_spent,
                blockers: w.blockers,
                createdAt: w.created_at,
            })),
            meta: result.meta,
        };
    }
    async getWorklogDetail(req, projectId, id) {
        const auth = req.user;
        const detail = await this.projectService.getWorklogDetail(auth.id, projectId, id);
        return {
            success: true,
            message: 'Berhasil mengambil worklog',
            data: detail,
        };
    }
    async updateWorklog(req, projectId, id, body) {
        const auth = req.user;
        const updated = await this.projectService.updateWorklog(auth.id, projectId, id, body);
        return {
            success: true,
            message: 'Berhasil mengupdate worklog',
            data: {
                id: updated.id,
                logDate: updated.log_date,
                activityType: updated.activity_type,
                summary: updated.summary,
                timeSpent: updated.time_spent,
                blockers: updated.blockers,
                updatedAt: updated.updated_at,
            },
        };
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':projectId/worklogs/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteWorklog", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_projects_query_dto_1.GetProjectsQueryDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "list", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, get_project_detail_query_dto_1.GetProjectDetailQueryDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':projectId/worklogs'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_worklog_dto_1.CreateWorklogDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createWorklog", null);
__decorate([
    (0, common_1.Get)(':projectId/worklogs'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, get_worklogs_query_dto_1.GetWorklogsQueryDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "listWorklogs", null);
__decorate([
    (0, common_1.Get)(':projectId/worklogs/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getWorklogDetail", null);
__decorate([
    (0, common_1.Put)(':projectId/worklogs/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, update_worklog_dto_1.UpdateWorklogDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateWorklog", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map