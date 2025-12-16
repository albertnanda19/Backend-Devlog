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
exports.UpdateProjectDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateProjectDto {
    title;
    description;
    techStack;
    status;
}
exports.UpdateProjectDto = UpdateProjectDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Judul proyek harus berupa teks.' }),
    (0, class_validator_1.MinLength)(3, { message: 'Judul proyek minimal 3 karakter.' }),
    (0, class_validator_1.MaxLength)(150, { message: 'Judul proyek maksimal 150 karakter.' }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Deskripsi harus berupa teks.' }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Tech stack harus berupa teks.' }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "techStack", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Status harus berupa teks.' }),
    (0, class_validator_1.IsIn)(['ACTIVE', 'ARCHIVED'], { message: 'Status harus bernilai ACTIVE atau ARCHIVED.' }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "status", void 0);
//# sourceMappingURL=update-project.dto.js.map