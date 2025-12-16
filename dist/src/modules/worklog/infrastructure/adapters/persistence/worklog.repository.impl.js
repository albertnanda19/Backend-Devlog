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
exports.WorklogRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let WorklogRepositoryImpl = class WorklogRepositoryImpl {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async getWorklogById(id) {
        const { data, error } = await this.supabase
            .from('worklogs')
            .select('id,project_id,log_date,activity_type,summary,time_spent,blockers,created_at,updated_at,deleted_at')
            .eq('id', id)
            .is('deleted_at', null)
            .maybeSingle();
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal mengambil worklog: ${error.message}`);
        }
        return data;
    }
    async getProjectForWorklog(project_id) {
        const { data, error } = await this.supabase
            .from('projects')
            .select('id,title,user_id,deleted_at')
            .eq('id', project_id)
            .maybeSingle();
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal mengambil project: ${error.message}`);
        }
        return data;
    }
};
exports.WorklogRepositoryImpl = WorklogRepositoryImpl;
exports.WorklogRepositoryImpl = WorklogRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], WorklogRepositoryImpl);
//# sourceMappingURL=worklog.repository.impl.js.map