import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { GetAdminUsersQueryDto } from '../../infrastructure/adapters/http/dto/get-admin-users-query.dto';
import { GetAdminUserDetailQueryDto } from '../../infrastructure/adapters/http/dto/get-admin-user-detail-query.dto';
import { UpdateAdminUserStatusDto } from '../../infrastructure/adapters/http/dto/update-admin-user-status.dto';
import { UpdateAdminUserRoleDto } from '../../infrastructure/adapters/http/dto/update-admin-user-role.dto';
import { AuditLoggerService } from '../../../../infrastructure/logger/audit-logger.service';

@Injectable()
export class UsersService {
	constructor(
		@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
		@Inject('UsersRepositoryToken') private readonly repo: any,
		private readonly auditLogger: AuditLoggerService,
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

	async updateUserRole(actorUserId: string, targetUserId: string, dto: UpdateAdminUserRoleDto) {
		// roleId required is enforced by DTO, but double-check
		if (!dto.roleId) {
			throw new BadRequestException('roleId wajib diisi');
		}

		// target must exist
		const target = await this.repo.getUserById(targetUserId);
		if (!target) {
			throw new BadRequestException('Pengguna tidak ditemukan');
		}

		// self change is not allowed
		if (actorUserId === targetUserId) {
			throw new BadRequestException('Anda tidak dapat mengubah peran akun Anda sendiri');
		}

		// new role must exist
		const newRole = await this.repo.getRoleById(dto.roleId);
		if (!newRole) {
			throw new BadRequestException('Role tidak ditemukan');
		}

		// cannot downgrade super admin
		if (target.role_id) {
			const currentRole = await this.repo.getRoleById(target.role_id);
			if (currentRole?.name === 'SUPERADMIN' && target.role_id !== dto.roleId) {
				throw new BadRequestException('Anda tidak dapat mengubah peran super admin');
			}
		}

		// new role must be different from current
		if (target.role_id === dto.roleId) {
			throw new BadRequestException('Peran baru sama dengan peran saat ini');
		}

		const updated = await this.repo.updateUserRole(targetUserId, dto.roleId);

		// audit log
		await this.auditLogger.log({
			userId: actorUserId,
			action: 'UPDATE_USER_ROLE',
			entityType: 'user',
			entityId: targetUserId,
		});

		return {
			id: updated.id,
			email: updated.email,
			role: {
				id: newRole.id,
				name: newRole.name,
			},
			updatedAt: updated.updated_at,
		};
	}

	async getUserDetail(userId: string, query: GetAdminUserDetailQueryDto) {
		const user = await this.repo.getUserById(userId);
		if (!user) {
			throw new BadRequestException('Pengguna tidak ditemukan');
		}
		const role = user.role_id ? await this.repo.getRoleById(user.role_id) : null;

		const includeStats = query.includeStats ?? false;
		const includeProjects = query.includeProjects ?? false;
		const projectLimit = Math.min(query.projectLimit ?? 5, 20);

		let stats: any | undefined;
		if (includeStats) {
			stats = await this.repo.getUserStats(userId);
		}

		let projects: any[] | undefined;
		if (includeProjects) {
			const rows = await this.repo.listUserProjects(userId, projectLimit);
			projects = rows.map((p: any) => ({
				id: p.id,
				title: p.title,
				status: p.status,
				createdAt: p.created_at,
			}));
		}

		return {
			id: user.id,
			email: user.email,
			fullName: user.full_name ?? null,
			role: role ? { id: role.id, name: role.name } : null,
			isActive: user.is_active,
			createdAt: user.created_at,
			updatedAt: user.updated_at,
			stats,
			projects,
		};
	}

	async updateUserStatus(actorUserId: string, targetUserId: string, dto: UpdateAdminUserStatusDto) {
		// minimal satu field
		const provided = typeof dto.isActive !== 'undefined';
		if (!provided) {
			throw new BadRequestException('Minimal satu field harus dikirim');
		}

		// target must exist
		const target = await this.repo.getUserById(targetUserId);
		if (!target) {
			throw new BadRequestException('Pengguna tidak ditemukan');
		}

		// admin cannot deactivate self
		if (actorUserId === targetUserId && dto.isActive === false) {
			throw new BadRequestException('Anda tidak dapat menonaktifkan akun Anda sendiri');
		}

		// target is not super admin (jika ada)
		if (target.role_id) {
			const role = await this.repo.getRoleById(target.role_id);
			if (role?.name === 'SUPERADMIN') {
				throw new BadRequestException('Anda tidak dapat mengubah status super admin');
			}
		}

		// perform update
		const updated = await this.repo.updateUserStatus(targetUserId, dto.isActive as boolean);

		return {
			id: updated.id,
			email: updated.email,
			isActive: updated.is_active,
			updatedAt: updated.updated_at,
		};
	}
}


