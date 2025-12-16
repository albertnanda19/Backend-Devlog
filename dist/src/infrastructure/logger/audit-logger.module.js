"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLoggerModule = void 0;
const common_1 = require("@nestjs/common");
const audit_logger_service_1 = require("./audit-logger.service");
const supabase_module_1 = require("../supabase.module");
let AuditLoggerModule = class AuditLoggerModule {
};
exports.AuditLoggerModule = AuditLoggerModule;
exports.AuditLoggerModule = AuditLoggerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [supabase_module_1.SupabaseModule],
        providers: [audit_logger_service_1.AuditLoggerService],
        exports: [audit_logger_service_1.AuditLoggerService],
    })
], AuditLoggerModule);
//# sourceMappingURL=audit-logger.module.js.map