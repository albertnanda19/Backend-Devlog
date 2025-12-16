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
exports.GetAdminUsersQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetAdminUsersQueryDto {
    page;
    limit;
    role;
    isActive;
    search;
    sortBy;
    order;
}
exports.GetAdminUsersQueryDto = GetAdminUsersQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'page harus berupa angka bulat.' }),
    (0, class_validator_1.Min)(1, { message: 'page minimal 1.' }),
    __metadata("design:type", Number)
], GetAdminUsersQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'limit harus berupa angka bulat.' }),
    (0, class_validator_1.Min)(1, { message: 'limit minimal 1.' }),
    (0, class_validator_1.Max)(50, { message: 'limit maksimal 50.' }),
    __metadata("design:type", Number)
], GetAdminUsersQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'role harus berupa teks.' }),
    (0, class_validator_1.IsIn)(['ADMIN', 'USER'], { message: 'role harus bernilai ADMIN atau USER.' }),
    __metadata("design:type", String)
], GetAdminUsersQueryDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: 'isActive harus bernilai boolean.' }),
    __metadata("design:type", Boolean)
], GetAdminUsersQueryDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'search harus berupa teks.' }),
    __metadata("design:type", String)
], GetAdminUsersQueryDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'sortBy harus berupa teks.' }),
    (0, class_validator_1.IsIn)(['createdAt', 'email', 'fullName'], { message: 'sortBy harus salah satu dari createdAt, email, fullName.' }),
    __metadata("design:type", String)
], GetAdminUsersQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'order harus berupa teks.' }),
    (0, class_validator_1.IsIn)(['asc', 'desc'], { message: 'order harus bernilai asc atau desc.' }),
    __metadata("design:type", String)
], GetAdminUsersQueryDto.prototype, "order", void 0);
//# sourceMappingURL=get-admin-users-query.dto.js.map