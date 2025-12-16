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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const audit_logger_service_1 = require("../../../../infrastructure/logger/audit-logger.service");
let UsersService = class UsersService {
    supabase;
    repo;
    auditLogger;
    constructor(supabase, repo, auditLogger) {
        this.supabase = supabase;
        this.repo = repo;
        this.auditLogger = auditLogger;
    }
    async listUsers(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const order = (query.order ?? 'desc');
        const sortBy = query.sortBy ?? 'createdAt';
        const sortMap = {
            createdAt: 'created_at',
            email: 'email',
            fullName: 'full_name',
        };
        const sort_col = sortMap[sortBy] ?? 'created_at';
        let roleId;
        if (query.role) {
            const { data: role, error: roleErr } = await this.supabase
                .from('roles')
                .select('id,name')
                .eq('name', query.role)
                .maybeSingle();
            if (roleErr) {
                throw new common_1.BadRequestException(`Gagal memverifikasi role: ${roleErr.message}`);
            }
            if (!role) {
                return { items: [], total: 0 };
            }
            roleId = role.id;
        }
        const { items, total } = await this.repo.listUsers({
            page,
            limit,
            role_id: roleId,
            is_active: typeof query.isActive === 'boolean' ? query.isActive : undefined,
            search: query.search?.trim() || undefined,
            sort_by: sort_col,
            order,
        });
        const distinctRoleIds = Array.from(new Set(items.map((u) => u.role_id).filter(Boolean)));
        let roleMap = {};
        if (distinctRoleIds.length > 0) {
            const { data: roles, error: rolesErr } = await this.supabase
                .from('roles')
                .select('id,name')
                .in('id', distinctRoleIds);
            if (rolesErr) {
                throw new common_1.BadRequestException(`Gagal mengambil data role: ${rolesErr.message}`);
            }
            roleMap = (roles ?? []).reduce((acc, r) => {
                acc[r.id] = r.name;
                return acc;
            }, {});
        }
        return {
            items: items.map((u) => ({
                id: u.id,
                email: u.email,
                fullName: u.full_name ?? null,
                role: {
                    id: u.role_id,
                    name: roleMap[u.role_id] ?? null,
                },
                isActive: u.is_active,
                createdAt: u.created_at,
            })),
            total,
            page,
            limit,
        };
    }
    async updateUserRole(actorUserId, targetUserId, dto) {
        if (!dto.roleId) {
            throw new common_1.BadRequestException('roleId wajib diisi');
        }
        const target = await this.repo.getUserById(targetUserId);
        if (!target) {
            throw new common_1.BadRequestException('Pengguna tidak ditemukan');
        }
        if (actorUserId === targetUserId) {
            throw new common_1.BadRequestException('Anda tidak dapat mengubah peran akun Anda sendiri');
        }
        const newRole = await this.repo.getRoleById(dto.roleId);
        if (!newRole) {
            throw new common_1.BadRequestException('Role tidak ditemukan');
        }
        if (target.role_id) {
            const currentRole = await this.repo.getRoleById(target.role_id);
            if (currentRole?.name === 'SUPERADMIN' && target.role_id !== dto.roleId) {
                throw new common_1.BadRequestException('Anda tidak dapat mengubah peran super admin');
            }
        }
        if (target.role_id === dto.roleId) {
            throw new common_1.BadRequestException('Peran baru sama dengan peran saat ini');
        }
        const updated = await this.repo.updateUserRole(targetUserId, dto.roleId);
        await this.auditLogger.log({
            userId: actorUserId,
            action: 'UPDATE_USER_ROLE',
            entityType: 'user',
            entityId: targetUserId,
        });
        return {
            id: updated.id,
            email: updated.email,
            role: {
                id: newRole.id,
                name: newRole.name,
            },
            updatedAt: updated.updated_at,
        };
    }
    async getUserDetail(userId, query) {
        const user = await this.repo.getUserById(userId);
        if (!user) {
            throw new common_1.BadRequestException('Pengguna tidak ditemukan');
        }
        const role = user.role_id ? await this.repo.getRoleById(user.role_id) : null;
        const includeStats = query.includeStats ?? false;
        const includeProjects = query.includeProjects ?? false;
        const projectLimit = Math.min(query.projectLimit ?? 5, 20);
        let stats;
        if (includeStats) {
            stats = await this.repo.getUserStats(userId);
        }
        let projects;
        if (includeProjects) {
            const rows = await this.repo.listUserProjects(userId, projectLimit);
            projects = rows.map((p) => ({
                id: p.id,
                title: p.title,
                status: p.status,
                createdAt: p.created_at,
            }));
        }
        return {
            id: user.id,
            email: user.email,
            fullName: user.full_name ?? null,
            role: role ? { id: role.id, name: role.name } : null,
            isActive: user.is_active,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
            stats,
            projects,
        };
    }
    async updateUserStatus(actorUserId, targetUserId, dto) {
        const provided = typeof dto.isActive !== 'undefined';
        if (!provided) {
            throw new common_1.BadRequestException('Minimal satu field harus dikirim');
        }
        const target = await this.repo.getUserById(targetUserId);
        if (!target) {
            throw new common_1.BadRequestException('Pengguna tidak ditemukan');
        }
        if (actorUserId === targetUserId && dto.isActive === false) {
            throw new common_1.BadRequestException('Anda tidak dapat menonaktifkan akun Anda sendiri');
        }
        if (target.role_id) {
            const role = await this.repo.getRoleById(target.role_id);
            if (role?.name === 'SUPERADMIN') {
                throw new common_1.BadRequestException('Anda tidak dapat mengubah status super admin');
            }
        }
        const updated = await this.repo.updateUserStatus(targetUserId, dto.isActive);
        return {
            id: updated.id,
            email: updated.email,
            isActive: updated.is_active,
            updatedAt: updated.updated_at,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __param(1, (0, common_1.Inject)('UsersRepositoryToken')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient, Object, audit_logger_service_1.AuditLoggerService])
], UsersService);
//# sourceMappingURL=users.service.js.map