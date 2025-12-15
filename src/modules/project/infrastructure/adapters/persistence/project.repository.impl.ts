import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

type CreateProjectInput = {
	user_id: string;
	title: string;
	description?: string | null;
	tech_stack?: string | null;
	status: 'ACTIVE' | 'ARCHIVED';
};

@Injectable()
export class ProjectRepositoryImpl {
	constructor(
		@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
	) {}

	async createProject(input: CreateProjectInput) {
		const { data, error } = await this.supabase
			.from('projects')
			.insert({
				user_id: input.user_id,
				title: input.title,
				description: input.description ?? null,
				tech_stack: input.tech_stack ?? null,
				status: input.status,
			})
			.select('id,title,description,tech_stack,status,created_at')
			.single();
		if (error) {
			throw new InternalServerErrorException(`Gagal membuat project: ${error.message}`);
		}
		return data as {
			id: string;
			title: string;
			description: string | null;
			tech_stack: string | null;
			status: 'ACTIVE' | 'ARCHIVED';
			created_at: string;
		};
	}

	async listProjects(params: {
		user_id: string;
		status?: 'ACTIVE' | 'ARCHIVED';
		search?: string;
		sort_by: string;
		order: 'asc' | 'desc';
		page: number;
		limit: number;
	}): Promise<{ items: Array<{
		id: string;
		title: string;
		description: string | null;
		tech_stack: string | null;
		status: 'ACTIVE' | 'ARCHIVED';
		created_at: string;
	}>; total: number; }> {
		let query = this.supabase
			.from('projects')
			.select('id,title,description,tech_stack,status,created_at', { count: 'exact' })
			.eq('user_id', params.user_id)
			.is('deleted_at', null);

		if (params.status) {
			query = query.eq('status', params.status);
		}
		if (params.search) {
			query = query.ilike('title', `%${params.search}%`);
		}

		query = query.order(params.sort_by, { ascending: params.order === 'asc' });

		const from = (params.page - 1) * params.limit;
		const to = from + params.limit - 1;
		const { data, error, count } = await query.range(from, to);
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil daftar project: ${error.message}`);
		}
		return {
			items: (data ?? []) as any,
			total: count ?? 0,
		};
	}
}

 
