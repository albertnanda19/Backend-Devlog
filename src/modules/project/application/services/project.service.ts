import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../../infrastructure/adapters/http/dto/create-project.dto';
import { SupabaseClient } from '@supabase/supabase-js';

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
}


