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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const audit_logger_service_1 = require("../../../../infrastructure/logger/audit-logger.service");
let ProjectService = class ProjectService {
    supabase;
    repo;
    auditLogger;
    constructor(supabase, repo, auditLogger) {
        this.supabase = supabase;
        this.repo = repo;
        this.auditLogger = auditLogger;
    }
    async createProject(userId, dto) {
        const { data: user, error: userErr } = await this.supabase
            .from('users')
            .select('id,is_active')
            .eq('id', userId)
            .maybeSingle();
        if (userErr) {
            throw new common_1.BadRequestException(`Gagal memverifikasi pengguna: ${userErr.message}`);
        }
        if (!user || user.is_active === false) {
            throw new common_1.BadRequestException('Akun Anda tidak aktif');
        }
        const status = dto.status ?? 'ACTIVE';
        const created = await this.repo.createProject({
            user_id: userId,
            title: dto.title,
            description: dto.description ?? null,
            tech_stack: dto.techStack ?? null,
            status,
        });
        return created;
    }
    async adminArchiveProject(actorUserId, projectId, reason) {
        const project = await this.repo.getProjectById(projectId);
        if (!project) {
            throw new common_1.BadRequestException('Project tidak ditemukan');
        }
        if (project.status === 'ARCHIVED') {
            throw new common_1.BadRequestException('Project sudah berstatus ARCHIVED');
        }
        const updated = await this.repo.adminUpdateProjectStatus(projectId, 'ARCHIVED');
        await this.auditLogger.log({
            userId: actorUserId,
            action: 'ARCHIVE_PROJECT',
            entityType: 'project',
            entityId: projectId,
        });
        return {
            id: updated.id,
            status: updated.status,
            archivedAt: updated.updated_at,
        };
    }
    async adminListProjects(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const sort = (query.sort ?? 'desc');
        const { items, total } = await this.repo.adminListProjects({
            page,
            limit,
            user_id: query.userId,
            status: query.status,
            search: query.search?.trim() || undefined,
            include_deleted: query.includeDeleted ?? false,
            sort,
        });
        const userIds = Array.from(new Set(items.map((p) => p.user_id)));
        let userMap = {};
        if (userIds.length > 0) {
            const users = await this.repo.getUsersByIds(userIds);
            userMap = users.reduce((acc, u) => {
                acc[u.id] = u.email;
                return acc;
            }, {});
        }
        return {
            items: items.map((p) => ({
                id: p.id,
                title: p.title,
                status: p.status,
                techStack: p.tech_stack ?? null,
                owner: {
                    id: p.user_id,
                    email: userMap[p.user_id] ?? null,
                },
                createdAt: p.created_at,
            })),
            meta: {
                page,
                limit,
                totalItems: total,
                totalPages: Math.ceil((total ?? 0) / limit),
            },
        };
    }
    async adminRestoreProject(actorUserId, projectId) {
        const project = await this.repo.getProjectById(projectId);
        if (!project) {
            throw new common_1.BadRequestException('Project tidak ditemukan');
        }
        if (project.status !== 'ARCHIVED') {
            throw new common_1.BadRequestException('Project tidak berstatus ARCHIVED');
        }
        const updated = await this.repo.adminUpdateProjectStatus(projectId, 'ACTIVE');
        await this.auditLogger.log({
            userId: actorUserId,
            action: 'RESTORE_PROJECT',
            entityType: 'project',
            entityId: projectId,
        });
        return {
            id: updated.id,
            status: updated.status,
            restoredAt: updated.updated_at,
        };
    }
    async listProjects(userId, query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const status = query.status ?? 'ACTIVE';
        const sortBy = query.sortBy ?? 'createdAt';
        const order = (query.order ?? 'desc');
        const search = query.search?.trim() || undefined;
        const sortMap = {
            createdAt: 'created_at',
            title: 'title',
            status: 'status',
        };
        const sort_col = sortMap[sortBy] ?? 'created_at';
        const { items, total } = await this.repo.listProjects({
            user_id: userId,
            status,
            search,
            sort_by: sort_col,
            order,
            page,
            limit,
        });
        return {
            items,
            meta: {
                page,
                limit,
                totalItems: total,
                totalPages: Math.ceil((total ?? 0) / limit),
            },
        };
    }
    async updateProject(userId, projectId, dto) {
        const { data: user, error: userErr } = await this.supabase
            .from('users')
            .select('id,is_active')
            .eq('id', userId)
            .maybeSingle();
        if (userErr) {
            throw new common_1.BadRequestException(`Gagal memverifikasi pengguna: ${userErr.message}`);
        }
        if (!user || user.is_active === false) {
            throw new common_1.BadRequestException('Akun Anda tidak aktif');
        }
        const provided = typeof dto.title !== 'undefined' ||
            typeof dto.description !== 'undefined' ||
            typeof dto.techStack !== 'undefined' ||
            typeof dto.status !== 'undefined';
        if (!provided) {
            throw new common_1.BadRequestException('Minimal satu field harus dikirim');
        }
        const existing = await this.repo.getByIdForUser(userId, projectId);
        if (!existing) {
            throw new common_1.BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
        }
        const updated = await this.repo.updateProject(projectId, userId, {
            title: dto.title,
            description: typeof dto.description !== 'undefined' ? dto.description : undefined,
            tech_stack: typeof dto.techStack !== 'undefined' ? dto.techStack : undefined,
            status: dto.status,
        });
        return updated;
    }
    async getProjectDetail(userId, projectId, query) {
        const project = await this.repo.getByIdForUser(userId, projectId);
        if (!project) {
            throw new common_1.BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
        }
        const includeWorklogs = query.includeWorklogs ?? false;
        const worklogLimit = query.worklogLimit ?? 10;
        const worklogOrder = (query.worklogOrder ?? 'desc');
        let worklogs;
        if (includeWorklogs) {
            const rows = await this.repo.getWorklogsForProject(project.id, worklogLimit, worklogOrder);
            worklogs = rows.map((w) => ({
                id: w.id,
                logDate: w.log_date,
                activityType: w.activity_type,
                summary: w.summary,
                timeSpent: w.time_spent,
            }));
        }
        return {
            id: project.id,
            title: project.title,
            description: project.description ?? null,
            techStack: project.tech_stack ?? null,
            status: project.status,
            createdAt: project.created_at ?? null,
            updatedAt: project.updated_at ?? null,
            worklogs,
        };
    }
    async deleteProject(userId, projectId) {
        const { data: user, error: userErr } = await this.supabase
            .from('users')
            .select('id,is_active')
            .eq('id', userId)
            .maybeSingle();
        if (userErr) {
            throw new common_1.BadRequestException(`Gagal memverifikasi pengguna: ${userErr.message}`);
        }
        if (!user || user.is_active === false) {
            throw new common_1.BadRequestException('Akun Anda tidak aktif');
        }
        const existing = await this.repo.getByIdForUser(userId, projectId);
        if (!existing) {
            throw new common_1.BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
        }
        await this.repo.softDeleteProject(projectId, userId);
        await this.auditLogger.log({
            userId,
            action: 'DELETE_PROJECT',
            entityType: 'project',
            entityId: projectId,
        });
    }
    async createWorklog(userId, projectId, dto) {
        const { data: user, error: userErr } = await this.supabase
            .from('users')
            .select('id,is_active')
            .eq('id', userId)
            .maybeSingle();
        if (userErr) {
            throw new common_1.BadRequestException(`Gagal memverifikasi pengguna: ${userErr.message}`);
        }
        if (!user || user.is_active === false) {
            throw new common_1.BadRequestException('Akun Anda tidak aktif');
        }
        const project = await this.repo.getByIdForUser(userId, projectId);
        if (!project) {
            throw new common_1.BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(dto.logDate + 'T00:00:00.000Z');
        if (isNaN(inputDate.getTime())) {
            throw new common_1.BadRequestException('Format tanggal tidak valid.');
        }
        if (inputDate.getTime() > today.getTime()) {
            throw new common_1.BadRequestException('Tanggal worklog tidak boleh melebihi hari ini.');
        }
        const exists = await this.repo.existsWorklogOnDate(projectId, dto.logDate);
        if (exists) {
            throw new common_1.BadRequestException('Worklog untuk tanggal tersebut sudah ada.');
        }
        const created = await this.repo.createWorklog({
            project_id: projectId,
            log_date: dto.logDate,
            activity_type: dto.activityType,
            summary: dto.summary,
            time_spent: typeof dto.timeSpent === 'number' ? dto.timeSpent : undefined,
            blockers: typeof dto.blockers === 'string' ? dto.blockers : undefined,
        });
        await this.auditLogger.log({
            userId,
            action: 'CREATE_WORKLOG',
            entityType: 'worklog',
            entityId: created.id,
        });
        return created;
    }
    async listWorklogs(userId, projectId, query) {
        const project = await this.repo.getByIdForUser(userId, projectId);
        if (!project) {
            throw new common_1.BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
        }
        const fromDate = query.fromDate;
        const toDate = query.toDate;
        if (fromDate && toDate) {
            const from = new Date(fromDate + 'T00:00:00.000Z');
            const to = new Date(toDate + 'T00:00:00.000Z');
            if (isNaN(from.getTime()) || isNaN(to.getTime()) || from.getTime() > to.getTime()) {
                throw new common_1.BadRequestException('Rentang tanggal tidak valid (fromDate harus ≤ toDate).');
            }
        }
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const sort = (query.sort ?? 'desc');
        const { items, total } = await this.repo.listWorklogs({
            project_id: projectId,
            page,
            limit,
            from_date: fromDate,
            to_date: toDate,
            sort,
        });
        return {
            items,
            meta: {
                page,
                limit,
                totalItems: total,
                totalPages: Math.ceil((total ?? 0) / limit),
            },
        };
    }
    async getWorklogDetail(userId, projectId, worklogId) {
        const project = await this.repo.getByIdForUser(userId, projectId);
        if (!project) {
            throw new common_1.BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
        }
        const wl = await this.repo.getWorklogByIdForProject(projectId, worklogId);
        if (!wl) {
            throw new common_1.BadRequestException('Worklog tidak ditemukan');
        }
        return {
            id: wl.id,
            project: { id: project.id, title: project.title },
            logDate: wl.log_date,
            activityType: wl.activity_type,
            summary: wl.summary,
            timeSpent: wl.time_spent,
            blockers: wl.blockers,
            createdAt: wl.created_at,
            updatedAt: wl.updated_at,
        };
    }
    async updateWorklog(userId, projectId, worklogId, dto) {
        const project = await this.repo.getByIdForUser(userId, projectId);
        if (!project) {
            throw new common_1.BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
        }
        const current = await this.repo.getWorklogByIdForProject(projectId, worklogId);
        if (!current) {
            throw new common_1.BadRequestException('Worklog tidak ditemukan');
        }
        const provided = typeof dto.logDate !== 'undefined' ||
            typeof dto.activityType !== 'undefined' ||
            typeof dto.summary !== 'undefined' ||
            typeof dto.timeSpent !== 'undefined' ||
            typeof dto.blockers !== 'undefined';
        if (!provided) {
            throw new common_1.BadRequestException('Minimal satu field harus dikirim');
        }
        if (typeof dto.logDate !== 'undefined') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const inputDate = new Date(dto.logDate + 'T00:00:00.000Z');
            if (isNaN(inputDate.getTime())) {
                throw new common_1.BadRequestException('Format tanggal tidak valid.');
            }
            if (inputDate.getTime() > today.getTime()) {
                throw new common_1.BadRequestException('Tanggal worklog tidak boleh melebihi hari ini.');
            }
            const dup = await this.repo.existsOtherWorklogOnDate(projectId, dto.logDate, worklogId);
            if (dup) {
                throw new common_1.BadRequestException('Worklog untuk tanggal tersebut sudah ada.');
            }
        }
        const updated = await this.repo.updateWorklog(projectId, worklogId, {
            log_date: dto.logDate,
            activity_type: dto.activityType,
            summary: dto.summary,
            time_spent: typeof dto.timeSpent === 'number' ? dto.timeSpent : undefined,
            blockers: typeof dto.blockers === 'string' ? dto.blockers : undefined,
        });
        return updated;
    }
    async deleteWorklog(userId, projectId, worklogId) {
        const { data: user, error: userErr } = await this.supabase
            .from('users')
            .select('id,is_active')
            .eq('id', userId)
            .maybeSingle();
        if (userErr) {
            throw new common_1.BadRequestException(`Gagal memverifikasi pengguna: ${userErr.message}`);
        }
        if (!user || user.is_active === false) {
            throw new common_1.BadRequestException('Akun Anda tidak aktif');
        }
        const project = await this.repo.getByIdForUser(userId, projectId);
        if (!project) {
            throw new common_1.BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
        }
        const current = await this.repo.getWorklogByIdForProject(projectId, worklogId);
        if (!current) {
            throw new common_1.BadRequestException('Worklog tidak ditemukan');
        }
        await this.repo.softDeleteWorklog(projectId, worklogId);
        await this.auditLogger.log({
            userId,
            action: 'DELETE_WORKLOG',
            entityType: 'worklog',
            entityId: worklogId,
        });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __param(1, (0, common_1.Inject)('ProjectRepositoryToken')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient, Object, audit_logger_service_1.AuditLoggerService])
], ProjectService);
//# sourceMappingURL=project.service.js.map