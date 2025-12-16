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
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let AdminGuard = class AdminGuard {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user?.id) {
            throw new common_1.UnauthorizedException('Token otorisasi tidak valid');
        }
        const { data, error } = await this.supabase
            .from('users')
            .select('id,is_active,role_id')
            .eq('id', user.id)
            .maybeSingle();
        if (error || !data) {
            throw new common_1.ForbiddenException('Gagal memverifikasi peran pengguna');
        }
        if (data.is_active === false) {
            throw new common_1.ForbiddenException('Akun Anda tidak aktif');
        }
        const { data: role, error: roleErr } = await this.supabase
            .from('roles')
            .select('id,name')
            .eq('id', data.role_id)
            .maybeSingle();
        if (roleErr || !role) {
            throw new common_1.ForbiddenException('Gagal memverifikasi peran pengguna');
        }
        if (role.name !== 'ADMIN') {
            throw new common_1.ForbiddenException('Anda tidak memiliki hak akses ke sumber daya ini');
        }
        return true;
    }
};
exports.AdminGuard = AdminGuard;
exports.AdminGuard = AdminGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], AdminGuard);
//# sourceMappingURL=admin.guard.js.map