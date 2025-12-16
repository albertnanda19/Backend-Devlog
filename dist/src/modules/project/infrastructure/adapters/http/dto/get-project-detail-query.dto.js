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
exports.GetProjectDetailQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetProjectDetailQueryDto {
    includeWorklogs;
    worklogLimit;
    worklogOrder;
}
exports.GetProjectDetailQueryDto = GetProjectDetailQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: 'includeWorklogs harus berupa boolean.' }),
    __metadata("design:type", Boolean)
], GetProjectDetailQueryDto.prototype, "includeWorklogs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'worklogLimit harus berupa angka bulat.' }),
    (0, class_validator_1.Min)(1, { message: 'worklogLimit minimal 1.' }),
    (0, class_validator_1.Max)(50, { message: 'worklogLimit maksimal 50.' }),
    __metadata("design:type", Number)
], GetProjectDetailQueryDto.prototype, "worklogLimit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['asc', 'desc'], { message: 'worklogOrder harus bernilai asc atau desc.' }),
    __metadata("design:type", String)
], GetProjectDetailQueryDto.prototype, "worklogOrder", void 0);
//# sourceMappingURL=get-project-detail-query.dto.js.map