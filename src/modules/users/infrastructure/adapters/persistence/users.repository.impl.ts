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
}

 
