import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../../infrastructure/adapters/http/dto/create-project.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { GetProjectsQueryDto } from '../../infrastructure/adapters/http/dto/get-projects-query.dto';
import { UpdateProjectDto } from '../../infrastructure/adapters/http/dto/update-project.dto';
import { GetProjectDetailQueryDto } from '../../infrastructure/adapters/http/dto/get-project-detail-query.dto';
import { AuditLoggerService } from '../../../../infrastructure/logger/audit-logger.service';

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
}


