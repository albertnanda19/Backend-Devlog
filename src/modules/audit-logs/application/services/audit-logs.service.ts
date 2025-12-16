import { Inject, Injectable } from '@nestjs/common';
import { GetAuditLogsQueryDto } from '../../infrastructure/adapters/http/dto/get-audit-logs-query.dto';

@Injectable()
export class AuditLogsService {
	constructor(
		@Inject('AuditLogsRepositoryToken') private readonly repo: any,
	) {}

	async list(query: GetAuditLogsQueryDto) {
		const page = query.page ?? 1;
		const limit = query.limit ?? 20;
		const sort = (query.sort ?? 'desc') as 'asc' | 'desc';

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

		// join users by id to fetch emails
		const userIds = Array.from(new Set(items.map((r: any) => r.user_id).filter(Boolean)));
		let userMap: Record<string, string> = {};
		if (userIds.length > 0) {
			const users = await this.repo.getUsersByIds(userIds);
			userMap = users.reduce((acc: any, u: any) => {
				acc[u.id] = u.email;
				return acc;
			}, {});
		}

		const data = items.map((r: any) => ({
			id: r.id,
			action: r.action,
			entityType: (r.entity_type as string)?.toString().toUpperCase(),
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
}


