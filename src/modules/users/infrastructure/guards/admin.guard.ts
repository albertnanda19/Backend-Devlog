import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const user = (req as any).user as { id: string } | undefined;
		if (!user?.id) {
			throw new UnauthorizedException('Token otorisasi tidak valid');
		}
		// Ambil user beserta role
		const { data, error } = await this.supabase
			.from('users')
			.select('id,is_active,role_id')
			.eq('id', user.id)
			.maybeSingle();
		if (error || !data) {
			throw new ForbiddenException('Gagal memverifikasi peran pengguna');
		}
		if ((data as any).is_active === false) {
			throw new ForbiddenException('Akun Anda tidak aktif');
		}
		const { data: role, error: roleErr } = await this.supabase
			.from('roles')
			.select('id,name')
			.eq('id', (data as any).role_id)
			.maybeSingle();
		if (roleErr || !role) {
			throw new ForbiddenException('Gagal memverifikasi peran pengguna');
		}
		if ((role as any).name !== 'ADMIN') {
			throw new ForbiddenException('Anda tidak memiliki hak akses ke sumber daya ini');
		}
		return true;
	}
}


