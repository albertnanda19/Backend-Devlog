"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorklogModule = void 0;
const common_1 = require("@nestjs/common");
const worklog_repository_impl_1 = require("./infrastructure/adapters/persistence/worklog.repository.impl");
const worklog_service_1 = require("./application/services/worklog.service");
const supabase_module_1 = require("../../infrastructure/supabase.module");
let WorklogModule = class WorklogModule {
};
exports.WorklogModule = WorklogModule;
exports.WorklogModule = WorklogModule = __decorate([
    (0, common_1.Module)({
        imports: [supabase_module_1.SupabaseModule],
        controllers: [],
        providers: [
            worklog_repository_impl_1.WorklogRepositoryImpl,
            {
                provide: 'WorklogRepositoryToken',
                useClass: worklog_repository_impl_1.WorklogRepositoryImpl,
            },
            worklog_service_1.WorklogService,
        ],
        exports: ['WorklogRepositoryToken'],
    })
], WorklogModule);
//# sourceMappingURL=worklog.module.js.map