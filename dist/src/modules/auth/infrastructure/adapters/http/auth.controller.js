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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../../application/services/auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const common_2 = require("@nestjs/common");
const update_me_dto_1 = require("./dto/update-me.dto");
let AuthController = class AuthController {
    repo;
    authService;
    constructor(repo, authService) {
        this.repo = repo;
        this.authService = authService;
    }
    async register(body) {
        const { accessToken, refreshToken, user } = await this.authService.register(body.email, body.password, body.full_name);
        return {
            success: true,
            message: 'Registrasi berhasil.',
            access_token: accessToken,
            refresh_token: refreshToken,
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.roleName,
            createdAt: user.createdAt,
        };
    }
    async login(body) {
        const { accessToken, refreshToken, roleName } = await this.authService.login(body.email, body.password);
        return {
            success: true,
            message: 'Login berhasil.',
            access_token: accessToken,
            refresh_token: refreshToken,
            role: roleName,
        };
    }
    async me(req) {
        const auth = req.user;
        const profile = await this.repo.findById(auth.id);
        return {
            success: true,
            data: {
                id: profile?.id,
                email: profile?.email,
                fullName: profile?.full_name ?? null,
                role: profile?.roles
                    ? { id: profile.roles.id ?? null, name: profile.roles.name ?? null }
                    : null,
                isActive: profile?.is_active ?? null,
                createdAt: profile?.created_at ?? null,
            },
        };
    }
    async updateMe(req, body) {
        const auth = req.user;
        await this.authService.updateMe(auth.id, body.full_name);
        const profile = await this.repo.findById(auth.id);
        return {
            success: true,
            message: 'Profil berhasil diperbarui.',
            data: {
                id: profile?.id,
                email: profile?.email,
                fullName: profile?.full_name ?? null,
                role: profile?.roles
                    ? { id: profile.roles.id ?? null, name: profile.roles.name ?? null }
                    : null,
                isActive: profile?.is_active ?? null,
                createdAt: profile?.created_at ?? null,
            },
        };
    }
    async getOne(id) {
        const result = await this.repo.findById(id);
        return result;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Put)('me'),
    __param(0, (0, common_2.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_me_dto_1.UpdateMeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getOne", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)('AuthRepositoryToken')),
    __metadata("design:paramtypes", [Object, auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map