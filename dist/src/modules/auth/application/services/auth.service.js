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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const token_service_port_1 = require("../ports/token-service.port");
const user_repository_port_1 = require("../ports/user.repository.port");
const node_crypto_1 = require("node:crypto");
function hashPassword(plain) {
    const salt = (0, node_crypto_1.randomBytes)(16).toString('hex');
    const derivedKey = (0, node_crypto_1.scryptSync)(plain, salt, 64);
    return `${salt}:${derivedKey.toString('hex')}`;
}
function verifyPassword(plain, hashed) {
    const [salt, storedHex] = hashed.split(':');
    if (!salt || !storedHex)
        return false;
    const derivedKey = (0, node_crypto_1.scryptSync)(plain, salt, 64);
    const storedKey = Buffer.from(storedHex, 'hex');
    return (0, node_crypto_1.timingSafeEqual)(derivedKey, storedKey);
}
let AuthService = class AuthService {
    tokenService;
    userRepo;
    constructor(tokenService, userRepo) {
        this.tokenService = tokenService;
        this.userRepo = userRepo;
    }
    async register(email, password, full_name) {
        const existing = await this.userRepo.findByEmail(email);
        if (existing) {
            throw new common_1.BadRequestException('Email sudah terdaftar');
        }
        const roleId = await this.userRepo.getDefaultRoleId();
        if (!roleId) {
            throw new common_1.InternalServerErrorException('Peran default tidak terkonfigurasi');
        }
        const passwordHash = hashPassword(password);
        const user = await this.userRepo.createUser({
            email,
            password_hash: passwordHash,
            role_id: roleId,
            full_name,
        });
        const accessToken = this.tokenService.signAccessToken({
            sub: user.id,
            type: 'access',
            email: user.email,
            roles_id: [user.role_id],
        });
        const refreshToken = this.tokenService.signRefreshToken({
            sub: user.id,
            type: 'refresh',
        });
        const role = user.role_id ? await this.userRepo.getRoleById(user.role_id) : null;
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.full_name ?? null,
                roleName: role?.name ?? null,
                createdAt: user.created_at ?? null,
            },
        };
    }
    async login(email, password) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException('Email atau kata sandi salah');
        }
        if (user.is_active === false) {
            throw new common_1.BadRequestException('Akun Anda tidak aktif');
        }
        const ok = verifyPassword(password, user.password_hash);
        if (!ok) {
            throw new common_1.BadRequestException('Email atau kata sandi salah');
        }
        const accessToken = this.tokenService.signAccessToken({
            sub: user.id,
            type: 'access',
            email: user.email,
            roles_id: [user.role_id],
        });
        const refreshToken = this.tokenService.signRefreshToken({
            sub: user.id,
            type: 'refresh',
        });
        const role = user.role_id ? await this.userRepo.getRoleById(user.role_id) : null;
        return { accessToken, refreshToken, roleName: role?.name ?? null };
    }
    async updateMe(userId, full_name) {
        const user = await this.userRepo.getById(userId);
        if (!user) {
            throw new common_1.BadRequestException('Pengguna tidak ditemukan');
        }
        if (user.is_active === false) {
            throw new common_1.BadRequestException('Akun Anda tidak aktif');
        }
        await this.userRepo.updateFullName(userId, full_name);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TokenServicePort')),
    __param(1, (0, common_1.Inject)('UserRepositoryPort')),
    __metadata("design:paramtypes", [token_service_port_1.TokenServicePort,
        user_repository_port_1.UserRepositoryPort])
], AuthService);
//# sourceMappingURL=auth.service.js.map