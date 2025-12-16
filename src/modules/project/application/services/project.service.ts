import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../../infrastructure/adapters/http/dto/create-project.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { GetProjectsQueryDto } from '../../infrastructure/adapters/http/dto/get-projects-query.dto';
import { UpdateProjectDto } from '../../infrastructure/adapters/http/dto/update-project.dto';
import { GetProjectDetailQueryDto } from '../../infrastructure/adapters/http/dto/get-project-detail-query.dto';
import { AuditLoggerService } from '../../../../infrastructure/logger/audit-logger.service';
import { CreateWorklogDto } from '../../infrastructure/adapters/http/dto/create-worklog.dto';
import { GetWorklogsQueryDto } from '../../infrastructure/adapters/http/dto/get-worklogs-query.dto';
import { UpdateWorklogDto } from '../../infrastructure/adapters/http/dto/update-worklog.dto';
import { GetAdminProjectsQueryDto } from '../../infrastructure/adapters/http/dto/get-admin-projects-query.dto';

@Injectable()
export class ProjectService {
	constructor(
		@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
		@Inject('ProjectRepositoryToken') private readonly repo: any,
		private readonly auditLogger: AuditLoggerService,
	) {}

	async createProject(userId: string, dto: CreateProjectDto) {
		// Verify user active
		const { data: user, error: userErr } = await this.supabase
			.from('users')
			.select('id,is_active')
			.eq('id', userId)
			.maybeSingle();
		if (userErr) {
			throw new BadRequestException(`Gagal memverifikasi pengguna: ${userErr.message}`);
		}
		if (!user || (user as any).is_active === false) {
			throw new BadRequestException('Akun Anda tidak aktif');
		}

		const status = dto.status ?? 'ACTIVE';
		const created = await this.repo.createProject({
			user_id: userId,
			title: dto.title,
			description: dto.description ?? null,
			tech_stack: dto.techStack ?? null,
			status,
		});
		return created;
	}

	async adminArchiveProject(actorUserId: string, projectId: string, reason?: string) {
		const project = await this.repo.getProjectById(projectId);
		if (!project) {
			throw new BadRequestException('Project tidak ditemukan');
		}
		if (project.status === 'ARCHIVED') {
			throw new BadRequestException('Project sudah berstatus ARCHIVED');
		}

		const updated = await this.repo.adminUpdateProjectStatus(projectId, 'ARCHIVED');

		await this.auditLogger.log({
			userId: actorUserId,
			action: 'ARCHIVE_PROJECT',
			entityType: 'project',
			entityId: projectId,
		});

		return {
			id: updated.id,
			status: updated.status,
			archivedAt: updated.updated_at,
		};
	}

	async adminListProjects(query: GetAdminProjectsQueryDto) {
		const page = query.page ?? 1;
		const limit = query.limit ?? 20;
		const sort = (query.sort ?? 'desc') as 'asc' | 'desc';

		const { items, total } = await this.repo.adminListProjects({
			page,
			limit,
			user_id: query.userId,
			status: query.status,
			search: query.search?.trim() || undefined,
			include_deleted: query.includeDeleted ?? false,
			sort,
		});

		const userIds = Array.from(new Set(items.map((p: any) => p.user_id)));
		let userMap: Record<string, string> = {};
		if (userIds.length > 0) {
			const users = await this.repo.getUsersByIds(userIds);
			userMap = users.reduce((acc: any, u: any) => {
				acc[u.id] = u.email;
				return acc;
			}, {});
		}

		return {
			items: items.map((p: any) => ({
				id: p.id,
				title: p.title,
				status: p.status,
				techStack: p.tech_stack ?? null,
				owner: {
					id: p.user_id,
					email: userMap[p.user_id] ?? null,
				},
				createdAt: p.created_at,
			})),
			meta: {
				page,
				limit,
				totalItems: total,
				totalPages: Math.ceil((total ?? 0) / limit),
			},
		};
	}

