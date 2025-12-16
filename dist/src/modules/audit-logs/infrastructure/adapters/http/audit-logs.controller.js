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
exports.AuditLogsController = void 0;
const common_1 = require("@nestjs/common");
const get_audit_logs_query_dto_1 = require("./dto/get-audit-logs-query.dto");
const audit_logs_service_1 = require("../../../application/services/audit-logs.service");
const admin_guard_1 = require("../../../../users/infrastructure/guards/admin.guard");
let AuditLogsController = class AuditLogsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async list(query) {
        if (query.from && query.to && new Date(query.from) > new Date(query.to)) {
            return {
                success: false,
                message: 'Rentang tanggal tidak valid (from harus ≤ to).',
            };
        }
        const result = await this.service.list(query);
        return {
            success: true,
            message: 'Berhasil mengambil audit logs',
            data: result.items,
            meta: result.meta,
        };
    }
};
exports.AuditLogsController = AuditLogsController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)('audit-logs'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_audit_logs_query_dto_1.GetAuditLogsQueryDto]),
    __metadata("design:returntype", Promise)
], AuditLogsController.prototype, "list", null);
exports.AuditLogsController = AuditLogsController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [audit_logs_service_1.AuditLogsService])
], AuditLogsController);
//# sourceMappingURL=audit-logs.controller.js.map