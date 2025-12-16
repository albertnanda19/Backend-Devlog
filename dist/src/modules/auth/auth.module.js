"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./infrastructure/adapters/http/auth.controller");
const auth_repository_impl_1 = require("./infrastructure/adapters/persistence/auth.repository.impl");
const auth_service_1 = require("./application/services/auth.service");
const token_service_adapter_1 = require("./infrastructure/adapters/token-service.adapter");
const supabase_module_1 = require("../../infrastructure/supabase.module");
const access_token_middleware_1 = require("../../middleware/access-token.middleware");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(access_token_middleware_1.AccessTokenMiddleware).forRoutes('auth/me');
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [supabase_module_1.SupabaseModule],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_repository_impl_1.AuthRepositoryImpl,
            {
                provide: 'AuthRepositoryToken',
                useClass: auth_repository_impl_1.AuthRepositoryImpl,
            },
            {
                provide: 'UserRepositoryPort',
                useClass: auth_repository_impl_1.AuthRepositoryImpl,
            },
            {
                provide: 'TokenServicePort',
                useClass: token_service_adapter_1.TokenServiceAdapter,
            },
            auth_service_1.AuthService,
        ],
        exports: ['AuthRepositoryToken'],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map