	async adminRestoreProject(actorUserId: string, projectId: string) {
		const project = await this.repo.getProjectById(projectId);
		if (!project) {
			throw new BadRequestException('Project tidak ditemukan');
		}
		if (project.status !== 'ARCHIVED') {
			throw new BadRequestException('Project tidak berstatus ARCHIVED');
		}

		const updated = await this.repo.adminUpdateProjectStatus(projectId, 'ACTIVE');

		await this.auditLogger.log({
			userId: actorUserId,
			action: 'RESTORE_PROJECT',
			entityType: 'project',
			entityId: projectId,
		});

		return {
			id: updated.id,
			status: updated.status,
			restoredAt: updated.updated_at,
		};
	}

	async listProjects(userId: string, query: GetProjectsQueryDto) {
		const page = query.page ?? 1;
		const limit = query.limit ?? 10;
		const status = query.status ?? 'ACTIVE';
		const sortBy = query.sortBy ?? 'createdAt';
		const order = (query.order ?? 'desc') as 'asc' | 'desc';
		const search = query.search?.trim() || undefined;

		const sortMap: Record<string, string> = {
			createdAt: 'created_at',
			title: 'title',
			status: 'status',
		};
		const sort_col = sortMap[sortBy] ?? 'created_at';

		const { items, total } = await this.repo.listProjects({
			user_id: userId,
			status,
			search,
			sort_by: sort_col,
			order,
			page,
			limit,
		});

		return {
			items,
			meta: {
				page,
				limit,
				totalItems: total,
				totalPages: Math.ceil((total ?? 0) / limit),
			},
		};
	}

	async updateProject(userId: string, projectId: string, dto: UpdateProjectDto) {
		// Verify user active
		const { data: user, error: userErr } = await this.supabase
			.from('users')
			.select('id,is_active')
			.eq('id', userId)
			.maybeSingle();
		if (userErr) {
			throw new BadRequestException(`Gagal memverifikasi pengguna: ${userErr.message}`);
		}
		if (!user || (user as any).is_active === false) {
			throw new BadRequestException('Akun Anda tidak aktif');
		}

		// Ensure at least one field provided
		const provided =
			typeof dto.title !== 'undefined' ||
			typeof dto.description !== 'undefined' ||
			typeof dto.techStack !== 'undefined' ||
			typeof dto.status !== 'undefined';
		if (!provided) {
			throw new BadRequestException('Minimal satu field harus dikirim');
		}

		// Ensure project exists and belongs to user and not soft-deleted
		const existing = await this.repo.getByIdForUser(userId, projectId);
		if (!existing) {
			throw new BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
		}

		const updated = await this.repo.updateProject(projectId, userId, {
			title: dto.title,
			description: typeof dto.description !== 'undefined' ? dto.description : undefined,
			tech_stack: typeof dto.techStack !== 'undefined' ? dto.techStack : undefined,
			status: dto.status,
		});

		return updated;
	}

	async getProjectDetail(userId: string, projectId: string, query: GetProjectDetailQueryDto) {
		// ownership and not soft-deleted
		const project = await this.repo.getByIdForUser(userId, projectId);
		if (!project) {
			throw new BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
		}

		const includeWorklogs = query.includeWorklogs ?? false;
		const worklogLimit = query.worklogLimit ?? 10;
		const worklogOrder = (query.worklogOrder ?? 'desc') as 'asc' | 'desc';

		let worklogs: Array<any> | undefined;
		if (includeWorklogs) {
			const rows = await this.repo.getWorklogsForProject(project.id, worklogLimit, worklogOrder);
			worklogs = rows.map((w: any) => ({
				id: w.id,
				logDate: w.log_date,
				activityType: w.activity_type,
				summary: w.summary,
				timeSpent: w.time_spent,
			}));
		}

		return {
			id: project.id,
			title: project.title,
			description: project.description ?? null,
			techStack: project.tech_stack ?? null,
			status: project.status,
			createdAt: project.created_at ?? null,
			updatedAt: project.updated_at ?? null,
			worklogs,
		};
	}

