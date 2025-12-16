"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_controller_1 = require("./infrastructure/adapters/http/project.controller");
const projects_admin_controller_1 = require("./infrastructure/adapters/http/projects.admin.controller");
const project_repository_impl_1 = require("./infrastructure/adapters/persistence/project.repository.impl");
const project_service_1 = require("./application/services/project.service");
const supabase_module_1 = require("../../infrastructure/supabase.module");
const access_token_middleware_1 = require("../../middleware/access-token.middleware");
const admin_guard_1 = require("../users/infrastructure/guards/admin.guard");
let ProjectModule = class ProjectModule {
    configure(consumer) {
        consumer.apply(access_token_middleware_1.AccessTokenMiddleware).forRoutes('projects', 'admin');
    }
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [supabase_module_1.SupabaseModule],
        controllers: [project_controller_1.ProjectController, projects_admin_controller_1.ProjectsAdminController],
        providers: [
            project_repository_impl_1.ProjectRepositoryImpl,
            {
                provide: 'ProjectRepositoryToken',
                useClass: project_repository_impl_1.ProjectRepositoryImpl,
            },
            project_service_1.ProjectService,
            admin_guard_1.AdminGuard,
        ],
        exports: ['ProjectRepositoryToken'],
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map