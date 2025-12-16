import { Controller, Get, Inject, InternalServerErrorException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Controller('roles')
export class RolesController {
	constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) {}

	@Get()
	async list() {
		const { data, error } = await this.supabase
			.from('roles')
			.select('id,name')
			.order('name', { ascending: true });
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil daftar role: ${error.message}`);
		}
		return {
			success: true,
			message: 'Berhasil mengambil daftar role',
			data: (data ?? []).map((r: any) => ({ id: r.id, name: r.name })),
		};
	}
}


