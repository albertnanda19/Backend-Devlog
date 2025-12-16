import { Injectable, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { UserRepositoryPort, CreateUserInput, UserRecord } from '../../../application/ports/user.repository.port';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository, UserRepositoryPort {
	constructor(
		@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
	) {}

	async findById(id: string): Promise<any> {
		// Ambil data user tanpa join agar stabil pada Supabase (relasi bisa tidak terdaftar)
		const { data: user, error: userErr } = await this.supabase
			.from('users')
			.select('id,email,full_name,is_active,created_at,role_id')
			.eq('id', id)
			.maybeSingle();
		if (userErr) {
			throw new InternalServerErrorException(`Gagal mengambil data pengguna: ${userErr.message}`);
		}
		if (!user) {
			throw new NotFoundException('Pengguna tidak ditemukan');
		}

		// Ambil data role jika tersedia
		let role: { id: string; name: string } | null = null;
		if ((user as any).role_id) {
			const { data: roleRow, error: roleErr } = await this.supabase
				.from('roles')
				.select('id,name')
				.eq('id', (user as any).role_id)
				.maybeSingle();
			if (roleErr) {
				throw new InternalServerErrorException(`Gagal mengambil data peran pengguna: ${roleErr.message}`);
			}
			if (roleRow) {
				role = { id: (roleRow as any).id, name: (roleRow as any).name };
			}
		}

		return {
			id: (user as any).id,
			email: (user as any).email,
			full_name: (user as any).full_name ?? null,
			is_active: (user as any).is_active ?? null,
			created_at: (user as any).created_at ?? null,
			roles: role,
		};
	}

	async findByEmail(email: string): Promise<UserRecord | null> {
		const { data, error } = await this.supabase
			.from('users')
			.select('id,email,password_hash,role_id,full_name,is_active,created_at,updated_at')
			.eq('email', email)
			.maybeSingle();
		if (error) {
			throw new InternalServerErrorException('Gagal memeriksa email pengguna');
		}
		return (data as UserRecord) ?? null;
	}

	async createUser(data: CreateUserInput): Promise<UserRecord> {
		const { data: inserted, error } = await this.supabase
			.from('users')
			.insert({
				email: data.email,
				password_hash: data.password_hash,
				role_id: data.role_id,
				full_name: data.full_name ?? null,
			})
			.select('id,email,password_hash,role_id,full_name,is_active,created_at,updated_at')
			.single();
		if (error) {
			throw new InternalServerErrorException('Gagal membuat pengguna baru');
		}
		return inserted as UserRecord;
	}

	async getDefaultRoleId(): Promise<string> {
		const fromEnv = process.env.DEFAULT_ROLE_ID;
		if (fromEnv) return fromEnv;

		const { data: role, error: findErr } = await this.supabase
			.from('roles')
			.select('id,name')
			.eq('name', 'USER')
			.maybeSingle();
		if (findErr) {
			throw new InternalServerErrorException('Gagal mengambil peran default');
		}
		if (role?.id) return role.id as string;

		const { data: created, error: insertErr } = await this.supabase
			.from('roles')
			.insert({ name: 'USER', description: 'Default application role' })
			.select('id')
			.single();
		if (insertErr || !created) {
			throw new InternalServerErrorException('Gagal membuat peran default');
		}
		return created.id as string;
	}

	async getById(id: string): Promise<UserRecord | null> {
		const { data, error } = await this.supabase
			.from('users')
			.select('id,email,password_hash,role_id,full_name,is_active,created_at,updated_at')
			.eq('id', id)
			.maybeSingle();
		if (error) {
			throw new InternalServerErrorException(`Gagal mengambil pengguna: ${error.message}`);
		}
		return (data as UserRecord) ?? null;
	}

	async updateFullName(id: string, full_name: string): Promise<UserRecord> {
		const { data, error } = await this.supabase
			.from('users')
			.update({ full_name })
			.eq('id', id)
			.select('id,email,password_hash,role_id,full_name,is_active,created_at,updated_at')
			.single();
		if (error) {
			throw new InternalServerErrorException(`Gagal memperbarui profil: ${error.message}`);
		}
		return data as UserRecord;
	}

	async getRoleById(roleId: string): Promise<{ id: string; name: string } | null> {
		const { data, error } = await this.supabase
			.from('roles')
			.select('id,name')
			.eq('id', roleId)
			.maybeSingle();
		if (error) {
			throw new InternalServerErrorException('Gagal mengambil data role');
		}
		if (!data) return null;
		return { id: (data as any).id, name: (data as any).name };
	}
}
