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
exports.AuditLogsService = void 0;
const common_1 = require("@nestjs/common");
let AuditLogsService = class AuditLogsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async list(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const sort = (query.sort ?? 'desc');
        const { items, total } = await this.repo.listAuditLogs({
            page,
            limit,
            user_id: query.userId,
            entity_type: query.entityType,
            entity_id: query.entityId,
            action: query.action,
            from: query.from,
            to: query.to,
            sort,
        });
        const userIds = Array.from(new Set(items.map((r) => r.user_id).filter(Boolean)));
        let userMap = {};
        if (userIds.length > 0) {
            const users = await this.repo.getUsersByIds(userIds);
            userMap = users.reduce((acc, u) => {
                acc[u.id] = u.email;
                return acc;
            }, {});
        }
        const data = items.map((r) => ({
            id: r.id,
            action: r.action,
            entityType: r.entity_type?.toString().toUpperCase(),
            entityId: r.entity_id ?? null,
            performedBy: {
                id: r.user_id,
                email: userMap[r.user_id] ?? null,
            },
            createdAt: r.created_at,
        }));
        return {
            items: data,
            meta: {
                page,
                limit,
                totalItems: total,
                totalPages: Math.ceil((total ?? 0) / limit),
            },
        };
    }
};
exports.AuditLogsService = AuditLogsService;
exports.AuditLogsService = AuditLogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AuditLogsRepositoryToken')),
    __metadata("design:paramtypes", [Object])
], AuditLogsService);
//# sourceMappingURL=audit-logs.service.js.map