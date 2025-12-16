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
exports.AuthRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let AuthRepositoryImpl = class AuthRepositoryImpl {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async findById(id) {
        const { data: user, error: userErr } = await this.supabase
            .from('users')
            .select('id,email,full_name,is_active,created_at,role_id')
            .eq('id', id)
            .maybeSingle();
        if (userErr) {
            throw new common_1.InternalServerErrorException(`Gagal mengambil data pengguna: ${userErr.message}`);
        }
        if (!user) {
            throw new common_1.NotFoundException('Pengguna tidak ditemukan');
        }
        let role = null;
        if (user.role_id) {
            const { data: roleRow, error: roleErr } = await this.supabase
                .from('roles')
                .select('id,name')
                .eq('id', user.role_id)
                .maybeSingle();
            if (roleErr) {
                throw new common_1.InternalServerErrorException(`Gagal mengambil data peran pengguna: ${roleErr.message}`);
            }
            if (roleRow) {
                role = { id: roleRow.id, name: roleRow.name };
            }
        }
        return {
            id: user.id,
            email: user.email,
            full_name: user.full_name ?? null,
            is_active: user.is_active ?? null,
            created_at: user.created_at ?? null,
            roles: role,
        };
    }
    async findByEmail(email) {
        const { data, error } = await this.supabase
            .from('users')
            .select('id,email,password_hash,role_id,full_name,is_active,created_at,updated_at')
            .eq('email', email)
            .maybeSingle();
        if (error) {
            throw new common_1.InternalServerErrorException('Gagal memeriksa email pengguna');
        }
        return data ?? null;
    }
    async createUser(data) {
        const { data: inserted, error } = await this.supabase
            .from('users')
            .insert({
            email: data.email,
            password_hash: data.password_hash,
            role_id: data.role_id,
            full_name: data.full_name ?? null,
        })
            .select('id,email,password_hash,role_id,full_name,is_active,created_at,updated_at')
            .single();
        if (error) {
            throw new common_1.InternalServerErrorException('Gagal membuat pengguna baru');
        }
        return inserted;
    }
    async getDefaultRoleId() {
        const fromEnv = process.env.DEFAULT_ROLE_ID;
        if (fromEnv)
            return fromEnv;
        const { data: role, error: findErr } = await this.supabase
            .from('roles')
            .select('id,name')
            .eq('name', 'USER')
            .maybeSingle();
        if (findErr) {
            throw new common_1.InternalServerErrorException('Gagal mengambil peran default');
        }
        if (role?.id)
            return role.id;
        const { data: created, error: insertErr } = await this.supabase
            .from('roles')
            .insert({ name: 'USER', description: 'Default application role' })
            .select('id')
            .single();
        if (insertErr || !created) {
            throw new common_1.InternalServerErrorException('Gagal membuat peran default');
        }
        return created.id;
    }
    async getById(id) {
        const { data, error } = await this.supabase
            .from('users')
            .select('id,email,password_hash,role_id,full_name,is_active,created_at,updated_at')
            .eq('id', id)
            .maybeSingle();
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal mengambil pengguna: ${error.message}`);
        }
        return data ?? null;
    }
    async updateFullName(id, full_name) {
        const { data, error } = await this.supabase
            .from('users')
            .update({ full_name })
            .eq('id', id)
            .select('id,email,password_hash,role_id,full_name,is_active,created_at,updated_at')
            .single();
        if (error) {
            throw new common_1.InternalServerErrorException(`Gagal memperbarui profil: ${error.message}`);
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
            throw new common_1.InternalServerErrorException('Gagal mengambil data role');
        }
        if (!data)
            return null;
        return { id: data.id, name: data.name };
    }
};
exports.AuthRepositoryImpl = AuthRepositoryImpl;
exports.AuthRepositoryImpl = AuthRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], AuthRepositoryImpl);
//# sourceMappingURL=auth.repository.impl.js.map