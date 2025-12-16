import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { GetAdminUsersQueryDto } from '../../infrastructure/adapters/http/dto/get-admin-users-query.dto';

@Injectable()
export class UsersService {
	constructor(
		@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
		@Inject('UsersRepositoryToken') private readonly repo: any,
	) {}

	async listUsers(query: GetAdminUsersQueryDto) {
		const page = query.page ?? 1;
		const limit = query.limit ?? 20;
		const order = (query.order ?? 'desc') as 'asc' | 'desc';
		const sortBy = query.sortBy ?? 'createdAt';

		const sortMap: Record<string, string> = {
			createdAt: 'created_at',
			email: 'email',
			fullName: 'full_name',
		};
		const sort_col = sortMap[sortBy] ?? 'created_at';

		let roleId: string | undefined;
		if (query.role) {
			const { data: role, error: roleErr } = await this.supabase
				.from('roles')
				.select('id,name')
				.eq('name', query.role)
				.maybeSingle();
			if (roleErr) {
				throw new BadRequestException(`Gagal memverifikasi role: ${roleErr.message}`);
			}
			if (!role) {
				// role tidak ada → kosongkan hasil
				return { items: [], total: 0 };
			}
			roleId = (role as any).id as string;
		}

		const { items, total } = await this.repo.listUsers({
			page,
			limit,
			role_id: roleId,
			is_active: typeof query.isActive === 'boolean' ? query.isActive : undefined,
			search: query.search?.trim() || undefined,
			sort_by: sort_col,
			order,
		});

		// Ambil role name untuk mapping
		const distinctRoleIds = Array.from(new Set(items.map((u: any) => u.role_id).filter(Boolean)));
		let roleMap: Record<string, string> = {};
		if (distinctRoleIds.length > 0) {
			const { data: roles, error: rolesErr } = await this.supabase
				.from('roles')
				.select('id,name')
				.in('id', distinctRoleIds);
			if (rolesErr) {
				throw new BadRequestException(`Gagal mengambil data role: ${rolesErr.message}`);
			}
			roleMap = (roles ?? []).reduce((acc: any, r: any) => {
				acc[r.id] = r.name;
				return acc;
			}, {});
		}

		return {
			items: items.map((u: any) => ({
				id: u.id,
				email: u.email,
				fullName: u.full_name ?? null,
				role: {
					id: u.role_id,
					name: roleMap[u.role_id] ?? null,
				},
				isActive: u.is_active,
				createdAt: u.created_at,
			})),
			total,
			page,
			limit,
		};
	}
}


