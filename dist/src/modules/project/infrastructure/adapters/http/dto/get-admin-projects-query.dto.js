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
exports.GetAdminProjectsQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetAdminProjectsQueryDto {
    page;
    limit;
    userId;
    status;
    search;
    includeDeleted;
    sort;
}
exports.GetAdminProjectsQueryDto = GetAdminProjectsQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'page harus berupa angka bulat.' }),
    (0, class_validator_1.Min)(1, { message: 'page minimal 1.' }),
    __metadata("design:type", Number)
], GetAdminProjectsQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'limit harus berupa angka bulat.' }),
    (0, class_validator_1.Min)(1, { message: 'limit minimal 1.' }),
    (0, class_validator_1.Max)(100, { message: 'limit maksimal 100.' }),
    __metadata("design:type", Number)
], GetAdminProjectsQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'userId harus berupa UUID v4 yang valid.' }),
    __metadata("design:type", String)
], GetAdminProjectsQueryDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'status harus berupa teks.' }),
    (0, class_validator_1.IsIn)(['ACTIVE', 'ARCHIVED'], { message: 'status harus bernilai ACTIVE atau ARCHIVED.' }),
    __metadata("design:type", String)
], GetAdminProjectsQueryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'search harus berupa teks.' }),
    (0, class_validator_1.MinLength)(2, { message: 'search minimal 2 karakter.' }),
    __metadata("design:type", String)
], GetAdminProjectsQueryDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: 'includeDeleted harus bernilai boolean.' }),
    __metadata("design:type", Boolean)
], GetAdminProjectsQueryDto.prototype, "includeDeleted", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['asc', 'desc'], { message: 'sort harus bernilai asc atau desc.' }),
    __metadata("design:type", String)
], GetAdminProjectsQueryDto.prototype, "sort", void 0);
//# sourceMappingURL=get-admin-projects-query.dto.js.map