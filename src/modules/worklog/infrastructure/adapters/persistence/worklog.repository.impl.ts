import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class WorklogRepositoryImpl {
	constructor(
		@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
	) {}

	async getWorklogById(id: string) {
		const { data, error } = await this.supabase
			.from('worklogs')
			.select('id,project_id,log_date,activity_type,summary,time_spent,blockers,created_at,updated_at,deleted_at')
			.eq('id', id)
			.is('deleted_at', null)
			.maybeSingle();
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil worklog: ${error.message}`);
		}
		return data as any | null;
	}

	async getProjectForWorklog(project_id: string) {
		const { data, error } = await this.supabase
			.from('projects')
			.select('id,title,user_id,deleted_at')
			.eq('id', project_id)
			.maybeSingle();
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil project: ${error.message}`);
		}
		return data as any | null;
	}
}

 
