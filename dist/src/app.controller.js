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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const supabase_js_1 = require("@supabase/supabase-js");
let AppController = class AppController {
    appService;
    supabase;
    constructor(appService, supabase) {
        this.appService = appService;
        this.supabase = supabase;
    }
    getHello() {
        return this.appService.getHello();
    }
    async testDbConnection() {
        try {
            const { data, error } = await this.supabase
                .from('users')
                .select('id,email,full_name,created_at,roles(name)')
                .limit(10);
            if (error) {
                return { success: false, error: error.message };
            }
            const mapped = data?.map((row) => ({
                id: row.id,
                email: row.email,
                full_name: row.full_name,
                role_name: row.roles?.name ?? null,
                created_at: row.created_at,
            })) ?? [];
            return { success: true, data: mapped };
        }
        catch (e) {
            const message = e instanceof Error ? e.message : 'Unknown error';
            return { success: false, error: message };
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('test-db'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testDbConnection", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        supabase_js_1.SupabaseClient])
], AppController);
//# sourceMappingURL=app.controller.js.map