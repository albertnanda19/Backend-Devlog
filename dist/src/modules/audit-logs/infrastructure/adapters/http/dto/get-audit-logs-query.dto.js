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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAuditLogsQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetAuditLogsQueryDto {
    page;
    limit;
    userId;
    entityType;
    entityId;
    action;
    from;
    to;
    sort;
}
exports.GetAuditLogsQueryDto = GetAuditLogsQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'page harus berupa angka bulat.' }),
    (0, class_validator_1.Min)(1, { message: 'page minimal 1.' }),
    __metadata("design:type", Number)
], GetAuditLogsQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'limit harus berupa angka bulat.' }),
    (0, class_validator_1.Min)(1, { message: 'limit minimal 1.' }),
    (0, class_validator_1.Max)(100, { message: 'limit maksimal 100.' }),
    __metadata("design:type", Number)
], GetAuditLogsQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'userId harus berupa UUID v4 yang valid.' }),
    __metadata("design:type", String)
], GetAuditLogsQueryDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'entityType harus berupa teks.' }),
    (0, class_validator_1.IsIn)(['USER', 'PROJECT', 'WORKLOG'], { message: 'entityType harus USER, PROJECT, atau WORKLOG.' }),
    __metadata("design:type", String)
], GetAuditLogsQueryDto.prototype, "entityType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'entityId harus berupa UUID v4 yang valid.' }),
    __metadata("design:type", String)
], GetAuditLogsQueryDto.prototype, "entityId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'action harus berupa teks.' }),
    (0, class_validator_1.IsIn)(['UPDATE_USER_ROLE', 'DELETE_PROJECT', 'CREATE_WORKLOG', 'UPDATE_WORKLOG', 'DELETE_WORKLOG', 'CREATE_PROJECT', 'UPDATE_PROJECT', 'DELETE_USER', 'ARCHIVE_PROJECT', 'RESTORE_PROJECT'], { message: 'action tidak valid.' }),
    __metadata("design:type", String)
], GetAuditLogsQueryDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'from harus berupa ISO date string.' }),
    __metadata("design:type", String)
], GetAuditLogsQueryDto.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'to harus berupa ISO date string.' }),
    __metadata("design:type", String)
], GetAuditLogsQueryDto.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['asc', 'desc'], { message: 'sort harus bernilai asc atau desc.' }),
    __metadata("design:type", String)
], GetAuditLogsQueryDto.prototype, "sort", void 0);
//# sourceMappingURL=get-audit-logs-query.dto.js.map