	async deleteProject(userId: string, projectId: string) {
		// verify user active
		const { data: user, error: userErr } = await this.supabase
			.from('users')
			.select('id,is_active')
			.eq('id', userId)
			.maybeSingle();
		if (userErr) {
		 throw new BadRequestException(`Gagal memverifikasi pengguna: ${userErr.message}`);
		}
		if (!user || (user as any).is_active === false) {
			throw new BadRequestException('Akun Anda tidak aktif');
		}

		// ensure project exists and is not deleted and belongs to user
		const existing = await this.repo.getByIdForUser(userId, projectId);
		if (!existing) {
			throw new BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
		}

		// soft delete
		await this.repo.softDeleteProject(projectId, userId);

		// audit log
		await this.auditLogger.log({
			userId,
			action: 'DELETE_PROJECT',
			entityType: 'project',
			entityId: projectId,
		});
	}

	async createWorklog(userId: string, projectId: string, dto: CreateWorklogDto) {
		// verify user active
		const { data: user, error: userErr } = await this.supabase
			.from('users')
			.select('id,is_active')
			.eq('id', userId)
			.maybeSingle();
		if (userErr) {
			throw new BadRequestException(`Gagal memverifikasi pengguna: ${userErr.message}`);
		}
		if (!user || (user as any).is_active === false) {
			throw new BadRequestException('Akun Anda tidak aktif');
		}

		// ensure project exists and belongs to user and not soft-deleted
		const project = await this.repo.getByIdForUser(userId, projectId);
		if (!project) {
			throw new BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
		}

		// validate logDate <= today
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const inputDate = new Date(dto.logDate + 'T00:00:00.000Z');
		if (isNaN(inputDate.getTime())) {
			throw new BadRequestException('Format tanggal tidak valid.');
		}
		if (inputDate.getTime() > today.getTime()) {
			throw new BadRequestException('Tanggal worklog tidak boleh melebihi hari ini.');
		}

		// ensure no duplicate on same date
		const exists = await this.repo.existsWorklogOnDate(projectId, dto.logDate);
		if (exists) {
			throw new BadRequestException('Worklog untuk tanggal tersebut sudah ada.');
		}

		// create worklog
		const created = await this.repo.createWorklog({
			project_id: projectId,
			log_date: dto.logDate,
			activity_type: dto.activityType,
			summary: dto.summary,
			time_spent: typeof dto.timeSpent === 'number' ? dto.timeSpent : undefined,
			blockers: typeof dto.blockers === 'string' ? dto.blockers : undefined,
		});

		// audit log
		await this.auditLogger.log({
			userId,
			action: 'CREATE_WORKLOG',
			entityType: 'worklog',
			entityId: created.id,
		});

		return created;
	}

	async listWorklogs(userId: string, projectId: string, query: GetWorklogsQueryDto) {
		// Ownership check
		const project = await this.repo.getByIdForUser(userId, projectId);
		if (!project) {
			throw new BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
		}

		// Validate date range if provided
		const fromDate = query.fromDate;
		const toDate = query.toDate;
		if (fromDate && toDate) {
			const from = new Date(fromDate + 'T00:00:00.000Z');
			const to = new Date(toDate + 'T00:00:00.000Z');
			if (isNaN(from.getTime()) || isNaN(to.getTime()) || from.getTime() > to.getTime()) {
				throw new BadRequestException('Rentang tanggal tidak valid (fromDate harus ≤ toDate).');
			}
		}

		const page = query.page ?? 1;
		const limit = query.limit ?? 10;
		const sort = (query.sort ?? 'desc') as 'asc' | 'desc';

		const { items, total } = await this.repo.listWorklogs({
			project_id: projectId,
			page,
			limit,
			from_date: fromDate,
			to_date: toDate,
			sort,
		});

		return {
			items,
			meta: {
				page,
				limit,
				totalItems: total,
				totalPages: Math.ceil((total ?? 0) / limit),
			},
		};
	}

