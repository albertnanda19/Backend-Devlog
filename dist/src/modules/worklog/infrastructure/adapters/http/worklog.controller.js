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
exports.WorklogController = void 0;
const common_1 = require("@nestjs/common");
const worklog_service_1 = require("../../../application/services/worklog.service");
let WorklogController = class WorklogController {
    worklogService;
    constructor(worklogService) {
        this.worklogService = worklogService;
    }
    async getOne(req, id) {
        const auth = req.user;
        const detail = await this.worklogService.getWorklogDetail(auth.id, id);
        return {
            success: true,
            data: detail,
        };
    }
};
exports.WorklogController = WorklogController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WorklogController.prototype, "getOne", null);
exports.WorklogController = WorklogController = __decorate([
    (0, common_1.Controller)('worklogs'),
    __metadata("design:paramtypes", [worklog_service_1.WorklogService])
], WorklogController);
//# sourceMappingURL=worklog.controller.js.map