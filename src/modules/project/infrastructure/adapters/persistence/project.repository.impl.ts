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

	async adminListProjects(params: {
		page: number;
		limit: number;
		user_id?: string;
		status?: 'ACTIVE' | 'ARCHIVED';
		search?: string;
		include_deleted?: boolean;
		sort: 'asc' | 'desc';
	}): Promise<{ items: Array<{
		id: string;
		title: string;
		status: 'ACTIVE' | 'ARCHIVED';
		tech_stack: string | null;
		user_id: string;
		created_at: string;
	}>; total: number; }> {
		let query = this.supabase
			.from('projects')
			.select('id,title,status,tech_stack,user_id,created_at', { count: 'exact' });

		if (!params.include_deleted) {
			query = query.is('deleted_at', null);
		}
		if (params.user_id) {
			query = query.eq('user_id', params.user_id);
		}
		if (params.status) {
			query = query.eq('status', params.status);
		}
		if (params.search) {
			query = query.ilike('title', `%${params.search}%`);
		}

		query = query.order('created_at', { ascending: params.sort === 'asc' });

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

	async getUsersByIds(userIds: string[]) {
		const { data, error } = await this.supabase
			.from('users')
			.select('id,email')
			.in('id', userIds);
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil data pengguna: ${error.message}`);
		}
		return (data ?? []) as Array<{ id: string; email: string }>;
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

	async softDeleteProject(project_id: string, user_id: string) {
		const { data, error } = await this.supabase
			.from('projects')
			.update({ deleted_at: new Date().toISOString() })
			.eq('id', project_id)
			.eq('user_id', user_id)
			.is('deleted_at', null)
			.select('id,deleted_at')
			.single();
		if (error) {
			throw new InternalServerErrorException(`Gagal menghapus project: ${error.message}`);
		}
		return data as { id: string; deleted_at: string };
	}

	async existsWorklogOnDate(project_id: string, log_date: string): Promise<boolean> {
		const { data, error } = await this.supabase
			.from('worklogs')
			.select('id')
			.eq('project_id', project_id)
			.eq('log_date', log_date)
			.is('deleted_at', null)
			.maybeSingle();
		if (error && error.code !== 'PGRST116') {
			// PGRST116: No rows found for maybeSingle
			throw new InternalServerErrorException(`Gagal memeriksa worklog: ${error.message}`);
		}
		return !!data;
	}

	async createWorklog(input: {
		project_id: string;
		log_date: string;
		activity_type: string;
		summary: string;
		time_spent?: number | null;
		blockers?: string | null;
	}) {
		const { data, error } = await this.supabase
			.from('worklogs')
			.insert({
				project_id: input.project_id,
				log_date: input.log_date,
				activity_type: input.activity_type,
				summary: input.summary,
				time_spent: typeof input.time_spent === 'number' ? input.time_spent : null,
				blockers: input.blockers ?? null,
			})
			.select('id,log_date,activity_type,summary,time_spent,blockers,created_at')
			.single();
		if (error) {
			throw new InternalServerErrorException(`Gagal membuat worklog: ${error.message}`);
		}
		return data as {
			id: string;
			log_date: string;
			activity_type: string;
			summary: string;
			time_spent: number | null;
			blockers: string | null;
			created_at: string;
		};
	}

	async listWorklogs(params: {
		project_id: string;
		page: number;
		limit: number;
		from_date?: string;
		to_date?: string;
		sort: 'asc' | 'desc';
	}): Promise<{ items: Array<{
		id: string;
		log_date: string;
		activity_type: string;
		summary: string;
		time_spent: number | null;
		blockers: string | null;
		created_at: string;
	}>; total: number; }> {
		let query = this.supabase
			.from('worklogs')
			.select('id,log_date,activity_type,summary,time_spent,blockers,created_at', { count: 'exact' })
			.eq('project_id', params.project_id)
			.is('deleted_at', null);

		if (params.from_date) {
			query = query.gte('log_date', params.from_date);
		}
		if (params.to_date) {
			query = query.lte('log_date', params.to_date);
		}

		query = query.order('log_date', { ascending: params.sort === 'asc' });

		const from = (params.page - 1) * params.limit;
		const to = from + params.limit - 1;
		const { data, error, count } = await query.range(from, to);
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil daftar worklog: ${error.message}`);
		}
		return {
			items: (data ?? []) as any,
			total: count ?? 0,
		};
	}

	async getWorklogByIdForProject(project_id: string, worklog_id: string) {
		const { data, error } = await this.supabase
			.from('worklogs')
			.select('id,project_id,log_date,activity_type,summary,time_spent,blockers,created_at,updated_at,deleted_at')
			.eq('id', worklog_id)
			.eq('project_id', project_id)
			.is('deleted_at', null)
			.maybeSingle();
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil worklog: ${error.message}`);
		}
		return data as any | null;
	}

	async existsOtherWorklogOnDate(project_id: string, log_date: string, exclude_worklog_id: string): Promise<boolean> {
		const { data, error } = await this.supabase
			.from('worklogs')
			.select('id')
			.eq('project_id', project_id)
			.eq('log_date', log_date)
			.neq('id', exclude_worklog_id)
			.is('deleted_at', null)
			.maybeSingle();
		if (error && error.code !== 'PGRST116') {
			throw new InternalServerErrorException(`Gagal memeriksa worklog: ${error.message}`);
		}
		return !!data;
	}

	async updateWorklog(project_id: string, worklog_id: string, updates: {
		log_date?: string;
		activity_type?: string;
		summary?: string;
		time_spent?: number | null;
		blockers?: string | null;
	}) {
		const payload: Record<string, unknown> = {};
		if (typeof updates.log_date !== 'undefined') payload.log_date = updates.log_date;
		if (typeof updates.activity_type !== 'undefined') payload.activity_type = updates.activity_type;
		if (typeof updates.summary !== 'undefined') payload.summary = updates.summary;
		if (typeof updates.time_spent !== 'undefined') payload.time_spent = updates.time_spent;
		if (typeof updates.blockers !== 'undefined') payload.blockers = updates.blockers;

		const { data, error } = await this.supabase
			.from('worklogs')
			.update(payload)
			.eq('id', worklog_id)
			.eq('project_id', project_id)
			.is('deleted_at', null)
			.select('id,log_date,activity_type,summary,time_spent,blockers,updated_at')
			.single();
		if (error) {
			throw new InternalServerErrorException(`Gagal memperbarui worklog: ${error.message}`);
		}
		return data as {
			id: string;
			log_date: string;
			activity_type: string;
			summary: string;
			time_spent: number | null;
			blockers: string | null;
			updated_at: string;
		};
	}

	async softDeleteWorklog(project_id: string, worklog_id: string) {
		const { data, error } = await this.supabase
			.from('worklogs')
			.update({ deleted_at: new Date().toISOString() })
			.eq('id', worklog_id)
			.eq('project_id', project_id)
			.is('deleted_at', null)
			.select('id,deleted_at')
			.single();
		if (error) {
			throw new InternalServerErrorException(`Gagal menghapus worklog: ${error.message}`);
		}
		return data as { id: string; deleted_at: string };
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

 
