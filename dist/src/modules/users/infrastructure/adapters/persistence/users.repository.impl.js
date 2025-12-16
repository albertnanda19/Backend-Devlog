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
exports.UsersRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let UsersRepositoryImpl = class UsersRepositoryImpl {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async listUsers(params) {
        let query = this.supabase
            .from('users')
            .select('id,email,full_name,role_id,is_active,created_at', { count: 'exact' });
        if (typeof params.is_active === 'boolean') {
            query = query.eq('is_active', params.is_active);
        }
        if (params.role_id) {
            query = query.eq('role_id', params.role_id);
        }
        if (params.search) {
            query = query.or(`email.ilike.%${params.search}%,full_name.ilike.%${params.search}%`);
        }
        query = query.order(params.sort_by, { ascending: params.order === 'asc' });
        const from = (params.page - 1) * params.limit;
        const to = from + params.limit - 1;
        const { data, error, count } = await query.range(from, to);
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal mengambil daftar pengguna: ${error.message}`);
        }
        return {
            items: (data ?? []),
            total: count ?? 0,
        };
    }
    async getUserById(userId) {
        const { data, error } = await this.supabase
            .from('users')
            .select('id,email,full_name,role_id,is_active,created_at,updated_at')
            .eq('id', userId)
            .maybeSingle();
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal mengambil pengguna: ${error.message}`);
        }
        return data;
    }
    async getRoleById(roleId) {
        const { data, error } = await this.supabase
            .from('roles')
            .select('id,name')
            .eq('id', roleId)
            .maybeSingle();
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal mengambil role: ${error.message}`);
        }
        return data;
    }
    async getUserStats(userId) {
        const { count: totalProjects, error: projErr, data: projData } = await this.supabase
            .from('projects')
            .select('id', { count: 'exact' })
            .eq('user_id', userId)
            .is('deleted_at', null);
        if (projErr) {
            throw new common_1.InternalServerErrorException(`Gagal menghitung proyek: ${projErr.message}`);
        }
        const projectIds = (projData ?? []).map((p) => p.id);
        let totalWorklogs = 0;
        let totalTimeSpent = 0;
        if (projectIds.length > 0) {
            const { data: worklogs, error: wlErr } = await this.supabase
                .from('worklogs')
                .select('time_spent', { count: 'exact' })
                .in('project_id', projectIds)
                .is('deleted_at', null);
            if (wlErr) {
                throw new common_1.InternalServerErrorException(`Gagal menghitung worklog: ${wlErr.message}`);
            }
            totalWorklogs = worklogs?.length ?? 0;
            totalTimeSpent = (worklogs ?? []).reduce((sum, w) => sum + (w.time_spent ?? 0), 0);
        }
        return { totalProjects: totalProjects ?? 0, totalWorklogs, totalTimeSpent };
    }
    async listUserProjects(userId, limit) {
        const { data, error } = await this.supabase
            .from('projects')
            .select('id,title,status,created_at')
            .eq('user_id', userId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false })
            .limit(limit);
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal mengambil proyek pengguna: ${error.message}`);
        }
        return (data ?? []);
    }
    async updateUserStatus(userId, isActive) {
        const { data, error } = await this.supabase
            .from('users')
            .update({ is_active: isActive })
            .eq('id', userId)
            .select('id,email,is_active,updated_at')
            .single();
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal memperbarui status pengguna: ${error.message}`);
        }
        return data;
    }
    async updateUserRole(userId, roleId) {
        const { data, error } = await this.supabase
            .from('users')
            .update({ role_id: roleId })
            .eq('id', userId)
            .select('id,email,role_id,updated_at')
            .single();
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal memperbarui peran pengguna: ${error.message}`);
        }
        return data;
    }
};
exports.UsersRepositoryImpl = UsersRepositoryImpl;
exports.UsersRepositoryImpl = UsersRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], UsersRepositoryImpl);
//# sourceMappingURL=users.repository.impl.js.map