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

	async getByIdForUser(user_id: string, project_id: string) {
		const { data, error } = await this.supabase
			.from('projects')
			.select('id,user_id,title,description,tech_stack,status,created_at,updated_at,deleted_at')
			.eq('id', project_id)
			.eq('user_id', user_id)
			.is('deleted_at', null)
			.maybeSingle();
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil project: ${error.message}`);
		}
		return data as any | null;
	}

	async updateProject(project_id: string, user_id: string, updates: {
		title?: string;
		description?: string | null;
		tech_stack?: string | null;
		status?: 'ACTIVE' | 'ARCHIVED';
	}) {
		const payload: Record<string, unknown> = {};
		if (typeof updates.title !== 'undefined') payload.title = updates.title;
		if (typeof updates.description !== 'undefined') payload.description = updates.description;
		if (typeof updates.tech_stack !== 'undefined') payload.tech_stack = updates.tech_stack;
		if (typeof updates.status !== 'undefined') payload.status = updates.status;

		const { data, error } = await this.supabase
			.from('projects')
			.update(payload)
			.eq('id', project_id)
			.eq('user_id', user_id)
			.is('deleted_at', null)
			.select('id,title,description,tech_stack,status,updated_at')
			.single();
		if (error) {
			throw new InternalServerErrorException(`Gagal memperbarui project: ${error.message}`);
		}
		return data as {
			id: string;
			title: string;
			description: string | null;
			tech_stack: string | null;
			status: 'ACTIVE' | 'ARCHIVED';
			updated_at: string;
		};
	}

	async getWorklogsForProject(project_id: string, limit: number, order: 'asc' | 'desc') {
		const { data, error } = await this.supabase
			.from('worklogs')
			.select('id,log_date,activity_type,summary,time_spent')
			.eq('project_id', project_id)
			.is('deleted_at', null)
			.order('log_date', { ascending: order === 'asc' })
			.limit(limit);
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil worklogs: ${error.message}`);
		}
		return (data ?? []) as Array<{
			id: string;
			log_date: string;
			activity_type: string;
			summary: string;
			time_spent: number | null;
		}>;
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

 
