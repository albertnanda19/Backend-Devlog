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
exports.CreateWorklogDto = void 0;
const class_validator_1 = require("class-validator");
class CreateWorklogDto {
    logDate;
    activityType;
    summary;
    timeSpent;
    blockers;
}
exports.CreateWorklogDto = CreateWorklogDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tanggal log wajib diisi.' }),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD.' }),
    __metadata("design:type", String)
], CreateWorklogDto.prototype, "logDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Jenis aktivitas wajib diisi.' }),
    (0, class_validator_1.IsString)({ message: 'Jenis aktivitas harus berupa teks.' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Jenis aktivitas maksimal 50 karakter.' }),
    __metadata("design:type", String)
], CreateWorklogDto.prototype, "activityType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ringkasan aktivitas wajib diisi.' }),
    (0, class_validator_1.IsString)({ message: 'Ringkasan aktivitas harus berupa teks.' }),
    (0, class_validator_1.MinLength)(10, { message: 'Ringkasan aktivitas minimal 10 karakter.' }),
    __metadata("design:type", String)
], CreateWorklogDto.prototype, "summary", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Waktu yang dihabiskan harus berupa angka menit.' }),
    (0, class_validator_1.Min)(0, { message: 'Waktu yang dihabiskan minimal 0 menit.' }),
    __metadata("design:type", Number)
], CreateWorklogDto.prototype, "timeSpent", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Blocker harus berupa teks.' }),
    __metadata("design:type", String)
], CreateWorklogDto.prototype, "blockers", void 0);
//# sourceMappingURL=create-worklog.dto.js.map