"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./infrastructure/adapters/http/admin.controller");
const users_repository_impl_1 = require("./infrastructure/adapters/persistence/users.repository.impl");
const users_service_1 = require("./application/services/users.service");
const supabase_module_1 = require("../../infrastructure/supabase.module");
const access_token_middleware_1 = require("../../middleware/access-token.middleware");
const admin_guard_1 = require("./infrastructure/guards/admin.guard");
const roles_controller_1 = require("./infrastructure/adapters/http/roles.controller");
let UsersModule = class UsersModule {
    configure(consumer) {
        consumer.apply(access_token_middleware_1.AccessTokenMiddleware).forRoutes('admin');
    }
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [supabase_module_1.SupabaseModule],
        controllers: [admin_controller_1.AdminController, roles_controller_1.RolesController],
        providers: [
            users_repository_impl_1.UsersRepositoryImpl,
            {
                provide: 'UsersRepositoryToken',
                useClass: users_repository_impl_1.UsersRepositoryImpl,
            },
            users_service_1.UsersService,
            admin_guard_1.AdminGuard,
        ],
        exports: ['UsersRepositoryToken'],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map