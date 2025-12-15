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
}

 
