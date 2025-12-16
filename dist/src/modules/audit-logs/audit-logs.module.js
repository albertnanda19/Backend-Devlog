"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsModule = void 0;
const common_1 = require("@nestjs/common");
const supabase_module_1 = require("../../infrastructure/supabase.module");
const access_token_middleware_1 = require("../../middleware/access-token.middleware");
const admin_guard_1 = require("../users/infrastructure/guards/admin.guard");
const audit_logs_controller_1 = require("./infrastructure/adapters/http/audit-logs.controller");
const audit_logs_repository_impl_1 = require("./infrastructure/adapters/persistence/audit-logs.repository.impl");
const audit_logs_service_1 = require("./application/services/audit-logs.service");
let AuditLogsModule = class AuditLogsModule {
    configure(consumer) {
        consumer.apply(access_token_middleware_1.AccessTokenMiddleware).forRoutes('admin');
    }
};
exports.AuditLogsModule = AuditLogsModule;
exports.AuditLogsModule = AuditLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [supabase_module_1.SupabaseModule],
        controllers: [audit_logs_controller_1.AuditLogsController],
        providers: [
            audit_logs_repository_impl_1.AuditLogsRepositoryImpl,
            {
                provide: 'AuditLogsRepositoryToken',
                useClass: audit_logs_repository_impl_1.AuditLogsRepositoryImpl,
            },
            audit_logs_service_1.AuditLogsService,
            admin_guard_1.AdminGuard,
        ],
        exports: ['AuditLogsRepositoryToken'],
    })
], AuditLogsModule);
//# sourceMappingURL=audit-logs.module.js.map