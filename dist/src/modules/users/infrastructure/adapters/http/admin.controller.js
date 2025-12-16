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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../../application/services/users.service");
const get_admin_users_query_dto_1 = require("./dto/get-admin-users-query.dto");
const admin_guard_1 = require("../../guards/admin.guard");
const get_admin_user_detail_query_dto_1 = require("./dto/get-admin-user-detail-query.dto");
const update_admin_user_status_dto_1 = require("./dto/update-admin-user-status.dto");
const update_admin_user_role_dto_1 = require("./dto/update-admin-user-role.dto");
let AdminController = class AdminController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async list(query) {
        const result = await this.usersService.listUsers(query);
        return {
            success: true,
            message: 'Berhasil mengambil daftar pengguna',
            data: result.items,
            meta: {
                page: result.page,
                limit: result.limit,
                totalItems: result.total,
                totalPages: Math.ceil((result.total ?? 0) / (result.limit ?? 1)),
            },
        };
    }
    async detail(id, query) {
        const data = await this.usersService.getUserDetail(id, query);
        return {
            success: true,
            message: 'Berhasil mengambil detail pengguna',
            data,
        };
    }
    async updateStatus(req, id, body) {
        const actor = req.user;
        const updated = await this.usersService.updateUserStatus(actor.id, id, body);
        return {
            success: true,
            message: 'Berhasil mengupdate user',
            data: updated,
        };
    }
    async updateRole(req, id, body) {
        const actor = req.user;
        const updated = await this.usersService.updateUserRole(actor.id, id, body);
        return {
            success: true,
            message: 'Berhasil mengubah peran pengguna',
            data: updated,
        };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_admin_users_query_dto_1.GetAdminUsersQueryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "list", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_admin_user_detail_query_dto_1.GetAdminUserDetailQueryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "detail", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Put)('users/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_admin_user_status_dto_1.UpdateAdminUserStatusDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Put)('users/:id/role'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_admin_user_role_dto_1.UpdateAdminUserRoleDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateRole", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map