import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class UsersRepositoryImpl {
	constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) {}

	async listUsers(params: {
		page: number;
		limit: number;
		role_id?: string;
		is_active?: boolean;
		search?: string;
		sort_by: string;
		order: 'asc' | 'desc';
	}): Promise<{ items: Array<any>; total: number }> {
		let query = this.supabase
			.from('users')
			.select('id,email,full_name,role_id,is_active,created_at', { count: 'exact' });

		if (typeof params.is_active === 'boolean') {
			query = query.eq('is_active', params.is_active);
		}
		if (params.role_id) {
			query = query.eq('role_id', params.role_id);
		}
		if (params.search) {
			// cari email OR full_name
			query = query.or(`email.ilike.%${params.search}%,full_name.ilike.%${params.search}%`);
		}

		query = query.order(params.sort_by, { ascending: params.order === 'asc' });

		const from = (params.page - 1) * params.limit;
		const to = from + params.limit - 1;
		const { data, error, count } = await query.range(from, to);
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil daftar pengguna: ${error.message}`);
		}
		return {
			items: (data ?? []) as any,
			total: count ?? 0,
		};
	}

	async getUserById(userId: string) {
		const { data, error } = await this.supabase
			.from('users')
			.select('id,email,full_name,role_id,is_active,created_at,updated_at')
			.eq('id', userId)
			.maybeSingle();
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil pengguna: ${error.message}`);
		}
		return data as any | null;
	}

	async getRoleById(roleId: string) {
		const { data, error } = await this.supabase
			.from('roles')
			.select('id,name')
			.eq('id', roleId)
			.maybeSingle();
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil role: ${error.message}`);
		}
		return data as any | null;
	}

	async getUserStats(userId: string) {
		// totalProjects
		const { count: totalProjects, error: projErr, data: projData } = await this.supabase
			.from('projects')
			.select('id', { count: 'exact' })
			.eq('user_id', userId)
			.is('deleted_at', null);
		if (projErr) {
			throw new InternalServerErrorException(`Gagal menghitung proyek: ${projErr.message}`);
		}
		const projectIds = (projData ?? []).map((p: any) => p.id);

		let totalWorklogs = 0;
		let totalTimeSpent = 0;
		if (projectIds.length > 0) {
			const { data: worklogs, error: wlErr } = await this.supabase
				.from('worklogs')
				.select('time_spent', { count: 'exact' })
				.in('project_id', projectIds)
				.is('deleted_at', null);
			if (wlErr) {
				throw new InternalServerErrorException(`Gagal menghitung worklog: ${wlErr.message}`);
			}
			totalWorklogs = (worklogs as any)?.length ?? 0;
			totalTimeSpent = (worklogs ?? []).reduce((sum: number, w: any) => sum + (w.time_spent ?? 0), 0);
		}

		return { totalProjects: totalProjects ?? 0, totalWorklogs, totalTimeSpent };
	}

	async listUserProjects(userId: string, limit: number) {
		const { data, error } = await this.supabase
			.from('projects')
			.select('id,title,status,created_at')
			.eq('user_id', userId)
			.is('deleted_at', null)
			.order('created_at', { ascending: false })
			.limit(limit);
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil proyek pengguna: ${error.message}`);
		}
		return (data ?? []) as Array<{ id: string; title: string; status: string; created_at: string }>;
	}

	async updateUserStatus(userId: string, isActive: boolean) {
		const { data, error } = await this.supabase
			.from('users')
			.update({ is_active: isActive })
			.eq('id', userId)
			.select('id,email,is_active,updated_at')
			.single();
		if (error) {
			throw new InternalServerErrorException(`Gagal memperbarui status pengguna: ${error.message}`);
		}
		return data as { id: string; email: string; is_active: boolean; updated_at: string };
	}

	async updateUserRole(userId: string, roleId: string) {
		const { data, error } = await this.supabase
			.from('users')
			.update({ role_id: roleId })
			.eq('id', userId)
			.select('id,email,role_id,updated_at')
			.single();
		if (error) {
			throw new InternalServerErrorException(`Gagal memperbarui peran pengguna: ${error.message}`);
		}
		return data as { id: string; email: string; role_id: string; updated_at: string };
	}
}

 
