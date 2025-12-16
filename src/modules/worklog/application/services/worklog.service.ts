import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class WorklogService {
	constructor(
		@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
		@Inject('WorklogRepositoryToken') private readonly repo: any,
	) {}

	async getWorklogDetail(userId: string, worklogId: string) {
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

		const wl = await this.repo.getWorklogById(worklogId);
		if (!wl) {
			throw new BadRequestException('Worklog tidak ditemukan');
		}

		const project = await this.repo.getProjectForWorklog((wl as any).project_id);
		if (!project || (project as any).deleted_at) {
			throw new BadRequestException('Project terkait tidak ditemukan');
		}
		if ((project as any).user_id !== userId) {
			throw new BadRequestException('Anda tidak memiliki akses ke worklog ini');
		}

		return {
			id: wl.id,
			project: {
				id: project.id,
				title: project.title,
			},
			logDate: wl.log_date,
			activityType: wl.activity_type,
			summary: wl.summary,
			timeSpent: wl.time_spent,
			blockers: wl.blockers,
			createdAt: wl.created_at,
			updatedAt: wl.updated_at,
		};
	}
}


