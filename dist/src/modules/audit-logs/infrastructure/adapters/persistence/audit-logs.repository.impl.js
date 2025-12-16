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
exports.AuditLogsRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let AuditLogsRepositoryImpl = class AuditLogsRepositoryImpl {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async listAuditLogs(params) {
        let query = this.supabase
            .from('audit_logs')
            .select('id,user_id,action,entity_type,entity_id,created_at', { count: 'exact' });
        if (params.user_id) {
            query = query.eq('user_id', params.user_id);
        }
        if (params.entity_type) {
            query = query.eq('entity_type', params.entity_type.toLowerCase());
        }
        if (params.entity_id) {
            query = query.eq('entity_id', params.entity_id);
        }
        if (params.action) {
            query = query.eq('action', params.action);
        }
        if (params.from) {
            query = query.gte('created_at', params.from);
        }
        if (params.to) {
            query = query.lte('created_at', params.to);
        }
        query = query.order('created_at', { ascending: params.sort === 'asc' });
        const fromIdx = (params.page - 1) * params.limit;
        const toIdx = fromIdx + params.limit - 1;
        const { data, error, count } = await query.range(fromIdx, toIdx);
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal mengambil audit logs: ${error.message}`);
        }
        return { items: (data ?? []), total: count ?? 0 };
    }
    async getUsersByIds(userIds) {
        const { data, error } = await this.supabase
            .from('users')
            .select('id,email')
            .in('id', userIds);
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal mengambil data pengguna: ${error.message}`);
        }
        return (data ?? []);
    }
};
exports.AuditLogsRepositoryImpl = AuditLogsRepositoryImpl;
exports.AuditLogsRepositoryImpl = AuditLogsRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], AuditLogsRepositoryImpl);
//# sourceMappingURL=audit-logs.repository.impl.js.map