import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../../infrastructure/adapters/http/dto/create-project.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { GetProjectsQueryDto } from '../../infrastructure/adapters/http/dto/get-projects-query.dto';

@Injectable()
export class ProjectService {
	constructor(
		@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
		@Inject('ProjectRepositoryToken') private readonly repo: any,
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
}


