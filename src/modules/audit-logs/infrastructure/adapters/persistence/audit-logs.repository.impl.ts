import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuditLogsRepositoryImpl {
	constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) {}

	async listAuditLogs(params: {
		page: number;
		limit: number;
		user_id?: string;
		entity_type?: string;
		entity_id?: string;
		action?: string;
		from?: string;
		to?: string;
		sort: 'asc' | 'desc';
	}): Promise<{ items: Array<any>; total: number }> {
		let query = this.supabase
			.from('audit_logs')
			.select('id,user_id,action,entity_type,entity_id,created_at', { count: 'exact' });

		if (params.user_id) {
			query = query.eq('user_id', params.user_id);
		}
		if (params.entity_type) {
			query = query.eq('entity_type', params.entity_type.toLowerCase());
		}
		if (params.entity_id) {
			query = query.eq('entity_id', params.entity_id);
		}
		if (params.action) {
			query = query.eq('action', params.action);
		}
		if (params.from) {
			query = query.gte('created_at', params.from);
		}
		if (params.to) {
			query = query.lte('created_at', params.to);
		}

		query = query.order('created_at', { ascending: params.sort === 'asc' });

		const fromIdx = (params.page - 1) * params.limit;
		const toIdx = fromIdx + params.limit - 1;
		const { data, error, count } = await query.range(fromIdx, toIdx);
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil audit logs: ${error.message}`);
		}
		return { items: (data ?? []) as any, total: count ?? 0 };
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
}

 