	async getWorklogDetail(userId: string, projectId: string, worklogId: string) {
		// Ownership check
		const project = await this.repo.getByIdForUser(userId, projectId);
		if (!project) {
			throw new BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
		}

		const wl = await this.repo.getWorklogByIdForProject(projectId, worklogId);
		if (!wl) {
			throw new BadRequestException('Worklog tidak ditemukan');
		}

		return {
			id: wl.id,
			project: { id: project.id, title: project.title },
			logDate: wl.log_date,
			activityType: wl.activity_type,
			summary: wl.summary,
			timeSpent: wl.time_spent,
			blockers: wl.blockers,
			createdAt: wl.created_at,
			updatedAt: wl.updated_at,
		};
	}

	async updateWorklog(userId: string, projectId: string, worklogId: string, dto: UpdateWorklogDto) {
		// verify project ownership and not deleted
		const project = await this.repo.getByIdForUser(userId, projectId);
		if (!project) {
			throw new BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
		}

		// verify worklog exists under project and not deleted
		const current = await this.repo.getWorklogByIdForProject(projectId, worklogId);
		if (!current) {
			throw new BadRequestException('Worklog tidak ditemukan');
		}

		// ensure at least one field provided
		const provided =
			typeof dto.logDate !== 'undefined' ||
			typeof dto.activityType !== 'undefined' ||
			typeof dto.summary !== 'undefined' ||
			typeof dto.timeSpent !== 'undefined' ||
			typeof dto.blockers !== 'undefined';
		if (!provided) {
			throw new BadRequestException('Minimal satu field harus dikirim');
		}

		// validate logDate if provided
		if (typeof dto.logDate !== 'undefined') {
			const today = new Date(); today.setHours(0, 0, 0, 0);
			const inputDate = new Date(dto.logDate + 'T00:00:00.000Z');
			if (isNaN(inputDate.getTime())) {
				throw new BadRequestException('Format tanggal tidak valid.');
			}
			if (inputDate.getTime() > today.getTime()) {
				throw new BadRequestException('Tanggal worklog tidak boleh melebihi hari ini.');
			}
			// prevent duplicate (excluding current worklog)
			const dup = await this.repo.existsOtherWorklogOnDate(projectId, dto.logDate, worklogId);
			if (dup) {
				throw new BadRequestException('Worklog untuk tanggal tersebut sudah ada.');
			}
		}

		// update
		const updated = await this.repo.updateWorklog(projectId, worklogId, {
			log_date: dto.logDate,
			activity_type: dto.activityType,
			summary: dto.summary,
			time_spent: typeof dto.timeSpent === 'number' ? dto.timeSpent : undefined,
			blockers: typeof dto.blockers === 'string' ? dto.blockers : undefined,
		});

		return updated;
	}

	async deleteWorklog(userId: string, projectId: string, worklogId: string) {
		// verify user active
		const { data: user, error: userErr } = await this.supabase
			.from('users')
			.select('id,is_active')
			.eq('id', userId)
			.maybeSingle();
		if (userErr) {
			throw new BadRequestException(`Gagal memverifikasi pengguna: ${userErr.message}`);
		}
		if (!user || (user as any).is_active === false) {
			throw new BadRequestException('Akun Anda tidak aktif');
		}

		// ownership check
		const project = await this.repo.getByIdForUser(userId, projectId);
		if (!project) {
			throw new BadRequestException('Project tidak ditemukan atau tidak dapat diakses');
		}

		// ensure worklog exists under project and not deleted
		const current = await this.repo.getWorklogByIdForProject(projectId, worklogId);
		if (!current) {
			throw new BadRequestException('Worklog tidak ditemukan');
		}

		// soft delete
		await this.repo.softDeleteWorklog(projectId, worklogId);

		// audit log (opsional)
		await this.auditLogger.log({
			userId,
			action: 'DELETE_WORKLOG',
			entityType: 'worklog',
			entityId: worklogId,
		});
	}
}


