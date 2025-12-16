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
exports.WorklogService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let WorklogService = class WorklogService {
    supabase;
    repo;
    constructor(supabase, repo) {
        this.supabase = supabase;
        this.repo = repo;
    }
    async getWorklogDetail(userId, worklogId) {
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
        const wl = await this.repo.getWorklogById(worklogId);
        if (!wl) {
            throw new common_1.BadRequestException('Worklog tidak ditemukan');
        }
        const project = await this.repo.getProjectForWorklog(wl.project_id);
        if (!project || project.deleted_at) {
            throw new common_1.BadRequestException('Project terkait tidak ditemukan');
        }
        if (project.user_id !== userId) {
            throw new common_1.BadRequestException('Anda tidak memiliki akses ke worklog ini');
        }
        return {
            id: wl.id,
            project: {
                id: project.id,
                title: project.title,
            },
            logDate: wl.log_date,
            activityType: wl.activity_type,
            summary: wl.summary,
            timeSpent: wl.time_spent,
            blockers: wl.blockers,
            createdAt: wl.created_at,
            updatedAt: wl.updated_at,
        };
    }
};
exports.WorklogService = WorklogService;
exports.WorklogService = WorklogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __param(1, (0, common_1.Inject)('WorklogRepositoryToken')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient, Object])
], WorklogService);
//# sourceMappingURL=worklog.service.js.map