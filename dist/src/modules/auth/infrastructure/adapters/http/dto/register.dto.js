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
exports.RegisterRequestDto = void 0;
const class_validator_1 = require("class-validator");
class RegisterRequestDto {
    email;
    password;
    full_name;
}
exports.RegisterRequestDto = RegisterRequestDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email wajib diisi.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Format email tidak valid.' }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Kata sandi wajib diisi.' }),
    (0, class_validator_1.IsString)({ message: 'Kata sandi harus berupa teks.' }),
    (0, class_validator_1.MinLength)(6, { message: 'Kata sandi minimal 6 karakter.' }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nama lengkap wajib diisi.' }),
    (0, class_validator_1.IsString)({ message: 'Nama lengkap harus berupa teks.' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Nama lengkap maksimal 100 karakter.' }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "full_name", void 0);
//# sourceMappingURL=register.dto.js.map