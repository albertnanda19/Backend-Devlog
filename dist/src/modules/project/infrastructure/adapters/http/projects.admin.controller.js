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
exports.ProjectsAdminController = void 0;
const common_1 = require("@nestjs/common");
const get_admin_projects_query_dto_1 = require("./dto/get-admin-projects-query.dto");
const project_service_1 = require("../../../application/services/project.service");
const admin_guard_1 = require("../../../../users/infrastructure/guards/admin.guard");
const archive_project_dto_1 = require("./dto/archive-project.dto");
let ProjectsAdminController = class ProjectsAdminController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    async list(query) {
        const result = await this.projectService.adminListProjects(query);
        return {
            success: true,
            message: 'Berhasil mengambil daftar project',
            data: result.items,
            meta: result.meta,
        };
    }
    async archive(req, id, body) {
        const actor = req.user;
        const archived = await this.projectService.adminArchiveProject(actor.id, id, body.reason);
        return {
            success: true,
            message: 'Project berhasil di arsip',
            data: archived,
        };
    }
    async restore(req, id) {
        const actor = req.user;
        const restored = await this.projectService.adminRestoreProject(actor.id, id);
        return {
            success: true,
            message: 'Project restored successfully',
            data: restored,
        };
    }
};
exports.ProjectsAdminController = ProjectsAdminController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)('projects'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_admin_projects_query_dto_1.GetAdminProjectsQueryDto]),
    __metadata("design:returntype", Promise)
], ProjectsAdminController.prototype, "list", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)('projects/:id/archive'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, archive_project_dto_1.ArchiveProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsAdminController.prototype, "archive", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)('projects/:id/restore'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectsAdminController.prototype, "restore", null);
exports.ProjectsAdminController = ProjectsAdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectsAdminController);
//# sourceMappingURL=projects.admin.controller.js.map